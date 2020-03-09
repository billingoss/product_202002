package com.api.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.api.billing.invoice.model.BatchRegularPayment;
import com.api.billing.invoice.model.ContractInfoDetail;
import com.api.billing.invoice.model.IniPayInfo;
import com.api.billing.invoice.model.Invoice;
import com.api.billing.invoice.model.InvoiceAdjust;
import com.api.billing.invoice.model.InvoiceAdjustInput;
import com.api.billing.invoice.model.InvoiceCalculation;
import com.api.billing.invoice.model.InvoiceCalculationInput;
import com.api.billing.invoice.model.InvoiceCreatePrePayInvoiceInput;
import com.api.billing.invoice.model.InvoiceCustomerInfo;
import com.api.billing.invoice.model.InvoiceDateInput;
import com.api.billing.invoice.model.InvoiceDetail;
import com.api.billing.invoice.model.InvoiceDetailCustomerInfo;
import com.api.billing.invoice.model.InvoiceDetailInput;
import com.api.billing.invoice.model.InvoiceDetailProductInfo;
import com.api.billing.invoice.model.InvoiceNameInput;
import com.api.billing.invoice.model.InvoiceTaxItemInfo;
import com.api.billing.invoice.model.PaymentHistoryDetail;
import com.api.billing.invoice.model.PaymentHistoryInput;
import com.api.billing.invoice.model.PaymentPrePayInvoiceInput;
import com.api.billing.invoice.model.invoiceCounSelling;
import com.api.billing.invoice.model.invoiceCounSellingResult;
import com.api.billing.model.contract.ContractInsert;
import com.api.billing.model.contract.PaymentInformation;

@Mapper
@Repository
public interface InvoiceDetailRepository {
	
	/*pg payment */
	int insertPgpaymentlist(PaymentHistoryInput input);
	int selectPgpaymentlist(String input);

	List<InvoiceAdjust> getInvoiceAdjust(InvoiceDetailInput idi);
	List<InvoiceDetail> getInvoiceDetail(InvoiceDetailInput idi);
	InvoiceTaxItemInfo getInvoiceTaxItemAmount(InvoiceDetailInput idi);
	List<Invoice> getInvoiceByDate(InvoiceDateInput idi);
	InvoiceDetailCustomerInfo getInvoiceDetailCustomerInfo(InvoiceDetailInput idi);
	List<InvoiceDetailProductInfo> getInvoiceDetailProductInfo(InvoiceDetailInput idi);
	List<Invoice> getInvoiceByName(InvoiceNameInput idi);
	List<PaymentHistoryDetail> getPaymentHistory(InvoiceDetailInput idi);
	InvoiceCustomerInfo getInvoiceCustomerInfoByName(InvoiceDetailInput idi); /* 20180909 수정 */
	
	/*문경은 start*/
	/*계약정보 및 상품정보 조회*/
	ContractInsert getContractAndProduct(ContractInsert idi);
	/*계약상태 변경*/
	int updateContractContractstate(ContractInsert idi);
	/*계약정보 상세 조회*/
	ContractInfoDetail getContractInfoDetail(int connumber);
	/*청구 금액 계산 내역 등록 */
	int insertInvoicecalculation(InvoiceCalculationInput idi);
	/*청구내역 건수 조회  */	
	int getInvoiceCount(InvoiceCalculationInput idi) ;
	/*배송 정보에 청구번호, 청구일자 수정 */	
	int updateDeliverydetailByInvoicenumber(ContractInsert idi) ;
	/*배송 정보 상태 배송전(BEFORE)으로  수정 */		
	int updateDeliverydetailByDeliverystate(PaymentHistoryInput idi) ;	
	/*결제정보  수정 */		
	int updatePaymentinformation(PaymentInformation idi) ;	
	/* 청구번호 한건 조회(일괄 결제시 사용) */
	InvoiceCalculationInput getInvoicenumberByOne(ContractInsert idi) ;
	
	/*청구내역 선납여부  수정 */	
	int updateInvoicePrepayYn(InvoiceCalculationInput idi) ;
	/*청구 계산내역  선납여부  수정 */	
	int updateInvoicecalculationPrepayYn(InvoiceCalculationInput idi) ;
	/*청구상세내역 선납여부  수정  */	
	int updateInvoicedetailPrepayYn(InvoiceCalculationInput idi) ;
	/* 납부 내역 조회  */	
	PaymentHistoryInput getPaymentHistoryInfo(PaymentHistoryInput paymentHistoryInput) ;
	/* 결제 승인을 위한 정보 조회  */	
	IniPayInfo getIniPayInfo(IniPayInfo iniPayInfo) ;
	/* 배송상태 기준 환불가능 건수 조회 */
	int getDelivaeryCntNotBefore(PaymentHistoryInput paymentHistoryInput);
	
