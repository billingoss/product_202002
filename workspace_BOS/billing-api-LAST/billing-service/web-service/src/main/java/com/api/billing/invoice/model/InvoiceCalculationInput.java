package com.api.billing.invoice.model;

public class InvoiceCalculationInput {
	private String calfromDate;
	
	/*ID mapping*/
	private String username;
	private int providernumber;
	
	     
	private String invoicenumber;					/*청구번호*/     
	private int connumber;						/*계약번호*/     
	private int paymentinformationnumber;	/*청구번호*/     
	private int customernumber;				/*고객번호*/     
	private String prepayyn;						/*선불여부*/     
	private String revenueitemcode;				/*수익항목코드*/   
	private String invoiceclassificationcode;		/*송장구분코드*/   
	private String invoicedate;						/*청구일자*/     
	private String invoicestartdate;				/*청구시작일자*/   
	private String invoiceenddate;					/*청구종료일자*/   
	private String totinvoiceday;					/*총청구일수*/    
	private int invoiceaplyday;					/**/         
	private int invoiceamount;					/*송장금액*/     
	private int collectionbalanceamount;	/*미납금액*/     
	   
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getProvidernumber() {
		return providernumber;
	}
	public void setProvidernumber(int providernumber) {
		this.providernumber = providernumber;
	}
	/*ID mapping*/
	public String getCalfromDate() {
		return calfromDate;
	}
	public void setCalfromDate(String calfromDate) {
		this.calfromDate = calfromDate;
	}
	public String getInvoicenumber() {
		return invoicenumber;
	}
	public void setInvoicenumber(String invoicenumber) {
		this.invoicenumber = invoicenumber;
	}
	public int getConnumber() {
		return connumber;
	}
	public void setConnumber(int connumber) {
		this.connumber = connumber;
	}
	public int getPaymentinformationnumber() {
		return paymentinformationnumber;
	}
	public void setPaymentinformationnumber(int paymentinformationnumber) {
		this.paymentinformationnumber = paymentinformationnumber;
	}
	public int getCustomernumber() {
		return customernumber;
	}
	public void setCustomernumber(int customernumber) {
		this.customernumber = customernumber;
	}
	public String getPrepayyn() {
		return prepayyn;
	}
	public void setPrepayyn(String prepayyn) {
		this.prepayyn = prepayyn;
	}
	public String getRevenueitemcode() {
		return revenueitemcode;
	}
	public void setRevenueitemcode(String revenueitemcode) {
		this.revenueitemcode = revenueitemcode;
	}
	public String getInvoiceclassificationcode() {
		return invoiceclassificationcode;
	}
	public void setInvoiceclassificationcode(String invoiceclassificationcode) {
		this.invoiceclassificationcode = invoiceclassificationcode;
	}
	public String getInvoicedate() {
		return invoicedate;
	}
	public void setInvoicedate(String invoicedate) {
		this.invoicedate = invoicedate;
	}
	public String getInvoicestartdate() {
		return invoicestartdate;
	}
	public void setInvoicestartdate(String invoicestartdate) {
		this.invoicestartdate = invoicestartdate;
	}
	public String getInvoiceenddate() {
		return invoiceenddate;
	}
	public void setInvoiceenddate(String invoiceenddate) {
		this.invoiceenddate = invoiceenddate;
	}
	public String getTotinvoiceday() {
		return totinvoiceday;
	}
	public void setTotinvoiceday(String totinvoiceday) {
		this.totinvoiceday = totinvoiceday;
	}
	public int getInvoiceaplyday() {
		return invoiceaplyday;
	}
	public void setInvoiceaplyday(int invoiceaplyday) {
		this.invoiceaplyday = invoiceaplyday;
	}
	public int getInvoiceamount() {
		return invoiceamount;
	}
	public void setInvoiceamount(int invoiceamount) {
		this.invoiceamount = invoiceamount;
	}
	public int getCollectionbalanceamount() {
		return collectionbalanceamount;
	}
	public void setCollectionbalanceamount(int collectionbalanceamount) {
		this.collectionbalanceamount = collectionbalanceamount;
	}

	
}
