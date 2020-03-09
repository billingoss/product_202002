package com.api.model.product;

import com.api.model.Criteria;

public class ProductDiscount extends Criteria {

	private int productDiscountId;			//상품별할인ID
	private int providerNumber;				//제공자번호
	private String productId; 					//상품ID
	private String discountId; 					//할인ID
	private String subscribeStartDateTime;	//적용시작일자
	private String subscribeEndDateTime;	//적용종료일자
	private String deleteDateTime;			//삭제일시
	private String auditId; 
	private String auditDateTime;
	private String productDiscountModiFlag;//C : 생성, U : 수정, D:삭제, R:조회
	
	//할인정보
	private String discountName;
	private String discountType;
	private String discountState;
	private int discountValue;
	private String discountType2;
	private String discountType2Value;
	
	public int getProductDiscountId() {
		return productDiscountId;
	}
	public void setProductDiscountId(int productDiscountId) {
		this.productDiscountId = productDiscountId;
	}
	public int getProviderNumber() {
		return providerNumber;
	}
	public void setProviderNumber(int providerNumber) {
		this.providerNumber = providerNumber;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getDiscountId() {
		return discountId;
	}
	public void setDiscountId(String discountId) {
		this.discountId = discountId;
	}
	public String getSubscribeStartDateTime() {
		return subscribeStartDateTime;
	}
	public void setSubscribeStartDateTime(String subscribeStartDateTime) {
		this.subscribeStartDateTime = subscribeStartDateTime;
	}
	public String getSubscribeEndDateTime() {
		return subscribeEndDateTime;
	}
	public void setSubscribeEndDateTime(String subscribeEndDateTime) {
		this.subscribeEndDateTime = subscribeEndDateTime;
	}
	public String getDeleteDateTime() {
		return deleteDateTime;
	}
	public void setDeleteDateTime(String deleteDateTime) {
		this.deleteDateTime = deleteDateTime;
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
	public String getDiscountName() {
		return discountName;
	}
	public void setDiscountName(String discountName) {
		this.discountName = discountName;
	}
	public String getDiscountType() {
		return discountType;
	}
	public void setDiscountType(String discountType) {
		this.discountType = discountType;
	}
	public String getDiscountState() {
		return discountState;
	}
	public void setDiscountState(String discountState) {
		this.discountState = discountState;
	}
	public int getDiscountValue() {
		return discountValue;
	}
	public void setDiscountValue(int discountValue) {
		this.discountValue = discountValue;
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
	public String getProductDiscountModiFlag() {
		return productDiscountModiFlag;
	}
	public void setProductDiscountModiFlag(String productDiscountModiFlag) {
		this.productDiscountModiFlag = productDiscountModiFlag;
	}
}