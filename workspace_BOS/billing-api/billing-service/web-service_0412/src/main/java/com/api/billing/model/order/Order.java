package com.api.billing.model.order;

import java.util.List;
import com.api.model.Criteria;

/**
 */
/**
 * @author P142580
 *
 */
public class Order  extends Criteria 
{
	private int providernumber;
	
	private String channelid;
	private String channelname;
	private String uploaditem;

	private String itemcode;
	private String itemname;
	private String itemindex;
	
	private String productordernumber;
	private String ordernumber;
	private int    channelcontractnumber;
	private String registrationdatetime;
	private String processstate;
	private String customername;
	private String customeremail;
	private String customerid;
	private String customertype;
	private String sex;
	private String deliverycustomername;
	private String deliveryphonenumber1;
	private String deliveryphonenumber2;
	private String deliveryaddress;
	private String customerphonenumber;
	private String deliveryzipcode;
	private String orderstate;
	private String orderdetailstate;
	private String ordertype;
	private String orderaddinfo;
	private String orderdatetime;
	private String productnumber;
	private String productname;
	private String optioninfo;
	private String quantity;
	private String priceamount;
	private String totalamount;
	private String addproductname;
	private String productdescription1;
	private String productdescription2;
	private String productdescription3;
	private String productdescription4;
	private String productdescription5;
	private String bigissuequantity;
	private String paymentdate;
	private String paymentmethod;
	private String bankname;
	private String cardexpirationdate;
	private String paymentnumber;
	private String paymentname;
	private String discountamount;
	private String paymentamount;
	private String deliverymethod;
	private String deliverycompany;
	private String trackingnumber;
	private String deliverydate;
	private String deliverychargetype;
	private String deliverychargeamount;
	private String deliveryremark;
	private String enddate;
	private String contractterm;
	private String deliverycycle;
	private String deliverycount;
	private String deliveryday;
	private String deliverytype;
	private String totaldeliverycount;
	private int    inttotaldeliverycount;
	private String currentdeliverycount;
	private String remark;
	private String etcitem1;
	private String etcitem2;
	private String etcitem3;
	private String etcitem4;
	private String etcitem5;
	private String etcitem6;
	private String etcitem7;
	private String etcitem8;
	private String etcitem9;
	private String etcitem10;
	private String etcitem11;
	private String etcitem12;
	private String etcitem13;
	private String etcitem14;
	private String etcitem15;
	private String etcitem16;
	private String etcitem17;
	private String etcitem18;
	private String etcitem19;
	private String etcitem20;
	private String etcitem21;
	private String etcitem22;
	private String etcitem23;
	private String etcitem24;
	private String etcitem25;
	private String etcitem26;
	private String etcitem27;
	private String etcitem28;
	private String etcitem29;
	private String etcitem30;
	private String etcitem31;
	private String etcitem32;
	private String etcitem33;
	private String etcitem34;
	private String etcitem35;
	private String etcitem36;
	private String etcitem37;
	private String etcitem38;
	private String etcitem39;
	private String etcitem40;
	private String etcitem41;
	private String etcitem42;
	private String etcitem43;
	private String etcitem44;
	private String etcitem45;
	private String etcitem46;
	private String etcitem47;
	private String etcitem48;
	private String etcitem49;
	private String etcitem50;
	private String auditid;
	private String auditdateitme;
	
	private String[] itemcodearray;
	private String[] itemvaluearry;
	
	private List itemlist;
	
	private String deliveryaddressid;
	private int customernumber;
	private int deliverycustomernumber;
	private int connumber;
	private int deliverynumber;
	private int paymentinformationnumber;
	
	private String recurringdeliveryyn;
	private String recurringinvoiceyn;
	private String curdate;
	private String deliverystate;
	private String deliverystatename;
	private String deliverydate1;
	private String deliverydate2;
	private String deliveryday1;
	private String deliveryday2;
	
	private String deliverynumber1;
	private String deliverynumber2;
	private String deliverynumber3;
	private String deliverynumber4;
	private String deliverynumber5;
	private String deliverynumber6;
	private String deliverydate3;
	private String deliverydate4;
	private String deliverydate5;
	private String deliverydate6;
	private String deliverystate1;
	private String deliverystate2;
	private String deliverystate3;
	private String deliverystate4;
	private String deliverystate5;
	private String deliverystate6;
	private String deliveryindex1;
	private String deliveryindex2;
	private String deliveryindex3;
	private String deliveryindex4;
	private String deliveryindex5;
	private String deliveryindex6;
	private String subscribedatetime;
	private String deliverychargetypename;
	private String deliverystartdatetime;
	private String effectenddatetime;
	private String duration;
	private String deliverycyclename;
	private String deliverytimes;
	private String deliverytypename;
	private String deliverytotalcount;
	private String deliveryremaincount;
	private String productoption;
	private String paymentday;
	private String paymentmethodname;
	private int totalcount;
	
