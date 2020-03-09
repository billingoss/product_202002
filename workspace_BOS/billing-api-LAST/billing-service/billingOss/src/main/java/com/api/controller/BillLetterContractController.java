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
import com.api.service.ChannelService;
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
	
	@Autowired
	ChannelService channelService;

	@RequestMapping(value = "/skcctest", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewSkccTest(@ModelAttribute ContractInsert contractInsert, Model model) {
		
		contractInsert.setChannelCustomerNumber("");
		contractInsert.setProviderNumber(10000000);
		
		model = doctornoahMain(contractInsert, model);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/billletter/doctornoah");
		return modelAndView;
	}

	@RequestMapping(value = "/doctornoah", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDoctornoah(@ModelAttribute ContractInsert contractInsert, Model model) {
		
		contractInsert.setChannelCustomerNumber("");
		contractInsert.setProviderNumber(10000001);
		
		model = doctornoahMain(contractInsert, model);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/billletter/doctornoah");
		return modelAndView;
	}
	
	private Model doctornoahMain(@ModelAttribute ContractInsert contractInsert, Model model) {

		model.addAttribute("contractInsert", contractInsert);
		
		ContractInsert param = new ContractInsert();
		param.setProviderNumber(contractInsert.getProviderNumber());
		param.setChannelId("BILLLETTER");
		
		//정기배송 판매상품 그룹 조회
		param.setProductGroupCode("SALEPRODUCTGROUP");
		List<ContractInsert> groupList = contractService.getProductList(param);
		model.addAttribute("groupList", groupList);
		
		//단품 판매상품 그룹 조회
		param.setProductGroupCode("SALEPRODUCTGROUPSINGLE");
		List<ContractInsert> groupSingleList = contractService.getProductList(param);
		model.addAttribute("groupSingleList", groupSingleList);
		
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
		
		return model;
	}
	
	@RequestMapping(value = "/productsalegroup", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewBillLetterProductSaleByGroup(@ModelAttribute ContractInsert contractInsert, Model model) throws Exception {
		
		model.addAttribute("contractInsert", contractInsert);

		//상품그룹이미지 조회
		ProviderInformation param = new ProviderInformation();
		param.setProviderNumber(contractInsert.getProviderNumber());
		param.setCode(contractInsert.getProductGroupCode());
		param.setDetailCode("BILLLETTER");
		param.setValue1(contractInsert.getProductGroupId());
		List<ProviderInformation> productGroupList = providerService.getProviderInformationByValue(param);
		if (productGroupList.size() > 0) {
			model.addAttribute("productGroup", productGroupList.get(0));
		} else {
			throw new Exception("판매가능한 상품이 없습니다.");
		}
		
		//상품그룹 배송비부과여부, 각인여부 조회
		param.setCode("SALEPRODUCTGROUPINFO");
		param.setDetailCode("BILLLETTER");
		param.setValue1(contractInsert.getProductGroupId());
		List<ProviderInformation> productGroupInfoList = providerService.getProviderInformationByValue(param);
		if (productGroupInfoList.size() > 0) {
			model.addAttribute("productGroupInfo", productGroupInfoList.get(0));
		} else {
			throw new Exception("판매가능한 상품이 없습니다.");
		}

		//상품조회
		contractInsert.setChannelId("BILLLETTER");
		List<ContractInsert> productList = contractService.getProductListByGroup(contractInsert);
		model.addAttribute("productList", productList);
		
		//배송비 조회
		List<ContractInsert> deliveryChargeAmountList = contractService.getDeliveryChargeAmount(contractInsert);
		if (deliveryChargeAmountList.size() > 0) {
			model.addAttribute("deliveryChargeAmount", deliveryChargeAmountList.get(0).getDeliveryChargeAmount());
		} else {
			model.addAttribute("deliveryChargeAmount", 0);
		}
		
		//배송비 할인조건 조회
		param.setCode("DELIVERYCHARGEFREE");
		param.setDetailCode("BILLLETTER");
		param.setValue1("PRICEAMOUNT");
		List<ProviderInformation> deliveryChargeFree = providerService.getProviderInformationByValue(param);
		if (deliveryChargeFree.size() > 0) {
			model.addAttribute("deliveryChargeFreeAmount", Integer.parseInt(deliveryChargeFree.get(0).getValue2()));
		} else {
			model.addAttribute("deliveryChargeFreeAmount", "");
		}
		
		if (productList.size() > 1) {
			ModelAndView modelAndView = new ModelAndView();
			modelAndView.setViewName("mobile/billletter/productlist");
			return modelAndView;
		} else if (productList.size() == 1) {
			contractInsert.setProductId(productList.get(0).getProductId());
			ModelAndView modelAndView = viewBillLetterProductSale(contractInsert, model);
			return modelAndView;
		} else {
			throw new Exception("판매가능한 상품이 없습니다.");
		}
	}

	@RequestMapping(value = "/productsale", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewBillLetterProductSale(@ModelAttribute ContractInsert contractInsert, Model model) throws Exception {
		
		ProviderInformation param = new ProviderInformation();
		ProviderInformation provider = new ProviderInformation();
		contractInsert.setChannelId("BILLLETTER");

		int today = Integer.parseInt(DateUtil.getDate("dd"));

		//신규신청인 경우	
		if (contractInsert.getConNumber() == 0) {
			contractInsert.setProductQuantity(1);
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
			
			if ("".equals(contractInsert.getDeliveryDay())) {
				if (today < 16) {
					contractInsert.setDeliveryDay("16");
				} else {
					contractInsert.setDeliveryDay("1");
				}
			}	
		} 

		param.setProviderNumber(contractInsert.getProviderNumber());
		
		//상품가격조회
		List<ContractInsert> productList = contractService.getProduct(contractInsert);
		if (productList.size() == 0) {
			throw new Exception("판매가능한 상품이 없습니다.");
		} else {
			model.addAttribute("productName", productList.get(0).getProductName());
			model.addAttribute("priceAmount", productList.get(0).getPriceAmount());
			model.addAttribute("productDescription", productList.get(0).getProductDescription());
			model.addAttribute("ProductImageUrl", productList.get(0).getProductImageUrl());
			model.addAttribute("optionYn", productList.get(0).getOptionYn());
		}
		
		//기간조회
		List<ProviderInformation> durationList;
		param.setCode("DURATION");
		param.setDetailCode("BILLLETTER");
		
		if (productList.get(0).getDuration() == 0) {
			durationList = providerService.getProviderInformation(param);
		} else {
			param.setValue1(String.valueOf(productList.get(0).getDuration()));
			durationList = providerService.getProviderInformationByValue(param);
		}
		if (durationList.size() > 0) {
			model.addAttribute("durationList",durationList);
			//신규신청인 경우	
			if (contractInsert.getConNumber() == 0) {
				contractInsert.setDuration(Integer.parseInt(durationList.get(0).getValue1()));
			}
		} else {
			throw new Exception("기간 조회중 오류입니다. 다시 신청하십시오.");
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
		
		//할인조회
		ContractInsert discountParam = new ContractInsert();
		discountParam.setProviderNumber(contractInsert.getProviderNumber());
		discountParam.setChannelId("BILLLETTER");
		discountParam.setProductId(contractInsert.getProductId());
		List<ContractInsert> discountList = contractService.getDiscountList(discountParam);
		model.addAttribute("discountList", discountList);
		if (discountList.size() > 0) {
			model.addAttribute("couponDiscountExistsYn", discountList.get(0).getCouponDiscountYn());
		}
		
		//배송비 적용 기준 조회
		param.setCode("DELIVERYCHARGEFREE");
		param.setDetailCode("BILLLETTER");
		List<ProviderInformation> deliveryChargeList = providerService.getProviderInformation(param);
		model.addAttribute("deliveryChargeList",deliveryChargeList);
		
		//배송비 조회
		List<ContractInsert> deliveryChargeAmountList = contractService.getDeliveryChargeAmount(contractInsert);
		if (deliveryChargeAmountList.size() > 0) {
			model.addAttribute("deliveryCharge", deliveryChargeAmountList.get(0).getDeliveryChargeAmount());
		} else {
			model.addAttribute("deliveryCharge", 0);
		}
		
		model.addAttribute("contractInsert", contractInsert);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("mobile/billletter/productsale");
		
		return modelAndView;
	}
	
	@RequestMapping(value = "/couponcheck", method = RequestMethod.GET)
	public Map<String,String> couponCheck(@ModelAttribute ContractInsert contractInsert, Model model) {
		
		Map<String,String> map = new HashMap<String,String>();
		
		ProviderInformation param = new ProviderInformation();
		param.setProviderNumber(contractInsert.getProviderNumber());
		param.setCode("COUPON");
		param.setDetailCode("BILLLETTER");
		List<ProviderInformation> couponList = providerService.getProviderInformation(param);
		
		if (couponList.size() > 0) {
			
			int couponLength = couponList.get(0).getValue2().length();
			int couponNumberLength = contractInsert.getCouponNumber().length();
			
			if (couponLength <= couponNumberLength) {
				if (couponList.get(0).getValue2().toUpperCase().equals(contractInsert.getCouponNumber().substring(0,couponLength).toUpperCase())) {
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
	 public Map createContractBillLetter(@ModelAttribute ContractInsert contractInsert, Model model, Principal principal) throws Exception{
		
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
		if ("N".equals(contractInsert.getRecurringInvoiceYn())) {
			contractInsert.setInvoiceCycle("1");
		} else {
			ProviderInformation param = new ProviderInformation();
			param.setProviderNumber(contractInsert.getProviderNumber());
			param.setCode("BILLING");
			param.setDetailCode("invoiceCycle");
			List<ProviderInformation> invoiceList = providerService.getProviderInformation(param);
			if (invoiceList.size() > 0) {
				contractInsert.setInvoiceCycle(invoiceList.get(0).getValue1());
			} else {
				throw new Exception("결제주기 조회중 오류입니다.");
			}
		}	
		if (contractInsert.getDeliveryChargeAmount() == 0) {
			contractInsert.setDeliveryChargeType("FREE");
		} else {
			contractInsert.setDeliveryChargeType("PREPAYMENT");
		}
		contractInsert.setProductType("NORMAL");
		contractInsert.setTodayDeliveryYn("N");

		//계약상태 셋팅
		String prePaymentYn = channelService.selectPrePaymentYn(contractInsert.getChannelId(), contractInsert.getProviderNumber());
		String payableYn = channelService.selectPayableYn(contractInsert.getChannelId(), contractInsert.getProviderNumber());
		if ("Y".equals(prePaymentYn) && "Y".equals(payableYn)) {
			contractInsert.setContractState("UNSETTLED");
			contractInsert.setDeliveryState("ORDERDONE");
		} else {
			contractInsert.setContractState("ACTIVATION");
			contractInsert.setDeliveryState("BEFORE");
		}
		
		//배송생성
		ContractInsert deliveryContract;
		
		//단일배송
		if ("N".equals(contractInsert.getRecurringDeliveryYn())) {
			contractInsert.setDeliveryStartDatetime(contractInsert.getEffectStartDateTime());
			contractInsert.setDeliveryTotalCount(1);
			contractInsert.setDeliveryRemainCount(1);
			
		    //계약정보 저장
			int contractInsertFlag = contractService.createContract(contractInsert);
			
			//계약상품 저장
			int contractProductFlag = contractService.createContractProduct(contractInsert);
			
			//배송정보 저장
			int cnt = contractService.insertDeliveryDetail(contractInsert);
		//정기배송	
		} else {
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
		}	
		
		if (contractInsert.getDiscountIdList() != null) {
			//할인정보 저장
			for (int i=0; i<contractInsert.getDiscountIdList().length; i++) {
				if (Integer.parseInt(contractInsert.getDiscountValueList()[i]) > 0 ) {
					contractInsert.setDiscountId(contractInsert.getDiscountIdList()[i]);
					contractInsert.setDiscountType(contractInsert.getDiscountTypeList()[i]);
					contractInsert.setDiscountValue(Integer.parseInt(contractInsert.getDiscountValueList()[i]));
					contractInsert.setDiscountOrder(Integer.parseInt(contractInsert.getDiscountOrderList()[i]));
					contractService.createContractDiscount(contractInsert);
				}
			}
		}
		
		PaymentPrePayInvoiceInput paymentprepayinvoiceinput = new PaymentPrePayInvoiceInput();
		//청구 정보 생성 
		paymentprepayinvoiceinput = billingController.setBillingCalaulationByContractMulti(contractInsert.getConNumber(), model, principal);
		
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
		contractInsert.setChannelId("BILLLETTER");
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