	/**************Batch Pyment*******************/	
	/*배치 정기 결제 대상 조회*/
	List<BatchRegularPayment> getBatchReqularPayment(BatchRegularPayment batchRegularPayment);
	/*정기 결제 처리 대상 조회 후 배치 내역에 저장*/
	int insertBatchReqularPayment(BatchRegularPayment batchRegularPayment);
	/*배치 정기 결제 처리 후 결과 수정*/
	int updateBatchReqularPayment(BatchRegularPayment batchRegularPayment);
	
	/*문경은 end*/
	
	//getInvoiceRecurringpayment
	
	/*invoice counselling*/
	List<invoiceCounSellingResult> getCounsellingData(invoiceCounSelling idi);
	int getCounsellingTotalCount(invoiceCounSelling idi);
	int insertCounsellingHistory(invoiceCounSelling idi);
	
	/*invoice calculation*/
	  int setInvoiceCalculation(InvoiceCalculationInput calfromDate);
	  int setInvoiceCalculationDiscountRate(InvoiceCalculationInput calfromDate);
	  int setInvoiceCalculationDiscountAmount(InvoiceCalculationInput calfromDate);
	  int setInvoiceCalculationDiscountOneTimeFee(InvoiceCalculationInput calfromDate);
	 /* int setInvoiceCalculationGeneralTax(String calfromDate);
	  int setInvoiceCalculationDiscountTax(String calfromDate); 20180911 수정 */
	  int setInvoiceDetail(InvoiceCalculationInput calfromDate);
	  int updateInvoiceDetail(InvoiceCalculationInput calfromDate);
	  int updateInvoiceCalculation(InvoiceCalculationInput calfromDate);
	  int setInvoice(InvoiceCalculationInput calfromDate);
	  int updateInvoiceZero(InvoiceCalculationInput calfromDate);
	  int updateInvoiceDetailZero(InvoiceCalculationInput calfromDate);
	  int updateInvoiceCalculationZero(InvoiceCalculationInput calfromDate);
	  int updateLastInvoicedt(InvoiceCalculationInput calfromDate);
	  int updateNextInvoicedt(InvoiceCalculationInput calfromDate);
	  List<InvoiceCalculation> getCalculationInvoice(InvoiceCalculationInput calfromDate);
	  List<Invoice> getZeroInvoicetoDelivery(InvoiceCalculationInput calfromdate);
	  
	  /*invoice Prepay calculation*/
	  int setInvoiceCalculationPrepay(InvoiceCreatePrePayInvoiceInput idi);
	  int setInvoiceCalculationDiscountRatePrepay(InvoiceCreatePrePayInvoiceInput idi);
	  int setInvoiceCalculationDiscountAmountPrepay(InvoiceCreatePrePayInvoiceInput idi);
	  int setInvoiceCalculationDiscountOneTimeFeePrepay(InvoiceCreatePrePayInvoiceInput idi);
	  int setInvoiceDetailPrepay(InvoiceCreatePrePayInvoiceInput idi);
	  int updateInvoiceDetailPrepay(InvoiceCreatePrePayInvoiceInput idi);
	  int updateInvoiceCalculationPrepay(InvoiceCreatePrePayInvoiceInput idi);
	  int setInvoicePrepay(InvoiceCreatePrePayInvoiceInput idi);
	  //int updateInvoiceInvoicedatePrepay(InvoiceCreatePrePayInvoiceInput idi);
	  //int updateInvoiceDetailInvoicedatePrepay(InvoiceCreatePrePayInvoiceInput idi);
	  //int updateInvoiceCalculationInvoicedatePrepay(InvoiceCreatePrePayInvoiceInput idi);
	  PaymentPrePayInvoiceInput getPrePayInvoice(InvoiceCreatePrePayInvoiceInput idi);
	 
	 
	/*recurring */
	List<InvoiceCalculation> getInvoiceRecurringpayment(String calfromDate);
	//List<Invoice> getCalculateInvoice(String calfromDate);
	
	/*payment refund proc*/
	int setPaymentHistory(PaymentHistoryInput input);
	int updateColInvoice(PaymentHistoryInput input);
	int updateColInvoiceDetail(PaymentHistoryInput input);
	int setRefundHistory(PaymentHistoryInput input);
	int updaterefundColInvoice(PaymentHistoryInput input);
	int updaterefundColInvoiceDetail(PaymentHistoryInput input);
	
	/*adjust proc*/
	int setInvoiceAdjust(InvoiceAdjustInput input);
	int updateInvoiceAdjust(InvoiceAdjustInput input);
	int setInvoiceAdjustInvoiceDetail(InvoiceAdjustInput input);
	int updateInvoiceAdjustInvoiceDetail(InvoiceAdjustInput input);
	int updateInvoiceAdjustAply(InvoiceAdjustInput input);
	int checkInvoiceAdjust(InvoiceAdjustInput input);
	
	/*invoice send*/
	int sendInvoiceSum(InvoiceDetailInput idi);
	
	/*paging cnt */
	int getInvoiceTotCount(InvoiceDateInput idi);
	int getInvoiceNameTotCount(InvoiceNameInput idi);
	int getPaymentHistoryTotCount(InvoiceDetailInput idi);
	
}