	private String code;
	private String codename;
	private String codegroupid;
	
	private String saveflag;
	
	private String birthday;
	private String deliverycompanyname;
	
	private int    intcontractterm;
	private String displayProductDescription;
	private String pagingyn;
	
	private String category;
	private String inboundpath;
	private String memo;
	private String answer;
	private String state;
	private String counsellingdate;
	private String counsellingtime;
	private String categoryname;
	private String inboundpathname;
	private String statename;
	private String returnobject;
	
	private String contractstate;
	private String contractstatename;
	private String channelkind;
	private String deliverypostareacode;

	public String getDeliverypostareacode() {
		return deliverypostareacode;
	}
	public void setDeliverypostareacode(String deliverypostareacode) {
		this.deliverypostareacode = deliverypostareacode;
	}
	public String getChannelkind() {
		return channelkind;
	}
	public void setChannelkind(String channelkind) {
		this.channelkind = channelkind;
	}
	public String getContractstatename() {
		return contractstatename;
	}
	public void setContractstatename(String contractstatename) {
		this.contractstatename = contractstatename;
	}
	public String getContractstate() {
		return contractstate;
	}
	public void setContractstate(String contractstate) {
		this.contractstate = contractstate;
	}
	public String getReturnobject() {
		return returnobject;
	}
	public void setReturnobject(String returnobject) {
		this.returnobject = returnobject;
	}
	public String getCounsellingdate() {
		return counsellingdate;
	}
	public void setCounsellingdate(String counsellingdate) {
		this.counsellingdate = counsellingdate;
	}
	public String getCounsellingtime() {
		return counsellingtime;
	}
	public void setCounsellingtime(String counsellingtime) {
		this.counsellingtime = counsellingtime;
	}
	public String getCategoryname() {
		return categoryname;
	}
	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}
	public String getInboundpathname() {
		return inboundpathname;
	}
	public void setInboundpathname(String inboundpathname) {
		this.inboundpathname = inboundpathname;
	}
	public String getStatename() {
		return statename;
	}
	public void setStatename(String statename) {
		this.statename = statename;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getInboundpath() {
		return inboundpath;
	}
	public void setInboundpath(String inboundpath) {
		this.inboundpath = inboundpath;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getPagingyn() {
		return pagingyn;
	}
	public void setPagingyn(String pagingyn) {
		this.pagingyn = pagingyn;
	}
	public int getInttotaldeliverycount() {
		return inttotaldeliverycount;
	}
	public void setInttotaldeliverycount(int inttotaldeliverycount) {
		this.inttotaldeliverycount = inttotaldeliverycount;
	}
	public String getDisplayProductDescription() {
		return displayProductDescription;
	}
	public void setDisplayProductDescription(String displayProductDescription) {
		this.displayProductDescription = displayProductDescription;
	}
	public int getIntcontractterm() {
		return intcontractterm;
	}
	public void setIntcontractterm(int intcontractterm) {
		this.intcontractterm = intcontractterm;
	}
	public int getChannelcontractnumber() {
		return channelcontractnumber;
	}
	public void setChannelcontractnumber(int channelcontractnumber) {
		this.channelcontractnumber = channelcontractnumber;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public String getDeliverystatename() {
		return deliverystatename;
	}
	public void setDeliverystatename(String deliverystatename) {
		this.deliverystatename = deliverystatename;
	}
	public String getSaveflag() {
		return saveflag;
	}
	public void setSaveflag(String saveflag) {
		this.saveflag = saveflag;
	}
	public int getProvidernumber() {
		return providernumber;
	}
	public void setProvidernumber(int providernumber) {
		this.providernumber = providernumber;
	}
	public String getChannelid() {
		return channelid;
	}
	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}
	public String getChannelname() {
		return channelname;
	}
	public void setChannelname(String channelname) {
		this.channelname = channelname;
	}
	public String getUploaditem() {
		return uploaditem;
	}
	public void setUploaditem(String uploaditem) {
		this.uploaditem = uploaditem;
	}
	public String getItemcode() {
		return itemcode;
	}
	public void setItemcode(String itemcode) {
		this.itemcode = itemcode;
	}
	public String getItemname() {
		return itemname;
	}
	public void setItemname(String itemname) {
		this.itemname = itemname;
	}
	public String getItemindex() {
		return itemindex;
	}
	public void setItemindex(String itemindex) {
		this.itemindex = itemindex;
	}
	public String getProductordernumber() {
		return productordernumber;
	}
	public void setProductordernumber(String productordernumber) {
		this.productordernumber = productordernumber;
	}
	public String getOrdernumber() {
		return ordernumber;
	}
	public void setOrdernumber(String ordernumber) {
		this.ordernumber = ordernumber;
	}
	public String getRegistrationdatetime() {
		return registrationdatetime;
	}
	public void setRegistrationdatetime(String registrationdatetime) {
		this.registrationdatetime = registrationdatetime;
	}
	public String getProcessstate() {
		return processstate;
	}
	public void setProcessstate(String processstate) {
		this.processstate = processstate;
	}
	public String getCustomername() {
		return customername;
	}
	public void setCustomername(String customername) {
		this.customername = customername;
	}
	public String getCustomeremail() {
		return customeremail;
	}
	public void setCustomeremail(String customeremail) {
		this.customeremail = customeremail;
	}
	public String getCustomerid() {
		return customerid;
	}
	public void setCustomerid(String customerid) {
		this.customerid = customerid;
	}
	public String getCustomertype() {
		return customertype;
	}
	public void setCustomertype(String customertype) {
		this.customertype = customertype;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getDeliverycustomername() {
		return deliverycustomername;
	}
	public void setDeliverycustomername(String deliverycustomername) {
		this.deliverycustomername = deliverycustomername;
	}
	public String getDeliveryphonenumber1() {
		return deliveryphonenumber1;
	}
	public void setDeliveryphonenumber1(String deliveryphonenumber1) {
		this.deliveryphonenumber1 = deliveryphonenumber1;
	}
	public String getDeliveryphonenumber2() {
		return deliveryphonenumber2;
	}
	public void setDeliveryphonenumber2(String deliveryphonenumber2) {
		this.deliveryphonenumber2 = deliveryphonenumber2;
	}
	public String getDeliveryaddress() {
		return deliveryaddress;
	}
	public void setDeliveryaddress(String deliveryaddress) {
		this.deliveryaddress = deliveryaddress;
	}
	public String getCustomerphonenumber() {
		return customerphonenumber;
	}
	public void setCustomerphonenumber(String customerphonenumber) {
		this.customerphonenumber = customerphonenumber;
	}
	public String getDeliveryzipcode() {
		return deliveryzipcode;
	}
	public void setDeliveryzipcode(String deliveryzipcode) {
		this.deliveryzipcode = deliveryzipcode;
	}
	public String getOrderstate() {
		return orderstate;
	}
	public void setOrderstate(String orderstate) {
		this.orderstate = orderstate;
	}
	public String getOrderdetailstate() {
		return orderdetailstate;
	}
	public void setOrderdetailstate(String orderdetailstate) {
		this.orderdetailstate = orderdetailstate;
	}
	public String getOrdertype() {
		return ordertype;
	}
	public void setOrdertype(String ordertype) {
		this.ordertype = ordertype;
	}
	public String getOrderaddinfo() {
		return orderaddinfo;
	}
	public void setOrderaddinfo(String orderaddinfo) {
		this.orderaddinfo = orderaddinfo;
	}
	public String getOrderdatetime() {
		return orderdatetime;
	}
	public void setOrderdatetime(String orderdatetime) {
		this.orderdatetime = orderdatetime;
	}
	public String getProductnumber() {
		return productnumber;
	}
	public void setProductnumber(String productnumber) {
		this.productnumber = productnumber;
	}
	public String getProductname() {
		return productname;
	}
	public void setProductname(String productname) {
		this.productname = productname;
	}
	public String getOptioninfo() {
		return optioninfo;
	}
	public void setOptioninfo(String optioninfo) {
		this.optioninfo = optioninfo;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getPriceamount() {
		return priceamount;
	}
	public void setPriceamount(String priceamount) {
		this.priceamount = priceamount;
	}
	public String getTotalamount() {
		return totalamount;
	}
	public void setTotalamount(String totalamount) {
		this.totalamount = totalamount;
	}
	public String getAddproductname() {
		return addproductname;
	}
	public void setAddproductname(String addproductname) {
		this.addproductname = addproductname;
	}
	public String getProductdescription1() {
		return productdescription1;
	}
	public void setProductdescription1(String productdescription1) {
		this.productdescription1 = productdescription1;
	}
	public String getProductdescription2() {
		return productdescription2;
	}
	public void setProductdescription2(String productdescription2) {
		this.productdescription2 = productdescription2;
	}
	public String getProductdescription3() {
		return productdescription3;
	}
	public void setProductdescription3(String productdescription3) {
		this.productdescription3 = productdescription3;
	}
	public String getProductdescription4() {
		return productdescription4;
	}
	public void setProductdescription4(String productdescription4) {
		this.productdescription4 = productdescription4;
	}
	public String getProductdescription5() {
		return productdescription5;
	}
	public void setProductdescription5(String productdescription5) {
		this.productdescription5 = productdescription5;
	}
	public String getBigissuequantity() {
		return bigissuequantity;
	}
	public void setBigissuequantity(String bigissuequantity) {
		this.bigissuequantity = bigissuequantity;
	}
	public String getPaymentdate() {
		return paymentdate;
	}
	public void setPaymentdate(String paymentdate) {
		this.paymentdate = paymentdate;
	}
	public String getPaymentmethod() {
		return paymentmethod;
	}
	public void setPaymentmethod(String paymentmethod) {
		this.paymentmethod = paymentmethod;
	}
	public String getBankname() {
		return bankname;
	}
	public void setBankname(String bankname) {
		this.bankname = bankname;
	}
	public String getCardexpirationdate() {
		return cardexpirationdate;
	}
	public void setCardexpirationdate(String cardexpirationdate) {
		this.cardexpirationdate = cardexpirationdate;
	}
	public String getPaymentnumber() {
		return paymentnumber;
	}
	public void setPaymentnumber(String paymentnumber) {
		this.paymentnumber = paymentnumber;
	}
	public String getPaymentname() {
		return paymentname;
	}
	public void setPaymentname(String paymentname) {
		this.paymentname = paymentname;
	}
	public String getDiscountamount() {
		return discountamount;
	}
	public void setDiscountamount(String discountamount) {
		this.discountamount = discountamount;
	}
	public String getPaymentamount() {
		return paymentamount;
	}
	public void setPaymentamount(String paymentamount) {
		this.paymentamount = paymentamount;
	}
	public String getDeliverymethod() {
		return deliverymethod;
	}
	public void setDeliverymethod(String deliverymethod) {
		this.deliverymethod = deliverymethod;
	}
	public String getDeliverycompany() {
		return deliverycompany;
	}
	public void setDeliverycompany(String deliverycompany) {
		this.deliverycompany = deliverycompany;
	}
	public String getTrackingnumber() {
		return trackingnumber;
	}
	public void setTrackingnumber(String trackingnumber) {
		this.trackingnumber = trackingnumber;
	}
	public String getDeliverydate() {
		return deliverydate;
	}
	public void setDeliverydate(String deliverydate) {
		this.deliverydate = deliverydate;
	}
	public String getDeliverychargetype() {
		return deliverychargetype;
	}
	public void setDeliverychargetype(String deliverychargetype) {
		this.deliverychargetype = deliverychargetype;
	}
	public String getDeliverychargeamount() {
		return deliverychargeamount;
	}
	public void setDeliverychargeamount(String deliverychargeamount) {
		this.deliverychargeamount = deliverychargeamount;
	}
	public String getDeliveryremark() {
		return deliveryremark;
	}
	public void setDeliveryremark(String deliveryremark) {
		this.deliveryremark = deliveryremark;
	}
	public String getEnddate() {
		return enddate;
	}
	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}
	public String getContractterm() {
		return contractterm;
	}
	public void setContractterm(String contractterm) {
		this.contractterm = contractterm;
	}
	public String getDeliverycycle() {
		return deliverycycle;
	}
	public void setDeliverycycle(String deliverycycle) {
		this.deliverycycle = deliverycycle;
	}
	public String getDeliverycount() {
		return deliverycount;
	}
	public void setDeliverycount(String deliverycount) {
		this.deliverycount = deliverycount;
	}
	public String getDeliveryday() {
		return deliveryday;
	}
	public void setDeliveryday(String deliveryday) {
		this.deliveryday = deliveryday;
	}
	public String getDeliverytype() {
		return deliverytype;
	}
	public void setDeliverytype(String deliverytype) {
		this.deliverytype = deliverytype;
	}
	public String getTotaldeliverycount() {
		return totaldeliverycount;
	}
	public void setTotaldeliverycount(String totaldeliverycount) {
		this.totaldeliverycount = totaldeliverycount;
	}
	public String getCurrentdeliverycount() {
		return currentdeliverycount;
	}
	public void setCurrentdeliverycount(String currentdeliverycount) {
		this.currentdeliverycount = currentdeliverycount;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getEtcitem1() {
		return etcitem1;
	}
	public void setEtcitem1(String etcitem1) {
		this.etcitem1 = etcitem1;
	}
	public String getEtcitem2() {
		return etcitem2;
	}
	public void setEtcitem2(String etcitem2) {
		this.etcitem2 = etcitem2;
	}
	public String getEtcitem3() {
		return etcitem3;
	}
	public void setEtcitem3(String etcitem3) {
		this.etcitem3 = etcitem3;
	}
	public String getEtcitem4() {
		return etcitem4;
	}
	public void setEtcitem4(String etcitem4) {
		this.etcitem4 = etcitem4;
	}
	public String getEtcitem5() {
		return etcitem5;
	}
	public void setEtcitem5(String etcitem5) {
		this.etcitem5 = etcitem5;
	}
	public String getEtcitem6() {
		return etcitem6;
	}
	public void setEtcitem6(String etcitem6) {
		this.etcitem6 = etcitem6;
	}
	public String getEtcitem7() {
		return etcitem7;
	}
	public void setEtcitem7(String etcitem7) {
		this.etcitem7 = etcitem7;
	}
	public String getEtcitem8() {
		return etcitem8;
	}
	public void setEtcitem8(String etcitem8) {
		this.etcitem8 = etcitem8;
	}
	public String getEtcitem9() {
		return etcitem9;
	}
	public void setEtcitem9(String etcitem9) {
		this.etcitem9 = etcitem9;
	}
	public String getEtcitem10() {
		return etcitem10;
	}
	public void setEtcitem10(String etcitem10) {
		this.etcitem10 = etcitem10;
	}
	public String getEtcitem11() {
		return etcitem11;
	}
	public void setEtcitem11(String etcitem11) {
		this.etcitem11 = etcitem11;
	}
	public String getEtcitem12() {
		return etcitem12;
	}
	public void setEtcitem12(String etcitem12) {
		this.etcitem12 = etcitem12;
	}
	public String getEtcitem13() {
		return etcitem13;
	}
	public void setEtcitem13(String etcitem13) {
		this.etcitem13 = etcitem13;
	}
	public String getEtcitem14() {
		return etcitem14;
	}
	public void setEtcitem14(String etcitem14) {
		this.etcitem14 = etcitem14;
	}
	public String getEtcitem15() {
		return etcitem15;
	}
	public void setEtcitem15(String etcitem15) {
		this.etcitem15 = etcitem15;
	}
	public String getEtcitem16() {
		return etcitem16;
	}
	public void setEtcitem16(String etcitem16) {
		this.etcitem16 = etcitem16;
	}
	public String getEtcitem17() {
		return etcitem17;
	}
	public void setEtcitem17(String etcitem17) {
		this.etcitem17 = etcitem17;
	}
	public String getEtcitem18() {
		return etcitem18;
	}
	public void setEtcitem18(String etcitem18) {
		this.etcitem18 = etcitem18;
	}
	public String getEtcitem19() {
		return etcitem19;
	}
	public void setEtcitem19(String etcitem19) {
		this.etcitem19 = etcitem19;
	}
	public String getEtcitem20() {
		return etcitem20;
	}
	public void setEtcitem20(String etcitem20) {
		this.etcitem20 = etcitem20;
	}
	public String getEtcitem21() {
		return etcitem21;
	}
	public void setEtcitem21(String etcitem21) {
		this.etcitem21 = etcitem21;
	}
	public String getEtcitem22() {
		return etcitem22;
	}
	public void setEtcitem22(String etcitem22) {
		this.etcitem22 = etcitem22;
	}
	public String getEtcitem23() {
		return etcitem23;
	}
	public void setEtcitem23(String etcitem23) {
		this.etcitem23 = etcitem23;
	}
	public String getEtcitem24() {
		return etcitem24;
	}
	public void setEtcitem24(String etcitem24) {
		this.etcitem24 = etcitem24;
	}
	public String getEtcitem25() {
		return etcitem25;
	}
	public void setEtcitem25(String etcitem25) {
		this.etcitem25 = etcitem25;
	}
	public String getEtcitem26() {
		return etcitem26;
	}
	public void setEtcitem26(String etcitem26) {
		this.etcitem26 = etcitem26;
	}
	public String getEtcitem27() {
		return etcitem27;
	}
	public void setEtcitem27(String etcitem27) {
		this.etcitem27 = etcitem27;
	}
	public String getEtcitem28() {
		return etcitem28;
	}
	public void setEtcitem28(String etcitem28) {
		this.etcitem28 = etcitem28;
	}
	public String getEtcitem29() {
		return etcitem29;
	}
	public void setEtcitem29(String etcitem29) {
		this.etcitem29 = etcitem29;
	}
	public String getEtcitem30() {
		return etcitem30;
	}
	public void setEtcitem30(String etcitem30) {
		this.etcitem30 = etcitem30;
	}
	public String getEtcitem31() {
		return etcitem31;
	}
	public void setEtcitem31(String etcitem31) {
		this.etcitem31 = etcitem31;
	}
	public String getEtcitem32() {
		return etcitem32;
	}
	public void setEtcitem32(String etcitem32) {
		this.etcitem32 = etcitem32;
	}
	public String getEtcitem33() {
		return etcitem33;
	}
	public void setEtcitem33(String etcitem33) {
		this.etcitem33 = etcitem33;
	}
	public String getEtcitem34() {
		return etcitem34;
	}
	public void setEtcitem34(String etcitem34) {
		this.etcitem34 = etcitem34;
	}
	public String getEtcitem35() {
		return etcitem35;
	}
	public void setEtcitem35(String etcitem35) {
		this.etcitem35 = etcitem35;
	}
	public String getEtcitem36() {
		return etcitem36;
	}
	public void setEtcitem36(String etcitem36) {
		this.etcitem36 = etcitem36;
	}
	public String getEtcitem37() {
		return etcitem37;
	}
	public void setEtcitem37(String etcitem37) {
		this.etcitem37 = etcitem37;
	}
	public String getEtcitem38() {
		return etcitem38;
	}
	public void setEtcitem38(String etcitem38) {
		this.etcitem38 = etcitem38;
	}
	public String getEtcitem39() {
		return etcitem39;
	}
	public void setEtcitem39(String etcitem39) {
		this.etcitem39 = etcitem39;
	}
	public String getEtcitem40() {
		return etcitem40;
	}
	public void setEtcitem40(String etcitem40) {
		this.etcitem40 = etcitem40;
	}
	public String getEtcitem41() {
		return etcitem41;
	}
	public void setEtcitem41(String etcitem41) {
		this.etcitem41 = etcitem41;
	}
	public String getEtcitem42() {
		return etcitem42;
	}
	public void setEtcitem42(String etcitem42) {
		this.etcitem42 = etcitem42;
	}
	public String getEtcitem43() {
		return etcitem43;
	}
	public void setEtcitem43(String etcitem43) {
		this.etcitem43 = etcitem43;
	}
	public String getEtcitem44() {
		return etcitem44;
	}
	public void setEtcitem44(String etcitem44) {
		this.etcitem44 = etcitem44;
	}
	public String getEtcitem45() {
		return etcitem45;
	}
	public void setEtcitem45(String etcitem45) {
		this.etcitem45 = etcitem45;
	}
	public String getEtcitem46() {
		return etcitem46;
	}
	public void setEtcitem46(String etcitem46) {
		this.etcitem46 = etcitem46;
	}
	public String getEtcitem47() {
		return etcitem47;
	}
	public void setEtcitem47(String etcitem47) {
		this.etcitem47 = etcitem47;
	}
	public String getEtcitem48() {
		return etcitem48;
	}
	public void setEtcitem48(String etcitem48) {
		this.etcitem48 = etcitem48;
	}
	public String getEtcitem49() {
		return etcitem49;
	}
	public void setEtcitem49(String etcitem49) {
		this.etcitem49 = etcitem49;
	}
	public String getEtcitem50() {
		return etcitem50;
	}
	public void setEtcitem50(String etcitem50) {
		this.etcitem50 = etcitem50;
	}
	public String getAuditid() {
		return auditid;
	}
	public void setAuditid(String auditid) {
		this.auditid = auditid;
	}
	public String getAuditdateitme() {
		return auditdateitme;
	}
	public void setAuditdateitme(String auditdateitme) {
		this.auditdateitme = auditdateitme;
	}
	public String[] getItemcodearray() {
		return itemcodearray;
	}
	public void setItemcodearray(String[] itemcodearray) {
		this.itemcodearray = itemcodearray;
	}
	public String[] getItemvaluearry() {
		return itemvaluearry;
	}
	public void setItemvaluearry(String[] itemvaluearry) {
		this.itemvaluearry = itemvaluearry;
	}
	public List getItemlist() {
		return itemlist;
	}
	public void setItemlist(List itemlist) {
		this.itemlist = itemlist;
	}
	public String getDeliveryaddressid() {
		return deliveryaddressid;
	}
	public void setDeliveryaddressid(String deliveryaddressid) {
		this.deliveryaddressid = deliveryaddressid;
	}
	public int getCustomernumber() {
		return customernumber;
	}
	public void setCustomernumber(int customernumber) {
		this.customernumber = customernumber;
	}
	public int getDeliverycustomernumber() {
		return deliverycustomernumber;
	}
	public void setDeliverycustomernumber(int deliverycustomernumber) {
		this.deliverycustomernumber = deliverycustomernumber;
	}
	public int getConnumber() {
		return connumber;
	}
	public void setConnumber(int connumber) {
		this.connumber = connumber;
	}
	public int getDeliverynumber() {
		return deliverynumber;
	}
	public void setDeliverynumber(int deliverynumber) {
		this.deliverynumber = deliverynumber;
	}
	public int getPaymentinformationnumber() {
		return paymentinformationnumber;
	}
	public void setPaymentinformationnumber(int paymentinformationnumber) {
		this.paymentinformationnumber = paymentinformationnumber;
	}
	public String getRecurringdeliveryyn() {
		return recurringdeliveryyn;
	}
	public void setRecurringdeliveryyn(String recurringdeliveryyn) {
		this.recurringdeliveryyn = recurringdeliveryyn;
	}
	public String getRecurringinvoiceyn() {
		return recurringinvoiceyn;
	}
	public void setRecurringinvoiceyn(String recurringinvoiceyn) {
		this.recurringinvoiceyn = recurringinvoiceyn;
	}
	public String getCurdate() {
		return curdate;
	}
	public void setCurdate(String curdate) {
		this.curdate = curdate;
	}
	public String getDeliverystate() {
		return deliverystate;
	}
	public void setDeliverystate(String deliverystate) {
		this.deliverystate = deliverystate;
	}
	public String getDeliverydate1() {
		return deliverydate1;
	}
	public void setDeliverydate1(String deliverydate1) {
		this.deliverydate1 = deliverydate1;
	}
	public String getDeliverydate2() {
		return deliverydate2;
	}
	public void setDeliverydate2(String deliverydate2) {
		this.deliverydate2 = deliverydate2;
	}
	public String getDeliveryday1() {
		return deliveryday1;
	}
	public void setDeliveryday1(String deliveryday1) {
		this.deliveryday1 = deliveryday1;
	}
	public String getDeliveryday2() {
		return deliveryday2;
	}
	public void setDeliveryday2(String deliveryday2) {
		this.deliveryday2 = deliveryday2;
	}
	public String getDeliverydate3() {
		return deliverydate3;
	}
	public void setDeliverydate3(String deliverydate3) {
		this.deliverydate3 = deliverydate3;
	}
	public String getDeliverydate4() {
		return deliverydate4;
	}
	public void setDeliverydate4(String deliverydate4) {
		this.deliverydate4 = deliverydate4;
	}
	public String getDeliverydate5() {
		return deliverydate5;
	}
	public void setDeliverydate5(String deliverydate5) {
		this.deliverydate5 = deliverydate5;
	}
	public String getDeliverydate6() {
		return deliverydate6;
	}
	public void setDeliverydate6(String deliverydate6) {
		this.deliverydate6 = deliverydate6;
	}
	public String getDeliverystate1() {
		return deliverystate1;
	}
	public void setDeliverystate1(String deliverystate1) {
		this.deliverystate1 = deliverystate1;
	}
	public String getDeliverystate2() {
		return deliverystate2;
	}
	public void setDeliverystate2(String deliverystate2) {
		this.deliverystate2 = deliverystate2;
	}
	public String getDeliverystate3() {
		return deliverystate3;
	}
	public void setDeliverystate3(String deliverystate3) {
		this.deliverystate3 = deliverystate3;
	}
	public String getDeliverystate4() {
		return deliverystate4;
	}
	public void setDeliverystate4(String deliverystate4) {
		this.deliverystate4 = deliverystate4;
	}
	public String getDeliverystate5() {
		return deliverystate5;
	}
	public void setDeliverystate5(String deliverystate5) {
		this.deliverystate5 = deliverystate5;
	}
	public String getDeliverystate6() {
		return deliverystate6;
	}
	public void setDeliverystate6(String deliverystate6) {
		this.deliverystate6 = deliverystate6;
	}
	public String getSubscribedatetime() {
		return subscribedatetime;
	}
	public void setSubscribedatetime(String subscribedatetime) {
		this.subscribedatetime = subscribedatetime;
	}
	public String getDeliverychargetypename() {
		return deliverychargetypename;
	}
	public void setDeliverychargetypename(String deliverychargetypename) {
		this.deliverychargetypename = deliverychargetypename;
	}
	public String getDeliverystartdatetime() {
		return deliverystartdatetime;
	}
	public void setDeliverystartdatetime(String deliverystartdatetime) {
		this.deliverystartdatetime = deliverystartdatetime;
	}
	public String getEffectenddatetime() {
		return effectenddatetime;
	}
	public void setEffectenddatetime(String effectenddatetime) {
		this.effectenddatetime = effectenddatetime;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getDeliverycyclename() {
		return deliverycyclename;
	}
	public void setDeliverycyclename(String deliverycyclename) {
		this.deliverycyclename = deliverycyclename;
	}
	public String getDeliverytimes() {
		return deliverytimes;
	}
	public void setDeliverytimes(String deliverytimes) {
		this.deliverytimes = deliverytimes;
	}
	public String getDeliverytypename() {
		return deliverytypename;
	}
	public void setDeliverytypename(String deliverytypename) {
		this.deliverytypename = deliverytypename;
	}
	public String getDeliverytotalcount() {
		return deliverytotalcount;
	}
	public void setDeliverytotalcount(String deliverytotalcount) {
		this.deliverytotalcount = deliverytotalcount;
	}
	public String getDeliveryremaincount() {
		return deliveryremaincount;
	}
	public void setDeliveryremaincount(String deliveryremaincount) {
		this.deliveryremaincount = deliveryremaincount;
	}
	public String getProductoption() {
		return productoption;
	}
	public void setProductoption(String productoption) {
		this.productoption = productoption;
	}
	public String getPaymentday() {
		return paymentday;
	}
	public void setPaymentday(String paymentday) {
		this.paymentday = paymentday;
	}
	public String getPaymentmethodname() {
		return paymentmethodname;
	}
	public void setPaymentmethodname(String paymentmethodname) {
		this.paymentmethodname = paymentmethodname;
	}
	public int getTotalcount() {
		return totalcount;
	}
	public void setTotalcount(int totalcount) {
		this.totalcount = totalcount;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCodename() {
		return codename;
	}
	public void setCodename(String codename) {
		this.codename = codename;
	}
	public String getCodegroupid() {
		return codegroupid;
	}
	public void setCodegroupid(String codegroupid) {
		this.codegroupid = codegroupid;
	}
	public String getDeliveryindex1() {
		return deliveryindex1;
	}
	public void setDeliveryindex1(String deliveryindex1) {
		this.deliveryindex1 = deliveryindex1;
	}
	public String getDeliveryindex2() {
		return deliveryindex2;
	}
	public void setDeliveryindex2(String deliveryindex2) {
		this.deliveryindex2 = deliveryindex2;
	}
	public String getDeliveryindex3() {
		return deliveryindex3;
	}
	public void setDeliveryindex3(String deliveryindex3) {
		this.deliveryindex3 = deliveryindex3;
	}
	public String getDeliveryindex4() {
		return deliveryindex4;
	}
	public void setDeliveryindex4(String deliveryindex4) {
		this.deliveryindex4 = deliveryindex4;
	}
	public String getDeliveryindex5() {
		return deliveryindex5;
	}
	public void setDeliveryindex5(String deliveryindex5) {
		this.deliveryindex5 = deliveryindex5;
	}
	public String getDeliveryindex6() {
		return deliveryindex6;
	}
	public void setDeliveryindex6(String deliveryindex6) {
		this.deliveryindex6 = deliveryindex6;
	}
	public String getDeliverynumber1() {
		return deliverynumber1;
	}
	public void setDeliverynumber1(String deliverynumber1) {
		this.deliverynumber1 = deliverynumber1;
	}
	public String getDeliverynumber2() {
		return deliverynumber2;
	}
	public void setDeliverynumber2(String deliverynumber2) {
		this.deliverynumber2 = deliverynumber2;
	}
	public String getDeliverynumber3() {
		return deliverynumber3;
	}
	public void setDeliverynumber3(String deliverynumber3) {
		this.deliverynumber3 = deliverynumber3;
	}
	public String getDeliverynumber4() {
		return deliverynumber4;
	}
	public void setDeliverynumber4(String deliverynumber4) {
		this.deliverynumber4 = deliverynumber4;
	}
	public String getDeliverynumber5() {
		return deliverynumber5;
	}
	public void setDeliverynumber5(String deliverynumber5) {
		this.deliverynumber5 = deliverynumber5;
	}
	public String getDeliverynumber6() {
		return deliverynumber6;
	}
	public void setDeliverynumber6(String deliverynumber6) {
		this.deliverynumber6 = deliverynumber6;
	}
	public String getDeliverycompanyname() {
		return deliverycompanyname;
	}
	public void setDeliverycompanyname(String deliverycompanyname) {
		this.deliverycompanyname = deliverycompanyname;
	}
}
