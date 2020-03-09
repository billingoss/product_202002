package com.api.model.billing;

public class BatchRegularPayment {

	private int batchNumber;					//배치번호
	private int conNumber;					//계약번호
	private int providerNumber;				//업체번호
	private int invoiceNumber;				//청구번호
	private String invoiceDate; 				//청구일자
	private String billKey;						//BillKey
	private String paymentMethodCode;	//납부방법코드
	private String tid;							//TID
	private String resultCode;					//빌링요청결과 : 성공(00, 0000)
	private String resultMsg;					//빌링요청결과 설명
	private String authCode;					//승인번호
	private String pgAuthDate;				//승인날짜
	private String pgAuthTime;				//승인시간
	
	public int getConNumber() {
		return conNumber;
	}
	public void setConNumber(int conNumber) {
		this.conNumber = conNumber;
	}
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
	public String getInvoiceDate() {
		return invoiceDate;
	}
	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}
	public String getBillKey() {
		return billKey;
	}
	public void setBillKey(String billKey) {
		this.billKey = billKey;
	}
	public String getTid() {
		return tid;
	}
	public void setTid(String tid) {
		this.tid = tid;
	}
	public String getResultCode() {
		return resultCode;
	}
	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}
	public String getResultMsg() {
		return resultMsg;
	}
	public void setResultMsg(String resultMsg) {
		this.resultMsg = resultMsg;
	}
	public String getAuthCode() {
		return authCode;
	}
	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}
	public String getPgAuthDate() {
		return pgAuthDate;
	}
	public void setPgAuthDate(String pgAuthDate) {
		this.pgAuthDate = pgAuthDate;
	}
	public String getPgAuthTime() {
		return pgAuthTime;
	}
	public void setPgAuthTime(String pgAuthTime) {
		this.pgAuthTime = pgAuthTime;
	}
	public String getPaymentMethodCode() {
		return paymentMethodCode;
	}
	public void setPaymentMethodCode(String paymentMethodCode) {
		this.paymentMethodCode = paymentMethodCode;
	}
	public int getBatchNumber() {
		return batchNumber;
	}
	public void setBatchNumber(int batchNumber) {
		this.batchNumber = batchNumber;
	}
	
}
