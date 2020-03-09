package com.api.service;

import java.util.List;
import java.util.Map;

import com.api.model.report.Report;

public interface ReportService
{
	List<Report> getDeliveryList(Report report); 
	Report getContractCount(Report report);
	List<Report> getProductList(Report report);
	List<Report> getWeekContractCount(Report report); 
	List<Report> getMonthlyAmount(Report report);
	List<Report> getMonthlyAmountList(Report report); 
	//전월대비 증감 비율 조회
	List<Map<String, String>> getMonthlyRate(Report report);
	//지역별 결제 금액 조회
	List<Map<String, String>> getMonthlyAreaAmountList(Report report);
	//결체추이조회
	List<Map<String, String>> getMonthlyPaymentTrend(Report report); 
	//요일별 매출현황 조회
	List<Map<String, String>> getMonthlyPaymentWeek(Report report); 
	//상품별 납부 또는 환불 TOP5 조회 
	List<Map<String, String>> getMonthlyPaymentTypeRank(Report report);

	//채널별 월별 매출  조회_보고서
	List getMonthlyChannelPaymentList(Report report);
}