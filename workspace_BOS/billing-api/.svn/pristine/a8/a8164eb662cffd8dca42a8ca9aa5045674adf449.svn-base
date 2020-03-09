package com.api.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
import com.api.repository.InvoiceDetailRepository;
import com.api.service.InvoiceService;
 

@Service
public class InvoiceServiceBean implements InvoiceService {

	@Autowired
    private InvoiceDetailRepository Invoicedetailrepository;
	
	
	/*계약정보 및 상품정보 조회*/
	@Override
	public ContractInsert getContractAndProduct(ContractInsert idi) {
		// TODO Auto-generated method stub
		ContractInsert contInfo = Invoicedetailrepository.getContractAndProduct(idi);
		return contInfo;
	}
	
	/*계약정보 상세 조회*/
	@Override
	
	public ContractInfoDetail getContractInfoDetail(int connumber) {
		// TODO Auto-generated method stub
		ContractInfoDetail contInfo = Invoicedetailrepository.getContractInfoDetail(connumber);
		return contInfo;
	}	
	
	/* 납부 내역 조회  */	
	@Override	
	public PaymentHistoryInput getPaymentHistoryInfo(PaymentHistoryInput paymentHistoryInput) {
		// TODO Auto-generated method stub
		PaymentHistoryInput paymentHist = Invoicedetailrepository.getPaymentHistoryInfo(paymentHistoryInput);
		return paymentHist;
	}	
	
	/* 결제 승인을 위한 정보 조회  */	
	@Override	
	public IniPayInfo getIniPayInfo(IniPayInfo iniPayInfo) {
		// TODO Auto-generated method stub
		IniPayInfo resutlInfo = Invoicedetailrepository.getIniPayInfo(iniPayInfo);
		return resutlInfo;
	}	
	
