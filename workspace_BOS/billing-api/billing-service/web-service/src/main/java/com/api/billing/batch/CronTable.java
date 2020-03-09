package com.api.billing.batch;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.api.billing.invoice.model.BatchRegularPayment;
import com.api.billing.invoice.model.IniPayInfo;
import com.api.controller.PaymentController;
import com.api.service.InvoiceService;
import com.api.util.DateUtil;

@Component
@Transactional(rollbackFor=Exception.class)
public class CronTable {
	
	private Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	PaymentController paymentController;
	
	@Autowired
	InvoiceService invoiceservice;	

    // 매일 5시 30분 0초에 실행한다.
    //@Scheduled(cron = "0 30 5 * * *")
    @Scheduled(cron = "0 00 10 * * *")
    public void aJob() {

        // 실행될 로직
    	//System.out.println("매일 5시 30분 0초에 실행한다.");
    	System.out.println("매일 10시 00분 0초에 실행하는 배치지이용 ~~~ .");
    	//오늘 날짜
    	String invoicedate = DateUtil.getToday();
    	
    	//TODO Test
    	//invoicedate = "20190819";
    	
    	int sucessCnt = 0;
    	int failCnt =0;
    	BatchRegularPayment batchInput = new BatchRegularPayment();
    	batchInput.setInvoicedate(invoicedate);
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
    	Map<String, String> resultMap;
    	for (BatchRegularPayment batchRegularPayment : batchList) {
    		IniPayInfo iniPayInfo = new IniPayInfo();
			iniPayInfo.setConnumber(batchRegularPayment.getConnumber());
			iniPayInfo.setProvidernumber(batchRegularPayment.getProvidernumber());
			iniPayInfo.setInvoicenumber(batchRegularPayment.getInvoicenumber());		
			iniPayInfo.setAuditid("BATCH");
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
				batchRegularPayment.setTid(resultMap.get("tid"));		
				
				this.invoiceservice.updateBatchReqularPayment(batchRegularPayment);
				
				if ("00".equals(batchRegularPayment.getResultCode()) && "0000".equals(batchRegularPayment.getResultCode())) {
					sucessCnt ++;
				}else {
					failCnt++;
				}
				
			} catch (Exception e) {
				// TODO: handle exception
				log.error(e.toString());
			}
		}
    }
    
/*
   //  ex: 매월 3일 0시 0분 0초에 실행 @Scheduled(cron = "0 0 0 3 * *")    
    // 매월 1일 0시 0분 0초에 실행한다.
    @Scheduled(cron = "0 0 0 1 * *")
    public void anotherJob() {

        // 실행될 로직
    	System.out.println("매월 1일 0시 0분 0초에 실행한다.");
    }

    // 3초마다 실행
    //@Scheduled(initialDelay = 60000, fixedDelay = 3000)
    @Scheduled(fixedDelay = 3000)
    public void oJob() {
    	
    	// 실행될 로직
    	System.out.println(" 3초마다 실행");
    }
    
    // 애플리케이션 시작 후 30초 후에 첫 실행, 그 후 매 10초마다 주기적으로 실행한다.
    @Scheduled(initialDelay = 30000, fixedDelay = 10000)
    public void otherJob() {

        // 실행될 로직
    	System.out.println("애플리케이션 시작 후 30초 후에 첫 실행, 그 후 매 10초마다 주기적으로 실행한다.");
    }*/
}