package com.api.controller;

import java.net.URLEncoder;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.api.model.Criteria;
import com.api.model.PageMaker;
import com.api.model.ProviderInformation;
import com.api.model.User;
import com.api.model.billing.ContractInfoDetail;
import com.api.model.billing.Invoice;
import com.api.model.billing.InvoiceAdjust;
import com.api.model.billing.InvoiceAdjustInput;
import com.api.model.billing.InvoiceCalculationInput;
import com.api.model.billing.InvoiceDetail;
import com.api.model.billing.InvoiceDetailInput;
import com.api.model.billing.InvoiceSearch;
import com.api.model.billing.PaymentHistory;
import com.api.model.billing.PaymentHistoryInput;
import com.api.model.billing.PaymentPrePayInvoiceInput;
import com.api.model.contract.ContractInsert;
import com.api.model.contract.ContractList;
import com.api.service.ContractListService;
import com.api.service.InvoiceService;
import com.api.service.ProviderService;
import com.api.service.UserService;
import com.api.util.DateUtil;
import com.api.util.NumberUtil;
import com.api.util.SXSSFExcelUtil;
import com.api.util.StringUtil;

/**
 * @author Administrator
 *
 */
@RestController
@RequestMapping(value = "billing")
@Transactional(rollbackFor=Exception.class)
public class BillingController {
//	
	@Autowired
	InvoiceService invoiceservice;
	
	@Autowired
	ContractListService contractListService;

	@Autowired
	private ProviderService providerService;
	
//
//	@Autowired
//	DeliveryService deliveryservice;
//	
	@Autowired 
	UserService userService;
//	
	private Logger log = LoggerFactory.getLogger(getClass());
 
	/**
	 * 계약 정보 기준 청구 내역 생성
	 * @param connumber
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/billing-calculation-contract/{connumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PaymentPrePayInvoiceInput setBillingCalaulationByContract(@PathVariable(value = "connumber") int connumber, Model model, Principal principal) {
		log.info("===================setBillingCalaulation=====================");
		log.info("connumber = " + connumber);
		
		
		//Parameter mapping : 계약 정보
		ContractInsert idi = new ContractInsert();
		idi.setConNumber(connumber);	/*계약번호*/				
		
		PaymentPrePayInvoiceInput paymentPrePayInvoiceInput = new PaymentPrePayInvoiceInput();
		int result = 0;
		
