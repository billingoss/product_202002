package com.api.service;

import java.util.List;

import com.api.report.model.ArticleInput;
import com.api.report.model.ArticleOutput;
import com.api.report.model.CustomerContractTotalOutput;
import com.api.report.model.InvoiceMonthlyOutput;
import com.api.report.model.InvoiceReportOutput;
import com.api.report.model.ProductRatioOutput;
import com.api.report.model.reportInput;
import com.api.report.model.OrderReport;

public interface ReportService {
	
	CustomerContractTotalOutput getTotalCustomerandContract(reportInput monthdate);
	InvoiceReportOutput getInvoiceReportOutput(reportInput monthdate);
	List<InvoiceMonthlyOutput> getInvoiceReportMonthOutput(reportInput monthdate);
	
	List<ProductRatioOutput> getRatioProduct(reportInput monthdate);
	List<ProductRatioOutput> getRatioProductRank(reportInput monthdate);
	
	/*ARTICLE notice */
	int insertArticle(ArticleInput aci);
	List<ArticleOutput> getArticle(reportInput monthdate);
	int updateArticle(int articlenum);

	List<OrderReport> getMonthOrderReport(OrderReport orderReport);
	List<OrderReport> getMonthDeliveryReport(OrderReport order);
	List<OrderReport> getDayOrderReport(OrderReport orderReport);
	List<OrderReport> getDayDeliveryReport(OrderReport orderReport);
	List<OrderReport> getYearProductOrderReport(OrderReport orderReport);
	List<OrderReport> getMonthProductOrderReport(OrderReport orderReport);
	List<OrderReport> getYearProductDeliveryReport(OrderReport orderReport);
	List<OrderReport> getMonthProductDeliveryReport(OrderReport orderReport);
	List<OrderReport> getCounselList(OrderReport orderReport);
	List<OrderReport> getCounselReport(OrderReport orderReport);
}