	/*계약상태 변경*/
	@Override
	public int updateContractContractstate(ContractInsert idi) {
		int result = Invoicedetailrepository.updateContractContractstate(idi) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/* 배송상태 기준 환불가능 건수 조회 */
	@Override
	public int getDelivaeryCntNotBefore(PaymentHistoryInput idi) {
		int result = Invoicedetailrepository.getDelivaeryCntNotBefore(idi) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구 금액 계산 내역 등록 */	
	@Override
	public int insertInvoicecalculation(InvoiceCalculationInput idi) {
		int result = Invoicedetailrepository.insertInvoicecalculation(idi) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*배치 정기 결제 대상 조회*/
	 @Override
	 public List<BatchRegularPayment> getBatchReqularPayment(BatchRegularPayment batchRegularPayment) {
	  // TODO Auto-generated method stub
	  List<BatchRegularPayment> batchList = Invoicedetailrepository.getBatchReqularPayment(batchRegularPayment);
	  return batchList;
	 }
	 
	/*정기 결제 처리 대상 조회 후 배치 내역에 저장 */	
	@Override
	public int insertBatchReqularPayment(BatchRegularPayment batchRegularPayment) {
		int result = Invoicedetailrepository.insertBatchReqularPayment(batchRegularPayment) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*배치 정기 결제 처리 후 결과 수정 */	
	@Override
	public int updateBatchReqularPayment(BatchRegularPayment idi) {
		int result = Invoicedetailrepository.updateBatchReqularPayment(idi) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*결제정보  수정 */	
	@Override
	public int updatePaymentinformation(PaymentInformation idi) {
		int result = Invoicedetailrepository.updatePaymentinformation(idi) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구내역 건수 조회  */	
	@Override
	public int getInvoiceCount(InvoiceCalculationInput idi) {
		int result = Invoicedetailrepository.getInvoiceCount(idi) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	/*배송 정보에 청구번호, 청구일자 수정 */	
	@Override
	public int updateDeliverydetailByInvoicenumber(ContractInsert idi) {
		int result = Invoicedetailrepository.updateDeliverydetailByInvoicenumber(idi);
		if(result > 0) return 1;
		else return 0;
	}
	
	/*배송 정보 상태 배송전(BEFORE)으로  수정*/
	@Override
	public int updateDeliverydetailByDeliverystate(PaymentHistoryInput idi) {
		int result = Invoicedetailrepository.updateDeliverydetailByDeliverystate(idi);
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구내역 선납여부  수정 */
	@Override
	public int updateInvoicePrepayYn(InvoiceCalculationInput idi) {
		int result = Invoicedetailrepository.updateInvoicePrepayYn(idi);
		if(result > 0) return 1;
		else return 0;
	}
	
	/*청구 계산내역  선납여부  수정 */	
	@Override
	public int updateInvoicecalculationPrepayYn(InvoiceCalculationInput idi) {
		int result = Invoicedetailrepository.updateInvoicecalculationPrepayYn(idi);
		if(result > 0) return 1;
		else return 0;
	}

	/*청구상세내역 선납여부  수정  */	
	@Override
	public int updateInvoicedetailPrepayYn(InvoiceCalculationInput idi) {
		int result = Invoicedetailrepository.updateInvoicedetailPrepayYn(idi);
		if(result > 0) return 1;
		else return 0;
	}
	
	@Override
	public InvoiceCalculationInput getInvoicenumberByOne(ContractInsert idi) {
		InvoiceCalculationInput result = Invoicedetailrepository.getInvoicenumberByOne(idi);
		return result;
	}
	
	@Override
	public List<InvoiceDetail> getInvoiceDetail(InvoiceDetailInput idi) {
		// TODO Auto-generated method stub
		List<InvoiceDetail> invoicedetail = Invoicedetailrepository.getInvoiceDetail(idi);
		return invoicedetail;
	}

	@Override
	public List<Invoice> getInvoiceByDate(InvoiceDateInput idi) {
		// TODO Auto-generated method stub
		List<Invoice> invoicelist = Invoicedetailrepository.getInvoiceByDate(idi);
		return invoicelist;
	}

	@Override
	public InvoiceDetailCustomerInfo getInvoiceDetailCustomerInfo(InvoiceDetailInput idi) {
		// TODO Auto-generated method stub
		InvoiceDetailCustomerInfo invoicecustomerinfo = Invoicedetailrepository.getInvoiceDetailCustomerInfo(idi);
		return invoicecustomerinfo;
	}

	@Override
	public List<Invoice> getInvoiceByName(InvoiceNameInput idi) {
		// TODO Auto-generated method stub
		List<Invoice> invoicelist = Invoicedetailrepository.getInvoiceByName(idi);
		return invoicelist;
	}

	/* 20180909 수정 */
	 @Override
	public InvoiceCustomerInfo getInvoiceCustomerInfoByName(InvoiceDetailInput idi) {
	  // TODO Auto-generated method stub
	  InvoiceCustomerInfo invoicecustomerinfo = Invoicedetailrepository.getInvoiceCustomerInfoByName(idi);
	  return invoicecustomerinfo;
	 }
	
	/*invoice calculation*/
	@Override
	public int setInvoiceCalculation(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stubInvoicedetailrepository.setInvoiceCalculation(calfromDate)
		int result = Invoicedetailrepository.setInvoiceCalculation(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	@Override
	public int setInvoiceCalculationDiscountRate(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stubInvoicedetailrepository.setInvoiceCalculation(calfromDate)
		int result = Invoicedetailrepository.setInvoiceCalculationDiscountRate(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	@Override
	public int setInvoiceCalculationDiscountAmount(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stubInvoicedetailrepository.setInvoiceCalculation(calfromDate)
		int result = Invoicedetailrepository.setInvoiceCalculationDiscountAmount(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	@Override
	public int setInvoiceCalculationDiscountOneTimeFee(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stubInvoicedetailrepository.setInvoiceCalculation(calfromDate)
		int result = Invoicedetailrepository.setInvoiceCalculationDiscountOneTimeFee(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}


	@Override
	public int setInvoiceDetail(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.setInvoiceDetail(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}

	@Override
	public int updateInvoiceDetail(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.updateInvoiceDetail(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	@Override
	public int setInvoice(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.setInvoice(calfromDate) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	 @Override
	 public int updateInvoiceZero(InvoiceCalculationInput calfromDate) {
	  // TODO Auto-generated method stub
	  int result = Invoicedetailrepository.updateInvoiceZero(calfromDate) ;
	  return result;
	 }
	 
	 @Override
	 public int updateInvoiceDetailZero(InvoiceCalculationInput calfromDate) {
	  // TODO Auto-generated method stub
	  int result = Invoicedetailrepository.updateInvoiceDetailZero(calfromDate) ;
	  return result;
	 }
	 
	 @Override
	 public int updateInvoiceCalculationZero(InvoiceCalculationInput calfromDate) {
	  // TODO Auto-generated method stub
	  int result = Invoicedetailrepository.updateInvoiceCalculationZero(calfromDate) ;
	  return result;
	 }
	
	 @Override
	 public List<Invoice> getZeroInvoicetoDelivery(InvoiceCalculationInput calfromDate) {
	  // TODO Auto-generated method stub
	  List<Invoice> invoicelist = Invoicedetailrepository.getZeroInvoicetoDelivery(calfromDate);
	  return invoicelist;
	 }

	/*invoice Prepay calculation Start */
	 @Override
	 public int setInvoiceCalculationPrepay(InvoiceCreatePrePayInvoiceInput idi) {
	  // TODO Auto-generated method stub
	  int result = Invoicedetailrepository.setInvoiceCalculationPrepay(idi) ;
	  if(result > 0) return 1;
	  else return 0;
	 }
	 
	 @Override
	 public int setInvoiceCalculationDiscountRatePrepay(InvoiceCreatePrePayInvoiceInput idi) {
	  // TODO Auto-generated method stub
	  int result = Invoicedetailrepository.setInvoiceCalculationDiscountRatePrepay(idi) ;
	  if(result > 0) return 1;
	  else return 0;
	 }
	 
	 @Override
	 public int setInvoiceCalculationDiscountAmountPrepay(InvoiceCreatePrePayInvoiceInput idi) {
	  // TODO Auto-generated method stub
	  int result = Invoicedetailrepository.setInvoiceCalculationDiscountAmountPrepay(idi) ;
	  if(result > 0) return 1;
	  else return 0;
	 }
	 
	 @Override
	 public int setInvoiceCalculationDiscountOneTimeFeePrepay(InvoiceCreatePrePayInvoiceInput idi) {
	  // TODO Auto-generated method stub
	  int result = Invoicedetailrepository.setInvoiceCalculationDiscountOneTimeFeePrepay(idi) ;
	  if(result > 0) return 1;
	  else return 0;
	 }
	 
	 @Override
	 public int setInvoiceDetailPrepay(InvoiceCreatePrePayInvoiceInput idi) {
	  // TODO Auto-generated method stub
	  int result = Invoicedetailrepository.setInvoiceDetailPrepay(idi) ;
	  if(result > 0) return 1;
	  else return 0;
	 }
	 
	 @Override
	 public int updateInvoiceDetailPrepay(InvoiceCreatePrePayInvoiceInput idi) {
	  // TODO Auto-generated method stub
	  int result = Invoicedetailrepository.updateInvoiceDetailPrepay(idi) ;
	  if(result > 0) return 1;
	  else return 0;
	 }
	 
	 @Override
	 public int updateInvoiceCalculationPrepay(InvoiceCreatePrePayInvoiceInput idi) {
	  // TODO Auto-generated method stub
	  int result = Invoicedetailrepository.updateInvoiceCalculationPrepay(idi) ;
	  if(result > 0) return 1;
	  else return 0;
	 }
	 
	 @Override
	 public int setInvoicePrepay(InvoiceCreatePrePayInvoiceInput idi) {
	  // TODO Auto-generated method stub
	  int result = Invoicedetailrepository.setInvoicePrepay(idi) ;
	  if(result > 0) return 1;
	  else return 0;
	 }
	 
	 
	  @Override
	  public PaymentPrePayInvoiceInput getPrePayInvoice(InvoiceCreatePrePayInvoiceInput idi) {
	   // TODO Auto-generated method stub
	   PaymentPrePayInvoiceInput paymentprepayinvoiceinput =  Invoicedetailrepository.getPrePayInvoice(idi);
	   return paymentprepayinvoiceinput;
	  }
	 
	 /*invoice Prepay calculation End */ 
	
	
	
	@Override
	public List<PaymentHistoryDetail> getPaymentHistory(InvoiceDetailInput idi) {
		// TODO Auto-generated method stub
		List<PaymentHistoryDetail> paymentlist =  Invoicedetailrepository.getPaymentHistory(idi);
		return paymentlist;
	}

	@Override
	public List<InvoiceCalculation> getCalculationInvoice(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stub
		List<InvoiceCalculation> InvoiceCalculationlist =  Invoicedetailrepository.getCalculationInvoice(calfromDate);
		return InvoiceCalculationlist;
	}

	@Override
	public InvoiceTaxItemInfo getInvoiceTaxItemAmount(InvoiceDetailInput idi) {
		// TODO Auto-generated method stub
		InvoiceTaxItemInfo iti =  Invoicedetailrepository.getInvoiceTaxItemAmount(idi);
		return iti;
	}

	@Override
	public List<InvoiceAdjust> getInvoiceAdjust(InvoiceDetailInput idi) {
		// TODO Auto-generated method stub
		List<InvoiceAdjust> InvoiceAdjustlist =  Invoicedetailrepository.getInvoiceAdjust(idi);
		return InvoiceAdjustlist;
	}

	@Override
	public int setPaymentHistory(PaymentHistoryInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.setPaymentHistory(input) ;
		if(result > 0) return 1;
		else return 0;
	}

	@Override
	public int updateColInvoice(PaymentHistoryInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.updateColInvoice(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	@Override
	public int updateColInvoiceDetail(PaymentHistoryInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.updateColInvoiceDetail(input) ;
		if(result > 0) return 1;
		else return 0;
	}

	@Override
	public int setRefundHistory(PaymentHistoryInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.setRefundHistory(input) ;
		if(result > 0) return 1;
		else return 0;
	}

	@Override
	public int updaterefundColInvoice(PaymentHistoryInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.updaterefundColInvoice(input) ;
		if(result > 0) return 1;
		else return 0;
	}
	
	@Override
	public int updaterefundColInvoiceDetail(PaymentHistoryInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.updaterefundColInvoiceDetail(input) ;
		if(result > 0) return 1;
		else return 0;
	}

	@Override
	public int setInvoiceAdjust(InvoiceAdjustInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.setInvoiceAdjust(input) ;
		if(result > 0) return 1;
		else return 0;
	}

	@Override
	public int updateInvoiceAdjust(InvoiceAdjustInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.updateInvoiceAdjust(input) ;
		if(result > 0) return 1;
		else return 0;
	}

	@Override
	public int setInvoiceAdjustInvoiceDetail(InvoiceAdjustInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.setInvoiceAdjustInvoiceDetail(input) ;
		if(result > 0) return 1;
		else return 0;
	}

	@Override
	public int updateInvoiceAdjustInvoiceDetail(InvoiceAdjustInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.updateInvoiceAdjustInvoiceDetail(input) ;
		if(result > 0) return 1;
		else return 0;
	}

	@Override
	public int updateInvoiceAdjustAply(InvoiceAdjustInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.updateInvoiceAdjustAply(input) ;
		if(result > 0) return 1;
		else return 0;
	}

	@Override
	public int checkInvoiceAdjust(InvoiceAdjustInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.checkInvoiceAdjust(input) ;
		if(result > 0) return 1;
		else return 0;
	}

	@Override
	public List<InvoiceCalculation> getInvoiceRecurringpayment(String calfromDate) {
		// TODO Auto-generated method stub
		List<InvoiceCalculation> InvoiceCalculationlist =  Invoicedetailrepository.getInvoiceRecurringpayment(calfromDate);
		return InvoiceCalculationlist;
	}

	@Override
	public int sendInvoiceSum(InvoiceDetailInput idi) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.sendInvoiceSum(idi) ;
		return result;
	}

	/*paging */
	@Override
	public int getInvoiceTotCount(InvoiceDateInput idi) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.getInvoiceTotCount(idi) ;
		return result;
	}

	@Override
	public int getInvoiceNameTotCount(InvoiceNameInput idi) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.getInvoiceNameTotCount(idi) ;
		return result;
	}

	@Override
	public int getPaymentHistoryTotCount(InvoiceDetailInput idi) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.getPaymentHistoryTotCount(idi) ;
		return result;
	}

	@Override
	public int updateLastInvoicedt(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.updateLastInvoicedt(calfromDate) ;
		return result;
	}

	@Override
	public int updateNextInvoicedt(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.updateNextInvoicedt(calfromDate) ;
		return result;
	}

	@Override
	public int updateInvoiceCalculation(InvoiceCalculationInput calfromDate) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.updateInvoiceCalculation(calfromDate) ;
		return result;
	}

	@Override
	public List<invoiceCounSellingResult> getCounsellingData(invoiceCounSelling idi) {
		// TODO Auto-generated method stub
		List<invoiceCounSellingResult> invoiceCounSellingResultlist =  Invoicedetailrepository.getCounsellingData(idi);
		return invoiceCounSellingResultlist;
	}

	@Override
	public int getCounsellingTotalCount(invoiceCounSelling idi) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.getCounsellingTotalCount(idi) ;
		return result;
	}

	@Override
	public int insertCounsellingHistory(invoiceCounSelling idi) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.insertCounsellingHistory(idi) ;
		return result;
	}

	
	 @Override
	 public List<InvoiceDetailProductInfo> getInvoiceDetailProductInfo(InvoiceDetailInput idi) {
	  // TODO Auto-generated method stub
	  List<InvoiceDetailProductInfo> invoiceproductinfolist = Invoicedetailrepository.getInvoiceDetailProductInfo(idi);
	  return invoiceproductinfolist;
	 }

	@Override
	public int insertPgpaymentlist(PaymentHistoryInput input) {
		// TODO Auto-generated method stub
		int result = Invoicedetailrepository.insertPgpaymentlist(input) ;
		return result;
	}

	@Override
	public int selectPgpaymentlist(String input) {
		// TODO Auto-generated method stub
		return 0;
	}
	

	
}