		/*
		 * Step1. 계약번호로 계약 정보를 조회 한다. 	
		 */
		idi.setContractState("UNSETTLED");//1회차 결제 전 미결 상태
		ContractInsert contInfo = this.invoiceservice.getContractAndProduct(idi);
		
		
		if (contInfo != null && !"".equals(contInfo.getConNumber())) {
			result = 1;
			//가입일자
			String subscribedatetime = contInfo.getSubscribeDateTime();			
			//서비스 시작일자 
			String effectstartdatetime = contInfo.getEffectStartDateTime();			
			//서비스 종료일자 
			String effectenddatetime = contInfo.getEffectEndDateTime();			
			//정기결제 여부
			String recurringInvoiceYn = contInfo.getRecurringInvoiceYn();

			/*******************************************************************************************************************************
			 * Step2. 계약기간 유효기간을 조회 하여 계약 시점 이후로 월단위 청구 일자 목록을 생성 한다. 
			 *******************************************************************************************************************************/
			List<Map<String, String>> dateList = this.makeInvoiceDateList(effectstartdatetime, effectenddatetime, recurringInvoiceYn, contInfo.getProviderNumber());
			
			/*******************************************************************************************************************************
			 * Step3. 청구 계산 금액을 생성한다. 
			 *******************************************************************************************************************************/
			InvoiceCalculationInput invoiceCalculationInput = new InvoiceCalculationInput();
			
			int turn= 0;
			for (Map<String, String> map : dateList) {				
				log.info("invoicedate ==> "+map.get("invoicedate"));				/*청구일자*/
				log.info("invoicedate ==> "+map.get("invoicedate"));				/*청구일자*/
				log.info(", invoicestartdate ==>"+map.get("invoicestartdate"));		/*청구시작일자*/
				log.info(", invoiceenddate ==> "+map.get("invoiceenddate"));		/*청구종료일자*/
				log.info(", totinvoiceday ==> "+map.get("totinvoiceday"));		/*총 청구일수*/
				
				//invoiceCalculationInput Parameter setting				
				invoiceCalculationInput.setProviderNumber(contInfo.getProviderNumber());
				invoiceCalculationInput.setInvoiceNumber(0);	//null 
				invoiceCalculationInput.setConNumber(contInfo.getConNumber());
				invoiceCalculationInput.setPaymentInformationNumber(contInfo.getPaymentInformationNumber());
				invoiceCalculationInput.setCustomerNumber(contInfo.getCustomerNumber());
				invoiceCalculationInput.setRevenueItemCode(contInfo.getProductId());
				invoiceCalculationInput.setInvoiceClassificationCode("000");
				invoiceCalculationInput.setInvoiceDate(map.get("invoicedate"));
				invoiceCalculationInput.setInvoiceStartDate(map.get("invoicestartdate"));
				invoiceCalculationInput.setInvoiceEndDate(map.get("invoiceenddate"));
				invoiceCalculationInput.setTotinvoiceDay(Integer.parseInt(map.get("totinvoiceday")));
				invoiceCalculationInput.setPrepayYn("N");
				
				int termMonth = 1;
				try {					
					invoiceCalculationInput.setInvoiceAplyDay(DateUtil.dateDiff("d", contInfo.getEffectStartDateTime(), map.get("invoiceenddate")));
					if ("N".equals(contInfo.getRecurringInvoiceYn())) {						
						termMonth = DateUtil.dateDiff("M", effectenddatetime, effectstartdatetime);
					}
				} catch (Exception e) {
//					log.info("날짜 형식이 맞지 않습니다."); 
					invoiceCalculationInput.setInvoiceAplyDay(0);					
				}
				
				
				//일괄결제의 경우 종료 월이 +1이 안될 경우 보정
				if (termMonth < 1) {
					termMonth = 1;
				}
				
				//Step3-1. 청구 총액 계산
				int invoiceamount = contInfo.getPriceAmount() * contInfo.getProductQuantity()* termMonth;
				
				
				//Step3-1-1. 배송비 할인 여부에 따라 배송비를 청구 총액에 적용 한다.
/*				if (!"FREE".equals(contInfo.getDeliveryChargeType())) {
					//invoiceamount = invoiceamount+(contInfo.getDeliveryChargeAmount()* termMonth);
					//배송비 항목을 insertInvoiceCalculation에 입력 한다.
					
					InvoiceCalculationInput delivaryPay = invoiceCalculationInput;
					delivaryPay.setInvoiceAmount(contInfo.getDeliveryChargeAmount());
					delivaryPay.setCollectionBalanceAmount(contInfo.getDeliveryChargeAmount());
					delivaryPay.setRevenueItemCode("999");					
					
				}
*/	
				invoiceCalculationInput.setInvoiceAmount(invoiceamount);
				invoiceCalculationInput.setCollectionBalanceAmount(invoiceamount);
				invoiceCalculationInput.setUserName(contInfo.getAuditId());
				
				//Step3-2. 청구 계산 금액  insert
				//이미 등록된 청구 내역이 있을 경우 skip
				if (this.invoiceservice.getInvoiceCount(invoiceCalculationInput) == 0) {					
					turn++;
					String invoiceTurn = turn+"/"+dateList.size();
					invoiceCalculationInput.setInvoiceTurn(invoiceTurn);
					result = result+this.invoiceservice.insertInvoiceCalculation(invoiceCalculationInput);
				}
				
				if (!"FREE".equals(contInfo.getDeliveryChargeType())) {
					//invoiceamount = invoiceamount+(contInfo.getDeliveryChargeAmount()* termMonth);
					//배송비 항목을 insertInvoiceCalculation에 입력 한다.
					
					InvoiceCalculationInput delivaryPay = invoiceCalculationInput;
					delivaryPay.setInvoiceAmount(contInfo.getDeliveryChargeAmount());
					delivaryPay.setCollectionBalanceAmount(contInfo.getDeliveryChargeAmount());
					delivaryPay.setRevenueItemCode("DELIVARY");					
					result = result+this.invoiceservice.insertInvoiceCalculation(delivaryPay);
				}

				
			}
			
			//Step3-3. 할인율 적용 금액 insert
			if (result > 0) {				
				this.insertInvoiceCalculationDiscount(invoiceCalculationInput);				
			}
			
			/*******************************************************************************************************************************
			 * Step4. 청구 상세 내역을 생성 한다. 
			 *******************************************************************************************************************************/
			if (result > 0) {				
				this.insertInvoiceDetail(invoiceCalculationInput);				
			}	
			
			/*******************************************************************************************************************************
			 * Step5. 청구 내역을 확정하고 생성  한다. 
			 *******************************************************************************************************************************/
			if (result > 0) {				
				this.insertInvoice(invoiceCalculationInput);				
			}		
			
			/*******************************************************************************************************************************
			 * Step6. 배송내역에 invoicenumber를 update 한다. 
			 *******************************************************************************************************************************/			
			if (result > 0) {				
				int deliveryCnt = this.invoiceservice.updateDeliveryDetailByInvoiceNumber(contInfo);
			}
			
			/*******************************************************************************************************************************
			 * Step7. 정기결제를 신청을 위해 1건의 청구 정보를 조회 한다.
			 *******************************************************************************************************************************/			
			//if (result> 0 && "N".equals(contInfo.getRecurringInvoiceYn())) {
			if (result> 0 ) {
				paymentPrePayInvoiceInput.setProviderNumber(contInfo.getProviderNumber());
				paymentPrePayInvoiceInput.setConNumber(contInfo.getConNumber());
				
				InvoiceCalculationInput invoiceOne = this.invoiceservice.getInvoiceNumberByOne(contInfo);
				
				paymentPrePayInvoiceInput.setInvoiceNumber(invoiceOne.getInvoiceNumber());				
				paymentPrePayInvoiceInput.setInvoiceDate(invoiceOne.getInvoiceDate());				
			}
		}
		
