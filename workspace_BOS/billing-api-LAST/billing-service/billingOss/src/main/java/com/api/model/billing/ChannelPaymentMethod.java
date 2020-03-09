package com.api.model.billing;

/**
 * @author Administrator
 * 채널별 가능 결제 방법
 */
public class ChannelPaymentMethod {
	
	private String channelId;					//채널ID
	private String paymentMethodCode;	//결제방법
	private String useYn;						//사용여부
	private String description;					//설명
	private String auditId;						//생성자ID
	private String auditDateTime;			//생성일시
	private String editId;						//수정자ID
	private String editDateTime;				//수정일시
	
	public String getChannelId() {
		return channelId;
	}
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}
	public String getPaymentMethodCode() {
		return paymentMethodCode;
	}
	public void setPaymentMethodCode(String paymentMethodCode) {
		this.paymentMethodCode = paymentMethodCode;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
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
	public String getEditId() {
		return editId;
	}
	public void setEditId(String editId) {
		this.editId = editId;
	}
	public String getEditDateTime() {
		return editDateTime;
	}
	public void setEditDateTime(String editDateTime) {
		this.editDateTime = editDateTime;
	}
}
