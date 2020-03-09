package com.api.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.api.billing.invoice.model.ContractInfoDetail;
import com.api.billing.invoice.model.Invoice;
import com.api.billing.invoice.model.InvoiceAdjust;
import com.api.billing.invoice.model.InvoiceAdjustInput;
import com.api.billing.invoice.model.InvoiceCalculation;
import com.api.billing.invoice.model.InvoiceCalculationInput;
import com.api.billing.invoice.model.InvoiceDateInput;
import com.api.billing.invoice.model.InvoiceDetail;
import com.api.billing.invoice.model.InvoiceDetailCustomerInfo;
import com.api.billing.invoice.model.InvoiceDetailInput;
import com.api.billing.invoice.model.InvoiceDetailProductInfo;
import com.api.billing.invoice.model.InvoiceNameInput;
import com.api.billing.invoice.model.InvoiceTaxItemInfo;
import com.api.billing.invoice.model.PaymentHistoryInput;
import com.api.billing.invoice.model.PaymentPrePayInvoiceInput;
import com.api.billing.invoice.model.invoiceCounSelling;
import com.api.billing.login.model.User;
import com.api.billing.model.contract.ContractInsert;
import com.api.billing.model.delivery.DeliveryDateInput;
import com.api.billing.model.delivery.DeliveryPackageInput;
import com.api.model.Criteria;
import com.api.model.PageMaker;
import com.api.service.DeliveryService;
import com.api.service.InvoiceService;
import com.api.service.UserService;
import com.api.util.DateUtil;


/**
 * @author Administrator
 *
 */
@RestController
@RequestMapping(value = "billing")
@Transactional(rollbackFor=Exception.class)
public class BillingController {
	
	@Autowired
	InvoiceService invoiceservice;

	@Autowired
	DeliveryService deliveryservice;
	
	@Autowired UserService userService;
	
	private Logger log = LoggerFactory.getLogger(getClass());
	 
	/*문경은 start*/	                                    
	 
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
		idi.setContractstate("UNSETTLED");//1회차 결제 전 미결 상태
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
			List<Map<String, String>> dateList = this.makeInvoiceDateList(effectstartdatetime, effectenddatetime, recurringInvoiceYn);
			
			/*******************************************************************************************************************************
			 * Step3. 청구 계산 금액을 생성한다. 
			 *******************************************************************************************************************************/
			InvoiceCalculationInput invoiceCalculationInput = new InvoiceCalculationInput();
			
			for (Map<String, String> map : dateList) {				
				log.info("invoicedate ==> "+map.get("invoicedate"));				/*청구일자*/
				log.info("invoicedate ==> "+map.get("invoicedate"));				/*청구일자*/
				log.info(", invoicestartdate ==>"+map.get("invoicestartdate"));		/*청구시작일자*/
				log.info(", invoiceenddate ==> "+map.get("invoiceenddate"));		/*청구종료일자*/
				log.info(", totinvoiceday ==> "+map.get("totinvoiceday"));		/*총 청구일수*/
				
				//invoiceCalculationInput Parameter setting				
				invoiceCalculationInput.setProvidernumber(contInfo.getProvidernumber());
				invoiceCalculationInput.setInvoicenumber(null);
				invoiceCalculationInput.setConnumber(contInfo.getConNumber());
				invoiceCalculationInput.setPaymentinformationnumber(contInfo.getPaymentInformationNumber());
				invoiceCalculationInput.setCustomernumber(contInfo.getCustomerNumber());
				invoiceCalculationInput.setRevenueitemcode(contInfo.getProductId());
				invoiceCalculationInput.setInvoiceclassificationcode("000");
				invoiceCalculationInput.setInvoicedate(map.get("invoicedate"));
				invoiceCalculationInput.setInvoicestartdate(map.get("invoicestartdate"));
				invoiceCalculationInput.setInvoiceenddate(map.get("invoiceenddate"));
				invoiceCalculationInput.setTotinvoiceday(map.get("totinvoiceday"));
				invoiceCalculationInput.setPrepayyn("N");
				int termMonth = 1;
				try {					
					invoiceCalculationInput.setInvoiceaplyday(DateUtil.dateDiff("d", contInfo.getEffectStartDateTime(), map.get("invoiceenddate")));
					if ("N".equals(contInfo.getRecurringInvoiceYn())) {						
						termMonth = DateUtil.dateDiff("M", effectenddatetime, effectstartdatetime);
					}
				} catch (Exception e) {
//					log.info("날짜 형식이 맞지 않습니다."); 
					invoiceCalculationInput.setInvoiceaplyday(0);					
				}
				
				
				//일괄결제의 경우 종료 월이 +1이 안될 경우 보정
				if (termMonth < 1) {
					termMonth = 1;
				}
				
				//Step3-1. 청구 총액 계산
				int invoiceamount = contInfo.getPriceAmount() * Integer.parseInt(contInfo.getProductQuantity())* termMonth;
				
				
				//Step3-1-1. 배송비 할인 여부에 따라 배송비를 청구 총액에 적용 한다.
				if (!"FREE".equals(contInfo.getDeliveryChargeType())) {
					invoiceamount = invoiceamount+(contInfo.getDeliveryChargeAmount()* termMonth);
				}
	
				invoiceCalculationInput.setInvoiceamount(invoiceamount);
				invoiceCalculationInput.setCollectionbalanceamount(invoiceamount);
				invoiceCalculationInput.setUsername(contInfo.getAuditId());
				
				//Step3-2. 청구 계산 금액  insert
				//이미 등록된 청구 내역이 있을 경우 skip
				if (this.invoiceservice.getInvoiceCount(invoiceCalculationInput) == 0) {					
					result = result+this.invoiceservice.insertInvoicecalculation(invoiceCalculationInput);
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
				int deliveryCnt = this.invoiceservice.updateDeliverydetailByInvoicenumber(contInfo);
			}
			
			/*******************************************************************************************************************************
			 * Step7. 정기결제를 신청을 위해 1건의 청구 정보를 조회 한다.
			 *******************************************************************************************************************************/			
			//if (result> 0 && "N".equals(contInfo.getRecurringInvoiceYn())) {
			if (result> 0 ) {
				paymentPrePayInvoiceInput.setProvidernumber(contInfo.getProvidernumber());
				paymentPrePayInvoiceInput.setConnumber(contInfo.getConNumber());
				
				InvoiceCalculationInput invoiceOne = this.invoiceservice.getInvoicenumberByOne(contInfo);
				
				paymentPrePayInvoiceInput.setInvoicenumber(Integer.parseInt(invoiceOne.getInvoicenumber()));				
				paymentPrePayInvoiceInput.setInvoicedate(invoiceOne.getInvoicedate());				
			}
		}
		
