package com.api.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.model.billing.BatchRegularPayment;
import com.api.model.billing.BillKeyHistory;
import com.api.model.billing.BillingSendHistory;
import com.api.model.billing.ChannelBillingInformation;
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
import com.api.repository.ChannelRepository;
import com.api.repository.InvoiceDetailRepository;
import com.api.service.InvoiceService;
 

@Service
public class InvoiceServiceBean implements InvoiceService {
	
	@Autowired
    private InvoiceDetailRepository invoicedetailrepository;
	
	@Autowired
	private ChannelRepository channelRepository; 
	
	/*계약정보 및 상품정보 조회*/
	@Override
	public ContractInsert getContractAndProduct(ContractInsert idi) {
		ContractInsert contInfo = invoicedetailrepository.getContractAndProduct(idi);
		return contInfo;
	}
	
	/*계약정보 및 상품정보 조회*/
	@Override	 
	public List<ContractInsert> getContractAndProductList(ContractInsert idi) {
		List<ContractInsert> contProductList = invoicedetailrepository.getContractAndProductList(idi);
		return contProductList;
	}
	
	/*배송 정보에 청구번호, 청구일자 수정*/
	@Override
	public int updateDeliveryDetailByInvoiceNumber(ContractInsert idi) {
		int result = invoicedetailrepository.updateDeliveryDetailByInvoiceNumber(idi);
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구내역 건수 조회*/
	@Override
	public int getInvoiceCount(InvoiceCalculationInput idi) {
		int result = invoicedetailrepository.getInvoiceCount(idi) ;
		if(result > 0) return 1;
		else return 0;
	}

	/*청구 금액 계산 내역 등록*/ 	
	@Override
	public int insertInvoiceCalculation(InvoiceCalculationInput idi) {
		int result = invoicedetailrepository.insertInvoiceCalculation(idi) ;
		if(result > 0) return 1;
		else return 0;
	}

	/*청구 내역 정률할인 계산*/
	@Override
	public int setInvoiceCalculationDiscountRate(InvoiceCalculationInput calfromDate) {
		int result = invoicedetailrepository.setInvoiceCalculationDiscountRate(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구 내역 정액할인 계산*/
	@Override
	public int setInvoiceCalculationDiscountAmount(InvoiceCalculationInput calfromDate) {
		int result = invoicedetailrepository.setInvoiceCalculationDiscountAmount(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*계약기준 할인 목록 조회*/
	@Override
	public List<InvoiceCalculationInput> selectContractDiscountList(InvoiceCalculationInput calfromDate) {
		List<InvoiceCalculationInput> contractDiscountList = this.invoicedetailrepository.selectContractDiscountList(calfromDate);
		return contractDiscountList;
	}
	
	
	/*청구 상세 내역 등록*/	
	@Override
	public int setInvoiceDetail(InvoiceCalculationInput calfromDate) {
		int result = invoicedetailrepository.setInvoiceDetail(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}

	/*청구 상세 내역 등록*/
	@Override
	public int updateInvoiceDetail(InvoiceCalculationInput calfromDate) {
		int result = invoicedetailrepository.updateInvoiceDetail(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구 계산 내역에 청구서번호 수정*/
	@Override
	public int updateInvoiceCalculation(InvoiceCalculationInput calfromDate) {
		int result = invoicedetailrepository.updateInvoiceCalculation(calfromDate) ;
		return result;
	}
	
	/*청구내역 생성 _ 청구 확정*/
	@Override
	public int setInvoice(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stub
		int result = invoicedetailrepository.setInvoice(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구번호 한건 조회*/
	@Override
	public InvoiceCalculationInput getInvoiceNumberByOne(ContractInsert idi) {
		InvoiceCalculationInput result = invoicedetailrepository.getInvoiceNumberByOne(idi);
		return result;
	}
	
	/*청구내역 중 결제된 건 조회*/	
	@Override
	public int getInvoicePaymentCloseCount(ContractInsert idi) {
		int result = invoicedetailrepository.getInvoicePaymentCloseCount(idi) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	
	/*청구내역 상세 조회*/
	@Override
	public List<InvoiceDetail> getInvoiceDetail(InvoiceDetailInput idi) {
		List<InvoiceDetail> invoicedetail = invoicedetailrepository.getInvoiceDetail(idi);
		return invoicedetail;
	}

	/*청구 상세내역 고객 정보*/
	@Override
	public InvoiceDetailCustomerInfo getInvoiceDetailCustomerInfo(InvoiceDetailInput idi) {
		InvoiceDetailCustomerInfo invoicecustomerinfo = invoicedetailrepository.getInvoiceDetailCustomerInfo(idi);
		return invoicecustomerinfo;
	}
	
	/*청구 상세내역 상품 정보*/	
	@Override
	public List<InvoiceDetailProductInfo> getInvoiceDetailProductInfo(InvoiceDetailInput idi) {
		List<InvoiceDetailProductInfo> invoiceproductinfolist = invoicedetailrepository.getInvoiceDetailProductInfo(idi);
		return invoiceproductinfolist;
	}
	 
	/*청구내역 부가세 정보*/
	@Override
	public InvoiceTaxItemInfo getInvoiceTaxItemAmount(InvoiceDetailInput idi) {
		InvoiceTaxItemInfo iti =  invoicedetailrepository.getInvoiceTaxItemAmount(idi);
		return iti;
	}
	
	/*계약정보 상세 조회 청구내역 포함*/
	@Override	
	public ContractInfoDetail getContractInfoDetail(int connumber) {
		// TODO Auto-generated method stub
		ContractInfoDetail contInfo = invoicedetailrepository.getContractInfoDetail(connumber);
		return contInfo;
	}
	
	/*계약정보 조회*/
	@Override	
	public ContractInfoDetail getContractInfo(int connumber) {
		// TODO Auto-generated method stub
		ContractInfoDetail contInfo = invoicedetailrepository.getContractInfo(connumber);
		return contInfo;
	}
	
	/*결제정보  수정*/ 	
	@Override
	public int updatePaymentInformation(PaymentInformation idi) {
		int result = invoicedetailrepository.updatePaymentInformation(idi) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*결제 승인을 위한 정보 조회*/  	
	@Override	
	public IniPayInfo getIniPayInfo(IniPayInfo iniPayInfo) {
		IniPayInfo resutlInfo = invoicedetailrepository.getIniPayInfo(iniPayInfo);
		return resutlInfo;
	}	
	
	/*결제 내역 저장*/
	@Override
	public int setPaymentHistory(PaymentHistoryInput input) {
		int result = invoicedetailrepository.setPaymentHistory(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구 내역 결제 완료 처리*/
	@Override
	public int updateColInvoice(PaymentHistoryInput input) {
		int result = invoicedetailrepository.updateColInvoice(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*파일 전송 후 청구 내역 결제 완료 처리*/
	@Override
	public int updateColInvoiceSendInfo(PaymentHistoryInput input) {
		int result = invoicedetailrepository.updateColInvoiceSendInfo(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구 상세 내역 결제 완료 처리*/	
	@Override
	public int updateColInvoiceDetail(PaymentHistoryInput input) {
		int result = invoicedetailrepository.updateColInvoiceDetail(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*배송 정보 상태 배송전(BEFORE)으로  수정*/
	@Override
	public int updateDeliverydetailByDeliverystate(PaymentHistoryInput idi) {		
		//채널 청구 정보 조회
		ChannelBillingInformation channelInfo = this.channelRepository.selectChannelBillingInforByConnumber(idi.getConNumber());
		int result = 0;
		/**********************************************************************
		 *  배송 상태는 납부여부 Y, 선납여부 Y일 경우면 변경 가능 하다.
		 **********************************************************************/
		if(channelInfo != null && "Y".equals(channelInfo.getPrePaymentYn()) && "Y".equals(channelInfo.getPayableYn())) {			
			result = invoicedetailrepository.updateDeliverydetailByDeliverystate(idi);
		}
		if(result > 0) return 1;
		else return 0;
	}	
	
	/*청구내역 선납여부  수정*/ 
	@Override
	public int updateInvoicePrepayYn(InvoiceCalculationInput idi) {
		int result = invoicedetailrepository.updateInvoicePrepayYn(idi);
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구 계산내역  선납여부  수정*/ 	
	@Override
	public int updateInvoicecalculationPrepayYn(InvoiceCalculationInput idi) {
		int result = invoicedetailrepository.updateInvoicecalculationPrepayYn(idi);
		if(result > 0) return 1;
		else return 0;
	}

	/*청구상세내역 선납여부  수정*/	
	@Override
	public int updateInvoicedetailPrepayYn(InvoiceCalculationInput idi) {
		int result = invoicedetailrepository.updateInvoicedetailPrepayYn(idi);
		if(result > 0) return 1;
		else return 0;
	}
	
	/*계약상태 변경*/
	@Override
	public int updateContractContractstate(ContractInsert idi) {
		int result = invoicedetailrepository.updateContractContractstate(idi) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*배송상태 기준 환불가능 건수 조회*/ 
	@Override
	public int getDelivaeryCntNotBefore(PaymentHistoryInput idi) {
		int result = invoicedetailrepository.getDelivaeryCntNotBefore(idi) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*납부 내역 조회*/  	
	@Override	
	public PaymentHistoryInput getPaymentHistoryInfo(PaymentHistoryInput paymentHistoryInput) {
		PaymentHistoryInput paymentHist = invoicedetailrepository.getPaymentHistoryInfo(paymentHistoryInput);
		return paymentHist;
	}	
	
	/*환불 이력 등록*/
	@Override
	public int setRefundHistory(PaymentHistoryInput input) {
		int result = invoicedetailrepository.setRefundHistory(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*결제 금액 원상복귀*/
	@Override
	public int updaterefundColInvoice(PaymentHistoryInput input) {
		int result = invoicedetailrepository.updaterefundColInvoice(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*결제 금액 원상복귀*/
	@Override
	public int updaterefundColInvoiceDetail(PaymentHistoryInput input) {
		int result = invoicedetailrepository.updaterefundColInvoiceDetail(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*정기 결제 처리 대상 조회 후 배치 내역에 저장*/
	@Override
	public int insertBatchReqularPayment(BatchRegularPayment batchRegularPayment) {
		int result = invoicedetailrepository.insertBatchReqularPayment(batchRegularPayment) ;
		if(result > 0) return 1;
		else return 0;
	}

	/*배치 정기 결제 대상 조회*/
	@Override
	public List<BatchRegularPayment> getBatchReqularPayment(BatchRegularPayment batchRegularPayment) {
		List<BatchRegularPayment> batchList = invoicedetailrepository.getBatchReqularPayment(batchRegularPayment);
		return batchList;
	}
	
	/*배치 정기 결제 처리 후 결과 수정 */	
	@Override
	public int updateBatchReqularPayment(BatchRegularPayment idi) {
		int result = invoicedetailrepository.updateBatchReqularPayment(idi) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*조정을 위한 납부 대상 조회*/
	@Override
	public List<InvoiceAdjust> getInvoiceAdjust(InvoiceDetailInput idi) {
		List<InvoiceAdjust> InvoiceAdjustlist =  invoicedetailrepository.getInvoiceAdjust(idi);
		return InvoiceAdjustlist;
	}
	
	/*조정 내역 저장*/
	@Override
	public int setInvoiceAdjust(InvoiceAdjustInput input) {
		int result = invoicedetailrepository.setInvoiceAdjust(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*조정 건수 조회*/
	@Override
	public int checkInvoiceAdjust(InvoiceAdjustInput input) {
		int result = invoicedetailrepository.checkInvoiceAdjust(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*조정 금액 청구 내역에 반영*/
	@Override
	public int updateInvoiceAdjust(InvoiceAdjustInput input) {
		int result = invoicedetailrepository.updateInvoiceAdjust(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*조정 요청 내역을 청구 상세에 저장*/
	@Override
	public int setInvoiceAdjustInvoiceDetail(InvoiceAdjustInput input) {
		int result = invoicedetailrepository.setInvoiceAdjustInvoiceDetail(input) ;
		if(result > 0) return 1;
		else return 0;
	}

	/*조정 금액을 청구내역에 반영*/
	@Override
	public int updateInvoiceAdjustInvoiceDetail(InvoiceAdjustInput input) {
		int result = invoicedetailrepository.updateInvoiceAdjustInvoiceDetail(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*조정 요청을 조정 완료 상태로 변경*/
	@Override
	public int updateInvoiceAdjustAply(InvoiceAdjustInput input) {
		int result = invoicedetailrepository.updateInvoiceAdjustAply(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구 결제 목록 조회*/	
	@Override
	public List<Invoice> getInvoicePaymentList(InvoiceSearch input) {
		List<Invoice> list = invoicedetailrepository.getInvoicePaymentList(input);
		return list;
	}
	
	/*청구 목록 엑셀 조회*/
	@Override
	public List<Invoice> getInvoicePaymentListExcel(InvoiceSearch input) {
		List<Invoice> list = invoicedetailrepository.getInvoicePaymentListExcel(input);
		return list;
	}
	
	/*청구 목록 총 건수 조회*/	
	@Override
	public int getInvoicePaymentListTotalCnt(InvoiceSearch input) {
		int result = invoicedetailrepository.getInvoicePaymentListTotalCnt(input) ;
		if(result > 0) return result;
		else return 0;
	}
	
	/*청구 상세 내역 조회*/
	@Override
	public Invoice getInvoicePaymentDetail(InvoiceSearch input) {
		Invoice invoiceDetail  = invoicedetailrepository.getInvoicePaymentDetail(input);
		return invoiceDetail;
	}
	
	/*결제 이력 조회*/
	@Override	
	public List<PaymentHistory> getPaymentHistoryList(InvoiceSearch input){
		List<PaymentHistory> list = invoicedetailrepository.getPaymentHistoryList(input);
		return list;
	}
	
	/*  BillKey  생성 이력 등록 */
	@Override
	public int insertBillKeyHistory(BillKeyHistory billKeyHistory) {
		int result = invoicedetailrepository.insertBillKeyHistory(billKeyHistory) ;
		if(result > 0) return result;
		else return 0;
	}
	
	/*  BillKey  생성 이력 조회 */
	@Override
	public List<BillKeyHistory> selectBillKeyHistory(BillKeyHistory billKeyHistory) {
		List<BillKeyHistory> list = invoicedetailrepository.selectBillKeyHistory(billKeyHistory);
		return list;
	}
	
	/*  BillKey  생성 이력 등록 */
	@Override
	public int getBillKeyCount(String billKey) {
		int result = invoicedetailrepository.getBillKeyCount(billKey) ;
		if(result > 0) return result;
		else return 0;
	}
	
	/*작성된 청구수 조회*/
	@Override
	public Invoice getLastInvoiceInfo(int conNumber) {
		Invoice result = this.invoicedetailrepository.getLastInvoiceInfo(conNumber);
		return result;
	}
	
	/*일괄 청구 대상 목록 조회*/
	@Override
	public List<ContractList> getBatchBillableTargetList() {
		List<ContractList> list = this.invoicedetailrepository.getBatchBillableTargetList();
		return list;
	}
	
	/*전송 청구내역 조회 */
	@Override
	public List<TrancelateInvoice> selectTrancelateInvoiceList(TrancelateInvoice input) {
		List<TrancelateInvoice> list = this.invoicedetailrepository.selectTrancelateInvoiceList(input);
		return list;
	}
	
	/*청구 파일 전송 이력 저장*/
	@Override
	public int insertBillingSendHistory(BillingSendHistory input) {
		int result = this.invoicedetailrepository.insertBillingSendHistory(input);
		if(result > 0) return result;
		else return 0;
	}
}
