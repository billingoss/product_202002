package com.api.model.billing;

import com.api.model.Criteria;

public class PaymentPrePayInvoiceInput extends Criteria {

	private int invoiceNumber;
	private int conNumber;
	private String invoiceDate;
	
	/* ID mapping */
	private String userName;
	private int providerNumber;
	
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
	public String getInvoiceDate() {
		return invoiceDate;
	}
	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
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

	
}
