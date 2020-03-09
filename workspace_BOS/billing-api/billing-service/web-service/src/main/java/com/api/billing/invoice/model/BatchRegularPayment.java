package com.api.billing.invoice.model;

public class BatchRegularPayment {

	private int connumber;			//계약번호
	private int providernumber;		//업체번호
	private int invoicenumber;		//청구번호
	private String invoicedate; 		//청구일자
	private String billkey;				//BillKey
	private String tid;					//TID
	private String resultCode;			//빌링요청결과 : 성공(00, 0000)
	private String resultMsg;			//빌링요청결과 설명
	private String authCode;			//승인번호
	private String pgAuthDate;		//승인날짜
	private String pgAuthTime;		//승인시간
	
	public int getConnumber() {
		return connumber;
	}
	public void setConnumber(int connumber) {
		this.connumber = connumber;
	}
	public int getProvidernumber() {
		return providernumber;
	}
	public void setProvidernumber(int providernumber) {
		this.providernumber = providernumber;
	}
	public int getInvoicenumber() {
		return invoicenumber;
	}
	public void setInvoicenumber(int invoicenumber) {
		this.invoicenumber = invoicenumber;
	}
	public String getInvoicedate() {
		return invoicedate;
	}
	public void setInvoicedate(String invoicedate) {
		this.invoicedate = invoicedate;
	}
	public String getBillkey() {
		return billkey;
	}
	public void setBillkey(String billkey) {
		this.billkey = billkey;
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
	
	
	
}
