package com.api.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.api.model.CodeGroupDetail;
import com.api.model.ProviderInformation;
import com.api.model.billing.PaymentPrePayInvoiceInput;
import com.api.model.contract.ContractInsert;
import com.api.service.ChannelService;
import com.api.service.CodeService;
import com.api.service.ContractService;
import com.api.service.ProviderService;
import com.api.service.UserService;
import com.api.util.BTVEncoderUtil;
import com.api.util.DateUtil;

@RestController
@RequestMapping("btv")
@Transactional(rollbackFor=Exception.class)
public class BTVContractController {

	@Autowired
	private ContractService contractService;

	@Autowired
	private ProviderService providerService;

	@Autowired
	UserService userService;

	@Autowired 
	CodeService codeService;
	
	@Autowired
	ChannelService channelService;
	
	@Autowired
	private BillingController billingController;
	
	@RequestMapping(value = "/productsale", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewProductSale(@ModelAttribute ContractInsert contractInsert, Model model) throws Exception{
		
		BTVEncoderUtil encoderUtil = new BTVEncoderUtil();
		/*
		contractInsert.setChannelCustomerNumber(encoderUtil.aesDecode(contractInsert.getService_num()));
		contractInsert.setChannelOrderNumber(encoderUtil.aesDecode(contractInsert.getPurchase_id()));
		contractInsert.setProductId(encoderUtil.aesDecode(contractInsert.getId_product()));
		*/
		contractInsert.setChannelCustomerNumber(contractInsert.getService_num());
		contractInsert.setChannelOrderNumber(contractInsert.getPurchase_id());
		contractInsert.setProductId(contractInsert.getId_product());
		contractInsert.setChannelId("BTV");
		
		//상품아이디 조회
		ProviderInformation param = new ProviderInformation();
		param.setProviderNumber(0);
		param.setCode("SALEPRODUCTCHANNELID");
		param.setDetailCode("BTV");
		param.setValue1("");
		param.setValue2(contractInsert.getProductId());
		
		List<ProviderInformation> product = providerService.getProviderInformationDetail(param);
		if (product.size() == 1) {
			contractInsert.setProviderNumber(product.get(0).getProviderNumber());
			contractInsert.setProductId(product.get(0).getValue1());
			param.setProviderNumber(product.get(0).getProviderNumber());
		} else if (product.size() == 0){
			throw new Exception("판매가능한 상품이 아닙니다.");
		} else {
			throw new Exception("중복된 상품입니다.");
		}
		
		//구매아이디로 기등록된 계약인지 체크
		List<ContractInsert> contract = contractService.getContractByChannelOrderNumber(contractInsert);
		if (contract.size() > 0) {
			contractInsert.setConNumber(contract.get(0).getConNumber());
			model.addAttribute("contractFlag", "BEFORE");
			ModelAndView modelAndView = viewProductSaleDone(contractInsert, model);
			return modelAndView;
		}
		
		//업체정보조회
		param.setCode("PROVIDERINFORMATION");
		param.setDetailCode("BTV");
		List<ProviderInformation> provider = providerService.getProviderInformation(param);
		if (provider.size() > 0) {
			model.addAttribute("provider",provider.get(0));
		} else {
			throw new Exception("업체정보가 없습니다.");
		}
		
		//고객조회
		List<ContractInsert> customerList = contractService.getCustomerByChannelCustomerNumber(contractInsert);
		if (customerList.size() > 0) {
			model.addAttribute("customer", customerList.get(0));
		} else {
			model.addAttribute("customer", new ContractInsert());
		}
		
		//상품조회
		List<ContractInsert> productList = contractService.getProduct(contractInsert);
		if (productList.size() == 0) {
			throw new Exception("판매가능한 상품이 없습니다.");
		} else {
			model.addAttribute("product", productList.get(0));
		}

		//수량입력여부 조회
		param.setCode("SALEPRODUCTQUANTITY");
		param.setDetailCode("BTV");
		List<ProviderInformation> quantity = providerService.getProviderInformation(param);
		if (quantity.size() > 0) {
			model.addAttribute("saleProductQuantity",quantity.get(0).getValue1());
		} else {
			model.addAttribute("saleProductQuantity","N");
		}

		//배송업체
		param.setCode("DELIVERYCOMPANY");
		param.setDetailCode("BTV");
		List<ProviderInformation> deliveryCompanyList = providerService.getProviderInformation(param);
		if (deliveryCompanyList.size() > 0) {
			contractInsert.setDeliveryCompany(deliveryCompanyList.get(0).getValue1());
		} else {
			contractInsert.setDeliveryCompany("EZADMIN");
		}
		
		//배송주기
		param.setCode("DELIVERYCYCLE");
		param.setDetailCode("DELIVERYCYCLE");
		List<ProviderInformation> deliveryCycleList = providerService.getProviderInformation(param);
		if (deliveryCycleList.size() > 0) {
			contractInsert.setDeliveryCycle(deliveryCycleList.get(0).getValue1());
		} else {
			contractInsert.setDeliveryCycle("MONTH");
		}

		//배송횟수
		param.setCode("DELIVERYTIMES");
		param.setDetailCode("DELIVERYTIMES");
		List<ProviderInformation> deliveryTimesList = providerService.getProviderInformation(param);
		if (deliveryTimesList.size() > 0) {
			contractInsert.setDeliveryTimes(Integer.parseInt(deliveryTimesList.get(0).getValue1()));
		} else {
			contractInsert.setDeliveryTimes(1);
		}
		
		//1회차 배송일 조회
	    contractInsert.setDeliverySeq(1);
	    List<ContractInsert> deliveryDate1 = contractService.getDeliveryDateByDeliverySeq(contractInsert);
	    if (deliveryDate1.size() > 0) {
		    contractInsert.setDeliveryDate1(deliveryDate1.get(0).getDeliveryDate());
	    } else {
	    	throw new Exception("배송일 조회중 오류입니다.");
	    }
		
		//2회차 배송일 조회
	    contractInsert.setDeliverySeq(2);
	    List<ContractInsert> deliveryDate2 = contractService.getDeliveryDateByDeliverySeq(contractInsert);
	    if (deliveryDate2.size() > 0) {
		    contractInsert.setDeliveryDate2(deliveryDate2.get(0).getDeliveryDate());
		    contractInsert.setDescription(deliveryDate2.get(0).getDescription());
	    } else {
	    	throw new Exception("배송일 조회중 오류입니다.");
	    }

		model.addAttribute("contractInsert", contractInsert);

		//부가정보 조회
		param.setCode("CONTRACTADDITION");
		param.setDetailCode("BTV");
		List<ProviderInformation> contractAdditionList = providerService.getProviderInformation(param);
		model.addAttribute("contractAdditionYn",contractAdditionList.size()>0?"Y":"N");
		
		//약관조회
		List<ContractInsert> terms = contractService.getProviderTerms(contractInsert);
		if (terms.size() > 0) {
			model.addAttribute("terms", terms.get(0));
		}
		
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/btv/productsale");
		return modelAndView;
	}
	
	@RequestMapping(value="/productsalesave", method=RequestMethod.POST)
	public Map saveProductSale(@ModelAttribute ContractInsert contractInsert, Model model, Principal principal) throws Exception{
		
		Map map = new HashMap();
		
		contractInsert.setProviderNumber(contractInsert.getProviderNumber());
		contractInsert.setChannelId("BTV");
		contractInsert.setAuditId("BTV");
		
		//배송주소 저장
		ContractInsert address = contractService.getAddressid(contractInsert);
		contractInsert.setAddressId(address.getAddressId());
		int addressInsertFlag = contractService.createDeliveryAddress(contractInsert);
		
		//주문고객저장
		if (contractInsert.getCustomerNumber() == 0) {
			contractInsert.setPhoneNumber(contractInsert.getDeliveryPhoneNumber());
			contractInsert.setEmail(contractInsert.getDeliveryEmail());
			contractService.insertCustomer(contractInsert);
		}
		
		//배송고객저장
		ContractInsert customerParam = new ContractInsert();
		customerParam.setProviderNumber(contractInsert.getProviderNumber());
		customerParam.setChannelId(contractInsert.getChannelId());
		customerParam.setChannelCustomerNumber(contractInsert.getChannelCustomerNumber());
		customerParam.setCustomerName(contractInsert.getDeliveryCustomerName());
		customerParam.setPhoneNumber(contractInsert.getDeliveryPhoneNumber());
		List<ContractInsert> customer = contractService.getCustomerNumber(customerParam);
		if (customer.size() > 0) {
			contractInsert.setDeliveryCustomerNumber(customer.get(0).getCustomerNumber());
			
			if (!"".equals(contractInsert.getDeliveryEmail()) && !contractInsert.getDeliveryEmail().equals(customer.get(0).getEmail())) {
				contractInsert.setEmail(contractInsert.getDeliveryEmail());
				contractService.updateCustomerEmail(contractInsert);
			}
		} else {
			contractService.insertDeliveryCustomer(contractInsert);
		}
		
		//납부정보 저장
		contractInsert.setDeliveryAddressId(contractInsert.getAddressId());	
		contractInsert.setInvoiceDeliveryType("BTV");
		int paymentInfoInsertFlag = contractService.paymentInfoInsert(contractInsert);
		
		//계약기간 조회
		contractInsert.setEffectStartDateTime(DateUtil.getDate("yyyyMMdd"));
		contractInsert.setEffectEndDateTime("99991231");
		
		//계약정보 셋팅
		if ("N".equals(contractInsert.getRecurringInvoiceYn())) {
			contractInsert.setInvoiceCycle("1");
		} else {
			ProviderInformation param = new ProviderInformation();
			param.setProviderNumber(contractInsert.getProviderNumber());
			param.setCode("BTV");
			param.setDetailCode("invoiceCycle");
			List<ProviderInformation> invoiceList = providerService.getProviderInformation(param);
			if (invoiceList.size() > 0) {
				contractInsert.setInvoiceCycle(invoiceList.get(0).getValue1());
			} else {
				contractInsert.setInvoiceCycle("1");
			}
		}	
		if (contractInsert.getDeliveryChargeAmount() == 0) {
			contractInsert.setDeliveryChargeType("FREE");
		} else {
			contractInsert.setDeliveryChargeType("PREPAYMENT");
		}
		contractInsert.setProductType("NORMAL");
		contractInsert.setTodayDeliveryYn("N");
		contractInsert.setDeliveryStartDatetime(contractInsert.getDeliveryDate1());
		contractInsert.setDeliveryTotalCount(9999);
		contractInsert.setDeliveryRemainCount(9999);

		//계약항목 셋팅
		String prePaymentYn = channelService.selectPrePaymentYn(contractInsert.getChannelId(), contractInsert.getProviderNumber());
		String payableYn = channelService.selectPayableYn(contractInsert.getChannelId(), contractInsert.getProviderNumber());
		if ("Y".equals(prePaymentYn) && "Y".equals(payableYn)) {
			contractInsert.setContractState("UNSETTLED");
			contractInsert.setDeliveryState("ORDERDONE");
		} else {
			contractInsert.setContractState("ACTIVATION");
			contractInsert.setDeliveryState("BEFORE");
		}
		
		//계약정보 저장
		int contractInsertFlag = contractService.createContract(contractInsert);
		
		//계약상품 저장
		int contractProductFlag = contractService.createContractProduct(contractInsert);
		
		//배송정보 저장
		if ("MONTH".equals(contractInsert.getDeliveryCycle())) {
			contractInsert.setDeliveryCount(12-Integer.parseInt(contractInsert.getDeliveryDate1().substring(4,6)));
		} else {
			contractInsert.setDeliveryCount(12-Integer.parseInt(contractInsert.getDeliveryDate1().substring(4,6))/2);
		}
		int cnt = contractService.insertDeliveryDetailByDeliveryDay(contractInsert);
				
		PaymentPrePayInvoiceInput paymentprepayinvoiceinput = new PaymentPrePayInvoiceInput();
		//청구 정보 생성 
		paymentprepayinvoiceinput = billingController.setBillingCalaulationByContractMulti(contractInsert.getConNumber(), model, principal);
		
		map.put("paymentprepayinvoiceinput", paymentprepayinvoiceinput);
		map.put("conNumber", contractInsert.getConNumber());
		
		return map;
	}

	@RequestMapping(value = "/contractaddition", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewContractAddition(@ModelAttribute ContractInsert contractInsert, Model model) throws Exception{
		
		ProviderInformation param = new ProviderInformation();

		//업체정보조회
		param.setProviderNumber(contractInsert.getProviderNumber());
		param.setCode("PROVIDERINFORMATION");
		param.setDetailCode("BTV");
		List<ProviderInformation> provider = providerService.getProviderInformation(param);
		if (provider.size() > 0) {
			model.addAttribute("provider",provider.get(0));
		} else {
			throw new Exception("업체정보가 없습니다.");
		}
		
		//부가정보 조회
		param.setCode("CONTRACTADDITION");
		param.setDetailCode("BTV");
		List<ProviderInformation> contractAdditionList = providerService.getProviderInformation(param);
		
		//부가정보 보기 조회
		for (int i=0; i<contractAdditionList.size(); i++) {
			if (!"".equals(contractAdditionList.get(i).getOptionValue2())) {
				List<CodeGroupDetail> codeList = codeService.finCodeGroupDetailByCodeGroupId(contractAdditionList.get(i).getOptionValue2());
				contractAdditionList.get(i).setCodeList(codeList);
			}
		}
		
		model.addAttribute("contractAdditionList",contractAdditionList);
		model.addAttribute("contractInsert", contractInsert);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/btv/contractaddition");
		return modelAndView;
	}
	
	@RequestMapping(value="/contractadditionsave", method=RequestMethod.POST)
	public void saveContractAddition(@RequestParam(value="providerNumber")int providerNumber, @RequestParam(value="conNumber")int conNumber, @RequestParam(value="additionCode")String[] additionCode, @RequestParam(value="additionValue")String[] additionValue, Model model, Principal principal) throws Exception{
		
		ContractInsert contractInsert = new ContractInsert();
		contractInsert.setProviderNumber(providerNumber);
		contractInsert.setConNumber(conNumber);
		contractInsert.setAuditId("BTV");
		
		for (int i=0; i<additionCode.length; i++) {
			contractInsert.setAdditionCode(additionCode[i]);
			contractInsert.setAdditionValue(additionValue[i]);
			contractService.insertContractAddition(contractInsert);
		}
		
		return;
	}
	
	@RequestMapping(value = "/productsaledone", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewProductSaleDone(@ModelAttribute ContractInsert contractInsert, Model model) throws Exception{
		
		//업체정보조회
		ProviderInformation param = new ProviderInformation();
		param.setProviderNumber(contractInsert.getProviderNumber());
		param.setCode("PROVIDERINFORMATION");
		param.setDetailCode("BTV");
		List<ProviderInformation> provider = providerService.getProviderInformation(param);
		if (provider.size() > 0) {
			model.addAttribute("provider",provider.get(0));
		} else {
			throw new Exception("업체정보가 없습니다.");
		}
		
		//판매완료 정보 조회
		List<ContractInsert> contractList = contractService.getContractDone(contractInsert);

		if (contractList.size() > 0) {
			model.addAttribute("contract",contractList.get(0));
		} else {
			throw new Exception("정기결제신청 내역 조회중 오류가 발생하였습니다.");
		}

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/btv/productsaledone");
		return modelAndView;
	}
	
}
