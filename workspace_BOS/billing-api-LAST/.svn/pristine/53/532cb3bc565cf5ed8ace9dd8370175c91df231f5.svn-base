package com.api.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.api.model.report.Report;

@Mapper
@Repository
public interface ReportRepository {
	List<Report> getDeliveryList(Report report); 
	Report getContractCount(Report report);
	List<Report> getProductList(Report report);
	List<Report> getWeekContractCount(Report report); 
	List<Report> getMonthlyAmount(Report report);
	List<Report> getMonthlyAmountList(Report report); 
	//전월대비 증감 비율 조회_보고서
	List<Map<String, String>> getMonthlyRate(Report report); 
	//지역별 결제 금액 조회_보고서
	List<Map<String, String>> getMonthlyAreaAmountList(Report report); 
	//결체추이조회_보고서
	List<Map<String, String>> getMonthlyPaymentTrend(Report report); 
	//요일별 매출현황 조회_보고서
	List<Map<String, String>> getMonthlyPaymentWeek(Report report); 
	//상품별 납부 또는 환불 TOP5 조회_보고서 
	List<Map<String, String>> getMonthlyPaymentTypeRank(Report report);
	//채널별 월별 채널목록 조회_보고서
	List<Map<String, String>> getMonthlyChannelPaymentChannelList(Report report);
	//채널별 월별 월 조회_보고서
	List<Map<String, String>> getMonthlyChannelPaymentMonthList(Report report);	
	//채널별 월별 매출  조회_보고서
	List<Map<String, String>> getMonthlyChannelPaymentList(Report report);	
	//해당월의 최고 매출 채널
	Map<String, String> getMonthBestChannel(Report report);
}
