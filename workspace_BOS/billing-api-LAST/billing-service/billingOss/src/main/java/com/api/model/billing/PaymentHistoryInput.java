package com.api.model.billing;

public class PaymentHistoryInput {

	private int invoiceNumber;
	private String invoiceDate;
	private int conNumber;
	private int paymentAmt;
	private String paymentTypeCode;
	private String cardCorporationCode;
	private String cardApproveNumber;
	private String paymentOwnerName;
	private String paymentMethodCode;
	private String memo;
	private String channelGubun;
	private String itemName;
	private String vatAmount;
	private String quantity;
	private String tid;
	private String deliveryState;
	
	
	private String errorReasonCode;
	private String pgErrorCode;
	private String pgErrorMsg;
	
	/*ID mapping*/
	private String userName;
	private int providerNumber;

	/*ID mapping*/
	public PaymentHistoryInput() {
		
	}
	
	public PaymentHistoryInput(int invoicenumber, String invoicedate, int connumber, int paymentamt,
			String paymenttypecode) {
		super();
		this.invoiceNumber = invoicenumber;
		this.invoiceDate = invoicedate;
		this.conNumber = connumber;
		this.paymentAmt = paymentamt;
		this.paymentTypeCode = paymenttypecode;
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


	public int getConNumber() {
		return conNumber;
	}


	public void setConNumber(int conNumber) {
		this.conNumber = conNumber;
	}


	public int getPaymentAmt() {
		return paymentAmt;
	}


	public void setPaymentAmt(int paymentAmt) {
		this.paymentAmt = paymentAmt;
	}


	public String getPaymentTypeCode() {
		return paymentTypeCode;
	}


	public void setPaymentTypeCode(String paymentTypeCode) {
		this.paymentTypeCode = paymentTypeCode;
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


	public String getPaymentOwnerName() {
		return paymentOwnerName;
	}


	public void setPaymentOwnerName(String paymentOwnerName) {
		this.paymentOwnerName = paymentOwnerName;
	}


	public String getPaymentMethodCode() {
		return paymentMethodCode;
	}


	public void setPaymentMethodCode(String paymentMethodCode) {
		this.paymentMethodCode = paymentMethodCode;
	}


	public String getMemo() {
		return memo;
	}


	public void setMemo(String memo) {
		this.memo = memo;
	}


	public String getChannelGubun() {
		return channelGubun;
	}


	public void setChannelGubun(String channelGubun) {
		this.channelGubun = channelGubun;
	}


	public String getItemName() {
		return itemName;
	}


	public void setItemName(String itemName) {
		this.itemName = itemName;
	}


	public String getVatAmount() {
		return vatAmount;
	}


	public void setVatAmount(String vatAmount) {
		this.vatAmount = vatAmount;
	}


	public String getQuantity() {
		return quantity;
	}


	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}


	public String getTid() {
		return tid;
	}


	public void setTid(String tid) {
		this.tid = tid;
	}


	public String getDeliveryState() {
		return deliveryState;
	}


	public void setDeliveryState(String deliveryState) {
		this.deliveryState = deliveryState;
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

	public String getErrorReasonCode() {
		return errorReasonCode;
	}

	public void setErrorReasonCode(String errorReasonCode) {
		this.errorReasonCode = errorReasonCode;
	}
	
	
}
