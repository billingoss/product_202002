package com.api.model.contract;

import java.util.List;

public class ContractInsert {

	private int conNumber;
	private int customerNumber;

	private String contractState;
	private String subscribeDateTime;
	private String effectStartDateTime;
	private String effectEndDateTime;
	private String terminationreason;
	private String suspendDateTime;
	private String suspendReason;
	private String recurringDeliveryYn;
	private String deliveryCycle;
	private int deliveryTimes;
	private String deliveryRemark;
	private String deliveryStartDatetime;
	private String recurringInvoiceYn;
	private String invoiceCycle;
	private String lastInvoiceDateTime;
	private String nextInvoiceDateTime;
	private String lastChangeDateTime;
	private String auditId;
	private String auditDateTime;
	private int productQuantity;
	private int deliveryChargeAmount;
	
	private String packageYn;
	private String packagePriceReferenceYn;
	private String packageVarietyYn;
	private String packageId; 
	private String productId;
	private String productType;
	
//	private Discount dd[];
	
	private String discountId;
	private String discountName;
	private String discountType;
	private int discountValue;
	private String discountType2Value;
	private String discountType2;
	private int discountOrder;
	private String discountDescription;
	
	private String[] discountIdList;
	private String[] discountTypeList;
	private String[] discountValueList;
	private String[] discountOrderList;

	private String couponDiscountId;
	private String couponDiscountType;
	private int couponDiscountValue;
	private String couponDiscountType2Value;
	private String couponDiscountType2;
	private int couponDiscountOrder;
	private String couponNumber;
	private String couponDiscountYn;
	private String couponDiscountExistsYn;

	private int deliveryTotalCount;
	private int deliveryRemainCount;
	
	private int duration;
	
	private int priceAmount;
	
	//paymentInsert 추가
	private String paymentMethod;
	private String deliveryAddressId;
	private String invoiceDeliveryType;
	private String invoiceEmail;
	private String addressId;
	private int paymentInformationNumber;
	private String zipCode;
	private String baseAddress;
	private String detailAddress;
	
	/*ID mapping*/
	private String userName;
	private int providerNumber;
	
	private String deliveryDay;
	private String deliveryCompany;
	private String deliveryDate; 
	private String deliveryDate1; 
	private String deliveryDate2; 
	private String deliveryDay1; 
	private String deliveryDay2; 
	private int deliveryCount; 
	private String todayDeliveryYn;
	private String deliveryMonth;
	private String paymentDay;
	private String deliveryChargeType;
	
	private String customerName;
	private String channelCustomerNumber;
	private String phoneNumber;
	private String channelId;
	private String productName;
	private String deliveryCustomerName;
	private String deliveryPhoneNumber;
	private int deliveryCustomerNumber;
	private String paymentAgreementYn;
	private String contractAgreementYn;
	private String contractStateName; 
	private String registrationDatetime; 
	private String deliveryState; 
	private String deliveryStateName; 
	private String invoiceDate; 
	private int invoiceAmount; 
	private String collectionCloseYn; 
	private String SVC_MGMT_NUM;
	private String productDescription;
	private String productImageUrl;
	private String paymentTypeCode;
	private String productGroupId;
	private String productGroupName;
	private String optionYn;
	private String discountTarget;
	private String discountApplyValue;
	private String customerRemark;
	private String productGroupCode;
	
	private String id_product;
	private String purchase_id;
	private String service_num;
	private String channelOrderNumber;
	private int deliverySeq;
	private String email;
	private String deliveryEmail;
	private String additionCode;
	private String additionValue;
	private String description;
	private String useAgreement;
	private String personalInformation;
	
	private List<ContractInsert> deliveryList;
	private List<ContractInsert> invoiceList;
	
