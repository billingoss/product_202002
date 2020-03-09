package com.api.model.billing;

public class TrancelateInvoice {

	private int providerNumber;
	private int conNumber;
	private int invoiceNumber;
	private String invoicedate;
	private String productId;							/*상품 ID*/
	private String productName;						/*상품명*/
	private String channelCustomerNumber; 	/*서비스관리번호*/
	private int priceAmount;							/*상품가격*/
	private String subscribeDateTime;				/*과금시작일자(가입일자)*/
	private String terminationDateTime;
	private String effectEndDateTime;				/*과금종료일자(해지일자)*/
	private String channelOrderNumber;			/*구매번호*/
	private String deliveryDoneYn;					/*배송여부*/
	private int totalInvoiceAmount;					/*최종청구금액*/
	
	private String searchDate;
	private String channelId;
	private String channelName;
	
	public int getProviderNumber() {
		return providerNumber;
	}
	public void setProviderNumber(int providerNumber) {
		this.providerNumber = providerNumber;
	}
	public int getConNumber() {
		return conNumber;
	}
	public void setConNumber(int conNumber) {
		this.conNumber = conNumber;
	}
	public int getInvoiceNumber() {
		return invoiceNumber;
	}
	public void setInvoiceNumber(int invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}
	public String getInvoicedate() {
		return invoicedate;
	}
	public void setInvoicedate(String invoicedate) {
		this.invoicedate = invoicedate;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getChannelCustomerNumber() {
		return channelCustomerNumber;
	}
	public void setChannelCustomerNumber(String channelCustomerNumber) {
		this.channelCustomerNumber = channelCustomerNumber;
	}
	public int getPriceAmount() {
		return priceAmount;
	}
	public void setPriceAmount(int priceAmount) {
		this.priceAmount = priceAmount;
	}
	public String getSubscribeDateTime() {
		return subscribeDateTime;
	}
	public void setSubscribeDateTime(String subscribeDateTime) {
		this.subscribeDateTime = subscribeDateTime;
	}
	public String getTerminationDateTime() {
		return terminationDateTime;
	}
	public void setTerminationDateTime(String terminationDateTime) {
		this.terminationDateTime = terminationDateTime;
	}
	public String getEffectEndDateTime() {
		return effectEndDateTime;
	}
	public void setEffectEndDateTime(String effectEndDateTime) {
		this.effectEndDateTime = effectEndDateTime;
	}
	public String getChannelOrderNumber() {
		return channelOrderNumber;
	}
	public void setChannelOrderNumber(String channelOrderNumber) {
		this.channelOrderNumber = channelOrderNumber;
	}
	public String getDeliveryDoneYn() {
		return deliveryDoneYn;
	}
	public void setDeliveryDoneYn(String deliveryDoneYn) {
		this.deliveryDoneYn = deliveryDoneYn;
	}
	public int getTotalInvoiceAmount() {
		return totalInvoiceAmount;
	}
	public void setTotalInvoiceAmount(int totalInvoiceAmount) {
		this.totalInvoiceAmount = totalInvoiceAmount;
	}
	public String getSearchDate() {
		return searchDate;
	}
	public void setSearchDate(String searchDate) {
		this.searchDate = searchDate;
	}
	public String getChannelId() {
		return channelId;
	}
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}
	public String getChannelName() {
		return channelName;
	}
	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}
}
