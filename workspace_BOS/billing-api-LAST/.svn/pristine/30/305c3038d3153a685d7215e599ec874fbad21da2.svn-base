package com.api.batch;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.api.controller.BillingController;
import com.api.controller.PaymentController;
import com.api.model.billing.BatchRegularPayment;
import com.api.model.billing.IniPayInfo;
import com.api.model.billing.PaymentHistoryInput;
import com.api.service.ChannelService;
import com.api.service.CommonService;
import com.api.service.ContractListService;
import com.api.service.InvoiceService;
import com.api.util.DateUtil;

@Component
//@Transactional(rollbackFor=Exception.class)
public class PaymentCronTable {
	
	private Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	PaymentController paymentController;
	
	@Autowired
	BillingController billingController;
	
	@Autowired
	InvoiceService invoiceservice;	
	
	@Autowired
	CommonService commonService;

	@Autowired
	ContractListService contractListService;
	
	@Autowired
	ChannelService channelService; 

	// 매일 5시 30분 0초에 실행한다.
    //@Scheduled(cron = "0 30 5 * * *")
    @Scheduled(cron = "0 0 10 * * *")
    public void aJob() {

        // 실행될 로직
    	//System.out.println("매일 5시 30분 0초에 실행한다.");
    	log.info("매일 10시 00분 0초에 실행됩니다..");
    	//오늘 날짜
    	String invoicedate = DateUtil.getToday();
    	
    	//배치 진행 여부 조회
    	String batchState = this.commonService.selectSystemProperties("BATCHSTATE");
    	if (batchState == null || "FALSE".equals(batchState)) {
    		log.info("배치 진행 상태가 불가능 상태 입니다. 배치종료");
    		return;
    	}
    	
    	//if (batchState != null && "TRUE".equals(batchState)) {    		
    		int sucessCnt = 0;
    		int failCnt =0;
    		BatchRegularPayment batchInput = new BatchRegularPayment();
    		batchInput.setInvoiceDate(invoicedate);
    		/***************************************************************************************************************
    		 * Step1. 결제 대상 목록은 조회 하고 자동 정기 결제 Table에 insert 한다.     	  
    		 ***************************************************************************************************************/
    		int insertCnt = this.invoiceservice.insertBatchReqularPayment(batchInput);
    		
    		/***************************************************************************************************************
    		 * Step2. 자동 정기 결제 대상을 조회 한다.     	  
    		 ***************************************************************************************************************/
    		List<BatchRegularPayment> batchList = this.invoiceservice.getBatchReqularPayment(batchInput);
    		
    		/***************************************************************************************************************
    		 * Step3. 대상을 반복하여 결제 요청 한다. (BillKey 사용)     	  
    		 ***************************************************************************************************************/
    		Map<String, String> resultMap = null;
    		String tid = "";
    		for (BatchRegularPayment batchRegularPayment : batchList) {
    			IniPayInfo iniPayInfo = new IniPayInfo();
    			iniPayInfo.setConNumber(batchRegularPayment.getConNumber());
    			iniPayInfo.setProviderNumber(batchRegularPayment.getProviderNumber());
    			iniPayInfo.setInvoiceNumber(batchRegularPayment.getInvoiceNumber());	
    			iniPayInfo.setPayMethod(batchRegularPayment.getPaymentMethodCode());			
    			iniPayInfo.setAuditId("BATCH");
    			
    			try {				
    				//Step3-1. BillKey로 결제를 진행 한다.
    				
    				//결제 완료 후 배송 상태를 변경 한다.
    				resultMap = this.paymentController.payProc(iniPayInfo, "BATCH", null);
    				
    				//Step3-2. 결제 결과 반영(batchregularpayment)
    				batchRegularPayment.setResultCode(resultMap.get("resultCode"));
    				batchRegularPayment.setResultMsg(resultMap.get("resultMsg"));
    				batchRegularPayment.setAuthCode(resultMap.get("authCode"));
    				batchRegularPayment.setPgAuthDate(resultMap.get("pgAuthDate"));
    				batchRegularPayment.setPgAuthTime(resultMap.get("pgAuthTime"));
    				tid = resultMap.get("tid");
    				batchRegularPayment.setTid(tid);		
    				this.invoiceservice.updateBatchReqularPayment(batchRegularPayment);
    				
    			} catch (Exception e) {
    				// TODO: handle exception
    				//예외가 발생 했을 경우 해당 항목을 취소 처리 한다.
    				//이니시스 예외
    				log.error("예외 발생");
    				
    				// 결제는 시도 했으나 에러 났으므로 history에 적제
    				//결제가 되었을 경우 취소 처리
    				String errorMsg = "결제내역 저장 실패";
    				PaymentHistoryInput paymentHistoryInput = new PaymentHistoryInput();
    				paymentHistoryInput.setProviderNumber(iniPayInfo.getProviderNumber());
    				paymentHistoryInput.setInvoiceNumber(iniPayInfo.getInvoiceNumber());
    				paymentHistoryInput.setConNumber(iniPayInfo.getConNumber());
    				paymentHistoryInput.setPaymentAmt(iniPayInfo.getPrice());			
    				paymentHistoryInput.setPaymentMethodCode(iniPayInfo.getPayMethod());
    				paymentHistoryInput.setCardCorporationCode(iniPayInfo.getCardCorporationCode());
    				paymentHistoryInput.setTid(tid);
    				paymentHistoryInput.setInvoiceDate(iniPayInfo.getInvoiceDate());
    				paymentHistoryInput.setMemo(iniPayInfo.getMemo());
    				paymentHistoryInput.setPaymentTypeCode("PAYMENTERROR");				
    				paymentHistoryInput.setMemo(errorMsg);
    				paymentHistoryInput.setErrorReasonCode("999");
    				paymentHistoryInput.setPgErrorCode("BILL_SAVE");
    				paymentHistoryInput.setPgErrorMsg("결제내역 저장 실패");
    				paymentHistoryInput.setUserName("BATCH");
    				
    				/*batch Error 수정*/
    				batchRegularPayment.setResultCode("999");
    				batchRegularPayment.setResultMsg("결제내역 저장 실패");
    				batchRegularPayment.setAuthCode("PAYMENTERROR");
    				batchRegularPayment.setPgAuthDate(DateUtil.getToday());
    				batchRegularPayment.setPgAuthTime(DateUtil.getCurrentTime());
    				if (resultMap != null) {
    					tid = resultMap.get("tid");
    					batchRegularPayment.setTid(tid);					
    				}
    				try {					
    					this.paymentController.payCancleProc(paymentHistoryInput);
    					
    				} catch (Exception e2) {					
    					// TODO: handle exception
    					log.equals("결제내역 저장 실패");
    				}finally {			
    					this.invoiceservice.updateBatchReqularPayment(batchRegularPayment);					
    				}
    				
    				this.invoiceservice.setPaymentHistory(paymentHistoryInput);
    				
    			}finally {				
    				if ("00".equals(batchRegularPayment.getResultCode()) && "0000".equals(batchRegularPayment.getResultCode())) {
    					sucessCnt ++;
    				}else {
    					failCnt++;
    				}				
    			}
    			
    		}
    	//}else {    		
    	//	log.info("배치 진행 상태가 불가능 상태 입니다.");
    	//}
    	    	
    	log.info("매일 10시 00분 0초에 실행된 배치가 종료 되었습니다.");
    }
}