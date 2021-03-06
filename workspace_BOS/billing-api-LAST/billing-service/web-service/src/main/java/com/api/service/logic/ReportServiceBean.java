package com.api.service.logic;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.report.model.ArticleInput;
import com.api.report.model.ArticleOutput;
import com.api.report.model.CustomerContractTotalOutput;
import com.api.report.model.InvoiceMonthlyOutput;
import com.api.report.model.InvoiceReportOutput;
import com.api.report.model.ProductRatioOutput;
import com.api.report.model.reportInput;
import com.api.report.model.OrderReport;
import com.api.repository.ReportRepository;
import com.api.service.ReportService;

@Service
public class ReportServiceBean implements ReportService {

	@Autowired
    private ReportRepository reportrepository;
	
	@Override
	public CustomerContractTotalOutput getTotalCustomerandContract(reportInput toadayDate) {
		// TODO Auto-generated method stub
		CustomerContractTotalOutput customercontracttotaloutput = reportrepository.getTotalCustomerandContract(toadayDate);
		return customercontracttotaloutput;
	}

	@Override
	public int insertArticle(ArticleInput aci) {
		// TODO Auto-generated method stub
		int result = 0 ;
		result = reportrepository.insertArticle(aci);
		return result;
	}

	@Override
	public List<ArticleOutput> getArticle(reportInput toadayDate) {
		// TODO Auto-generated method stub
		List<ArticleOutput> articleoutputlist = reportrepository.getArticle(toadayDate);
		return articleoutputlist;
	}

	@Override
	public List<ProductRatioOutput> getRatioProduct(reportInput toadayDate) {
		// TODO Auto-generated method stub
		List<ProductRatioOutput> productratio = reportrepository.getRatioProduct(toadayDate);
		return productratio;
	}

	@Override
	public List<ProductRatioOutput> getRatioProductRank(reportInput monthdate) {
		// TODO Auto-generated method stub
		List<ProductRatioOutput> productratio = reportrepository.getRatioProductRank(monthdate);
		return productratio;
	}

	@Override
	public int updateArticle(int articlenum) {
		// TODO Auto-generated method stub
		int result = 0 ;
		result = reportrepository.updateArticle(articlenum);
		return result;
	}

	@Override
	public InvoiceReportOutput getInvoiceReportOutput(reportInput monthdate) {
		// TODO Auto-generated method stub
		InvoiceReportOutput iro = reportrepository.getInvoiceReportOutput(monthdate);
		return iro;
	}

	@Override
	public List<InvoiceMonthlyOutput> getInvoiceReportMonthOutput(reportInput monthdate) {
		// TODO Auto-generated method stub
		List<InvoiceMonthlyOutput> iro = reportrepository.getInvoiceReportMonthOutput(monthdate);
		return iro;
	}

	@Override
	public List<OrderReport> getMonthOrderReport(OrderReport orderReport) {
		List<OrderReport> list = reportrepository.getMonthOrderReport(orderReport);
		return list;
	}

	@Override
	public List<OrderReport> getMonthDeliveryReport(OrderReport orderReport) {
		List<OrderReport> list = reportrepository.getMonthDeliveryReport(orderReport);
		return list;
	}

	@Override
	public List<OrderReport> getDayOrderReport(OrderReport orderReport) {
		List<OrderReport> list = reportrepository.getDayOrderReport(orderReport);
		return list;
	}

	@Override
	public List<OrderReport> getDayDeliveryReport(OrderReport orderReport) {
		List<OrderReport> list = reportrepository.getDayDeliveryReport(orderReport);
		return list;
	}

	@Override
	public List<OrderReport> getYearProductOrderReport(OrderReport orderReport) {
		List<OrderReport> list = reportrepository.getYearProductOrderReport(orderReport);
		return list;
	}

	@Override
	public List<OrderReport> getMonthProductOrderReport(OrderReport orderReport) {
		List<OrderReport> list = reportrepository.getMonthProductOrderReport(orderReport);
		return list;
	}

	@Override
	public List<OrderReport> getYearProductDeliveryReport(OrderReport orderReport) {
		List<OrderReport> list = reportrepository.getYearProductDeliveryReport(orderReport);
		return list;
	}

	@Override
	public List<OrderReport> getMonthProductDeliveryReport(OrderReport orderReport) {
		List<OrderReport> list = reportrepository.getMonthProductDeliveryReport(orderReport);
		return list;
	}

	@Override
	public List<OrderReport> getCounselList(OrderReport orderReport) {
		List<OrderReport> list = reportrepository.getCounselList(orderReport);
		return list;
	}

	@Override
	public List<OrderReport> getCounselReport(OrderReport orderReport) {
		List<OrderReport> list = reportrepository.getCounselReport(orderReport);
		return list;
	}
}
