package com.api.model.contract;

public class PaymentInformation {

	private int customerNumber;
	private int conNumber;
	private int paymentInformationNumber;
	private String paymentMethod;
	private String billKey;
	private String cardCorporationCode;
	/*ID mapping*/
	private String userName;
	private int providerNumber;
	
	public int getCustomerNumber() {
		return customerNumber;
	}
	public void setCustomerNumber(int customerNumber) {
		this.customerNumber = customerNumber;
	}
	public int getConNumber() {
		return conNumber;
	}
	public void setConNumber(int conNumber) {
		this.conNumber = conNumber;
	}
	public int getPaymentInformationNumber() {
		return paymentInformationNumber;
	}
	public void setPaymentInformationNumber(int paymentInformationNumber) {
		this.paymentInformationNumber = paymentInformationNumber;
	}
	public String getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public String getBillKey() {
		return billKey;
	}
	public void setBillKey(String billKey) {
		this.billKey = billKey;
	}
	public String getCardCorporationCode() {
		return cardCorporationCode;
	}
	public void setCardCorporationCode(String cardCorporationCode) {
		this.cardCorporationCode = cardCorporationCode;
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