		return paymentPrePayInvoiceInput;
	}
	
	/**
	 * 서비스 시작일과 종료 일자를 받아 청구 기간 목록을 조회 한다.
	 * @param startDate	서비스시작일자
	 * @param endDate	서비스종료일자
	 * @param recurringInvoiceYn  정기결제 여부
	 * @return
	 */	 
	private List<Map<String, String>> makeInvoiceDateList(String startDate, String endDate, String recurringInvoiceYn, int providerNumber){
		List<Map<String, String>> dateList = new ArrayList<Map<String, String>>();
		Map tempMap ;

		ProviderInformation providerInformation = new ProviderInformation();
		providerInformation.setProviderNumber(providerNumber);
		providerInformation.setCode("BILLING");
		providerInformation.setDetailCode("invoiceCycle");
		ProviderInformation providerInfo = this.providerService.getProviderInformationOne(providerInformation);		
		
		
		int invoiceCycle = 1;
		//업체 정보에서 청주 주기를 가져 온다.
		if (providerInfo != null && !"".equals(providerInfo.getValue1())) {
			invoiceCycle = Integer.parseInt(providerInfo.getValue1());
		}
		
		try {		
			
			if("Y".equals(recurringInvoiceYn)) {
				//정기결제
				String tempStartDate = "";
				String tempEndDate = "";
				int startDay = 0;
				int endDay = 0;
				while (DateUtil.dateDiff("d",startDate, endDate)> 0) {				
					
					tempStartDate = startDate;				
					tempEndDate = DateUtil.getAddDay(DateUtil.wDate(tempStartDate, invoiceCycle),-1);
					
					//청구시작일과 청구 종료 일이 같은 경우 종료일자를 하루 전날로 설정
					/*startDay = Integer.parseInt(tempStartDate.substring(6, 8));
					endDay = Integer.parseInt(tempEndDate.substring(6, 8));				
					if (startDay == endDay) {
						tempStartDate = DateUtil.getAddDay(tempEndDate, -1);
					}*/
					
					startDate =DateUtil.wDate(tempStartDate, invoiceCycle);	//다음 청구 일자 계산
					//startDate =DateUtil.getAddDay(tempEndDate, invoiceCycle);	//다음 청구 일자 계산
					
					tempMap = new HashMap<String, String>();
					tempMap.put("invoicedate", tempStartDate);			/*청구일자*/
					tempMap.put("invoicestartdate", tempStartDate);		/*청구시작일자*/
					tempMap.put("invoiceenddate", tempEndDate);			/*청구종료일자*/
					tempMap.put("totinvoiceday", ""+DateUtil.dateDiff("d", tempStartDate, tempEndDate));			/*총청구일수*/					
					
					dateList.add(tempMap);				
				}
			}else {
				//일괄결제
				tempMap = new HashMap<String, String>();
				tempMap.put("invoicedate", DateUtil.getToday());			/*청구일자*/
				tempMap.put("invoicestartdate", startDate);					/*청구시작일자*/
				tempMap.put("invoiceenddate", endDate);					/*청구종료일자*/
				tempMap.put("totinvoiceday", ""+DateUtil.dateDiff("d", startDate, endDate));			/*총청구일수*/
				dateList.add(tempMap);				
			}
		} catch (Exception e) {
			// TODO: handle exception
			log.debug("서비스 시작일과 종료 일자를 받아 청구 기간 목록을 조회");
		}
		return dateList;
	}
	
	/**
	 * 청구 계산 내역 기준 할인금액 계산
	 * @param calfromdate
	 * @return
	 */	 
	private int insertInvoiceCalculationDiscount(InvoiceCalculationInput calfromdate) {
		   int result = 1 ;
		   //정률할인
		   result += invoiceservice.setInvoiceCalculationDiscountRate(calfromdate);
		   //정액할인
		   result += invoiceservice.setInvoiceCalculationDiscountAmount(calfromdate);
		   //result += invoiceservice.setInvoiceCalculationDiscountOneTimeFee(calfromdate);
		  /* result += invoiceservice.setInvoiceCalculationGeneralTax(calfromdate);
	   result += invoiceservice.setInvoiceCalculationDiscountTax(calfromdate); 20180911 수정*/
	   return result; 
	}
	
	/**
	 * 청구 계산 결과로 청구 상세 내역을 생성 한다.
	 * @param calfromdate
	 * @return
	 */	 
	private int insertInvoiceDetail(InvoiceCalculationInput calfromdate) {
		int result = 0 ;
		//청구 상세 내역 생성
		result += invoiceservice.setInvoiceDetail(calfromdate);
		//청구 상세 내역 청구서 번호 수청
		result += invoiceservice.updateInvoiceDetail(calfromdate);
		//청구 계산 내역 청구서 번호 수정
		result += invoiceservice.updateInvoiceCalculation(calfromdate);
		return result; 
	}
		
	/**
	 * 청구 내역을 확정하여 생성 한다.
	 * @param calfromdate
	 * @return
	 */
	 
	private int insertInvoice(InvoiceCalculationInput calfromdate) {
		int result = 0 ;
		//청구내역 생성 _ 청구 확정
		result = invoiceservice.setInvoice(calfromdate);
		if(result == 0) {
		 return result; 
		}	
		
		/*
		 * 일괄 결제 생성 항목에 대한 미납 금액 0원 처리
		 * 
			//청구내역에 미납금액 0로 수정
			result = invoiceservice.updateInvoiceZero(calfromdate);
			//청구내역 상세 미납금액 0 수정
			result = invoiceservice.updateInvoiceDetailZero(calfromdate);
			//청구 계산 내역 미납급액 0 수정
			result = invoiceservice.updateInvoiceCalculationZero(calfromdate);
	
			//마지막 청구 일자
			result = invoiceservice.updateLastInvoicedt(calfromdate);
			//다음 청구 일자
			result = invoiceservice.updateNextInvoicedt(calfromdate);
			//일괄 결제 배송 내용 생성
			result += getZeroInvoicetoDelivery(calfromdate);
		 */   
		return result; 
	}
	
	/**
	 * 결제내역 상세 팝업
	 * @param invoicenumber
	 * @param invoicedate
	 * @param connumber
	 * @param model
	 * @param principal
	 * @return
	 */
