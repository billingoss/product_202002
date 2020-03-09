package com.api.model.billing;

/**
 * 청구 정보 전송 이력 관리
 *
 */
public class BillingSendHistory {
	private String channelId; 				//채널ID
	private int providerNumber; 			//업체ID
	private String sendBillingMonth; 	//전송청구월
	private String sendMethod; 			//전송방법(DOWN, FTP)
	private int totalSendCount; 			//총전송건수
	private String fileName; 				//파일명
	private String sendDate; 				//전송일자, 생성일자와 동일
	private String auditId; 					//
	
	public String getChannelId() {
		return channelId;
	}
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}
	public int getProviderNumber() {
		return providerNumber;
	}
	public void setProviderNumber(int providerNumber) {
		this.providerNumber = providerNumber;
	}
	public String getSendBillingMonth() {
		return sendBillingMonth;
	}
	public void setSendBillingMonth(String sendBillingMonth) {
		this.sendBillingMonth = sendBillingMonth;
	}
	public String getSendMethod() {
		return sendMethod;
	}
	public void setSendMethod(String sendMethod) {
		this.sendMethod = sendMethod;
	}
	public int getTotalSendCount() {
		return totalSendCount;
	}
	public void setTotalSendCount(int totalSendCount) {
		this.totalSendCount = totalSendCount;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getSendDate() {
		return sendDate;
	}
	public void setSendDate(String sendDate) {
		this.sendDate = sendDate;
	}
	public String getAuditId() {
		return auditId;
	}
	public void setAuditId(String auditId) {
		this.auditId = auditId;
	}
}