		return paymentPrePayInvoiceInput;
	}
	
	/**
	 * 청구 계산 내역 기준 할인금액 계산
	 * @param calfromdate
	 * @return
	 */
	 
	public int insertInvoiceCalculationDiscount(InvoiceCalculationInput calfromdate) {
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
	 
	public int insertInvoiceDetail(InvoiceCalculationInput calfromdate) {
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
	 
	public int insertInvoice(InvoiceCalculationInput calfromdate) {
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
	 * 청구 생성 내역 조회
	 * @param connumber
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/billing-calculation-view/{connumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<InvoiceCalculation> setviewBillingCalaulation(@PathVariable(value = "connumber") int connumber,Model model,Principal principal) {
		log.info("===================setBillingCalaulation=====================");
		log.info("connumber = " + connumber);
		InvoiceCalculationInput ici = new InvoiceCalculationInput();
		ici.setConnumber(connumber);
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		ici.setProvidernumber(user.getProvidernumber());
		ici.setUsername(user.getUsername());
		
		//청구내역 조회
		List<InvoiceCalculation> resultlist = invoiceservice.getCalculationInvoice(ici);
			
		return resultlist;
	}	
	
	
	/**
	 * 서비스 시작일과 종료 일자를 받아 청구 기간 목록을 조회 한다.
	 * @param startDate	서비스시작일자
	 * @param endDate	서비스종료일자
	 * @param recurringInvoiceYn  정기결제 여부
	 * @return
	 */
	 
	private List<Map<String, String>> makeInvoiceDateList(String startDate, String endDate, String recurringInvoiceYn){
		List<Map<String, String>> dateList = new ArrayList<Map<String, String>>();
		Map tempMap ;

		try {			
			
			if("Y".equals(recurringInvoiceYn)) {
				//정기결제
				String tempStartDate = "";
				String tempEndDate = "";
				int startDay = 0;
				int endDay = 0;
				while (DateUtil.dateDiff("d",startDate, endDate)> 0) {				
					
					tempStartDate = startDate;				
					tempEndDate = DateUtil.wDate(tempStartDate, 1);
					
					//청구시작일과 청구 종료 일이 같은 경우 종료일자를 하루 전날로 설정
					startDay = Integer.parseInt(tempStartDate.substring(6, 8));
					endDay = Integer.parseInt(tempEndDate.substring(6, 8));				
					if (startDay == endDay) {
						tempEndDate = DateUtil.getAddDay(tempEndDate, -1);
					}
					
					startDate =DateUtil.getAddDay(tempEndDate, 1);	//다음 청구 일자 계산
					
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
		}
		return dateList;
	}

	 /**
	  * 결제 처리
	 * @param paymenthistoryinput
	 * @param model
	 * @param principal
	 * @return
	 */
	 
	@RequestMapping(value = "/paymentproc", method = RequestMethod.POST)
	public int procPayment(@ModelAttribute PaymentHistoryInput paymenthistoryinput,Model model,Principal principal) {
		log.info("===================paymentproc=====================");
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int result = 0 ;
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		paymenthistoryinput.setProvidernumber(user.getProvidernumber());
		paymenthistoryinput.setUsername(user.getUsername());
		/*ID mapping*/
		if(paymenthistoryinput.getChannelgubun() == null)
		{
			paymenthistoryinput.setChannelgubun("N");
		}
		
		  /*  <select id="sendInvoiceSum" resultType="int">
	    select ifnull(sum(i.collectionbalanceamount),0) as collectionBalanceAmount
	  from invoice i
	  where i.providernumber = #{providernumber}
	  and i.connumber = #{conNumber}
	  and i.invoicenumber = #{InvoiceNumber}
	  and i.invoicedate = replace(#{InvoiceDate},'-','')*/
		
		//미납금액이 0일 경우 이미 결제 완료된 건으로 판단하여 예외 처리 한다.
		InvoiceDetailInput invoiceDetailInput = new InvoiceDetailInput();
		invoiceDetailInput.setProvidernumber(paymenthistoryinput.getProvidernumber());
		invoiceDetailInput.setConNumber(paymenthistoryinput.getConnumber());
		invoiceDetailInput.setInvoiceNumber(paymenthistoryinput.getInvoicenumber());
		invoiceDetailInput.setInvoiceDate(paymenthistoryinput.getInvoicedate());
		int collectionBalanceAmount = this.invoiceservice.sendInvoiceSum(invoiceDetailInput);
		
		if (collectionBalanceAmount == 0) {
			throw new RuntimeException("이미 납부된 내역 입니다.");
		}
					
		//결제 내역 저장
		result = this.savePaymentInfo(paymenthistoryinput);
		return result;
	}	
	
	
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
		paymenthistoryinput.setDeliverystate("BEFORE");
		invoiceservice.updateDeliverydetailByDeliverystate(paymenthistoryinput);		
		
		//일괄결제 여부 사를 위한 계약정보 조회
		int connumber = paymenthistoryinput.getConnumber();
		ContractInfoDetail contInfo = this.invoiceservice.getContractInfoDetail(connumber);
		//일괄 결제일 경우 청구 내역에 선납 여부 Y로 update
		if(contInfo != null && "N".equals(contInfo.getRecurringinvoiceyn())) {
			InvoiceCalculationInput invoiceCalculationInput = new InvoiceCalculationInput();
			invoiceCalculationInput.setInvoicenumber(Integer.toString(paymenthistoryinput.getInvoicenumber()));
			invoiceCalculationInput.setConnumber(paymenthistoryinput.getConnumber());
			invoiceCalculationInput.setInvoicedate(paymenthistoryinput.getInvoicedate());
			invoiceCalculationInput.setProvidernumber(paymenthistoryinput.getProvidernumber());
			invoiceCalculationInput.setPrepayyn("Y");
			
			//일괄 결제일 경우 선납 상태로 변경			
			invoiceservice.updateInvoicePrepayYn(invoiceCalculationInput);
			invoiceservice.updateInvoicecalculationPrepayYn(invoiceCalculationInput);
			invoiceservice.updateInvoicedetailPrepayYn(invoiceCalculationInput);			
		}
		
		//계약 ACTIVATION로 상태 변경
		ContractInsert idi = new ContractInsert();		 
		idi.setConNumber(paymenthistoryinput.getConnumber());
		idi.setProvidernumber(paymenthistoryinput.getProvidernumber());
		idi.setContractstate("ACTIVATION");	
		idi.setUsername(paymenthistoryinput.getUsername());
		this.invoiceservice.updateContractContractstate(idi);

		return result;
	}
	
	
	/*문경은 end*/
	
	 @RequestMapping(value = "/exceltest", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewTest(Model model) {
		log.info("===================excelupload=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("excelupload");
		return modelAndView;
	 }
	 
	 /*search bar*/
	 /**
	 * 결제관리 > 고객결제내역 > 검색
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/searchbar", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewSearchBar(Model model) {
		log.info("===================searchbar=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/searchbar");
		return modelAndView;
	 }
	 
	 /*search bar-datepicker*/
	 /**
	 * 결제관리 > 결제대상조회 > 검색
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/searchbardatepicker", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewSearchDateBar(Model model) {
		log.info("===================searchbar-datepicker=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/searchbar-datepicker");
		return modelAndView;
	 }
	 
	 
	 /*billing Controller*/
	 @RequestMapping(value = "/loadinggif", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewloading() {
		log.info("===================loadinggif=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("loading");
		return modelAndView;
	 }
	 
	 /**
	 * 결제관리 메인
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/main", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewInvoice(Model model) {
		log.info("===================viewInvoice=====================");
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/billing");
		return modelAndView;
	 }
	
	 /*Menu*/
	 /**
	 * 결제관리 메뉴
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/billingmenu", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewBillingemenu(Model model) {
		log.info("===================viewInvoice=====================");
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/billingmenu");
		return modelAndView;
	 }
	 
	 /**
	 * 결제관리 > 결제대상조회
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/billing-invoice-status", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewInvoiceMain(Model model) {
		log.info("===================billingmain=====================");
		//List<Invoice> invoicelist = invoiceservice.getInvoiceByDate();
		ModelAndView modelAndView = new ModelAndView();
		//model.addAttribute("invoicelist",invoicelist);
		modelAndView.setViewName("admin/billing/billing-invoice-status");
		return modelAndView;
	 }
	 
	 
	public int getZeroInvoicetoDelivery(InvoiceCalculationInput calfromdate) {
		int result = 0;
		PaymentHistoryInput paymenthistoryinput = new PaymentHistoryInput();
	
		List<Invoice> invoicelist = invoiceservice.getZeroInvoicetoDelivery(calfromdate);
		if (invoicelist.size() > 0) {
			for (int i = 0; i < invoicelist.size(); i++) {
				log.info(
						"======ZERO INVO DELIVERY HIST UPDATE 대상 : getConNumber() /" + invoicelist.get(i).getConNumber()
								+ " / getInvoiceDate() / " + invoicelist.get(i).getInvoiceDate()
								+ " / getInvoicenumber() / " + invoicelist.get(i).getInvoicenumber()  );
				paymenthistoryinput.setInvoicenumber(invoicelist.get(i).getInvoicenumber());
				paymenthistoryinput.setInvoicedate(invoicelist.get(i).getInvoiceDate());
				result = deliveryservice.insertDeliveryDetail(paymenthistoryinput);
			}
		} else {
			log.info("====== 요금생성 결과 ZERO INVO 중 DELIVERY HIST UPDATE할 대상 없습니다. ========");
		}
	
		return result;
	}
		
	 /**
	 * 결제관리 > 고객결제내역 > 화면 조회
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/billing-customer-paymentlist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewBillingCustomerList(Model model,Principal principal) {
		log.info("===================viewInvoice=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/billing-customer-paymentlist");
		return modelAndView;
	 }	 
	 
	 /**
	 * 결제관리 > 고객결제내역 > 결제내역 조회
	 * @param invoicenameinput
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getinvoicelistbyname", method = RequestMethod.GET)
	 public Map<String, Object> getInvoicelistByName(@ModelAttribute InvoiceNameInput invoicenameinput,Model model,Principal principal) {
		log.info("===================getInvoicelistByName=====================");
		
		Map<String, Object> map = new HashMap<>();
		Criteria cri = invoicenameinput;
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoicenameinput.setProvidernumber(user.getProvidernumber());
		invoicenameinput.setUsername(user.getUsername());
		/*ID mapping*/
		map.put("lists", invoiceservice.getInvoiceByName(invoicenameinput)); // 리스트fetch
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(invoiceservice.getInvoiceNameTotCount(invoicenameinput));
		log.info("getTotalCount=>" + pageMaker.getTotalCount());
		map.put("pageMaker", pageMaker); 
		return map;
	 }
	 

	 
	 /**
	 * 	 * 결제관리 > 고객결제내역 > 결제내역 > 결제상세내역 조회
	 * @param invoicedetailinput
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getpaymentdetail", method = RequestMethod.GET)
	 public Map<String, Object> getPaymentHistoryDetail(@ModelAttribute InvoiceDetailInput invoicedetailinput,Model model,Principal principal) {
		log.info("===================getPaymentHistoryDetail=====================");
		Map<String, Object> map = new HashMap<>();
		Criteria cri = invoicedetailinput;
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoicedetailinput.setProvidernumber(user.getProvidernumber());
		invoicedetailinput.setUsername(user.getUsername());
		/*ID mapping*/
		map.put("lists",invoiceservice.getPaymentHistory(invoicedetailinput)); // 리스트fetch
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(invoiceservice.getPaymentHistoryTotCount(invoicedetailinput));
		log.info("getTotalCount=>" + pageMaker.getTotalCount());
		map.put("pageMaker", pageMaker); 
		return map;
	 }

	 /**
	 * 결제관리 > 결제대상조회 > 결제대상목록 조회
	 * @param invoicedateinput
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getinvoicelist", method = RequestMethod.GET)
	 public Map<String, Object> getInvoicelist(@ModelAttribute InvoiceDateInput invoicedateinput
			 ,Model model
			 ,Principal principal) {
		log.info("===================getinvoicelist=====================" + principal.getName());
		
		
		
		Map<String, Object> map = new HashMap<>();
		Criteria cri = invoicedateinput;
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoicedateinput.setProvidernumber(user.getProvidernumber());
		invoicedateinput.setUsername(user.getUsername());
		/*ID mapping*/
		
		map.put("lists", invoiceservice.getInvoiceByDate(invoicedateinput)); // 리스트fetch
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(invoiceservice.getInvoiceTotCount(invoicedateinput));

		log.info("getTotalCount=>" + pageMaker.getTotalCount());
		map.put("pageMaker", pageMaker); 
		return map;
	 }
	 

	/**
	 * 결제관리 > 결제대상조회 > 상담등록
	 * @param invoicecounselling
	 * @param model
	 * @param principal
	 * @return
	 */
	 
	@RequestMapping(value = "/insertCounsellingHistory", method = RequestMethod.GET)
	 public int insertCounsellingHistory(@ModelAttribute invoiceCounSelling invoicecounselling,Model model,Principal principal) {
		log.info("===================insertCounsellingHistory=====================");
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoicecounselling.setProvidernumber(user.getProvidernumber());
		invoicecounselling.setUsername(user.getUsername());
		/*ID mapping*/
		int result = invoiceservice.insertCounsellingHistory(invoicecounselling); // 리스트fetch
		return result;
	 }
	 
	
	 /**
	 * 결제관리 > 결제대상조회 > 결제상담이력 조회
	 * @param invoicecounselling
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getCounsellingData", method = RequestMethod.GET)
	 public Map<String, Object> getCounsellingData(@ModelAttribute invoiceCounSelling invoicecounselling,Model model,Principal principal) {
		log.info("===================getCounsellingData=====================");
		Map<String, Object> map = new HashMap<>();
		Criteria cri = invoicecounselling;
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoicecounselling.setProvidernumber(user.getProvidernumber());
		invoicecounselling.setUsername(user.getUsername());
		/*ID mapping*/
		map.put("lists", invoiceservice.getCounsellingData(invoicecounselling)); // 리스트fetch
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(invoiceservice.getCounsellingTotalCount(invoicecounselling));

		log.info("getTotalCount=>" + pageMaker.getTotalCount());
		map.put("pageMaker", pageMaker); 
		return map;
	 }
	 
	 @RequestMapping(value = "/billing-calculation", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewBillingCalaulation(Model model) {
		log.info("===================viewBillingCalaulation=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/billing-calculation");
		return modelAndView;
	 }
	 
	 @RequestMapping(value = "/billing-recurringpayment", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewBillingRecurringpayment(Model model) {
		log.info("===================viewBillingRecurringpayment=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/billing-recurringpayment");
		return modelAndView;
	 }
	 
	 @RequestMapping(value = "/billing-calculation/{calfromdate}/{gubun}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public int setBillingCalaulation(@PathVariable(value = "calfromdate") String calfromdate
		                          	 ,@PathVariable(value = "gubun") int gubun
			                         ,Model model
			                         ,Principal principal) {
		log.info("===================setBillingCalaulation=====================");
		log.info("calfromdate = " + calfromdate);
		InvoiceCalculationInput ici = new InvoiceCalculationInput();
		ici.setCalfromDate(calfromdate);
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		ici.setProvidernumber(user.getProvidernumber());
		ici.setUsername(user.getUsername());
		/*ID mapping*/
		int result = 0 ;
		switch (gubun) {
		case 1:
			result = insertInvoiceCalculation(ici);
			break;
		case 2:
			result = insertInvoiceCalculationDiscount(ici);
			break;
		case 3:
			result = insertInvoiceDetail(ici);
			break;
		case 4:
			result = insertInvoice(ici);
			break;
		default:
			break;
		}
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	 }
	 
	 
	 @RequestMapping(value = "/billing-recalculation-view/{calfromdate}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public List<InvoiceCalculation> setviewBillingRecalculation(@PathVariable(value = "calfromdate") String calfromdate
			                         ,Model model
			                         ,Principal principal) {
		log.info("===================setviewBillingRecalculation=====================");
		log.info("calfromdate = " + calfromdate);
		List<InvoiceCalculation> resultlist = invoiceservice.getInvoiceRecurringpayment(calfromdate);
		
		return resultlist;
	 }
	 
	 public int insertInvoiceCalculation(InvoiceCalculationInput calfromdate) {
	   int result = 0 ;
	   result = invoiceservice.setInvoiceCalculation(calfromdate);
	   if(result == 0) {
	    
	    return result; 
	   }
	   return result; 
	   
	 }
		  	 
	 /*invoice detail modal*/
	/**
	 * 결제내역 상세 팝업
	 * @param invoicenumber
	 * @param invoicedate
	 * @param connumber
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/invoiceDetail/{invoicenumber}/{invoicedate}/{connumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
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
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoicedetailinput.setProvidernumber(user.getProvidernumber());
		invoicedetailinput.setUsername(user.getUsername());
		/*ID mapping*/
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
   }

	 
	 /*invoice adjust modal*/
	 /**
	 * 결제관리 > 고객결제내역 > 결제내역 목록 > 조정 buttn Clikc > 조정팝업 조회
	 * @param invoicenumber
	 * @param invoicedate
	 * @param connumber
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/invoiceAdjust/{invoicenumber}/{invoicedate}/{connumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewinvoiceAdjust(@PathVariable(value = "invoicenumber") int invoicenumber
			                       ,@PathVariable(value = "invoicedate") String invoicedate
			                       ,@PathVariable(value = "connumber") int connumber
			                       ,Model model
			                       ,Principal principal) {
		log.info("===================invoiceAdjust=====================");
		log.info("invoicenumber = " + invoicenumber + " / invoicedate = " + invoicedate + "/" + connumber);
		InvoiceDetailInput invoicedetailinput = new InvoiceDetailInput();
		invoicedetailinput.setInvoiceDate(invoicedate);
		invoicedetailinput.setInvoiceNumber(invoicenumber);
		invoicedetailinput.setConNumber(connumber);
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		invoicedetailinput.setProvidernumber(user.getProvidernumber());
		invoicedetailinput.setUsername(user.getUsername());
		/*ID mapping*/
		List<InvoiceAdjust> invoiceadjustlist = invoiceservice.getInvoiceAdjust(invoicedetailinput);
		
		ModelAndView modelAndView = new ModelAndView();
		model.addAttribute("invoiceadjustlist",invoiceadjustlist);
		model.addAttribute("invoicenumber",invoicenumber);
		model.addAttribute("invoicedate",invoicedate);
		model.addAttribute("connumber",connumber);
		modelAndView.setViewName("popup/adjustPopup");
		return modelAndView;
	 }
	 
	 /**
	 * 결제 팝업 조회
	 * 
	 * 
	 * 	@RequestMapping(value = "/adjustPopup/{invoicenumber}/{invoicedate}/{connumber}", 	 
	 * 	 public ModelAndView viewadjustDialog(@PathVariable(value = "invoicenumber") int invoicenumber
             ,@PathVariable(value = "invoicedate") String invoicedate
             ,@PathVariable(value = "connumber") int connumber
             ,Model model) {
	 * 
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/paymentDialog", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewpaymentDialog(Model model) throws Exception{
		log.info("===================paymentDialog=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/paymentPopup");	
		return modelAndView;
	 }
		
	
	 /**
	 * 결제관리 > 고객결제내역 > 결제내역 > 조정 버튼 (사용 가능성 0%)
	 * @param invoicenumber
	 * @param invoicedate
	 * @param connumber
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/adjustPopup/{invoicenumber}/{invoicedate}/{connumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewadjustDialog(@PathVariable(value = "invoicenumber") int invoicenumber
             ,@PathVariable(value = "invoicedate") String invoicedate
             ,@PathVariable(value = "connumber") int connumber
             ,Model model) {
		log.info("===================adjustPopup=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/adjustPopup");
		return modelAndView;
	 }
	 
	 /**
	 * 결제관리 > 고객결제내역 > 결제내역 > 결제내역 선택 > 환불 버튼 click > 환불 팝업 호출
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/refundDialog", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewrefundDialog(Model model) {
		log.info("===================refundPopup=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/refundPopup");
		return modelAndView;
	 }
	 
/*	 @RequestMapping(value = "/adjust-payment", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewPayment(Model model) {
		log.info("===================paymentview=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/payment-view");
		return modelAndView;
	 }
	 
	 @RequestMapping(value = "/refund", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewRefund(Model model) {
		log.info("===================viewInvoice=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/refund-view");
		return modelAndView;
	 }
 */
	
	 /*calendar*/
/*	 @RequestMapping(value = "/billing-board", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewBillingBoard(Model model) {
		log.info("===================viewInvoice=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/payment-board");
		return modelAndView;
	 }
*/	 
	 /**
	 * 결제관리 > 고객결제내역 > 결제내역 선택 > 환불 팝업 호출 > 환불처리
	 * @param paymenthistoryinput
	 * @param model
	 * @param principal
	 * @return
	 */
	 
	@RequestMapping(value = "/refundproc", method = RequestMethod.POST)
	 public int procRefund(@ModelAttribute PaymentHistoryInput paymenthistoryinput,Model model,Principal principal) {
		log.info("===================refundproc=====================");
		try {
			Thread.sleep(1500);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    int result = 0 ;
	    /*ID mapping*/
		User user = userService.readUser(principal.getName());
		paymenthistoryinput.setProvidernumber(user.getProvidernumber());
		paymenthistoryinput.setUsername(user.getUsername());
		/*ID mapping*/
	    result = invoiceservice.setRefundHistory(paymenthistoryinput);
	    if(result == 0) {
			return result;	
		 }
	    result = invoiceservice.updaterefundColInvoice(paymenthistoryinput);
	    result = invoiceservice.updaterefundColInvoiceDetail(paymenthistoryinput);
		return result;
	 }
	 
	 
	 @RequestMapping(value = "/recurringproc/{invoicenumber}/{connumber}/{invoicedate}/{paymentamt}", method = RequestMethod.POST)
	 public int procRecurring(@PathVariable(value = "invoicenumber") int invoicenumber
             ,@PathVariable(value = "invoicedate") String invoicedate
             ,@PathVariable(value = "connumber") int connumber
             ,@PathVariable(value = "paymentamt") int paymentamt
             ,Model model
             ,Principal principal) {
		PaymentHistoryInput paymenthistoryinput = new PaymentHistoryInput(invoicenumber, invoicedate, connumber ,paymentamt, "11PAYA") ;
		log.info("===================recurringproc=====================");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    int result = 0 ;
	    result = invoiceservice.setPaymentHistory(paymenthistoryinput);
	    if(result == 0) {
			return result;	
		 }
	    result = invoiceservice.updateColInvoice(paymenthistoryinput);
		return result;
	 }
	 
	/**
	 * 결제관리 > 고객결제내역 > 결제내역 > 조정 팝업 호출 > 조정 처리
	 * @param invoiceClassificationCode
	 * @param revenueItemCode
	 * @param adjustPossibleAmount
	 * @param adjustamt
	 * @param adjustinvoicenumber
	 * @param adjustinvoicedate
	 * @param adjustconnumber
	 * @param adjustreasonmessage
	 * @param model
	 * @param principal
	 * @return
	 */
	 
	@RequestMapping(value = "/adjust", method = RequestMethod.GET)
	public int procAdjust(
			@RequestParam("invoiceClassificationCode") String invoiceClassificationCode,
			@RequestParam("revenueItemCode") String revenueItemCode,
			@RequestParam("adjustPossibleAmount") int adjustPossibleAmount, 
			@RequestParam("adjustamt") int adjustamt,
			@RequestParam("adjustinvoicenumber") int adjustinvoicenumber,
			@RequestParam("adjustinvoicedate") String adjustinvoicedate,
			@RequestParam("adjustconnumber") int adjustconnumber,
			@RequestParam("adjustreasonmessage") String adjustreasonmessage, Model model,Principal principal) {
		log.info("===================adjustproc=====================");
		log.info("invoiceClassificationCode = " + invoiceClassificationCode
				          +"revenueItemCode = " + revenueItemCode
				          +"adjustPossibleAmount = " + adjustPossibleAmount
				          +"adjustinvoicenumber = " + adjustinvoicenumber
				          +"adjustinvoicedate = " + adjustinvoicedate
				          +"adjustconnumber = " + adjustconnumber
				          +"adjustreasonmessage = " + adjustreasonmessage
				);
		InvoiceAdjustInput iai = new InvoiceAdjustInput(adjustinvoicenumber, adjustinvoicedate, adjustconnumber,
				invoiceClassificationCode, revenueItemCode, adjustPossibleAmount, adjustamt, adjustreasonmessage);
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		iai.setProvidernumber(user.getProvidernumber());
		iai.setUsername(user.getUsername());
		/*ID mapping*/
		int result = 0;
		log.info("===================setInvoiceAdjust=====================");
		result = invoiceservice.setInvoiceAdjust(iai);
		if (result == 0) {
			return result;
		}
		int gubun = invoiceservice.checkInvoiceAdjust(iai);
		if(gubun > 0 ) {
			log.info("===================updateInvoiceAdjust=====================");
			result = invoiceservice.updateInvoiceAdjust(iai);
			if (result == 0) {
				return result;
			}
		}else {
			log.info("===================setInvoiceAdjustInvoiceDetail=====================");
			result = invoiceservice.setInvoiceAdjustInvoiceDetail(iai);
			if (result == 0) {
				return result;
			}
		}
		
		log.info("===================updateInvoiceAdjustInvoiceDetail=====================");
		result = invoiceservice.updateInvoiceAdjustInvoiceDetail(iai);
		if (result == 0) {
			return result;
		}
		log.info("===================updateInvoiceAdjustAply=====================");
		result = invoiceservice.updateInvoiceAdjustAply(iai);
		if (result == 0) {
			return result;
		}
		return result;

	}
	
	@RequestMapping(value = "/sendEmailPopup", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewsendEmailPopup(Model model) {
		log.info("===================sendEmailPopup=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/sendEmailPopup");
		return modelAndView;
	 }
	
/*	@RequestMapping(value = "paypalrcv", method = { RequestMethod.GET, RequestMethod.POST }, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public void paypalrcv(HttpServletRequest request) {
		log.info("===================paypalrcv=====================");
		PaymentHistoryInput paymenthistoryinput = new PaymentHistoryInput(1234, "20180906", 1234 ,10, "PAYPAL") ;

	    invoiceservice.setPaymentHistory(paymenthistoryinput);
		//VerifyPaymentByPayPal vp =  new VerifyPaymentByPayPal();
		
	 }*/
	
	// 배송대상조회
	@RequestMapping(value = "/deliverylist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDeliveryList(Model model,Principal principal) {
		log.info("===================DELIVERY-deliverylist=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/deliverylist");
		return modelAndView;
	}

	/* 배송대상조회 search bar-datepicker */
	@RequestMapping(value = "/searchbardelivery", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewSearchDateBarDelivery(Model model) {
		log.info("===================DELIVERY-searchbar-delivery=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/searchbar-delivery");
		return modelAndView;
	}

	// 배송대상조회 - 실제조회내용
	@RequestMapping(value = "/getdeliverylist", method = RequestMethod.GET)
	public Map<String, Object> getDeliverylist(@ModelAttribute DeliveryDateInput deliverydateinput, Model model,Principal principal) {
		log.info("===================DELIVERY-getdeliverylist=====================");
		log.info(deliverydateinput.getFromDateD());
		log.info(deliverydateinput.getToDateD());
		Map<String, Object> map = new HashMap<>();
		Criteria cri = deliverydateinput;
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		deliverydateinput.setProvidernumber(user.getProvidernumber());
		deliverydateinput.setUsername(user.getUsername());
		/*ID mapping*/
		
		map.put("lists", deliveryservice.getDeliveryByDate(deliverydateinput)); // 리스트fetch
		// log.info(map.get("lists") );
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(deliveryservice.getDeliveryTotCount(deliverydateinput));

		log.info("getTotalCount=>" + pageMaker.getTotalCount());
		map.put("pageMaker", pageMaker);
		return map;
	}

	// 배송대상조회 하단의 패키지내역 조회
	@RequestMapping(value = "/getPackageData", method = RequestMethod.GET)
	public Map<String, Object> getPackageData(@ModelAttribute DeliveryPackageInput deliverypackageinput, Model model,Principal principal) {
		log.info("===================DELIVERY-getPackageData=====================");
		Map<String, Object> map = new HashMap<>();
		Criteria cri = deliverypackageinput;
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		deliverypackageinput.setProvidernumber(user.getProvidernumber());
		deliverypackageinput.setUsername(user.getUsername());
		/*ID mapping*/
		map.put("lists", deliveryservice.getPackageData(deliverypackageinput)); // 리스트fetch
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(deliveryservice.getPackageTotalCount(deliverypackageinput));

		log.info("getTotalCount=>" + pageMaker.getTotalCount());
		map.put("pageMaker", pageMaker);
		return map;
	}
	
	/**
	 * kakaopay test
	 * @param paymenthistoryinput
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/kakaopayready", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public String test(@ModelAttribute PaymentHistoryInput paymenthistoryinput
			            ,Model model
			            ,Principal principal) {
		log.info("===================kakaopayready=====================");
		//session.setAttribute(UserConfig, value);
	    //session.setAttribute(UserConfig.SESS_USER_ID, '1');
	    //session.setAttribute(UserConfig.SESS_USER_NAME, '2');
	    // expired in 10 minutes
	    //session.setMaxInactiveInterval(60 * 10);
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		paymenthistoryinput.setUsername(user.getUsername());
		
		SendCurl sc = new SendCurl(paymenthistoryinput.getItemname()
	            , "1"
	            , String.valueOf(paymenthistoryinput.getPaymentamt())
	            , "0"
	            , paymenthistoryinput.getVatamount()
	            , paymenthistoryinput.getInvoicenumber()
	            , paymenthistoryinput.getInvoicedate()
	            , paymenthistoryinput.getConnumber()
	            , paymenthistoryinput.getPaymentamt()
	            );
		sc.payKaKaoPay();
		paymenthistoryinput = sc.setTidvalue(paymenthistoryinput);
		log.info("connumber = " +paymenthistoryinput.getConnumber()
		        + "invoicedate = " +paymenthistoryinput.getInvoicedate()
		        + "invoicenumber = " +paymenthistoryinput.getInvoicenumber()
		        + "paymentamt = " +paymenthistoryinput.getPaymentamt()
		        + "tid = " +paymenthistoryinput.getTid()
		);
		int result = invoiceservice.insertPgpaymentlist(paymenthistoryinput);
		if(result != 1) {
			return "insertPgpaymentlist error";
		}
		return sc.payKaKaoPay();
	 }
	
	@RequestMapping(value = "/success", method = {RequestMethod.GET,RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView kakaosuccess(
			@RequestParam("paymentamt") int paymentamt,
			@RequestParam("invoicenumber") int invoicenumber,
			@RequestParam("invoicedate") String invoicedate,
			@RequestParam("connumber") int connumber
			 ,Model model
			 ,Principal principal) 
	{
		PaymentHistoryInput paymenthistoryinput = new PaymentHistoryInput(invoicenumber, invoicedate, connumber ,paymentamt, "KAKAOPAY") ;
		//session.setAttribute(UserConfig, value);
	    //session.setAttribute(UserConfig.SESS_USER_ID, '1');
	    //session.setAttribute(UserConfig.SESS_USER_NAME, '2');
	    // expired in 10 minutes
	    //session.setMaxInactiveInterval(60 * 10);
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		paymenthistoryinput.setProvidernumber(user.getProvidernumber());
		paymenthistoryinput.setUsername(user.getUsername());
		/*ID mapping*/
		int result = 0;
		result = invoiceservice.setPaymentHistory(paymenthistoryinput);
		result = invoiceservice.updateColInvoice(paymenthistoryinput);
		result = invoiceservice.updateColInvoiceDetail(paymenthistoryinput);
		//판매시 청구 내역과 배송 내역 일괄 생성
		//deliveryservice.insertDeliveryDetail(paymenthistoryinput);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/billing/kakaosuccess");
		return modelAndView;
	 }
	
}
