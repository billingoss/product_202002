package com.api.model.billing;

/**
 * 조회용 상품 상세정보로 추가 속성 가능
 * @author Administrator
 *
 */
public class ContractInfoDetail {

	private int conNumber	;					/*계약번호*/
	private String productId;						/*상품아이디*/
	private String productName;					/*상품이름*/
	private String contractState;					/*계약상태*/
	private String duration;						/*가입기간 - 월단위*/ 
	private String invoiceCycle;					/*청구주기*/
	private String deliveryCycle;					/*배송주기*/	
	private String effectStartDateTime;			/*유효시작일(서비스시작일)*/
	private String effectEndDateTime;			/*유효종료일(서비스종료일)*/	
	private String productType;					/*결제일자*/
	private String recurringInvoiceYn;			/*'Y:정기결제 N:선납(일괄결제)',*/
	private String subscribeDateTime;			/*가입일자*/
	private int providerNumber;					/*업체번호*/
	//private String subscribedatetime;			/*계약일자*/
	private int customerNumber;					/*고객번호*/
	private int paymentDay;						/*결제일자*/
	private int priceAmount;						/*상품가격*/
	private int bulkAmount;						/*일괄결제금액*/
	private int productQuantity;				/*상품수량*/
	private int deliveryChargeAmount;			/*배송비*/
	private String deliveryChargeType;			/*배송유형*/
	private int paymentInformationNumber;	/*청구번호*/
	private String customerName;				/*구매자명*/
	private String cellPhoneNumber;				/*구매자 전화번호*/
	private String email;							/*구매자  email*/
	private String auditId;							/*작성자*/
	private int totalinvoiceamount;				/*총청구금액*/

	private String channelCustomerNumber;
	
	public int getConNumber() {
		return conNumber;
	}
	public void setConNumber(int conNumber) {
		this.conNumber = conNumber;
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
	public String getContractState() {
		return contractState;
	}
	public void setContractState(String contractState) {
		this.contractState = contractState;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getInvoiceCycle() {
		return invoiceCycle;
	}
	public void setInvoiceCycle(String invoiceCycle) {
		this.invoiceCycle = invoiceCycle;
	}
	public String getDeliveryCycle() {
		return deliveryCycle;
	}
	public void setDeliveryCycle(String deliveryCycle) {
		this.deliveryCycle = deliveryCycle;
	}
	public String getEffectStartDateTime() {
		return effectStartDateTime;
	}
	public void setEffectStartDateTime(String effectStartDateTime) {
		this.effectStartDateTime = effectStartDateTime;
	}
	public String getEffectEndDateTime() {
		return effectEndDateTime;
	}
	public void setEffectEndDateTime(String effectEndDateTime) {
		this.effectEndDateTime = effectEndDateTime;
	}
	public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	public String getRecurringInvoiceYn() {
		return recurringInvoiceYn;
	}
	public void setRecurringInvoiceYn(String recurringInvoiceYn) {
		this.recurringInvoiceYn = recurringInvoiceYn;
	}
	public String getSubscribeDateTime() {
		return subscribeDateTime;
	}
	public void setSubscribeDateTime(String subscribeDateTime) {
		this.subscribeDateTime = subscribeDateTime;
	}
	public int getProviderNumber() {
		return providerNumber;
	}
	public void setProviderNumber(int providerNumber) {
		this.providerNumber = providerNumber;
	}
	public int getCustomerNumber() {
		return customerNumber;
	}
	public void setCustomerNumber(int customerNumber) {
		this.customerNumber = customerNumber;
	}
	public int getPaymentDay() {
		return paymentDay;
	}
	public void setPaymentDay(int paymentDay) {
		this.paymentDay = paymentDay;
	}
	public int getPriceAmount() {
		return priceAmount;
	}
	public void setPriceAmount(int priceAmount) {
		this.priceAmount = priceAmount;
	}
	public int getBulkAmount() {
		return bulkAmount;
	}
	public void setBulkAmount(int bulkAmount) {
		this.bulkAmount = bulkAmount;
	}

	public int getDeliveryChargeAmount() {
		return deliveryChargeAmount;
	}
	public void setDeliveryChargeAmount(int deliveryChargeAmount) {
		this.deliveryChargeAmount = deliveryChargeAmount;
	}
	public String getDeliveryChargeType() {
		return deliveryChargeType;
	}
	public void setDeliveryChargeType(String deliveryChargeType) {
		this.deliveryChargeType = deliveryChargeType;
	}
	public int getPaymentInformationNumber() {
		return paymentInformationNumber;
	}
	public void setPaymentInformationNumber(int paymentInformationNumber) {
		this.paymentInformationNumber = paymentInformationNumber;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCellPhoneNumber() {
		return cellPhoneNumber;
	}
	public void setCellPhoneNumber(String cellPhoneNumber) {
		this.cellPhoneNumber = cellPhoneNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAuditId() {
		return auditId;
	}
	public void setAuditId(String auditId) {
		this.auditId = auditId;
	}
	public String getChannelCustomerNumber() {
		return channelCustomerNumber;
	}
	public void setChannelCustomerNumber(String channelCustomerNumber) {
		this.channelCustomerNumber = channelCustomerNumber;
	}
	public int getTotalinvoiceamount() {
		return totalinvoiceamount;
	}
	public void setTotalinvoiceamount(int totalinvoiceamount) {
		this.totalinvoiceamount = totalinvoiceamount;
	}
	public int getProductQuantity() {
		return productQuantity;
	}
	public void setProductQuantity(int productQuantity) {
		this.productQuantity = productQuantity;
	}	
}