/*	@RequestMapping(value = "/invoiceDetail/{invoicenumber}/{invoicedate}/{connumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewinvoiceDetail(@PathVariable(value = "invoicenumber") int invoicenumber
													,@PathVariable(value = "invoicedate") String invoicedate
													,@PathVariable(value = "connumber") int connumber
													,Model model
													,Principal principal) {
		log.info("===================invoiceDetail=====================");
		log.info("invoicenumber = " + invoicenumber + " / invoicedate = " + invoicedate + "/" + connumber);
		InvoiceDetailInput invoicedetailinput = new InvoiceDetailInput();
		invoicedetailinput.setInvoiceDate(invoicedate);
		invoicedetailinput.setInvoiceNumber(invoicenumber);
		invoicedetailinput.setConNumber(connumber);
		
		ID mapping
		User user = userService.readUser(principal.getName());
		invoicedetailinput.setProviderNumber(user.getProviderNumber());
		invoicedetailinput.setUserName(user.getUserName());
						
		List<InvoiceDetail> invoicedetaillist = invoiceservice.getInvoiceDetail(invoicedetailinput);
		InvoiceDetailCustomerInfo invoicecustomerinfo = invoiceservice.getInvoiceDetailCustomerInfo(invoicedetailinput);
		List <InvoiceDetailProductInfo> invoiceproductinfolist = invoiceservice.getInvoiceDetailProductInfo(invoicedetailinput);
	   
		String productinfo = invoiceproductinfolist.get(0).getMainProductName();  
		if(invoiceproductinfolist.get(0).getCompositionProductId().equals("")) {
			productinfo += " 상품은 단품 구성 상품입니다.";  
		}else{
			productinfo += "는 패키지 상품이며 , 구성품은 ";
			for (int i = 0 ; i < invoiceproductinfolist.size() ; i ++) {
				productinfo += invoiceproductinfolist.get(i).getCompositionProductName();
				productinfo += invoiceproductinfolist.get(i).getCompositionPriceAmount();
				if (i != (invoiceproductinfolist.size() -1)) {
					productinfo += ",";
				}
			}
			productinfo += " 입니다. ";
		}		
	   log.info("invoiceproductinfo : " + productinfo);
	   if(invoicecustomerinfo == null) {
		   invoicecustomerinfo = new InvoiceDetailCustomerInfo();
	   }
	   
	   InvoiceTaxItemInfo itii = invoiceservice.getInvoiceTaxItemAmount(invoicedetailinput);
		ModelAndView modelAndView = new ModelAndView();
		model.addAttribute("invoicedetaillist",invoicedetaillist);
		model.addAttribute("invoicecustomerinfo",invoicecustomerinfo);
		model.addAttribute("itii",itii);
		model.addAttribute("invoicenumber",invoicenumber);
		model.addAttribute("invoicedate",invoicedate);
		model.addAttribute("connumber",connumber);
		model.addAttribute("productinfo",productinfo);
		modelAndView.setViewName("popup/invoicedetailPopup");
		
		return modelAndView;
   }	*/
	
	/**
	 * 결제 정보 저장
	 * @param paymenthistoryinput
	 * @return
	 */
	public int savePaymentInfo(PaymentHistoryInput paymenthistoryinput) {
		int result = 0 ;
		
		//결제 내역 저장
		result = invoiceservice.setPaymentHistory(paymenthistoryinput);
		
		//결제 완료 후 미납금액 0 처리
		result = invoiceservice.updateColInvoice(paymenthistoryinput);
		
		//결제 상세 내역에 미납금액 0처리
		result = invoiceservice.updateColInvoiceDetail(paymenthistoryinput);
		
		if(result == 0) {
			return result;	
		 }
		//배송 정보의 상태 값을 계약완료(ORDERDONE) 상태에서 배송대기(BEFORE) 상태로 변경 한다.
		//격월 배송 등이 있기 때문에 upate 건수는 체크하지 않는다.
		paymenthistoryinput.setDeliveryState("BEFORE");
		invoiceservice.updateDeliverydetailByDeliverystate(paymenthistoryinput);		
		
		//일괄결제 여부 사를 위한 계약정보 조회
		int connumber = paymenthistoryinput.getConNumber();
		ContractInfoDetail contInfo = this.invoiceservice.getContractInfoDetail(connumber);
		//일괄 결제일 경우 청구 내역에 선납 여부 Y로 update
		if(contInfo != null && "N".equals(contInfo.getRecurringInvoiceYn())) {
			InvoiceCalculationInput invoiceCalculationInput = new InvoiceCalculationInput();
			invoiceCalculationInput.setInvoiceNumber(paymenthistoryinput.getInvoiceNumber());
			invoiceCalculationInput.setConNumber(paymenthistoryinput.getConNumber());
			invoiceCalculationInput.setInvoiceDate(paymenthistoryinput.getInvoiceDate());
			invoiceCalculationInput.setProviderNumber(paymenthistoryinput.getProviderNumber());
			invoiceCalculationInput.setPrepayYn("Y");
			
			//일괄 결제일 경우 선납 상태로 변경			
			invoiceservice.updateInvoicePrepayYn(invoiceCalculationInput);
			invoiceservice.updateInvoicecalculationPrepayYn(invoiceCalculationInput);
			invoiceservice.updateInvoicedetailPrepayYn(invoiceCalculationInput);			
		}
		
		//계약 ACTIVATION로 상태 변경
		ContractInsert idi = new ContractInsert();		 
		idi.setConNumber(paymenthistoryinput.getConNumber());
		idi.setProviderNumber(paymenthistoryinput.getProviderNumber());
		idi.setContractState("ACTIVATION");	
		idi.setUserName(paymenthistoryinput.getUserName());
		this.invoiceservice.updateContractContractstate(idi);

		return result;
	}	
	
	 /**
	 * 조정 처리를 위한 수납내역 조회
	 * 결제관리 > 고객결제내역 > 결제내역 목록 > 조정 buttn Clikc > 조정팝업 조회
	 * @param invoicenumber
	 * @param invoicedate
	 * @param connumber
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getInvoiceByAdjustInfo", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public Map<String, Object> getInvoiceByAdjustInfo(@ModelAttribute InvoiceDetailInput invoicedetailinput, Model model, Principal principal) {
		log.info("===================invoiceAdjust=====================");
/*		log.info("invoicenumber = " + invoicenumber + " / invoicedate = " + invoicedate + "/" + connumber);
		InvoiceDetailInput invoicedetailinput = new InvoiceDetailInput();
		invoicedetailinput.setInvoiceDate(invoicedate);
		invoicedetailinput.setInvoiceNumber(invoicenumber);
		invoicedetailinput.setConNumber(connumber);*/
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoicedetailinput.setProviderNumber(user.getProviderNumber());
		invoicedetailinput.setUserName(user.getUserName());
		/*ID mapping*/
		List<InvoiceAdjust> invoiceAdjustList = invoiceservice.getInvoiceAdjust(invoicedetailinput);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		/*ModelAndView modelAndView = new ModelAndView();
		model.addAttribute("invoiceadjustlist",invoiceadjustlist);
		model.addAttribute("invoicenumber",invoicenumber);
		model.addAttribute("invoicedate",invoicedate);
		model.addAttribute("connumber",connumber);
		modelAndView.setViewName("popup/adjustPopup");*/
		map.put("adjustList", invoiceAdjustList); // 리스트fetch		 
		return map;
		
	 }	
