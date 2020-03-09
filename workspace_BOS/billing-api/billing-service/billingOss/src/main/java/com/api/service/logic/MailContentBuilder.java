package com.api.service.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.api.model.billing.InvoiceDetailInput;
import com.api.model.biz.BusinessInput;
import com.api.service.InvoiceService;

@Service
public class MailContentBuilder {
	
	private TemplateEngine templateEngine;
	@Autowired
	InvoiceService invoiceservice;
	InvoiceDetailInput idi;
	
    @Autowired
    public MailContentBuilder(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }
    
    public String buildTemporaryPassword(BusinessInput businessInput) {
    	Context context = new Context();    	
    	String templete = "emailTemplate/tempPassword";
    	context.setVariable("bizInfo",businessInput);
    	return templateEngine.process(templete, context);
    }
    
    /*public String build(InvoiceDetailInput idi) {
        Context context = new Context();
        List<InvoiceDetail> invoicedetaillist = 	invoiceservice.getInvoiceDetail(idi);
        InvoiceTaxItemInfo itii = invoiceservice.getInvoiceTaxItemAmount(idi);
        InvoiceDetailCustomerInfo invoicecustomerinfo = invoiceservice.getInvoiceDetailCustomerInfo(idi);
        System.out.println("--------------------------------------");
        int colsum = invoiceservice.sendInvoiceSum(idi);
        System.out.println("-------------------colsum =" + colsum);
        context.setVariable("invoicedetaillist",invoicedetaillist);
        context.setVariable("invoicecustomerinfo",invoicecustomerinfo);
        context.setVariable("itii",itii);
        System.out.println("getInvoiceNumber = " + idi.getInvoiceNumber());
        context.setVariable("invoicenumber",idi.getInvoiceNumber());
        context.setVariable("colsum",colsum);
        String templete = "";
        if(colsum > 0) {
        	templete = "InvoiceTemplate";
        }else {
        	templete = "receiptTemplate";
        }
        return templateEngine.process(templete, context);
    }*/
}
