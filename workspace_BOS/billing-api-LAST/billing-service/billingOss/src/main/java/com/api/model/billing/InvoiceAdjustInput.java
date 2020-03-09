package com.api.model.billing;

public class InvoiceAdjustInput {

	private int    invoiceNumber;
	private String invoiceDate;
	private int    conNumber;
	private String invoiceClassificationCode;
	private String revenueItemCode;
	private int    adjustPossibleAmount;
	private int    adjustAmt;
	private String adjustRequestReasonCode;
	private String adjusTreasonMessage;
	
	/*ID mapping*/
	private String userName;
	private int providerNumber;
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
	public int getConNumber() {
		return conNumber;
	}
	public void setConNumber(int conNumber) {
		this.conNumber = conNumber;
	}
	public String getInvoiceClassificationCode() {
		return invoiceClassificationCode;
	}
	public void setInvoiceClassificationCode(String invoiceClassificationCode) {
		this.invoiceClassificationCode = invoiceClassificationCode;
	}
	public String getRevenueItemCode() {
		return revenueItemCode;
	}
	public void setRevenueItemCode(String revenueItemCode) {
		this.revenueItemCode = revenueItemCode;
	}
	public int getAdjustPossibleAmount() {
		return adjustPossibleAmount;
	}
	public void setAdjustPossibleAmount(int adjustPossibleAmount) {
		this.adjustPossibleAmount = adjustPossibleAmount;
	}
	public int getAdjustAmt() {
		return adjustAmt;
	}
	public void setAdjustAmt(int adjustAmt) {
		this.adjustAmt = adjustAmt;
	}
	public String getAdjustRequestReasonCode() {
		return adjustRequestReasonCode;
	}
	public void setAdjustRequestReasonCode(String adjustRequestReasonCode) {
		this.adjustRequestReasonCode = adjustRequestReasonCode;
	}
	public String getAdjusTreasonMessage() {
		return adjusTreasonMessage;
	}
	public void setAdjusTreasonMessage(String adjusTreasonMessage) {
		this.adjusTreasonMessage = adjusTreasonMessage;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getProviderNumber() {
		return providerNumber;
	}
	public void setProviderNumber(int providerNumber) {
		this.providerNumber = providerNumber;
	}
	
/*
	ID mapping	
	public InvoiceAdjustInput(int invoicenumber
			                 ,String invoiceDate
			                 ,int    conNumber
			                 ,String invoiceClassificationCode
			                 ,String revenueItemCode
			                 ,int    adjustPossibleAmount
			                 ,int    adjustamt
			                 ,String adjustreasonmessage
			                 ) 
	{
		this.invoiceNumber = invoicenumber;
		this.invoiceDate   = invoiceDate;
		this.conNumber = conNumber;
		this.invoiceClassificationCode = invoiceClassificationCode;
		this.revenueItemCode = revenueItemCode;
		this.adjustPossibleAmount = adjustPossibleAmount;
		this.adjustAmt = adjustamt;
		this.adjusTreasonMessage = adjustreasonmessage;
	}
	

*/

}