//	
//	/**
//	 * 결제관리 > 고객결제내역 > 결제내역 > 조정 팝업 호출 > 조정 처리
//	 * @param invoiceClassificationCode
//	 * @param revenueItemCode
//	 * @param adjustPossibleAmount
//	 * @param adjustamt
//	 * @param adjustinvoicenumber
//	 * @param adjustinvoicedate
//	 * @param adjustconnumber
//	 * @param adjustreasonmessage
//	 * @param model
//	 * @param principal
//	 * @return
//	 */	 
//	@RequestMapping(value = "/adjust", method = RequestMethod.GET)
//	public int procAdjust(
//			@RequestParam("invoiceClassificationCode") String invoiceClassificationCode,
//			@RequestParam("revenueItemCode") String revenueItemCode,
//			@RequestParam("adjustPossibleAmount") int adjustPossibleAmount, 
//			@RequestParam("adjustamt") int adjustAmt,
//			@RequestParam("adjustinvoicenumber") int adjustInvoiceNumber,
//			@RequestParam("adjustinvoicedate") String adjustInvoiceDate,
//			@RequestParam("adjustconnumber") int adjustConNumber,
//			@RequestParam("adjustreasonmessage") String adjusTreasonMessage, Model model,Principal principal) {
//	log.info("invoiceClassificationCode = " + invoiceClassificationCode
//			+"revenueItemCode = " + revenueItemCode
//			+"adjustPossibleAmount = " + adjustPossibleAmount
//			+"adjustinvoicenumber = " + adjustInvoiceNumber
//			+"adjustinvoicedate = " + adjustInvoiceDate
//			+"adjustconnumber = " + adjustConNumber
//			+"adjustreasonmessage = " + adjusTreasonMessage
//			);
//	InvoiceAdjustInput invoiceAdjustInput = new InvoiceAdjustInput(adjustInvoiceNumber, adjustInvoiceDate, adjustConNumber,
//			invoiceClassificationCode, revenueItemCode, adjustPossibleAmount, adjustAmt, adjusTreasonMessage);
//			
//			//**** post변경 하여 작업 진행중

	@RequestMapping(value = "/adjust", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int procAdjust(@ModelAttribute InvoiceAdjustInput invoiceAdjustInput, Model model,Principal principal) {
		
		log.info("===================adjustproc=====================");
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoiceAdjustInput.setProviderNumber(user.getProviderNumber());
		invoiceAdjustInput.setUserName(user.getUserName());
		/*ID mapping*/
		int result = 0;
		log.info("===================setInvoiceAdjust=====================");
		
		//조정 내역 저장
		result = invoiceservice.setInvoiceAdjust(invoiceAdjustInput);
		if (result == 0) {
			return result;
		}
		
		//조정 건수 조회
		int gubun = invoiceservice.checkInvoiceAdjust(invoiceAdjustInput);
		if(gubun > 0 ) {
			log.info("===================updateInvoiceAdjust=====================");
			//조정 금액을 청구 금액에 반영한다.
			result = invoiceservice.updateInvoiceAdjust(invoiceAdjustInput);
			if (result == 0) {
				return result;
			}
		}else {
			log.info("===================setInvoiceAdjustInvoiceDetail=====================");
			//조정 요청 내역을 청구 상세에 저장한다.
			result = invoiceservice.setInvoiceAdjustInvoiceDetail(invoiceAdjustInput);
			if (result == 0) {
				return result;
			}
		}
		
		log.info("===================updateInvoiceAdjustInvoiceDetail=====================");
		//조정 금액을 청구내역에 반영한다.
		result = invoiceservice.updateInvoiceAdjustInvoiceDetail(invoiceAdjustInput);
		if (result == 0) {
			return result;
		}
		log.info("===================updateInvoiceAdjustAply=====================");
		//조정 요청을 조정 완료 상태로 변경한다.
		result = invoiceservice.updateInvoiceAdjustAply(invoiceAdjustInput);
		if (result == 0) {
			return result;
		}
		
		//조정이 완료 되고 해당 청구의 상태가 Y로 변경될 경우 배송의 상태도 변경 한다.
		InvoiceSearch invoiceSearch = new InvoiceSearch();
		invoiceSearch.setProviderNumber(invoiceAdjustInput.getProviderNumber());
		invoiceSearch.setConNumber(invoiceAdjustInput.getConNumber());
		invoiceSearch.setInvoiceNumber(invoiceAdjustInput.getInvoiceNumber());
		Invoice invoice = this.invoiceservice.getInvoicePaymentDetail(invoiceSearch);
		if (invoice != null) {
			if(invoice.getCollectionBalanceAmount() == 0 && "Y".equals(invoice.getCollectionCloseYn())) {
				//배송 가능 상태로 변경
				PaymentHistoryInput payInput = new PaymentHistoryInput();
				
				payInput.setDeliveryState("BEFORE");
				payInput.setProviderNumber(invoiceAdjustInput.getProviderNumber());
				payInput.setConNumber(invoiceAdjustInput.getConNumber());
				payInput.setInvoiceNumber(invoiceAdjustInput.getInvoiceNumber());
				payInput.setUserName(invoiceAdjustInput.getUserName());
				this.invoiceservice.updateDeliverydetailByDeliverystate(payInput);				
			}
		}
		return result;
	}
	
	/**
	 * 결제관리 화면 조회
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/payment" , method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView paymentView(Model model,final HttpSession session, Principal principal) {
		log.info("===================login=====================");

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("online/billing/paymentMgmt");
		
		return modelAndView;
	}
	
	/**
	 * 결제관리 화면 조회
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/payment/{searchPayTypeCode}" , method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView paymentView(@PathVariable(value = "searchPayTypeCode") String searchPayTypeCode, Model model,final HttpSession session, Principal principal) {
		log.info("===================login=====================");
		
		ModelAndView modelAndView = new ModelAndView();
		model.addAttribute("searchPayTypeCode",searchPayTypeCode);	
		modelAndView.setViewName("online/billing/paymentMgmt");		
		return modelAndView;
	}
	
	
	/**
	 * 청구 결제 목록 조회
	 * @param invoiceSearch
	 * @param model
	 * @param principal
	 * @return
	 */	
	@RequestMapping(value = "/getInvoicePaymentList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public Map<String, Object> getInvoicePaymentList(@ModelAttribute InvoiceSearch invoiceSearch,Model model,Principal principal) {
		log.info("===================getInvoicePaymentList=====================");
		
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoiceSearch.setProviderNumber(user.getProviderNumber());
		
		Map<String, Object> map = new HashMap<String, Object>();
		Criteria cri = invoiceSearch;
		
		invoiceSearch.setOrderSql(setPaymentListOder(invoiceSearch));
				
		//청구 결제 목록 조회
		List<Invoice> invoList = this.invoiceservice.getInvoicePaymentList(invoiceSearch); 
		int invoListCnt = this.invoiceservice.getInvoicePaymentListTotalCnt(invoiceSearch);
		
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(invoListCnt);
		
		log.info("getTotalCount=>" + pageMaker.getTotalCount());

		map.put("invoList", invoList); // 리스트fetch
		map.put("pageMaker", pageMaker); 
		return map;
	 }	
	
	/**
	 * 청구 결제 상세 내역 조회	 * 
	 * @param invoiceSearch
	 * @param model
	 * @param principal
	 * @return
	 */	
	@RequestMapping(value = "/getInvoicePaymentDetail", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Map<String, Object> getInvoicePaymentDetail(@ModelAttribute InvoiceSearch invoiceSearch,Model model,Principal principal) {
		log.info("===================getInvoicePaymentDetail=====================");
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoiceSearch.setProviderNumber(user.getProviderNumber());
		
		//청구 결제 목록 조회
		Invoice invoDetail = this.invoiceservice.getInvoicePaymentDetail(invoiceSearch);
		
		//청구내역 상세
		InvoiceDetailInput invoicedetailinput = new InvoiceDetailInput();
		invoicedetailinput.setProviderNumber(invoDetail.getProviderNumber());
		invoicedetailinput.setConNumber(invoDetail.getConNumber());		
		invoicedetailinput.setInvoiceNumber(invoDetail.getInvoiceNumber());
		invoicedetailinput.setInvoiceDate(invoDetail.getInvoiceDate());		
		List<InvoiceDetail> invoDetailList = invoiceservice.getInvoiceDetail(invoicedetailinput);			
				
		//결제 이력 조회
		List<PaymentHistory> payHist = this.invoiceservice.getPaymentHistoryList(invoiceSearch);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("invoDetail", invoDetail);
		map.put("invoDetailList", invoDetailList);
		map.put("payHist", payHist);
		
		return map;
	}	
	
	/**
	 * 결제관리 조회 조건 중 정렬 조건 조합
	 * @param invoiceSearch
	 * @return
	 */
	private String setPaymentListOder(InvoiceSearch invoiceSearch) {
		String orderSql = "";		
		int orderIndex = 0;
			
		//결제요청일
		if(!StringUtil.isEmpty(invoiceSearch.getInvoiceDateSort()) && "Y".equals(invoiceSearch.getInvoiceDateSort())) {		
			if (orderIndex != 0) {
				orderSql += ", ";
			}
			orderSql += "invo.invoicedate DESC";
			orderIndex ++;
		}
		
		//회차
		if(!StringUtil.isEmpty(invoiceSearch.getInvoiceTurnSort()) && "Y".equals(invoiceSearch.getInvoiceTurnSort())) {
			if (orderIndex != 0) {
				orderSql += ", ";
			}
			orderSql += "invo.invoiceTurn DESC	";			
			orderIndex ++;
		}
		
		//결제상태
		if(!StringUtil.isEmpty(invoiceSearch.getPaymentStateSort()) && "Y".equals(invoiceSearch.getPaymentStateSort())) {
			if (orderIndex != 0) {
				orderSql += ", ";
			}
			orderSql += " 13 DESC";			
			orderIndex ++;
		}
			
		//실패사유
		if(!StringUtil.isEmpty(invoiceSearch.getPgErrorMsgSort()) && "Y".equals(invoiceSearch.getPgErrorMsgSort())) {
			if (orderIndex != 0) {
				orderSql += ", ";
			}
			orderSql += " pgErrorMsg DESC";
			orderIndex ++;			
		}
		
		//조건이 없을 경우 기본 조건 추가
		if(orderIndex == 0) {
			orderSql += " invo.invoicedate ASC";			
		}
		return orderSql;
	}
	/**
	 * 청구 결제 목록 엑셀 다운로드
	 * @param invoiceSearch
	 * @param model
	 * @param principal
	 * @return
	 */	
	@RequestMapping(value = "/getInvoicePaymentListExcel", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public void getInvoicePaymentListExcel(@ModelAttribute InvoiceSearch invoiceSearch,Model model,Principal principal, HttpServletResponse response) throws Exception {
		log.info("===================getInvoicePaymentList=====================");

		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoiceSearch.setProviderNumber(user.getProviderNumber());
		
		invoiceSearch.setOrderSql(setPaymentListOder(invoiceSearch));
		
		String fileName = "";	
		String searchPath = StringUtil.nullConvert(invoiceSearch.getSearchPath()).toUpperCase();
		
		if("PAYMENT".equals(searchPath)) {
			fileName = "결제관리_"+invoiceSearch.getInvoiceDateFrom()+"~"+invoiceSearch.getInvoiceDateTo();
		}else if("CONTRACTPAYMENTLIST".equals(searchPath)) {
			fileName = "결제관리_"+invoiceSearch.getConNumber();
		}else {
			fileName = "결제관리_"+invoiceSearch.getConNumber();
		}
		
		//date Formatting
		if(!StringUtil.isEmpty(invoiceSearch.getInvoiceDateFrom())) {			
			invoiceSearch.setInvoiceDateFrom(invoiceSearch.getInvoiceDateFrom().replaceAll("-", ""));
		}
		if(!StringUtil.isEmpty(invoiceSearch.getInvoiceDateTo())) {			
			invoiceSearch.setInvoiceDateTo(invoiceSearch.getInvoiceDateTo().replaceAll("-", ""));
		}
		
		//청구 결제 목록 조회		
		List<Invoice> invoList = this.invoiceservice.getInvoicePaymentListExcel(invoiceSearch); 
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet(fileName);

		//헤더 생성
		int colNum = 0;
		int rowNum = 0;
		excel.createRow();
		excel.setCellValue("Y", colNum++, "번호");
		excel.setCellValue("Y", colNum++, "결제일");
		excel.setCellValue("Y", colNum++, "고객명");
		excel.setCellValue("Y", colNum++, "상품명");
		excel.setCellValue("Y", colNum++, "결제방식");
		excel.setCellValue("Y", colNum++, "회차");
		excel.setCellValue("Y", colNum++, "결제주기");
		excel.setCellValue("Y", colNum++, "결제금액");
		excel.setCellValue("Y", colNum++, "납부여부");
		excel.setCellValue("Y", colNum++, "처리구분");
		excel.setCellValue("Y", colNum++, "처리일시");
		excel.setCellValue("Y", colNum++, "처리자");
		excel.setCellValue("Y", colNum++, "실패사유");
	
		//엑셀 바디 생성
		for (Invoice invoice : invoList) {					
			colNum = 0;
		    excel.createRow();
	    	excel.setCellValue("N", colNum++, String.valueOf(++rowNum));
	    	excel.setCellValue("N", colNum++, DateUtil.getDateFormat(invoice.getInvoiceDate(),"-"));
	    	excel.setCellValue("N", colNum++, invoice.getCustomerName());
	    	excel.setCellValue("N", colNum++, invoice.getProductName());
	    	excel.setCellValue("N", colNum++, invoice.getPaymentType());
	    	excel.setCellValue("N", colNum++, invoice.getInvoiceTurn());
	    	excel.setCellValue("N", colNum++, invoice.getInvoiceCycle());
	    	/*excel.setCellValue("N", colNum++, NumberUtil.getCommaNumber(invoice.getTotalInvoiceAmount()+invoice.getAdjustAmount())+"원");*/			    		
	    	excel.setCellValue("N", colNum++, NumberUtil.getCommaNumber(invoice.getTotalInvoiceAmount())+"원");			    		
	    	excel.setCellValue("N", colNum++, invoice.getCollectionCloseYn());
	    	excel.setCellValue("N", colNum++, invoice.getPaymentTypeCodeName());
	    	excel.setCellValue("N", colNum++, DateUtil.getDateTime(invoice.getPaymentDateTime()));
	    	excel.setCellValue("N", colNum++, invoice.getPayProcName());
	    	excel.setCellValue("N", colNum++, invoice.getPgErrorMsg());
	    	
		}
		

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode(fileName+".xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());	

	 }	
	
	/**
	 * 계약 기준 결제 내역 조회
	 * @param conNumber
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/contractPaymentList/{conNumber}/{searchCondition}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewContractPaymentList(@PathVariable(value = "conNumber") int conNumber, @PathVariable(value = "searchCondition") String searchCondition, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		ContractList contractList = new ContractList();
		contractList.setConNumber(conNumber);
		
		ContractList contract = this.contractListService.getContract(contractList);
		model.addAttribute("contract", contract); // 리스트fetch
		model.addAttribute("searchCondition", searchCondition); // 리스트fetch
		
		modelAndView.setViewName("online/billing/contractPaymentList");
		
		return modelAndView;
		
	}	
		

}
