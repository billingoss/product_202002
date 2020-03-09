package com.api.controller;

import java.math.BigDecimal;
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
import com.api.model.billing.BillKeyHistory;
import com.api.model.billing.ChannelBillingInformation;
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
import com.api.model.billing.TrancelateInvoice;
import com.api.model.contract.ContractInsert;
import com.api.model.contract.ContractList;
import com.api.service.ChannelService;
import com.api.service.CodeService;
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
	
	@Autowired
	private ChannelService channelService;
	
	@Autowired
	private CodeService codeService;
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
	//@RequestMapping(value = "/billing-calculation-contract/{connumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
/*	public PaymentPrePayInvoiceInput setBillingCalaulationByContract(@PathVariable(value = "connumber") int connumber, Model model, Principal principal) {
		log.info("===================setBillingCalaulation=====================");
		log.info("connumber = " + connumber);
		
		
		//Parameter mapping : 계약 정보
		ContractInsert idi = new ContractInsert();
		idi.setConNumber(connumber);	계약번호				
		
		PaymentPrePayInvoiceInput paymentPrePayInvoiceInput = new PaymentPrePayInvoiceInput();
		int result = 0;
		
		
		 * Step1. 계약번호로 계약 정보를 조회 한다. 	
		 
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

			*//*******************************************************************************************************************************
			 * Step2. 계약기간 유효기간을 조회 하여 계약 시점 이후로 월단위 청구 일자 목록을 생성 한다. 
			 *******************************************************************************************************************************//*
			//선불여부 조회
			String prePaymentYn = this.getPrePaymentYn(contInfo.getChannelId(), contInfo.getProviderNumber());
			List<Map<String, String>> dateList = this.makeInvoiceDateList(effectstartdatetime, effectenddatetime, recurringInvoiceYn, contInfo.getProviderNumber());
			
			*//*******************************************************************************************************************************
			 * Step3. 청구 계산 금액을 생성한다. 
			 *******************************************************************************************************************************//*
			InvoiceCalculationInput invoiceCalculationInput = new InvoiceCalculationInput();
			
			int turn= 0;
			for (Map<String, String> map : dateList) {				
				log.info("invoicedate ==> "+map.get("invoicedate"));				// 청구일자
				log.info("invoicedate ==> "+map.get("invoicedate"));				// 청구일자
				log.info(", invoicestartdate ==>"+map.get("invoicestartdate"));		// 청구시작일자
				log.info(", invoiceenddate ==> "+map.get("invoiceenddate"));		// 청구종료일자
				log.info(", totinvoiceday ==> "+map.get("totinvoiceday"));		// 총 청구일수
				
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
				invoiceCalculationInput.setRecurringPaymentYn(recurringInvoiceYn);
				
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
								
				//Step3-3. 할인율 적용 금액 insert
				if (result > 0) {				
					this.insertInvoiceCalculationDiscount(invoiceCalculationInput);				
				}
				
				//Step3-4. 배송비 할인 여부에 따라 배송비를 청구 총액에 적용 한다.
				if (!"FREE".equals(contInfo.getDeliveryChargeType())) {
					//invoiceamount = invoiceamount+(contInfo.getDeliveryChargeAmount()* termMonth);
					//배송비 항목을 insertInvoiceCalculation에 입력 한다.
					
					InvoiceCalculationInput delivaryPay = invoiceCalculationInput;
					delivaryPay.setInvoiceAmount(contInfo.getDeliveryChargeAmount());
					delivaryPay.setCollectionBalanceAmount(contInfo.getDeliveryChargeAmount());
					delivaryPay.setRevenueItemCode("DELIVERY");					
					result = result+this.invoiceservice.insertInvoiceCalculation(delivaryPay);
				}
			}
			
			*//*******************************************************************************************************************************
			 * Step4. 청구 상세 내역을 생성 한다. 
			 *******************************************************************************************************************************//*
			if (result > 0) {				
				this.insertInvoiceDetail(invoiceCalculationInput);				
			}	
			
			*//*******************************************************************************************************************************
			 * Step5. 청구 내역을 확정하고 생성  한다. 
			 *******************************************************************************************************************************//*
			if (result > 0) {				
				this.insertInvoice(invoiceCalculationInput);				
			}		
			
			*//*******************************************************************************************************************************
			 * Step6. 배송내역에 invoicenumber를 update 한다. 
			 *******************************************************************************************************************************//*			
			if (result > 0) {				
				int deliveryCnt = this.invoiceservice.updateDeliveryDetailByInvoiceNumber(contInfo);
			}
			
			*//*******************************************************************************************************************************
			 * Step7. 정기결제를 신청을 위해 1건의 청구 정보를 조회 한다.
			 *******************************************************************************************************************************//*			
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
	*/
	
	/**
	 * 계약 정보 기준 청구 내역 생성 -> 다건 상품
	 * @param connumber
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/billing-calculation-contract/{connumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PaymentPrePayInvoiceInput setBillingCalaulationByContractMulti(@PathVariable(value = "connumber") int connumber, Model model, Principal principal) {
		log.info("===================setBillingCalaulationByContractMulti=====================");
		log.info("connumber = " + connumber);
		
		//Parameter mapping : 계약 정보
		ContractInsert idi = new ContractInsert();
		idi.setConNumber(connumber);	/*계약번호*/	
		
		//결제 신청을 위한 청구 1건 정보
		PaymentPrePayInvoiceInput paymentPrePayInvoiceInput = new PaymentPrePayInvoiceInput();
		int result = 0;
		/******************************************************************************
		 * Step1. 계약 정보를 조회 한다.
		 ******************************************************************************/
		ContractInfoDetail contDetail = this.invoiceservice.getContractInfo(connumber);
		
		
		//계약 존재 여부 확인
		if(contDetail != null && contDetail.getConNumber() > 0) {
			/******************************************************************************
			 * Step2. 계약에 물려 있는 상품 정보를 조회 한다.
			 ******************************************************************************/
			List<ContractInsert> contProductList = this.invoiceservice.getContractAndProductList(idi);
			
			//가입일자
			String subScribeDateTime = contDetail.getSubscribeDateTime();			
			//서비스 시작일자 
			String effectstartdatetime = contDetail.getEffectStartDateTime();			
			//서비스 종료일자 
			String effectenddatetime = contDetail.getEffectEndDateTime();			
			//정기결제 여부
			String recurringInvoiceYn = contDetail.getRecurringInvoiceYn();
			//기한 무제한 여부
			boolean unLimitedFlag = false;			
			if ("99991231".equals(contDetail.getEffectEndDateTime())) {
				unLimitedFlag = true;
			}
			
			/*******************************************************************************************************************************
			 * Step3. 계약기간 유효기간을 조회 하여 계약 시점 이후로 월단위 청구 일자 목록을 생성 한다. 
			 *******************************************************************************************************************************/
						
			int turn= 0; //회차 count			
			//종료 일자가 99991231일 경우 회차는 총 회차는 표기 하지 않고 누적 회차만 표기 한다.
			String lastInvoDate = "";
			if(unLimitedFlag) {
				//마지막 청구 정보 조회
				Invoice lastInvo = this.invoiceservice.getLastInvoiceInfo(contDetail.getConNumber());
				if (lastInvo != null) {
					//마지막 회차를 조회 한다.
					if(lastInvo.getInvoiceTurn() != null && !"".equals(lastInvo.getInvoiceTurn())) {												
						turn = Integer.parseInt(lastInvo.getInvoiceTurn());
					}
					//마지막 청구 일자를 조회 하여 마지막 청구 다음 날짜를 청구 시작일로 설정 한다.
					if(lastInvo.getInvoiceDate() != null && !"".equals(lastInvo.getInvoiceDate())) {
						lastInvoDate = lastInvo.getInvoiceDate();
					}
				}
			}
			
			//청구 일자 목록 조회			
			List<Map<String, String>> dateList = this.makeInvoiceDateList(effectstartdatetime, effectenddatetime, recurringInvoiceYn, contDetail.getProviderNumber(), contDetail.getChannelId(), lastInvoDate);			
			int makeDateCount = 0;
			
			InvoiceCalculationInput invoiceCalculationInput = new InvoiceCalculationInput();
			for (Map<String, String> map : dateList) {
				turn ++;
				/******************************************************************************
				 * Step4. InvoiceCalculation에 상품을 등록 한다. (청구 계산 금액 생성)
				 ******************************************************************************/
				invoiceCalculationInput = new InvoiceCalculationInput();
				
				for (ContractInsert contInfo : contProductList) {
					/*log.info("invoicedate ==> "+map.get("invoicedate"));				//청구일자
					log.info("invoicedate ==> "+map.get("invoicedate"));				//청구일자
					log.info(", invoicestartdate ==>"+map.get("invoicestartdate"));		//청구시작일자
					log.info(", invoiceenddate ==> "+map.get("invoiceenddate"));		//청구종료일자
					log.info(", totinvoiceday ==> "+map.get("totinvoiceday"));			//총 청구일수
					*/
					
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
					invoiceCalculationInput.setRecurringPaymentYn(recurringInvoiceYn);
					
					int termMonth = 1;
					try {					
						invoiceCalculationInput.setInvoiceAplyDay(DateUtil.dateDiff("d", contInfo.getEffectStartDateTime(), map.get("invoiceenddate")));
						if ("N".equals(contInfo.getRecurringInvoiceYn())) {						
							termMonth = DateUtil.dateDiff("M", effectenddatetime, effectstartdatetime);
						}
					} catch (Exception e) { 
						invoiceCalculationInput.setInvoiceAplyDay(0);					
					}
					
					//일괄결제의 경우 종료 월이 +1이 안될 경우 보정
					if (termMonth < 1) {
						termMonth = 1;
					}
					
					//Step4-1. 청구 총액 계산
					int invoiceamount = contInfo.getPriceAmount() * contInfo.getProductQuantity()* termMonth;

					invoiceCalculationInput.setInvoiceAmount(invoiceamount);
					invoiceCalculationInput.setCollectionBalanceAmount(invoiceamount);
					invoiceCalculationInput.setUserName(contInfo.getAuditId());
					
					//Step4-2. 청구 계산 금액  insert
					//이미 등록된 청구 내역이 있을 경우 skip
					if (this.invoiceservice.getInvoiceCount(invoiceCalculationInput) == 0) {
						String invoiceTurn = Integer.toString(turn);						
						if(!unLimitedFlag) {
							invoiceTurn += ("/"+dateList.size());
						}
						invoiceCalculationInput.setInvoiceTurn(invoiceTurn);
						
						//상품 청구 내역 등록
						result = result+this.invoiceservice.insertInvoiceCalculation(invoiceCalculationInput);
					}
					/******************************************************************************
					 * Step5. InvoiceCalculationInput 할인을 적용 한다. - 상품기준
					 ******************************************************************************/
					invoiceCalculationInput.setDiscountTarget("PRODUCT");
					invoiceCalculationInput.setProductId(contInfo.getProductId());					
					invoiceCalculationInput.setCurrentTurn(turn);
					this.insertInvoiceCalculationDiscountList(invoiceCalculationInput);
				}						
				/******************************************************************************
				 * Step6. InvoiceCalculationInput 할인을 적용 한다.
				 ******************************************************************************/
				if (result > 0) {				
					//this.insertInvoiceCalculationDiscount(invoiceCalculationInput);
					invoiceCalculationInput.setDiscountTarget("CONTRACT");
					this.insertInvoiceCalculationDiscountList(invoiceCalculationInput);
				}
				
				/******************************************************************************
				 * Step7. InvoiceCalculationInput 배송비를 적용 한다.
				 ******************************************************************************/
				if (!"FREE".equals(contDetail.getDeliveryChargeType())) {
					//배송비 항목을 insertInvoiceCalculation에 입력 한다.					
					InvoiceCalculationInput delivaryPay = invoiceCalculationInput;
					delivaryPay.setInvoiceAmount(contDetail.getDeliveryChargeAmount());
					delivaryPay.setCollectionBalanceAmount(contDetail.getDeliveryChargeAmount());
					delivaryPay.setRevenueItemCode("DELIVERY");					
					result = result+this.invoiceservice.insertInvoiceCalculation(delivaryPay);
				}
				
			}
			
			/*****************************************************************************
			 * Step7. 청구 상세 내역을 생성 한다. 
			 *****************************************************************************/
			if (result > 0) {				
				this.insertInvoiceDetail(invoiceCalculationInput);				
			}	
			
			/*******************************************************************************************************************************
			 * Step8. 청구 내역을 확정하고 생성  한다. 
			 *******************************************************************************************************************************/
			if (result > 0) {				
				this.insertInvoice(invoiceCalculationInput);				
			}		
			
			/*******************************************************************************************************************************
			 * Step9. 배송내역에 invoicenumber를 update 한다. 
			 *******************************************************************************************************************************/			
			if (result > 0) {				
				ContractInsert contInfo = new ContractInsert();
				contInfo.setProviderNumber(contDetail.getProviderNumber());
				contInfo.setConNumber(connumber);
				
				//contDetail.getChannelId();
				//contDetail.getProviderNumber();
				
				//TODO : 후불결제 일경우 배송 상태를 BEFORE(배송대기)상태로 변경 한다.
				int deliveryCnt = this.invoiceservice.updateDeliveryDetailByInvoiceNumber(contInfo);
			}
			
			/*******************************************************************************************************************************
			 * Step10. 정기결제를 신청을 위해 1건의 청구 정보를 조회 한다.
			 *******************************************************************************************************************************/
			if (result> 0 ) {
				paymentPrePayInvoiceInput.setProviderNumber(contDetail.getProviderNumber());
				paymentPrePayInvoiceInput.setConNumber(contDetail.getConNumber());
				
				ContractInsert contractInsert = new ContractInsert();
				contractInsert.setConNumber(contDetail.getConNumber());
				contractInsert.setProviderNumber(contDetail.getProviderNumber());
				
				InvoiceCalculationInput invoiceOne = this.invoiceservice.getInvoiceNumberByOne(contractInsert);
				
				paymentPrePayInvoiceInput.setInvoiceNumber(invoiceOne.getInvoiceNumber());				
				paymentPrePayInvoiceInput.setInvoiceDate(invoiceOne.getInvoiceDate());				
			}
		}
				
		return paymentPrePayInvoiceInput;
	}
	
	
	/**
	 * 계약의 할인 항목을 조회 하여 insert 한다.
	 * @param invoiceCalculationInput
	 * @return
	 */
	private int insertInvoiceCalculationDiscountList(InvoiceCalculationInput invoiceCalculationInput) {
		int resultCount = 0;		
		/*********************************************************************************************
		 * Step1. 계약 또는 상품별 할인 목록 중 Amount를 조회 한다. discount order로 정렬
		 *********************************************************************************************/
		invoiceCalculationInput.setDiscountType("AMOUNT%");		
		List<InvoiceCalculationInput> contractDiscountList = this.invoiceservice.selectContractDiscountList(invoiceCalculationInput);
		
		//임시 청구 금액
		int tempInvoiceAmount = 0;
		for (InvoiceCalculationInput item : contractDiscountList) {
			/***********************************************************
			 * Step2 적용 가능 한 회차인지 확인 한다. 
			 ***********************************************************/
			if (invoiceCalculationInput.getCurrentTurn() <= item.getDiscountApplyCount()) {				
				//금액일 경우 총 금액에 상관 없이 -처리 된다.
				tempInvoiceAmount= item.getDiscountValue() * -1;
				item.setInvoiceAmount(tempInvoiceAmount);
				item.setCollectionBalanceAmount(tempInvoiceAmount);
				item.setUserName(invoiceCalculationInput.getUserName());
				/***********************************************************
				 * Step3. 적용 가능한 회차일 경우 calculation에 insert 한다.
				 ***********************************************************/
				resultCount += this.invoiceservice.insertInvoiceCalculation(item);
			}
		}
				
		/*********************************************************************************************
		 * Step4. 계약 또는 상품별 할인 목록 중 RATE를 조회 한다. discount order로 정렬
		 *********************************************************************************************/
		invoiceCalculationInput.setDiscountType("RATE%");		
		contractDiscountList = this.invoiceservice.selectContractDiscountList(invoiceCalculationInput);
		
		int tempDiscountValue = 0;	//할인 적용 대상 금액
		int itemCount = 0;					
		int sumInvoAmount = 0;		// Sum  금액
		
		for (InvoiceCalculationInput item : contractDiscountList) {
			//할인 항목 count;
			itemCount ++;
			if(itemCount == 1) {
				//현재 총 금액을 담고 반복하여 - 한다.
				sumInvoAmount = item.getSumInvoiceAmount();				
			}
			/***********************************************************
			 * Step5 적용 가능 한 회차인지 확인 한다. 
			 ***********************************************************/
			if (invoiceCalculationInput.getCurrentTurn() <= item.getDiscountApplyCount()) {
				tempDiscountValue = item.getDiscountValue();
				tempInvoiceAmount = new BigDecimal((sumInvoAmount*tempDiscountValue/100)*(-1)).setScale(-1, BigDecimal.ROUND_UP).intValue();
				
				//tempInvoiceAmount= item.getSumInvoiceAmount() * 1;
				item.setInvoiceAmount(tempInvoiceAmount);
				item.setCollectionBalanceAmount(tempInvoiceAmount);
				item.setUserName(invoiceCalculationInput.getUserName());
				/***********************************************************
				 * Step6. 적용 가능한 회차일 경우 calculation에 insert 한다.
				 ***********************************************************/
				resultCount += this.invoiceservice.insertInvoiceCalculation(item);
				
				sumInvoAmount = sumInvoAmount + tempInvoiceAmount;
			}
		}
	
		return resultCount;				
	}

	/**
	 * 청구 계산 내역 기준 할인금액 계산
	 * @param calfromdate
	 * @return
	 */	 
	private int insertInvoiceCalculationDiscount(InvoiceCalculationInput calfromdate) {
		   int result = 1 ;
		   //정액할인
		   result += invoiceservice.setInvoiceCalculationDiscountAmount(calfromdate);
		   //정률할인
		   result += invoiceservice.setInvoiceCalculationDiscountRate(calfromdate);
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
		/******************************************************************
		Step1. 청구 상세 내역 생성
		*******************************************************************/
		result += invoiceservice.setInvoiceDetail(calfromdate);
		
		/******************************************************************
		Step2. 청구 상세 내역 청구서 번호 수청
		*******************************************************************/
		result += invoiceservice.updateInvoiceDetail(calfromdate);
		
		/******************************************************************
		Step3. 청구 계산 내역 청구서 번호 수정
		*******************************************************************/
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
		/******************************************************************
		Step1. 청구내역 생성 _ 청구 확정
		*******************************************************************/
		result = invoiceservice.setInvoice(calfromdate);
		if(result == 0) {
		 return result; 
		}	
		return result; 
	}
	
	/**
	 * 서비스 시작일과 종료 일자를 받아 청구 기간 목록을 조회 한다.
	 * @param startDate	서비스시작일자
	 * @param endDate	서비스종료일자
	 * @param recurringInvoiceYn  정기결제 여부
	 * @return
	 */	 
	private List<Map<String, String>> makeInvoiceDateList(String startDate, String endDate, String recurringInvoiceYn, int providerNumber, String channelId, String lastInvoDate){
		List<Map<String, String>> dateList = new ArrayList<Map<String, String>>();
		Map tempMap ;	//계산된 청구 일자, 시작, 종료, 일수 를 담는다.

		/**************************************************************************************
		Step1. 판매처의 청구 주기를 조회 한다.
		**************************************************************************************/
		ProviderInformation providerInformation = new ProviderInformation();
		providerInformation.setProviderNumber(providerNumber);
		providerInformation.setCode("BILLING");
		providerInformation.setDetailCode("invoiceCycle");
		ProviderInformation providerInfo = this.providerService.getProviderInformationOne(providerInformation);		
		
		int invoiceCycle = 1;
		//판매처의 청구 주기가 없을 경우 기본 값은 1개월 단위
		if (providerInfo != null && !"".equals(providerInfo.getValue1())) {
			invoiceCycle = Integer.parseInt(providerInfo.getValue1());
		}		
		
		//선납 여부 조회
		String prePaymentYn = this.channelService.selectPrePaymentYn(channelId, providerNumber);		

		//마지막 청구 일자가 있을 경우 청구 시작 일자를 마지막 청구일 다음 날짜로 설정 한다.
		if(lastInvoDate != null && !"".equals(lastInvoDate)) {
			startDate = DateUtil.getAddDay(lastInvoDate, 1);
		}
		
		/*******************************************************************************************************************************
		//청구 내역의 재생성으로 판단하여 마지막 청구일자 다음해 12월까지 데이터를 생성 한다.
		//종료 일자가 '99991230'인 경우 해지 전까지 무제한 구독으로 판단하여 청구 내역을 생성 한다.
		//1. 계약 당해 년도 : 계약일 ~ 당해년도 12월까지
		//2. 자동 생성 : 마지막 청구일 다음 년도 12월, 실행 시점이 12월 중임으로 다음해 1년치를 미리 생성 한다.
		*******************************************************************************************************************************/		
		if("99991231".equals(endDate)) {
			if(lastInvoDate != null && !"".equals(lastInvoDate)) {
				endDate = (Integer.parseInt(lastInvoDate.substring(0,4))+1)+"1231";
			}else {				
				endDate = startDate.substring(0,4)+"1231";
			}
		}
		
		// 후불일 경우 청구 일자는 해당 월의 1일 부터 시작 한다.
		if("N".equals(prePaymentYn)) {
			startDate = startDate.substring(0, 6)+"01";
		}
		
		try {		
			/**************************************************************************************
			Step2. 일괄결제: 한건의 청구 내역을 생성
			 		  정기결제: 청구주기를 적용 하여 일자 생성
			**************************************************************************************/
			if("Y".equals(recurringInvoiceYn)) {
				//정기결제
				String tempStartDate =  startDate;
				String tempEndDate = DateUtil.getAddDay(DateUtil.wDate(tempStartDate, invoiceCycle),-1);
				int startDay = 0;
				int endDay = 0;
				
				//시작일자가 종료일자 앞에 있을때, 반복되는 종료 일자가 종료일자 앞에 있을때 
				while (DateUtil.dateDiff("d",tempEndDate, endDate)>= 0 ) {				
					
					//tempStartDate = startDate;				
					//tempEndDate = DateUtil.getAddDay(DateUtil.wDate(tempStartDate, invoiceCycle),-1);
										
					//startDate =DateUtil.wDate(tempStartDate, invoiceCycle);	//다음 청구 일자 계산
					
					tempMap = new HashMap<String, String>();
					
					//후불일 경우 청구 일자를 그 달의 말로 한다.
					if("N".equals(prePaymentYn)) {						
						tempMap.put("invoicedate", tempEndDate);			/*청구일자*/
					}else {						
						tempMap.put("invoicedate", tempStartDate);			/*청구일자*/
					}
					tempMap.put("invoicestartdate", tempStartDate);		/*청구시작일자*/
					tempMap.put("invoiceenddate", tempEndDate);			/*청구종료일자*/
					tempMap.put("totinvoiceday", ""+DateUtil.dateDiff("d", tempStartDate, tempEndDate));			/*총청구일수*/					
					
					dateList.add(tempMap);	
					
					tempStartDate = DateUtil.wDate(tempStartDate, invoiceCycle);	//다음 청구 일자 계산			
					tempEndDate = DateUtil.getAddDay(DateUtil.wDate(tempStartDate, invoiceCycle),-1);

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
		
		//TODO 후불인 경우 배송 상태를 변경 하지 않고.. 선불일 경우만 배송 상태를 변경 한다
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
		
		//계약 ACTIVATION로 상태 변경 => 결제 상태는 변경 할 수 없다. 20191008 정필교
		/*ContractInsert idi = new ContractInsert();		 
		idi.setConNumber(paymenthistoryinput.getConNumber());
		idi.setProviderNumber(paymenthistoryinput.getProviderNumber());
		idi.setContractState("ACTIVATION");	
		idi.setUserName(paymenthistoryinput.getUserName());
		this.invoiceservice.updateContractContractstate(idi);*/

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
	
	/**
	 * 신용카드 정보 변경 이력 조회 
	 * @param billKeyHistory
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getBillKeyHistory", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Map<String, Object> selectBillKeyHistory(@ModelAttribute BillKeyHistory billKeyHistory, Model model, Principal principal) {
		log.info("===================invoiceAdjust=====================");

		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		
		/*ID mapping*/
		List<BillKeyHistory> billKeyList= this.invoiceservice.selectBillKeyHistory(billKeyHistory);
		
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("billKeyList", billKeyList); // 리스트fetch		 
		return map;
		
	}	

	/**
	 * 조정 내역 처리
	 * @param invoiceAdjustInput
	 * @param model
	 * @param principal
	 * @return
	 */
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
		
		//채널/업체별 선납여부 및 결제 여부 조회 TODO
		ChannelBillingInformation channelInfo = this.channelService.selectChannelBillingInforByConnumber(invoiceSearch.getConNumber());
		
		map.put("channelInfo", channelInfo); // 채널 청구 정보
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
			orderSql += "invoList.invoicedate DESC";
			orderIndex ++;
		}
		
		//회차
		if(!StringUtil.isEmpty(invoiceSearch.getInvoiceTurnSort()) && "Y".equals(invoiceSearch.getInvoiceTurnSort())) {
			if (orderIndex != 0) {
				orderSql += ", ";
			}
			orderSql += "invoList.invoiceTurn DESC	";			
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
			orderSql += " invoList.invoicedate ASC";			
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
	    	if("정기결제".equals(invoice.getPaymentType())) {
	    		excel.setCellValue("N", colNum++, invoice.getInvoiceCycle());	    		
	    	}else {	    		
	    		excel.setCellValue("N", colNum++, "");
	    	}
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
		
	/**
	 * 해당 채널/ 업체의 선납 여부 조회
	 * @param channelId
	 * @param providerNumber
	 * @return
	 */
	public String getPrePaymentYn (String channelId, int providerNumber) {
		ChannelBillingInformation billingInfo =  this.channelService.selectChannelBillingInformation(channelId, providerNumber);
		String prePaymentYn = "Y";
		if (billingInfo != null && "".equals( billingInfo.getPrePaymentYn())) {
			prePaymentYn = billingInfo.getPrePaymentYn(); 
		}
		return prePaymentYn;
	}

	//selectTrancelateInvoiceList
		
	@RequestMapping(value = "/getSendBillListAndPayComplateExcel", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	 
	public void getSendBillListAndPayComplate(@ModelAttribute TrancelateInvoice trancelateInvoice, Model model, Principal principal, HttpServletResponse response) throws Exception {
		log.info("===================getInvoicePaymentList=====================");

		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		trancelateInvoice.setProviderNumber(user.getProviderNumber());
		
		String fileName = trancelateInvoice.getChannelName()+"_"+user.getProviderName()+"_"+trancelateInvoice.getSearchDate();
		PaymentHistoryInput paymentHistoryInput = new PaymentHistoryInput();
		int resultCount =0;
		int result = 0;
    	
		//채널ID
		/*******************************************************
		청구 내역 전송 대상 조회
		*******************************************************/
		List<TrancelateInvoice> invoList = this.invoiceservice.selectTrancelateInvoiceList(trancelateInvoice);
		
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet(fileName);
		
		//헤더 생성
		int colNum = 0;
		int rowNum = 0;
		excel.createRow();
		excel.setCellValue("Y", colNum++, "번호");
		excel.setCellValue("Y", colNum++, "상품ID");		
		excel.setCellValue("Y", colNum++, "상품명");
		excel.setCellValue("Y", colNum++, "서비스관리번호");
		excel.setCellValue("Y", colNum++, "상품가격");
		excel.setCellValue("Y", colNum++, "과금시작일자");
		excel.setCellValue("Y", colNum++, "과금종료일자");
		excel.setCellValue("Y", colNum++, "구매번호");
		excel.setCellValue("Y", colNum++, "서비스관리번호_PPM구매가입내역");
		excel.setCellValue("Y", colNum++, "배송(예정포함)여부");
		excel.setCellValue("Y", colNum++, "최종청구금액");
			
		//엑셀 바디 생성
		for (TrancelateInvoice sendInvo : invoList) {
			colNum = 0;
		    excel.createRow();
	    	excel.setCellValue("N", colNum++, String.valueOf(++rowNum));
	    	excel.setCellValue("N", colNum++, sendInvo.getProductId());
	    	excel.setCellValue("N", colNum++, sendInvo.getProductName());
	    	excel.setCellValue("N", colNum++, sendInvo.getChannelCustomerNumber());
	    	excel.setCellValue("N", colNum++, NumberUtil.getCommaNumber(sendInvo.getPriceAmount()));
	    	excel.setCellValue("N", colNum++, DateUtil.getDateFormat(sendInvo.getSubscribeDateTime(),"-"));
	    	excel.setCellValue("N", colNum++, DateUtil.getDateFormat(sendInvo.getEffectEndDateTime(),"-"));
	    	excel.setCellValue("N", colNum++, sendInvo.getChannelOrderNumber());
	    	excel.setCellValue("N", colNum++, "");
	    	excel.setCellValue("N", colNum++, sendInvo.getDeliveryDoneYn());
	    	excel.setCellValue("N", colNum++, NumberUtil.getCommaNumber(sendInvo.getTotalInvoiceAmount()));
	    	
	    	//수납 완료 처리
			
	    	paymentHistoryInput.setProviderNumber(sendInvo.getProviderNumber());
	    	paymentHistoryInput.setInvoiceDate(sendInvo.getInvoicedate());
	    	paymentHistoryInput.setInvoiceNumber(sendInvo.getInvoiceNumber());
	    	paymentHistoryInput.setConNumber(sendInvo.getConNumber());
	    	paymentHistoryInput.setUserName(user.getUserName());	    	
	    	
	    	//결제 완료 후 미납금액 0 처리
			result = invoiceservice.updateColInvoiceSendInfo(paymentHistoryInput);
			
			if (result > 0) {
				resultCount ++;
				//결제 상세 내역에 미납금액 0처리
				result = invoiceservice.updateColInvoiceDetail(paymentHistoryInput);
			}
		}
		
	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode(fileName+".xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());	
		
	}	
}
