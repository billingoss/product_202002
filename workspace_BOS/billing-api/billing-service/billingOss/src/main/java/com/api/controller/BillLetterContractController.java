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

import com.api.model.ProviderInformation;
import com.api.model.billing.PaymentPrePayInvoiceInput;
import com.api.model.contract.ContractInsert;
import com.api.service.CodeService;
import com.api.service.ContractService;
import com.api.service.CounsellingService;
import com.api.service.ProviderService;
import com.api.service.UserService;
import com.api.util.DateUtil;

@RestController
@RequestMapping("billletter")
@Transactional(rollbackFor=Exception.class)
public class BillLetterContractController {

	@Autowired
	private ContractService contractService;

	@Autowired
	private ProviderService providerService;

	@Autowired
	private BillingController billingController;

	@Autowired
	UserService userService;

	@Autowired
	private CounsellingService counsellingService;
	
	@Autowired 
	CodeService codeService;

	@RequestMapping(value = "/skcctest", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewSkccTest(@ModelAttribute ContractInsert contractInsert, Model model) {
		
		contractInsert.setChannelCustomerNumber("");
		contractInsert.setProviderNumber(10000000);
		
		model.addAttribute("contractInsert", contractInsert);
		
		ContractInsert param = new ContractInsert();
		param.setProviderNumber(contractInsert.getProviderNumber());

		//판매상품조회
		List<ContractInsert> productList = contractService.getProductList(param);
		model.addAttribute("productList",productList);
		
		//이벤트팝업 조회
		ProviderInformation providerParam = new ProviderInformation();
		providerParam.setProviderNumber(contractInsert.getProviderNumber());
		providerParam.setCode("EVENTPOPUP");
		List<ProviderInformation> eventList = providerService.getProviderInformationByCode(providerParam);
		if (eventList.size() > 0) {
			model.addAttribute("eventPopup", eventList.get(0));
		} else {
			model.addAttribute("eventPopup", new ProviderInformation());
		}
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/billletter/doctornoah");
		return modelAndView;
	}

	@RequestMapping(value = "/doctornoah", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDoctornoah(@ModelAttribute ContractInsert contractInsert, Model model) {
		
		contractInsert.setChannelCustomerNumber("");
		contractInsert.setProviderNumber(10000001);
		
		model.addAttribute("contractInsert", contractInsert);
		
		ContractInsert param = new ContractInsert();
		param.setProviderNumber(contractInsert.getProviderNumber());
		
		//판매상품조회
		List<ContractInsert> productList = contractService.getProductList(param);
		model.addAttribute("productList",productList);
		
		//이벤트팝업 조회
		ProviderInformation providerParam = new ProviderInformation();
		providerParam.setProviderNumber(contractInsert.getProviderNumber());
		providerParam.setCode("EVENTPOPUP");
		List<ProviderInformation> eventList = providerService.getProviderInformationByCode(providerParam);
		if (eventList.size() > 0) {
			model.addAttribute("eventPopup", eventList.get(0));
		} else {
			model.addAttribute("eventPopup", new ProviderInformation());
		}
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/billletter/doctornoah");
		return modelAndView;
	}
	
	@RequestMapping(value = "/productsale", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewBillLetterProductSale(@ModelAttribute ContractInsert contractInsert, Model model) throws Exception {
		
		ProviderInformation param = new ProviderInformation();
		ProviderInformation provider = new ProviderInformation();
		ContractInsert discountParam = new ContractInsert();
		
		//신규신청인 경우	
		if (contractInsert.getConNumber() == 0) {
			contractInsert.setProductQuantity(1);
			int today = Integer.parseInt(DateUtil.getDate("dd"));
			if (today < 16) {
				contractInsert.setDeliveryDay("16");
			} else {
				contractInsert.setDeliveryDay("1");
			}
			contractInsert.setCouponDiscountYn("N");
		//신규신청이 아닌경우 (결제취소나 결제오류난 경우) 재 신청하기위해 계약정보 조회
		} else {
			List list = contractService.getContractDone(contractInsert);
			if (list.size() == 1) {
				contractInsert = (ContractInsert)list.get(0);
				if (!"".equals(contractInsert.getCouponNumber())) {
					contractInsert.setCouponDiscountYn("Y");
				} else {
					contractInsert.setCouponDiscountYn("N");
				}
			} else {
				throw new Exception("다시 신청하십시오.");
			}
		} 

		param.setProviderNumber(contractInsert.getProviderNumber());
		discountParam.setProviderNumber(contractInsert.getProviderNumber());
		
		model.addAttribute("contractInsert", contractInsert);
		
		//상품가격조회
		ContractInsert product = contractService.getProduct(contractInsert);
		model.addAttribute("productName", product.getProductName());
		model.addAttribute("priceAmount", product.getPriceAmount());
		model.addAttribute("productDescription", product.getProductDescription());
		model.addAttribute("ProductImageUrl", product.getProductImageUrl());
		
		//기간조회
		param.setCode("DURATION");
		param.setDetailCode("BILLLETTER");
		List<ProviderInformation> dutraionList = providerService.getProviderInformation(param);
		if (dutraionList.size() > 0) {
			model.addAttribute("duration",dutraionList.get(0).getValue1());
		} else {
			model.addAttribute("duration","6");
		}
		
		//배송업체
		param.setCode("DELIVERYCOMPANY");
		param.setDetailCode("BILLLETTER");
		List<ProviderInformation> deliveryCompanyList = providerService.getProviderInformation(param);
		if (deliveryCompanyList.size() > 0) {
			model.addAttribute("deliveryCompany",deliveryCompanyList.get(0).getValue1());
		} else {
			model.addAttribute("deliveryCompany","EZADMIN");
		}
		
		//배송주기
		param.setCode("DELIVERYCYCLE");
		param.setDetailCode("DELIVERYCYCLE");
		List<ProviderInformation> deliveryCycleList = providerService.getProviderInformation(param);
		if (deliveryCycleList.size() > 0) {
			model.addAttribute("deliveryCycle",deliveryCycleList.get(0).getValue1());
		} else {
			model.addAttribute("deliveryCycle","OTHERMONTH");
		}

		//배송횟수
		param.setCode("DELIVERYTIMES");
		param.setDetailCode("DELIVERYTIMES");
		List<ProviderInformation> deliveryTimesList = providerService.getProviderInformation(param);
		if (deliveryTimesList.size() > 0) {
			model.addAttribute("deliveryTimes",deliveryTimesList.get(0).getValue1());
		} else {
			model.addAttribute("deliveryTimes","1");
		}
		
		//배송일
		param.setCode("DELIVERYDAY");
		param.setDetailCode("DELIVERYDAY");
		List<ProviderInformation> deliveryDayList = providerService.getProviderInformation(param);
		if (deliveryDayList.size() == 0) {
			for (int i=1; i<=31; i++) {
				provider = new ProviderInformation();
				provider.setValue1(String.valueOf(i));
				provider.setDescription(String.valueOf(i)+"일");
				deliveryDayList.add(provider);
			}
		}
		model.addAttribute("deliveryDayList",deliveryDayList);
		
		//할인율조회
		List<ContractInsert> discountList = contractService.getDiscountList(discountParam);

		String couponDiscountFlag = "";
		String discountFlag = "";
		
		for (int i=0; i<discountList.size(); i++) {
			if ("COUPON".equals(discountList.get(i).getDiscountType2()) && !"Y".equals(couponDiscountFlag)) {
				model.addAttribute("couponDiscount", discountList.get(i));
				couponDiscountFlag = "Y";
			} else if (!"Y".equals(discountFlag)) {
				model.addAttribute("discount",discountList.get(i));
				discountFlag = "Y";
			}
		}
		if (!"Y".equals(discountFlag)) {
			model.addAttribute("discount", new ContractInsert());
		}
		if (!"Y".equals(couponDiscountFlag)) {
			model.addAttribute("couponDiscount", new ContractInsert());
		}
	
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/billletter/productsale");
		return modelAndView;
	}
	
	@RequestMapping(value = "/couponcheck", method = RequestMethod.GET)
	public Map<String,String> couponCheck(@ModelAttribute ContractInsert contractInsert, Model model) {
		
		Map<String,String> map = new HashMap<String,String>();
		
		//할인율조회
		List<ContractInsert> discountList = contractService.getDiscountList(contractInsert);
		
		if (discountList.size() > 0) {
			
			int couponLength = discountList.get(0).getDiscountType2Value().length();
			int couponNumberLength = contractInsert.getCouponNumber().length();
			
			if (couponLength <= couponNumberLength) {
				if (discountList.get(0).getDiscountType2Value().equals(contractInsert.getCouponNumber().substring(0,couponLength))) {
					map.put("couponDiscountYn", "Y");
				} else {
					map.put("couponDiscountYn", "N");
				}
			} else {
				map.put("couponDiscountYn", "N");
			}
		} else {
			map.put("couponDiscountYn", "N");
		}
		
		return map;
	}
	
	@RequestMapping(value="/productsalesave", method=RequestMethod.POST)
	 public Map createContractBillLetter(@ModelAttribute ContractInsert contractInsert, Model model, Principal principal) {
		
		Map map = new HashMap();
		
		contractInsert.setProviderNumber(contractInsert.getProviderNumber());
		contractInsert.setChannelId("BILLLETTER");
		contractInsert.setAuditId("BILLLETTER");
		
		//배송주소 저장
		ContractInsert address = contractService.getAddressid(contractInsert);
		contractInsert.setAddressId(address.getAddressId());
		int addressInsertFlag = contractService.createDeliveryAddress(contractInsert);
		
		//고객저장
		List<ContractInsert> customer = contractService.getCustomerNumber(contractInsert);
		if (customer.size() > 0) {
			if (!customer.get(0).getCustomerName().equals(contractInsert.getDeliveryCustomerName()) || !customer.get(0).getPhoneNumber().equals(contractInsert.getDeliveryPhoneNumber())) {
				contractService.insertCustomer(contractInsert);
			} else {
				contractInsert.setCustomerNumber(customer.get(0).getCustomerNumber());
			}
		} else {
			contractService.insertCustomer(contractInsert);
		}
		contractInsert.setDeliveryCustomerNumber(contractInsert.getCustomerNumber());
		
		/* 빌레터 주문고객/배송고객 동일하게 수정함.
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
		*/
		
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
		
		//할인정보 저장
		if (contractInsert.getDiscountValue() > 0) {
			contractService.createContractDiscount(contractInsert);
		}
		if (contractInsert.getCouponDiscountValue() > 0) {
			contractInsert.setDiscountId(contractInsert.getCouponDiscountId());
			contractInsert.setDiscountType(contractInsert.getCouponDiscountType());
			contractInsert.setDiscountValue(contractInsert.getCouponDiscountValue());
			contractInsert.setDiscountOrder(contractInsert.getCouponDiscountOrder());
			contractService.createContractDiscount(contractInsert);
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
		modelAndView.setViewName("mobile/billletter/productsaledone");
		return modelAndView;
	}
	
	@RequestMapping(value = "/productsalelist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewBillLetterProductSaleList(@ModelAttribute ContractInsert contractInsert, Model model) {
		
		model.addAttribute("contractInsert", contractInsert);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/billletter/productsalelist");
		return modelAndView;
	}
	
	@RequestMapping(value = "/productsaledetail", method = RequestMethod.GET)
	public ModelAndView ViewBillLetterProductSaleDetail(@ModelAttribute ContractInsert contractInsert, Model model) throws Exception {
		
		ModelAndView modelAndView = new ModelAndView();

		model.addAttribute("contractInsert", contractInsert);

		//고객의 주문리스트 조회
		List<ContractInsert> contractList = contractService.getContractList(contractInsert);
		
		for (int i=0; i<contractList.size(); i++) {
			
			//주문의 배송리스트 조회
			List<ContractInsert> deliveryList = contractService.getDeliveryList(contractList.get(i));
			
			//주문의 청구리스트 조회
			List<ContractInsert> invoiceList = contractService.getInvoiceList(contractList.get(i));
			
			contractList.get(i).setDeliveryList(deliveryList);
			contractList.get(i).setInvoiceList(invoiceList);
		}
		
		model.addAttribute("contractList", contractList);
		
		//메인페이지 URL 조회
		ProviderInformation param = new ProviderInformation();
		param.setProviderNumber(contractInsert.getProviderNumber());
		param.setCode("SALEMAINPAGE");
		param.setDetailCode("BILLLETTER");
		List<ProviderInformation> urlList = providerService.getProviderInformation(param);
		if (urlList.size() > 0) {
			model.addAttribute("mainUrl",urlList.get(0).getValue1());
		} else {
			throw new Exception("메인페이지 url 조회중 오류가 발생하였습니다.");
		}
		
		modelAndView.setViewName("mobile/billletter/productsaledetail");
		return modelAndView;
	}
	
	@RequestMapping(value = "/getproductsaledetail", method = RequestMethod.GET)
	public Map getBillLetterProductSaleDetailList(@ModelAttribute ContractInsert contractInsert, Model model) {
		
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
	
	/*
	@RequestMapping(value = "/counselling", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCounselling(@ModelAttribute Counselling counselling, Model model) {
		
		model.addAttribute("counselling", counselling);
		
		List<CodeGroupDetail> categoryList = codeService.finCodeGroupDetailByCodeGroupId("CATEGORY");
		model.addAttribute("categoryList",categoryList);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/billletter/counselling");
		return modelAndView;
	}
	
	@RequestMapping(value="/consellingsave", method=RequestMethod.POST)
	public Map<String,Object> insertCounselling(@ModelAttribute Counselling counselling, Model model, Principal principal) {
		
		Map<String,Object> map = new HashMap<String,Object>();

		counselling.setProviderNumber(10000001);
		counselling.setAuditId("BILLLETTER");
		
		//고객조회
		ContractInsert contract = new ContractInsert();
		contract.setProviderNumber(10000001);
		contract.setChannelId("BILLLETTER");
		contract.setChannelCustomerNumber(counselling.getChannelCustomerNumber());
		contract.setCustomerName(counselling.getCustomerName());
		contract.setPhoneNumber(counselling.getPhoneNumber());
		List<ContractInsert> customer = contractService.getCustomerNumber(contract);
		
		//상담등록
		if (customer.size() == 1) {
			counselling.setCustomerNumber(customer.get(0).getCustomerNumber());
			counselling.setState("PROGRESS");
			counselling.setInboundPath("APP");
			counselling.setAnswer("");
			counsellingService.insertCounselling(counselling);
		} else {
			counselling.setCustomerNumber(0);
		}
		
		map.put("counselling", counselling);
		return map;
	}
	
	@RequestMapping(value = "/counsellinglist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCounsellingList(@ModelAttribute Counselling counselling, Model model) {
		
		model.addAttribute("counselling", counselling);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/billletter/counsellinglist");
		return modelAndView;
	}
	
	@RequestMapping(value = "/getcounsellinglist", method = RequestMethod.GET)
	public Map<String,Object> getCounsellingList(@ModelAttribute Counselling counselling, Model model) {
		
		Map<String,Object> map = new HashMap<String,Object>();
		
		//고객조회
		ContractInsert contract = new ContractInsert();
		contract.setProviderNumber(10000001);
		contract.setChannelId("BILLLETTER");
		contract.setChannelCustomerNumber(counselling.getChannelCustomerNumber());
		contract.setCustomerName(counselling.getCustomerName());
		contract.setPhoneNumber(counselling.getPhoneNumber());
		List<ContractInsert> customer = contractService.getCustomerNumber(contract);
		
		//상담조회
		List<Counselling> counsellingList = new ArrayList<Counselling>();
		if (customer.size() == 1) {
			System.out.println(customer.get(0).getCustomerNumber());
			counselling.setCustomerNumber(customer.get(0).getCustomerNumber());
			counsellingList = counsellingService.getCounsellingListByCustomerNumber(counselling);
		} else {
			counselling.setCustomerNumber(0);
		}
		
		map.put("counsellingList",counsellingList);
		map.put("counselling",counselling);
		
		return map;
	}
	*/
}
