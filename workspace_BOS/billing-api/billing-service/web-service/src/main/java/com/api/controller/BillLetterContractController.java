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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.api.billing.invoice.model.PaymentPrePayInvoiceInput;
import com.api.billing.model.contract.ContractInsert;
import com.api.billing.model.order.Order;
import com.api.service.ContractService;
import com.api.service.OrderService;
import com.api.service.UserService;

@RestController
@RequestMapping("billletter")
@Transactional(rollbackFor=Exception.class)
public class BillLetterContractController {

	@Autowired
	private ContractService contractService;

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private BillingController billingController;

	@Autowired
	UserService userService;

	@RequestMapping(value = "/doctornoah", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDoctornoah(@ModelAttribute ContractInsert contractInsert, Model model) throws Exception {
		
		model.addAttribute("contractInsert", contractInsert);
		
		Order param = new Order();
		param.setProvidernumber(10000001);
		
		//판매상품조회
		param.setCode("SALEPRODUCT");
		param.setDetailcode("BILLLETTER");
		List<Order> productList = orderService.getProviderInformation(param);
		if (productList.size() > 0) {
			model.addAttribute("productList",productList);
		}
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("front/billletter/doctornoah");
		return modelAndView;
	}
	
	@RequestMapping(value = "/productsale", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewBillLetterProductSale(@ModelAttribute ContractInsert contractInsert, Model model) throws Exception {
		
		model.addAttribute("contractInsert", contractInsert);
		
		Order param = new Order();
		Order order = new Order();
		
		param.setProvidernumber(10000001);
		
		//contractInsert.setCustomerName(URLDecoder.decode(contractInsert.getCustomerName(), "UTF-8"));
		//contractInsert.setPhoneNumber(URLDecoder.decode(contractInsert.getPhoneNumber(), "UTF-8"));
		
		//상품가격조회
		ContractInsert product = contractService.getProduct(contractInsert);
		model.addAttribute("productName", product.getProductName());
		model.addAttribute("priceAmount", product.getPriceAmount());

		//배송업체
		param.setCode("DELIVERYCOMPANY");
		param.setDetailcode("DELIVERYCOMPANY");
		List<Order> deliveryCompanyList = orderService.getProviderInformation(param);
		if (deliveryCompanyList.size() > 0) {
			model.addAttribute("deliveryCompany",deliveryCompanyList.get(0).getValue1());
		} else {
			model.addAttribute("deliveryCompany","POSTOFFICE");
		}
		
		//배송주기
		param.setCode("DELIVERYCYCLE");
		param.setDetailcode("DELIVERYCYCLE");
		List<Order> deliveryCycleList = orderService.getProviderInformation(param);
		if (deliveryCycleList.size() > 0) {
			model.addAttribute("deliveryCycle",deliveryCycleList.get(0).getValue1());
		} else {
			model.addAttribute("deliveryCycle","OTHERMONTH");
		}

		//배송횟수
		param.setCode("DELIVERYTIMES");
		param.setDetailcode("DELIVERYTIMES");
		List<Order> deliveryTimesList = orderService.getProviderInformation(param);
		if (deliveryTimesList.size() > 0) {
			model.addAttribute("deliveryTimes",deliveryTimesList.get(0).getValue1());
		} else {
			model.addAttribute("deliveryTimes","1");
		}
		
		//배송일
		param.setCode("DELIVERYDAY");
		param.setDetailcode("DELIVERYDAY");
		List<Order> deliveryDayList = orderService.getProviderInformation(param);
		if (deliveryDayList.size() == 0) {
			for (int i=1; i<=31; i++) {
				order = new Order();
				order.setValue1(String.valueOf(i));
				order.setDescription(String.valueOf(i)+"일");
				deliveryDayList.add(order);
			}
		}
		model.addAttribute("deliveryDayList",deliveryDayList);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("front/billletter/productsale");
		return modelAndView;
	}

	@RequestMapping(value="/productsalesave", method=RequestMethod.POST)
	 public Map createContractBillLetter(@ModelAttribute ContractInsert contractInsert, Model model, Principal principal) {
		
		Map map = new HashMap();
		
		contractInsert.setProvidernumber(10000001);
		contractInsert.setChannelId("BILLLETTER");
		contractInsert.setAuditId("BILLLETTER");
		
		//배송주소 저장
		ContractInsert address = contractService.getAddressid(contractInsert);
		contractInsert.setAddressId(address.getAddressId());
		int addressInsertFlag = contractService.createDeliveryAddress(contractInsert);
		
		//고객저장
		List<ContractInsert> customer = contractService.getCustomerNumber(contractInsert);
		if (customer.size() > 0) {
			contractInsert.setCustomerNumber(customer.get(0).getCustomerNumber());
		} else {
			contractService.insertCustomer(contractInsert);
		}
		int customerNumber = contractInsert.getCustomerNumber();
		
		//배송고객저장
		int deliveryCustomerNumber = customerNumber;
		if (customer.size() > 0) {
			if (!customer.get(0).getCustomerName().equals(contractInsert.getDeliveryCustomerName()) || !customer.get(0).getPhoneNumber().equals(contractInsert.getDeliveryPhoneNumber())) {
				contractService.insertDeliveryCustomer(contractInsert);
				deliveryCustomerNumber = contractInsert.getCustomerNumber();
			}
		}
		contractInsert.setCustomerNumber(customerNumber);
		contractInsert.setDeliveryCustomerNumber(deliveryCustomerNumber);
		
		//납부정보 저장
		contractInsert.setDeliveryAddressId(contractInsert.getAddressId());	
		contractInsert.setInvoiceDeliveryType("BILLLETTER");
		int paymentInfoInsertFlag = contractService.paymentInfoInsert(contractInsert);
		
		//계약기간 조회
		ContractInsert effectDate = contractService.getDeliveryDate(contractInsert);
		contractInsert.setEffectStartDateTime(effectDate.getEffectStartDateTime());
		contractInsert.setEffectEndDateTime(effectDate.getEffectEndDateTime());
		
		//계약정보 셋팅
		contractInsert.setInvoiceCycle("MONTH");
		if ("0".equals(contractInsert.getDeliveryCost())) {
			contractInsert.setDeliveryChargeType("FREE");
		} else {
			contractInsert.setDeliveryChargeType("PREPAYMENT");
		}
		contractInsert.setProductType("NORMAL");
		contractInsert.setTodayDeliveryYn("N");

		//배송생성
		ContractInsert deliveryContract;
		
		if ("OTHERMONTH".equals(contractInsert.getDeliveryCycle()) || "MONTH".equals(contractInsert.getDeliveryCycle())) {
			if ("OTHERMONTH".equals(contractInsert.getDeliveryCycle())) {
				contractInsert.setDeliveryMonth("2");
				contractInsert.setDeliveryTotalCount(contractInsert.getDuration()/2*contractInsert.getDeliveryTimes());
				contractInsert.setDeliveryRemainCount(contractInsert.getDeliveryTotalCount());
			} else {
				contractInsert.setDeliveryMonth("1");
				contractInsert.setDeliveryTotalCount(contractInsert.getDuration()*contractInsert.getDeliveryTimes());
				contractInsert.setDeliveryRemainCount(contractInsert.getDeliveryTotalCount());
			}
			
			if (contractInsert.getDeliveryTimes() == 1) {
				
				//배송일 조회
				deliveryContract = contractService.getDeliveryDate1(contractInsert);
				contractInsert.setDeliveryDate(deliveryContract.getDeliveryDate());
				contractInsert.setDeliveryCount(contractInsert.getDuration());

				//배송횟수 조회
				deliveryContract = contractService.getDeliveryCount1(contractInsert);
				contractInsert.setDeliveryStartDatetime(deliveryContract.getDeliveryStartDatetime());

				//계약정보 저장
				int contractInsertFlag = contractService.createContract(contractInsert);
				
				//계약상품 저장
				int contractProductFlag = contractService.createContractProduct(contractInsert);
				
				//배송정보 저장
				int cnt = contractService.insertDeliveryDetail1(contractInsert);
				
			} else if (contractInsert.getDeliveryTimes() == 2) {
				
				//배송일 조회
				contractInsert.setDeliveryDay1(contractInsert.getDeliveryDay().split("/")[0]);
				contractInsert.setDeliveryDay2(contractInsert.getDeliveryDay().split("/")[1]);
				deliveryContract = contractService.getDeliveryDate2(contractInsert);

				contractInsert.setDeliveryDate1(deliveryContract.getDeliveryDate1());
				contractInsert.setDeliveryDate2(deliveryContract.getDeliveryDate2());
				contractInsert.setDeliveryCount(contractInsert.getDuration());
				
				//배송횟수 조회
				deliveryContract = contractService.getDeliveryCount2(contractInsert);
				contractInsert.setDeliveryStartDatetime(deliveryContract.getDeliveryStartDatetime());

				//계약정보 저장
				int contractInsertFlag = contractService.createContract(contractInsert);
				
				//계약상품 저장
				int contractProductFlag = contractService.createContractProduct(contractInsert);
				
				//배송정보 저장
				int cnt = contractService.insertDeliveryDetail2(contractInsert);
				
			} 
		} else if ("WEEK".equals(contractInsert.getDeliveryCycle())) {

			contractInsert.setDeliveryTotalCount(contractInsert.getDuration()*4*contractInsert.getDeliveryTimes());
			contractInsert.setDeliveryRemainCount(contractInsert.getDeliveryTotalCount());
			
			if (contractInsert.getDeliveryTimes() == 1) {
				
				//배송일 조회
				deliveryContract = contractService.getDeliveryDateWeek1(contractInsert);
				contractInsert.setDeliveryDate(deliveryContract.getDeliveryDate());
				contractInsert.setDeliveryCount(contractInsert.getDuration()*5);

				//배송횟수 조회
				deliveryContract = contractService.getDeliveryWeekCount1(contractInsert);
				contractInsert.setDeliveryStartDatetime(deliveryContract.getDeliveryStartDatetime());
				contractInsert.setDeliveryTotalCount(deliveryContract.getDeliveryTotalCount());
				contractInsert.setDeliveryRemainCount(contractInsert.getDeliveryTotalCount());

				//계약정보 저장
				int contractInsertFlag = contractService.createContract(contractInsert);
				
				//계약상품 저장
				int contractProductFlag = contractService.createContractProduct(contractInsert);
				
				//배송정보 저장
				int cnt = contractService.insertDeliveryDetailWeek1(contractInsert);

			} else if (contractInsert.getDeliveryTimes() == 2) {
				
				//배송일 조회
				contractInsert.setDeliveryDay1(contractInsert.getDeliveryDay().split("/")[0]);
				contractInsert.setDeliveryDay2(contractInsert.getDeliveryDay().split("/")[1]);
				deliveryContract = contractService.getDeliveryDateWeek2(contractInsert);
				
				contractInsert.setDeliveryDate1(deliveryContract.getDeliveryDate1());
				contractInsert.setDeliveryDate2(deliveryContract.getDeliveryDate2());
				contractInsert.setDeliveryCount(contractInsert.getDuration()*5);

				//배송횟수 조회
				deliveryContract = contractService.getDeliveryWeekCount2(contractInsert);
				contractInsert.setDeliveryStartDatetime(deliveryContract.getDeliveryStartDatetime());
				contractInsert.setDeliveryTotalCount(deliveryContract.getDeliveryTotalCount());
				contractInsert.setDeliveryRemainCount(contractInsert.getDeliveryTotalCount());

				//계약정보 저장
				int contractInsertFlag = contractService.createContract(contractInsert);
				
				//계약상품 저장
				int contractProductFlag = contractService.createContractProduct(contractInsert);
				
				//배송정보 저장
				int cnt = contractService.insertDeliveryDetailWeek2(contractInsert);
			} 
		}
		
		PaymentPrePayInvoiceInput paymentprepayinvoiceinput = new PaymentPrePayInvoiceInput();
		//청구 정보 생성 
		paymentprepayinvoiceinput = billingController.setBillingCalaulationByContract(contractInsert.getConNumber(), model, principal);
		
		map.put("paymentprepayinvoiceinput", paymentprepayinvoiceinput);
		map.put("conNumber", contractInsert.getConNumber());
		
		return map;
	}
	
	@RequestMapping(value = "/productsaledone", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewBillLetterProductSaleDone(@ModelAttribute ContractInsert contractInsert, Model model) {
		
		//판매완료 정보 조회
		List<ContractInsert> contractList = contractService.getContractDone(contractInsert);

		model.addAttribute("contractList",contractList);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("front/billletter/productsaledone");
		return modelAndView;
	}

	@RequestMapping(value = "/productsalelist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewBillLetterProductSaleList(@ModelAttribute ContractInsert contractInsert, Model model) {
		
		//고객의 주문리스트 조회
		List<ContractInsert> contractList = contractService.getContractList(contractInsert);

		model.addAttribute("contractList",contractList);
		model.addAttribute("contractInsert", contractInsert);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("front/billletter/productsalelist");
		return modelAndView;
	}

	@RequestMapping(value = "/productsaledetail", method = RequestMethod.GET)
	public Map viewBillLetterProductSaleDetailList(@ModelAttribute ContractInsert contractInsert, Model model) {
		
		Map map = new HashMap();
		
		//주문의 배송리스트 조회
		List<ContractInsert> deliveryList = contractService.getDeliveryList(contractInsert);
		
		//주문의 청구리스트 조회
		List<ContractInsert> invoiceList = contractService.getInvoiceList(contractInsert);

		map.put("deliveryList",deliveryList);
		map.put("invoiceList",invoiceList);
		map.put("contractInsert", contractInsert);
		
		return map;
	}
}
