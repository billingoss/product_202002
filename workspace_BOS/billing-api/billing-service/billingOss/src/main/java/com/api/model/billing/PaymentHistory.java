package com.api.model.billing;

public class PaymentHistory {
	private int providerNumber;					//제공자
	private int invoiceNumber;					//청구번호
	private int conNumber;						//계약번호
	private String paymentDateTime;				//결제일시
	private String paymentTypeCode;			//결제유형코드
	private String paymentTypeCodeName;		//결제유형코드명
	private String paymentOwnerName;			//결제자명
	private int paymentAmount;					//결제금액
	private String paymentMethodCode;		//결제방법코드
	private String paymentMethodCodeName;	//결제방법코드명
	private String refundYn;						//환불여부
	private String cardCorporationCode;		//카드회사코드
	private String cardApproveNumber;			//카드승인번호
	private String recurringPaymentYn;			//정기결제여부
	private String errorReasonCode;				//에러코드
	private String refundReasonCode;			//환불에러코드
	private String pgErrorCode;					//PG 에러코드
	private String pgErrorMsg;					//PG 에러메세지
	private String etc;								//메모
	private String tid;								//Tid
	private String auditId;
	private String auditDateTime;
	
	public int getProviderNumber() {
		return providerNumber;
	}
	public void setProviderNumber(int providerNumber) {
		this.providerNumber = providerNumber;
	}
	public int getInvoiceNumber() {
		return invoiceNumber;
	}
	public void setInvoiceNumber(int invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}
	public int getConNumber() {
		return conNumber;
	}
	public void setConNumber(int conNumber) {
		this.conNumber = conNumber;
	}
	public String getPaymentDateTime() {
		return paymentDateTime;
	}
	public void setPaymentDateTime(String paymentDateTime) {
		this.paymentDateTime = paymentDateTime;
	}
	public String getPaymentTypeCode() {
		return paymentTypeCode;
	}
	public void setPaymentTypeCode(String paymentTypeCode) {
		this.paymentTypeCode = paymentTypeCode;
	}
	public String getPaymentTypeCodeName() {
		return paymentTypeCodeName;
	}
	public void setPaymentTypeCodeName(String paymentTypeCodeName) {
		this.paymentTypeCodeName = paymentTypeCodeName;
	}
	public String getPaymentOwnerName() {
		return paymentOwnerName;
	}
	public void setPaymentOwnerName(String paymentOwnerName) {
		this.paymentOwnerName = paymentOwnerName;
	}
	public int getPaymentAmount() {
		return paymentAmount;
	}
	public void setPaymentAmount(int paymentAmount) {
		this.paymentAmount = paymentAmount;
	}
	public String getPaymentMethodCode() {
		return paymentMethodCode;
	}
	public void setPaymentMethodCode(String paymentMethodCode) {
		this.paymentMethodCode = paymentMethodCode;
	}
	public String getPaymentMethodCodeName() {
		return paymentMethodCodeName;
	}
	public void setPaymentMethodCodeName(String paymentMethodCodeName) {
		this.paymentMethodCodeName = paymentMethodCodeName;
	}
	public String getRefundYn() {
		return refundYn;
	}
	public void setRefundYn(String refundYn) {
		this.refundYn = refundYn;
	}
	public String getCardCorporationCode() {
		return cardCorporationCode;
	}
	public void setCardCorporationCode(String cardCorporationCode) {
		this.cardCorporationCode = cardCorporationCode;
	}
	public String getCardApproveNumber() {
		return cardApproveNumber;
	}
	public void setCardApproveNumber(String cardApproveNumber) {
		this.cardApproveNumber = cardApproveNumber;
	}
	public String getRecurringPaymentYn() {
		return recurringPaymentYn;
	}
	public void setRecurringPaymentYn(String recurringPaymentYn) {
		this.recurringPaymentYn = recurringPaymentYn;
	}
	public String getErrorReasonCode() {
		return errorReasonCode;
	}
	public void setErrorReasonCode(String errorReasonCode) {
		this.errorReasonCode = errorReasonCode;
	}
	public String getRefundReasonCode() {
		return refundReasonCode;
	}
	public void setRefundReasonCode(String refundReasonCode) {
		this.refundReasonCode = refundReasonCode;
	}
	public String getPgErrorCode() {
		return pgErrorCode;
	}
	public void setPgErrorCode(String pgErrorCode) {
		this.pgErrorCode = pgErrorCode;
	}
	public String getPgErrorMsg() {
		return pgErrorMsg;
	}
	public void setPgErrorMsg(String pgErrorMsg) {
		this.pgErrorMsg = pgErrorMsg;
	}
	public String getEtc() {
		return etc;
	}
	public void setEtc(String etc) {
		this.etc = etc;
	}
	public String getTid() {
		return tid;
	}
	public void setTid(String tid) {
		this.tid = tid;
	}
	public String getAuditId() {
		return auditId;
	}
	public void setAuditId(String auditId) {
		this.auditId = auditId;
	}
	public String getAuditDateTime() {
		return auditDateTime;
	}
	public void setAuditDateTime(String auditDateTime) {
		this.auditDateTime = auditDateTime;
	}	
}
