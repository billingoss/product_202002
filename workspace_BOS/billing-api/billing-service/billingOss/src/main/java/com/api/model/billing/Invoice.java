package com.api.model.billing;

public class Invoice {

	private int    invoiceNumber;					//청구번호
	private String invoiceDate;						//청구일자
	private int customerNumber ;				//고객번호
	private String customerName ;				//고객명
	private String productName ;					//상품명
	private String paymentType; 					//결제방법
	private String invoiceTurn;					//회차
	private String invoiceCycle;					//결제주기
	private int collectionBalanceAmount ;		//결제금액	
	private String paymentTypeCode;			//결제유형코드
	private String paymentTypeCodeName;		//결제유형코드명
	private String paymentStateCode;			//결제상태코드
	private String paymentSatateCodeName;	//결제상태코드명
	private String errorReasonCode ;			//에러코드
	private String pgErrorCode;					//PG에러 코드
	private String pgErrorMsg;					//PG에러 메세지
	private String email;							//고객 이메일
	private String phoneNumber;					//고객 핸드폰 번호
	private int conNumber;						//계약번호
	private int paymentAmount ;					//납부금액
	private String paymentDateTime ;			//납부일시
	private String paymentDate;					//납부일자
	private int totalInvoiceAmount ;				//총청구금액
	private int adjustAmount;						//조정금액	
	private int offerPayAmount;					//지불금액
	private String tid;								//TID
	private String collectionCloseYn;				//미납종료여부
	private String billKey;							//billkey
	private String deliveryState;					//배송상태
	private String paymentMethod;				//결제방법
	private String paymentMethodName;		//결제방법명
	private String etc;								//메모
	private String cardCorporationCode;		//카드사코드
	private String cardCorporationCodeName;	//카드사코드명
	
	private String payProcId;						//결체처리자
	private String payProcName;					//결체처리자명	
	
	/*ID mapping*/
	private String userName;					//사용자명
	private int providerNumber;				//업체번호
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
	public int getCustomerNumber() {
		return customerNumber;
	}
	public void setCustomerNumber(int customerNumber) {
		this.customerNumber = customerNumber;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public String getInvoiceTurn() {
		return invoiceTurn;
	}
	public void setInvoiceTurn(String invoiceTurn) {
		this.invoiceTurn = invoiceTurn;
	}
	public String getInvoiceCycle() {
		return invoiceCycle;
	}
	public void setInvoiceCycle(String invoiceCycle) {
		this.invoiceCycle = invoiceCycle;
	}
	public int getCollectionBalanceAmount() {
		return collectionBalanceAmount;
	}
	public void setCollectionBalanceAmount(int collectionBalanceAmount) {
		this.collectionBalanceAmount = collectionBalanceAmount;
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
	public String getPaymentStateCode() {
		return paymentStateCode;
	}
	public void setPaymentStateCode(String paymentStateCode) {
		this.paymentStateCode = paymentStateCode;
	}
	public String getPaymentSatateCodeName() {
		return paymentSatateCodeName;
	}
	public void setPaymentSatateCodeName(String paymentSatateCodeName) {
		this.paymentSatateCodeName = paymentSatateCodeName;
	}
	public String getErrorReasonCode() {
		return errorReasonCode;
	}
	public void setErrorReasonCode(String errorReasonCode) {
		this.errorReasonCode = errorReasonCode;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public int getConNumber() {
		return conNumber;
	}
	public void setConNumber(int conNumber) {
		this.conNumber = conNumber;
	}
	public int getPaymentAmount() {
		return paymentAmount;
	}
	public void setPaymentAmount(int paymentAmount) {
		this.paymentAmount = paymentAmount;
	}
	public String getPaymentDateTime() {
		return paymentDateTime;
	}
	public void setPaymentDateTime(String paymentDateTime) {
		this.paymentDateTime = paymentDateTime;
	}
	public String getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}
	public int getTotalInvoiceAmount() {
		return totalInvoiceAmount;
	}
	public void setTotalInvoiceAmount(int totalInvoiceAmount) {
		this.totalInvoiceAmount = totalInvoiceAmount;
	}
	public int getAdjustAmount() {
		return adjustAmount;
	}
	public void setAdjustAmount(int adjustAmount) {
		this.adjustAmount = adjustAmount;
	}
	public int getOfferPayAmount() {
		return offerPayAmount;
	}
	public void setOfferPayAmount(int offerPayAmount) {
		this.offerPayAmount = offerPayAmount;
	}
	public String getTid() {
		return tid;
	}
	public void setTid(String tid) {
		this.tid = tid;
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
	public String getBillKey() {
		return billKey;
	}
	public void setBillKey(String billKey) {
		this.billKey = billKey;
	}
	public String getDeliveryState() {
		return deliveryState;
	}
	public void setDeliveryState(String deliveryState) {
		this.deliveryState = deliveryState;
	}
	public String getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public String getCollectionCloseYn() {
		return collectionCloseYn;
	}
	public void setCollectionCloseYn(String collectionCloseYn) {
		this.collectionCloseYn = collectionCloseYn;
	}
	public String getEtc() {
		return etc;
	}
	public void setEtc(String etc) {
		this.etc = etc;
	}
	public String getPaymentMethodName() {
		return paymentMethodName;
	}
	public void setPaymentMethodName(String paymentMethodName) {
		this.paymentMethodName = paymentMethodName;
	}
	public String getCardCorporationCode() {
		return cardCorporationCode;
	}
	public void setCardCorporationCode(String cardCorporationCode) {
		this.cardCorporationCode = cardCorporationCode;
	}
	public String getCardCorporationCodeName() {
		return cardCorporationCodeName;
	}
	public void setCardCorporationCodeName(String cardCorporationCodeName) {
		this.cardCorporationCodeName = cardCorporationCodeName;
	}
	public String getPayProcId() {
		return payProcId;
	}
	public void setPayProcId(String payProcId) {
		this.payProcId = payProcId;
	}
	public String getPayProcName() {
		return payProcName;
	}
	public void setPayProcName(String payProcName) {
		this.payProcName = payProcName;
	}
	
}