	public String getUseAgreement() {
		return useAgreement;
	}
	public void setUseAgreement(String useAgreement) {
		this.useAgreement = useAgreement;
	}
	public String getPersonalInformation() {
		return personalInformation;
	}
	public void setPersonalInformation(String personalInformation) {
		this.personalInformation = personalInformation;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAdditionCode() {
		return additionCode;
	}
	public void setAdditionCode(String additionCode) {
		this.additionCode = additionCode;
	}
	public String getAdditionValue() {
		return additionValue;
	}
	public void setAdditionValue(String additionValue) {
		this.additionValue = additionValue;
	}
	public String getDeliveryEmail() {
		return deliveryEmail;
	}
	public void setDeliveryEmail(String deliveryEmail) {
		this.deliveryEmail = deliveryEmail;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getDeliverySeq() {
		return deliverySeq;
	}
	public void setDeliverySeq(int deliverySeq) {
		this.deliverySeq = deliverySeq;
	}
	public String getChannelOrderNumber() {
		return channelOrderNumber;
	}
	public void setChannelOrderNumber(String channelOrderNumber) {
		this.channelOrderNumber = channelOrderNumber;
	}
	public String getId_product() {
		return id_product;
	}
	public void setId_product(String id_product) {
		this.id_product = id_product;
	}
	public String getPurchase_id() {
		return purchase_id;
	}
	public void setPurchase_id(String purchase_id) {
		this.purchase_id = purchase_id;
	}
	public String getService_num() {
		return service_num;
	}
	public void setService_num(String service_num) {
		this.service_num = service_num;
	}
	public String getProductGroupCode() {
		return productGroupCode;
	}
	public void setProductGroupCode(String productGroupCode) {
		this.productGroupCode = productGroupCode;
	}
	public String getDiscountDescription() {
		return discountDescription;
	}
	public void setDiscountDescription(String discountDescription) {
		this.discountDescription = discountDescription;
	}
	public String getCustomerRemark() {
		return customerRemark;
	}
	public void setCustomerRemark(String customerRemark) {
		this.customerRemark = customerRemark;
	}
	public String[] getDiscountIdList() {
		return discountIdList;
	}
	public void setDiscountIdList(String[] discountIdList) {
		this.discountIdList = discountIdList;
	}
	public String[] getDiscountTypeList() {
		return discountTypeList;
	}
	public void setDiscountTypeList(String[] discountTypeList) {
		this.discountTypeList = discountTypeList;
	}
	public String[] getDiscountValueList() {
		return discountValueList;
	}
	public void setDiscountValueList(String[] discountValueList) {
		this.discountValueList = discountValueList;
	}
	public String[] getDiscountOrderList() {
		return discountOrderList;
	}
	public void setDiscountOrderList(String[] discountOrderList) {
		this.discountOrderList = discountOrderList;
	}
	public String getCouponDiscountExistsYn() {
		return couponDiscountExistsYn;
	}
	public void setCouponDiscountExistsYn(String couponDiscountExistsYn) {
		this.couponDiscountExistsYn = couponDiscountExistsYn;
	}
	public String getDiscountTarget() {
		return discountTarget;
	}
	public void setDiscountTarget(String discountTarget) {
		this.discountTarget = discountTarget;
	}
	public String getDiscountApplyValue() {
		return discountApplyValue;
	}
	public void setDiscountApplyValue(String discountApplyValue) {
		this.discountApplyValue = discountApplyValue;
	}
	public String getOptionYn() {
		return optionYn;
	}
	public void setOptionYn(String optionYn) {
		this.optionYn = optionYn;
	}
	public String getProductGroupId() {
		return productGroupId;
	}
	public void setProductGroupId(String productGroupId) {
		this.productGroupId = productGroupId;
	}
	public String getProductGroupName() {
		return productGroupName;
	}
	public void setProductGroupName(String productGroupName) {
		this.productGroupName = productGroupName;
	}
	public String getPaymentTypeCode() {
		return paymentTypeCode;
	}
	public void setPaymentTypeCode(String paymentTypeCode) {
		this.paymentTypeCode = paymentTypeCode;
	}
	public String getDiscountName() {
		return discountName;
	}
	public void setDiscountName(String discountName) {
		this.discountName = discountName;
	}
	public String getCouponDiscountYn() {
		return couponDiscountYn;
	}
	public void setCouponDiscountYn(String couponDiscountYn) {
		this.couponDiscountYn = couponDiscountYn;
	}
	public String getCouponNumber() {
		return couponNumber;
	}
	public void setCouponNumber(String couponNumber) {
		this.couponNumber = couponNumber;
	}
	public int getCouponDiscountOrder() {
		return couponDiscountOrder;
	}
	public void setCouponDiscountOrder(int couponDiscountOrder) {
		this.couponDiscountOrder = couponDiscountOrder;
	}
	public String getCouponDiscountId() {
		return couponDiscountId;
	}
	public void setCouponDiscountId(String couponDiscountId) {
		this.couponDiscountId = couponDiscountId;
	}
	public String getCouponDiscountType() {
		return couponDiscountType;
	}
	public void setCouponDiscountType(String couponDiscountType) {
		this.couponDiscountType = couponDiscountType;
	}
	public int getCouponDiscountValue() {
		return couponDiscountValue;
	}
	public void setCouponDiscountValue(int couponDiscountValue) {
		this.couponDiscountValue = couponDiscountValue;
	}
	public String getCouponDiscountType2Value() {
		return couponDiscountType2Value;
	}
	public void setCouponDiscountType2Value(String couponDiscountType2Value) {
		this.couponDiscountType2Value = couponDiscountType2Value;
	}
	public String getCouponDiscountType2() {
		return couponDiscountType2;
	}
	public void setCouponDiscountType2(String couponDiscountType2) {
		this.couponDiscountType2 = couponDiscountType2;
	}
	public String getDiscountType2() {
		return discountType2;
	}
	public void setDiscountType2(String discountType2) {
		this.discountType2 = discountType2;
	}
	public String getDiscountType2Value() {
		return discountType2Value;
	}
	public void setDiscountType2Value(String discountType2Value) {
		this.discountType2Value = discountType2Value;
	}
	public List<ContractInsert> getDeliveryList() {
		return deliveryList;
	}
	public void setDeliveryList(List<ContractInsert> deliveryList) {
		this.deliveryList = deliveryList;
	}
	public List<ContractInsert> getInvoiceList() {
		return invoiceList;
	}
	public void setInvoiceList(List<ContractInsert> invoiceList) {
		this.invoiceList = invoiceList;
	}
	public String getProductImageUrl() {
		return productImageUrl;
	}
	public void setProductImageUrl(String productImageUrl) {
		this.productImageUrl = productImageUrl;
	}
	public String getProductDescription() {
		return productDescription;
	}
	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}
	public String getSVC_MGMT_NUM() {
		return SVC_MGMT_NUM;
	}
	public void setSVC_MGMT_NUM(String sVC_MGMT_NUM) {
		SVC_MGMT_NUM = sVC_MGMT_NUM;
	}
	public int getConNumber() {
		return conNumber;
	}
	public void setConNumber(int conNumber) {
		this.conNumber = conNumber;
	}
	public int getCustomerNumber() {
		return customerNumber;
	}
	public void setCustomerNumber(int customerNumber) {
		this.customerNumber = customerNumber;
	}
	public String getContractState() {
		return contractState;
	}
	public void setContractState(String contractState) {
		this.contractState = contractState;
	}
	public String getSubscribeDateTime() {
		return subscribeDateTime;
	}
	public void setSubscribeDateTime(String subscribeDateTime) {
		this.subscribeDateTime = subscribeDateTime;
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
	public String getTerminationreason() {
		return terminationreason;
	}
	public void setTerminationreason(String terminationreason) {
		this.terminationreason = terminationreason;
	}
	public String getSuspendDateTime() {
		return suspendDateTime;
	}
	public void setSuspendDateTime(String suspendDateTime) {
		this.suspendDateTime = suspendDateTime;
	}
	public String getSuspendReason() {
		return suspendReason;
	}
	public void setSuspendReason(String suspendReason) {
		this.suspendReason = suspendReason;
	}
	public String getRecurringDeliveryYn() {
		return recurringDeliveryYn;
	}
	public void setRecurringDeliveryYn(String recurringDeliveryYn) {
		this.recurringDeliveryYn = recurringDeliveryYn;
	}
	public String getDeliveryCycle() {
		return deliveryCycle;
	}
	public void setDeliveryCycle(String deliveryCycle) {
		this.deliveryCycle = deliveryCycle;
	}
	public int getDeliveryTimes() {
		return deliveryTimes;
	}
	public void setDeliveryTimes(int deliveryTimes) {
		this.deliveryTimes = deliveryTimes;
	}
	public String getDeliveryRemark() {
		return deliveryRemark;
	}
	public void setDeliveryRemark(String deliveryRemark) {
		this.deliveryRemark = deliveryRemark;
	}
	public String getDeliveryStartDatetime() {
		return deliveryStartDatetime;
	}
	public void setDeliveryStartDatetime(String deliveryStartDatetime) {
		this.deliveryStartDatetime = deliveryStartDatetime;
	}
	public String getRecurringInvoiceYn() {
		return recurringInvoiceYn;
	}
	public void setRecurringInvoiceYn(String recurringInvoiceYn) {
		this.recurringInvoiceYn = recurringInvoiceYn;
	}
	public String getInvoiceCycle() {
		return invoiceCycle;
	}
	public void setInvoiceCycle(String invoiceCycle) {
		this.invoiceCycle = invoiceCycle;
	}
	public String getLastInvoiceDateTime() {
		return lastInvoiceDateTime;
	}
	public void setLastInvoiceDateTime(String lastInvoiceDateTime) {
		this.lastInvoiceDateTime = lastInvoiceDateTime;
	}
	public String getNextInvoiceDateTime() {
		return nextInvoiceDateTime;
	}
	public void setNextInvoiceDateTime(String nextInvoiceDateTime) {
		this.nextInvoiceDateTime = nextInvoiceDateTime;
	}
	public String getLastChangeDateTime() {
		return lastChangeDateTime;
	}
	public void setLastChangeDateTime(String lastChangeDateTime) {
		this.lastChangeDateTime = lastChangeDateTime;
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
	public int getProductQuantity() {
		return productQuantity;
	}
	public void setProductQuantity(int productQuantity) {
		this.productQuantity = productQuantity;
	}
	public int getDeliveryChargeAmount() {
		return deliveryChargeAmount;
	}
	public void setDeliveryChargeAmount(int deliveryChargeAmount) {
		this.deliveryChargeAmount = deliveryChargeAmount;
	}
	public String getPackageYn() {
		return packageYn;
	}
	public void setPackageYn(String packageYn) {
		this.packageYn = packageYn;
	}
	public String getPackagePriceReferenceYn() {
		return packagePriceReferenceYn;
	}
	public void setPackagePriceReferenceYn(String packagePriceReferenceYn) {
		this.packagePriceReferenceYn = packagePriceReferenceYn;
	}
	public String getPackageVarietyYn() {
		return packageVarietyYn;
	}
	public void setPackageVarietyYn(String packageVarietyYn) {
		this.packageVarietyYn = packageVarietyYn;
	}
	public String getPackageId() {
		return packageId;
	}
	public void setPackageId(String packageId) {
		this.packageId = packageId;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	public String getDiscountId() {
		return discountId;
	}
	public void setDiscountId(String discountId) {
		this.discountId = discountId;
	}
	public String getDiscountType() {
		return discountType;
	}
	public void setDiscountType(String discountType) {
		this.discountType = discountType;
	}
	public int getDiscountValue() {
		return discountValue;
	}
	public void setDiscountValue(int discountValue) {
		this.discountValue = discountValue;
	}
	public int getDeliveryTotalCount() {
		return deliveryTotalCount;
	}
	public void setDeliveryTotalCount(int deliveryTotalCount) {
		this.deliveryTotalCount = deliveryTotalCount;
	}
	public int getDeliveryRemainCount() {
		return deliveryRemainCount;
	}
	public void setDeliveryRemainCount(int deliveryRemainCount) {
		this.deliveryRemainCount = deliveryRemainCount;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public int getDiscountOrder() {
		return discountOrder;
	}
	public void setDiscountOrder(int discountOrder) {
		this.discountOrder = discountOrder;
	}
	public int getPriceAmount() {
		return priceAmount;
	}
	public void setPriceAmount(int priceAmount) {
		this.priceAmount = priceAmount;
	}
	public String getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public String getDeliveryAddressId() {
		return deliveryAddressId;
	}
	public void setDeliveryAddressId(String deliveryAddressId) {
		this.deliveryAddressId = deliveryAddressId;
	}
	public String getInvoiceDeliveryType() {
		return invoiceDeliveryType;
	}
	public void setInvoiceDeliveryType(String invoiceDeliveryType) {
		this.invoiceDeliveryType = invoiceDeliveryType;
	}
	public String getInvoiceEmail() {
		return invoiceEmail;
	}
	public void setInvoiceEmail(String invoiceEmail) {
		this.invoiceEmail = invoiceEmail;
	}
	public String getAddressId() {
		return addressId;
	}
	public void setAddressId(String addressId) {
		this.addressId = addressId;
	}
	public int getPaymentInformationNumber() {
		return paymentInformationNumber;
	}
	public void setPaymentInformationNumber(int paymentInformationNumber) {
		this.paymentInformationNumber = paymentInformationNumber;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getBaseAddress() {
		return baseAddress;
	}
	public void setBaseAddress(String baseAddress) {
		this.baseAddress = baseAddress;
	}
	public String getDetailAddress() {
		return detailAddress;
	}
	public void setDetailAddress(String detailAddress) {
		this.detailAddress = detailAddress;
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
	public String getDeliveryDay() {
		return deliveryDay;
	}
	public void setDeliveryDay(String deliveryDay) {
		this.deliveryDay = deliveryDay;
	}
	public String getDeliveryCompany() {
		return deliveryCompany;
	}
	public void setDeliveryCompany(String deliveryCompany) {
		this.deliveryCompany = deliveryCompany;
	}
	public String getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public String getDeliveryDate1() {
		return deliveryDate1;
	}
	public void setDeliveryDate1(String deliveryDate1) {
		this.deliveryDate1 = deliveryDate1;
	}
	public String getDeliveryDate2() {
		return deliveryDate2;
	}
	public void setDeliveryDate2(String deliveryDate2) {
		this.deliveryDate2 = deliveryDate2;
	}
	public String getDeliveryDay1() {
		return deliveryDay1;
	}
	public void setDeliveryDay1(String deliveryDay1) {
		this.deliveryDay1 = deliveryDay1;
	}
	public String getDeliveryDay2() {
		return deliveryDay2;
	}
	public void setDeliveryDay2(String deliveryDay2) {
		this.deliveryDay2 = deliveryDay2;
	}
	public int getDeliveryCount() {
		return deliveryCount;
	}
	public void setDeliveryCount(int deliveryCount) {
		this.deliveryCount = deliveryCount;
	}
	public String getTodayDeliveryYn() {
		return todayDeliveryYn;
	}
	public void setTodayDeliveryYn(String todayDeliveryYn) {
		this.todayDeliveryYn = todayDeliveryYn;
	}
	public String getDeliveryMonth() {
		return deliveryMonth;
	}
	public void setDeliveryMonth(String deliveryMonth) {
		this.deliveryMonth = deliveryMonth;
	}
	public String getPaymentDay() {
		return paymentDay;
	}
	public void setPaymentDay(String paymentDay) {
		this.paymentDay = paymentDay;
	}
	public String getDeliveryChargeType() {
		return deliveryChargeType;
	}
	public void setDeliveryChargeType(String deliveryChargeType) {
		this.deliveryChargeType = deliveryChargeType;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getChannelCustomerNumber() {
		return channelCustomerNumber;
	}
	public void setChannelCustomerNumber(String channelCustomerNumber) {
		this.channelCustomerNumber = channelCustomerNumber;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getChannelId() {
		return channelId;
	}
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getDeliveryCustomerName() {
		return deliveryCustomerName;
	}
	public void setDeliveryCustomerName(String deliveryCustomerName) {
		this.deliveryCustomerName = deliveryCustomerName;
	}
	public String getDeliveryPhoneNumber() {
		return deliveryPhoneNumber;
	}
	public void setDeliveryPhoneNumber(String deliveryPhoneNumber) {
		this.deliveryPhoneNumber = deliveryPhoneNumber;
	}
	public int getDeliveryCustomerNumber() {
		return deliveryCustomerNumber;
	}
	public void setDeliveryCustomerNumber(int deliveryCustomerNumber) {
		this.deliveryCustomerNumber = deliveryCustomerNumber;
	}
	public String getPaymentAgreementYn() {
		return paymentAgreementYn;
	}
	public void setPaymentAgreementYn(String paymentAgreementYn) {
		this.paymentAgreementYn = paymentAgreementYn;
	}
	public String getContractAgreementYn() {
		return contractAgreementYn;
	}
	public void setContractAgreementYn(String contractAgreementYn) {
		this.contractAgreementYn = contractAgreementYn;
	}
	public String getContractStateName() {
		return contractStateName;
	}
	public void setContractStateName(String contractStateName) {
		this.contractStateName = contractStateName;
	}
	public String getRegistrationDatetime() {
		return registrationDatetime;
	}
	public void setRegistrationDatetime(String registrationDatetime) {
		this.registrationDatetime = registrationDatetime;
	}
	public String getDeliveryState() {
		return deliveryState;
	}
	public void setDeliveryState(String deliveryState) {
		this.deliveryState = deliveryState;
	}
	public String getDeliveryStateName() {
		return deliveryStateName;
	}
	public void setDeliveryStateName(String deliveryStateName) {
		this.deliveryStateName = deliveryStateName;
	}
	public String getInvoiceDate() {
		return invoiceDate;
	}
	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}
	public int getInvoiceAmount() {
		return invoiceAmount;
	}
	public void setInvoiceAmount(int invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}
	public String getCollectionCloseYn() {
		return collectionCloseYn;
	}
	public void setCollectionCloseYn(String collectionCloseYn) {
		this.collectionCloseYn = collectionCloseYn;
	}
}
