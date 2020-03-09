package com.api.service;

import java.util.List;

import com.api.model.billing.BatchRegularPayment;
import com.api.model.billing.BillKeyHistory;
import com.api.model.billing.BillingSendHistory;
import com.api.model.billing.ContractInfoDetail;
import com.api.model.billing.IniPayInfo;
import com.api.model.billing.Invoice;
import com.api.model.billing.InvoiceAdjust;
import com.api.model.billing.InvoiceAdjustInput;
import com.api.model.billing.InvoiceCalculationInput;
import com.api.model.billing.InvoiceDetail;
import com.api.model.billing.InvoiceDetailCustomerInfo;
import com.api.model.billing.InvoiceDetailInput;
import com.api.model.billing.InvoiceDetailProductInfo;
import com.api.model.billing.InvoiceSearch;
import com.api.model.billing.InvoiceTaxItemInfo;
import com.api.model.billing.PaymentHistory;
import com.api.model.billing.PaymentHistoryInput;
import com.api.model.billing.TrancelateInvoice;
import com.api.model.contract.ContractInsert;
import com.api.model.contract.ContractList;
import com.api.model.contract.PaymentInformation;

public interface InvoiceService {
	
	/*계약정보 및 상품정보 조회*/
	ContractInsert getContractAndProduct(ContractInsert idi);
	List<ContractInsert> getContractAndProductList(ContractInsert idi);
	
	/*배송 정보에 청구번호, 청구일자 수정*/ 	
	int updateDeliveryDetailByInvoiceNumber(ContractInsert idi) ;
	
	/*청구내역 건수 총 조회*/  	
	int getInvoiceCount(InvoiceCalculationInput idi) ;	
	
	/*청구 금액 계산 내역 등록*/ 
	int insertInvoiceCalculation(InvoiceCalculationInput idi);
	
	/*청구 내역 정률할인 계산*/
	int setInvoiceCalculationDiscountRate(InvoiceCalculationInput calfromDate);
	
	/*청구 내역 정액할인 계산*/
	int setInvoiceCalculationDiscountAmount(InvoiceCalculationInput calfromDate);
	
	/*계약기준 할인 목록 조회*/
	List<InvoiceCalculationInput> selectContractDiscountList(InvoiceCalculationInput calfromDate);
	
	/*청구 상세 내역 등록*/
	int setInvoiceDetail(InvoiceCalculationInput calfromDate);
	
	/*청구 상세 내역 등록*/
	int updateInvoiceDetail(InvoiceCalculationInput calfromDate);
	
	/*청구 계산 내역에 청구서번호 수정*/
	int updateInvoiceCalculation(InvoiceCalculationInput calfromDate);
	
	/*청구내역 생성 _ 청구 확정*/
	int setInvoice(InvoiceCalculationInput calfromDate);
	
	/*청구번호 한건 조회(일괄 결제시 사용)*/ 
	InvoiceCalculationInput getInvoiceNumberByOne(ContractInsert idi) ;
	
	/*청구내역 중 결제된 건 조회)*/ 
	int getInvoicePaymentCloseCount(ContractInsert idi) ;
	
	/*청구내역 상세 조회*/
	List<InvoiceDetail> getInvoiceDetail(InvoiceDetailInput idi);
	
	/*청구 상세내역 고객 정보*/
	InvoiceDetailCustomerInfo getInvoiceDetailCustomerInfo(InvoiceDetailInput idi);
	
	/*청구 상세내역 상품 정보*/
	List<InvoiceDetailProductInfo> getInvoiceDetailProductInfo(InvoiceDetailInput idi);

	/*청구내역 부가세 정보*/
	InvoiceTaxItemInfo getInvoiceTaxItemAmount(InvoiceDetailInput idi);
	
	/*계약정보 상세 조회 청구내역 포함*/
	ContractInfoDetail getContractInfoDetail(int connumber);
	
	/*계약정보 상세 조회*/
	ContractInfoDetail getContractInfo(int connumber);
	
	/*결제정보  수정*/ 		
	int updatePaymentInformation(PaymentInformation idi) ;
	
	/*결제 승인을 위한 정보 조회*/  	
	IniPayInfo getIniPayInfo(IniPayInfo iniPayInfo) ;
	
	/*결제 내역 저장*/
	int setPaymentHistory(PaymentHistoryInput input);
	
	/*청구 내역 결제 완료 처리*/
	int updateColInvoice(PaymentHistoryInput input);
	
