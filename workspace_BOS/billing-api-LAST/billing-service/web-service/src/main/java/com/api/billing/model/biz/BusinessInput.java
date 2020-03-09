package com.api.billing.model.biz;

public class BusinessInput {
	
	/*Business*/
	private String businessregistrationnumber;	
	private String businessname;
	private String representativename;
	private String residentregistrationnumber;
	private String businessaddressid;
	private String businesstype;
	private String businessitem;
	private String managerid;	
	private String auditid;
	private String auditdatetime;	
	
	
	private String addressId;
	private String zipcode;
	private String baseaddress;
	private String detailaddress;
    
	/*provider*/
	private int providernumber;
	private String providername;
	
	private String createdate;
	private String currentdate;
	private String deletedate;
	
	/*employee Id*/
	private int employeenumber;
	private String employeename;	
	private String organizationnumber;
	private String effectstartdatetime;
	private String effectenddatetime;
	private String adminyn;
	
	/*login in*/
	private String loginid;
	private String password;
	private String newPassword;
	
	private String email;
	private String isAccountNonExpired;
	private String isAccountNonLocked;
	private String isCredentialsNonExpired;
	private String isEnabled;
	
	
	//error
	private String errMsg;
	private String adminViewYn;


	public String getBusinessregistrationnumber() {
		return businessregistrationnumber;
	}


	public void setBusinessregistrationnumber(String businessregistrationnumber) {
		businessregistrationnumber = businessregistrationnumber.replaceAll("-", "");
		this.businessregistrationnumber = businessregistrationnumber;
	}


	public String getBusinessname() {
		return businessname;
	}


	public void setBusinessname(String businessname) {
		this.businessname = businessname;
	}


	public String getRepresentativename() {
		return representativename;
	}


	public void setRepresentativename(String representativename) {
		this.representativename = representativename;
	}


	public String getResidentregistrationnumber() {
		return residentregistrationnumber;
	}


	public void setResidentregistrationnumber(String residentregistrationnumber) {
		this.residentregistrationnumber = residentregistrationnumber;
	}


	public String getBusinessaddressid() {
		return businessaddressid;
	}


	public void setBusinessaddressid(String businessaddressid) {
		this.businessaddressid = businessaddressid;
	}


	public String getBusinesstype() {
		return businesstype;
	}


	public void setBusinesstype(String businesstype) {
		this.businesstype = businesstype;
	}


	public String getBusinessitem() {
		return businessitem;
	}


	public void setBusinessitem(String businessitem) {
		this.businessitem = businessitem;
	}


	public String getAuditid() {
		return auditid;
	}


	public void setAuditid(String auditid) {
		this.auditid = auditid;
	}


	public String getAuditdatetime() {
		return auditdatetime;
	}


	public void setAuditdatetime(String auditdatetime) {
		this.auditdatetime = auditdatetime;
	}


	public String getZipcode() {
		return zipcode;
	}


	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}


	public String getBaseaddress() {
		return baseaddress;
	}


	public void setBaseaddress(String baseaddress) {
		this.baseaddress = baseaddress;
	}


	public String getDetailaddress() {
		return detailaddress;
	}


	public void setDetailaddress(String detailaddress) {
		this.detailaddress = detailaddress;
	}


	public int getProvidernumber() {
		return providernumber;
	}


	public void setProvidernumber(int providernumber) {
		this.providernumber = providernumber;
	}


	public String getProvidername() {
		return providername;
	}


	public void setProvidername(String providername) {
		this.providername = providername;
	}


	public String getCreatedate() {
		return createdate;
	}


	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}


	public String getCurrentdate() {
		return currentdate;
	}


	public void setCurrentdate(String currentdate) {
		this.currentdate = currentdate;
	}


	public String getDeletedate() {
		return deletedate;
	}


	public void setDeletedate(String deletedate) {
		this.deletedate = deletedate;
	}


	public int getEmployeenumber() {
		return employeenumber;
	}


	public void setEmployeenumber(int employeenumber) {
		this.employeenumber = employeenumber;
	}


	public String getEmployeename() {
		return employeename;
	}


	public void setEmployeename(String employeename) {
		this.employeename = employeename;
	}


	public String getOrganizationnumber() {
		return organizationnumber;
	}


	public void setOrganizationnumber(String organizationnumber) {
		this.organizationnumber = organizationnumber;
	}


	public String getEffectstartdatetime() {
		return effectstartdatetime;
	}


	public void setEffectstartdatetime(String effectstartdatetime) {
		effectstartdatetime = effectstartdatetime.replaceAll("-", "");
		this.effectstartdatetime = effectstartdatetime;
	}


	public String getEffectenddatetime() {
		return effectenddatetime;
	}


	public void setEffectenddatetime(String effectenddatetime) {
		effectenddatetime = effectenddatetime.replaceAll("-", "");
		this.effectenddatetime = effectenddatetime;
	}

	public String getLoginid() {
		return loginid;
	}


	public void setLoginid(String loginid) {
		this.loginid = loginid;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getIsAccountNonExpired() {
		return isAccountNonExpired;
	}


	public void setIsAccountNonExpired(String isAccountNonExpired) {
		this.isAccountNonExpired = isAccountNonExpired;
	}


	public String getIsAccountNonLocked() {
		return isAccountNonLocked;
	}


	public void setIsAccountNonLocked(String isAccountNonLocked) {
		this.isAccountNonLocked = isAccountNonLocked;
	}


	public String getIsCredentialsNonExpired() {
		return isCredentialsNonExpired;
	}


	public void setIsCredentialsNonExpired(String isCredentialsNonExpired) {
		this.isCredentialsNonExpired = isCredentialsNonExpired;
	}


	public String getIsEnabled() {
		return isEnabled;
	}


	public void setIsEnabled(String isEnabled) {
		this.isEnabled = isEnabled;
	}


	public String getErrMsg() {
		return errMsg;
	}


	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}


	public String getManagerid() {
		return managerid;
	}


	public void setManagerid(String managerid) {
		this.managerid = managerid;
	}


	public String getAddressId() {
		return addressId;
	}


	public void setAddressId(String addressId) {
		this.addressId = addressId;
	}


	public String getAdminyn() {
		return adminyn;
	}


	public void setAdminyn(String adminyn) {
		this.adminyn = adminyn;
	}


	public String getAdminViewYn() {
		return adminViewYn;
	}


	public void setAdminViewYn(String adminViewYn) {
		this.adminViewYn = adminViewYn;
	}


	public String getNewPassword() {
		return newPassword;
	}


	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

		
}