	/*파일 전송 후 청구 내역 결제 완료 처리*/
	int updateColInvoiceSendInfo(PaymentHistoryInput input);
	
	/*청구 상세 내역 결제 완료 처리*/
	int updateColInvoiceDetail(PaymentHistoryInput input);
	
	/*배송 정보 상태 배송전(BEFORE)으로  수정*/ 		
	int updateDeliverydetailByDeliverystate(PaymentHistoryInput idi) ;
	
	/*청구내역 선납여부  수정*/ 	
	int updateInvoicePrepayYn(InvoiceCalculationInput idi) ;
	
	/*청구 계산내역  선납여부  수정 */	
	int updateInvoicecalculationPrepayYn(InvoiceCalculationInput idi) ;
	
	/*청구상세내역 선납여부  수정  */	
	int updateInvoicedetailPrepayYn(InvoiceCalculationInput idi) ;
	
	/*계약상태 변경*/
	int updateContractContractstate(ContractInsert idi);
	
	/*배송상태 기준 환불가능 건수 조회*/ 
	int getDelivaeryCntNotBefore(PaymentHistoryInput paymentHistoryInput);
	
	/*납부 내역 조회*/  	
	PaymentHistoryInput getPaymentHistoryInfo(PaymentHistoryInput paymentHistoryInput) ;
	
	/*환불 이력 등록*/
	int setRefundHistory(PaymentHistoryInput input);
	
	/*결제 금액 원상복귀*/
	int updaterefundColInvoice(PaymentHistoryInput input);
	
	/*결제 금액 원상복귀*/
	int updaterefundColInvoiceDetail(PaymentHistoryInput input);
	
	/*정기 결제 처리 대상 조회 후 배치 내역에 저장*/
	int insertBatchReqularPayment(BatchRegularPayment batchRegularPayment);
	
	/*배치 정기 결제 대상 조회*/
	List<BatchRegularPayment> getBatchReqularPayment(BatchRegularPayment batchRegularPayment);
	
	/*배치 정기 결제 처리 후 결과 수정*/
	int updateBatchReqularPayment(BatchRegularPayment batchRegularPayment);
	
	/*조정을 위한 납부 대상 조회*/
	List<InvoiceAdjust> getInvoiceAdjust(InvoiceDetailInput idi);
	
	/*조정 내역 저장*/
	int setInvoiceAdjust(InvoiceAdjustInput input);
	
	/*조정 건수 조회*/
	int checkInvoiceAdjust(InvoiceAdjustInput input);
	
	/*조정 금액 청구 내역에 반영*/
	int updateInvoiceAdjust(InvoiceAdjustInput input);
	
	/*조정 요청 내역을 청구 상세에 저장*/
	int setInvoiceAdjustInvoiceDetail(InvoiceAdjustInput input);
	
	/*조정 금액을 청구내역에 반영*/
	int updateInvoiceAdjustInvoiceDetail(InvoiceAdjustInput input);
	
	/*조정 요청을 조정 완료 상태로 변경*/ 
	int updateInvoiceAdjustAply(InvoiceAdjustInput input);
	
	/*청구 목록 조회*/
	List<Invoice> getInvoicePaymentList(InvoiceSearch input);
	
	/*청구 목록 엑셀 조회*/
	List<Invoice> getInvoicePaymentListExcel(InvoiceSearch input);
	
	/*청구 목록 총 건수 조회*/
	int getInvoicePaymentListTotalCnt(InvoiceSearch input);
	
	/*청구 상세 내역 조회*/
	Invoice getInvoicePaymentDetail(InvoiceSearch input);	
	
	/*결제 이력 조회*/
	List<PaymentHistory> getPaymentHistoryList(InvoiceSearch input);
	
	/*  BillKey  생성 이력 등록 */
	int insertBillKeyHistory(BillKeyHistory billKeyHistory);
	
	/*  BillKey  생성 이력 조회 */
	List<BillKeyHistory> selectBillKeyHistory(BillKeyHistory billKeyHistory);
	
	/*  BillKey  생성 이력 등록 */
	int getBillKeyCount(String billKey);
	
	/* 마지막 청구정보 조회*/
	Invoice getLastInvoiceInfo(int conNumber);
	
	/*일괄 청구 대상 목록 조회*/
	List<ContractList> getBatchBillableTargetList();
	
	/*전송 청구내역 조회 */
	List<TrancelateInvoice> selectTrancelateInvoiceList(TrancelateInvoice input);
	
	/*청구 파일 전송 이력 저장*/
	int insertBillingSendHistory(BillingSendHistory input);
	
	
}
