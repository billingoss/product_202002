package com.api.service.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.model.report.Report;
import com.api.repository.ReportRepository;
import com.api.service.ReportService;

@Service
public class ReportLogic implements ReportService
{

	@Autowired
    private ReportRepository reportRepository;

	@Override
	public List<Report> getDeliveryList(Report report) 
	{
		List<Report> list = reportRepository.getDeliveryList(report);
		return list;
	}
	
	@Override
	public Report getContractCount(Report report) 
	{
		Report result = reportRepository.getContractCount(report);
		return result;
	}
	
	@Override
	public List<Report> getProductList(Report report) 
	{
		List<Report> list = reportRepository.getProductList(report);
		return list;
	}
	
	@Override
	public List<Report> getWeekContractCount(Report report) 
	{
		List<Report> list = reportRepository.getWeekContractCount(report);
		return list;
	}
	
	@Override
	public List<Report> getMonthlyAmount(Report report) 
	{
		List<Report> result = reportRepository.getMonthlyAmount(report);
		return result;
	}

	@Override
	public List<Report> getMonthlyAmountList(Report report) 
	{
		List<Report> list = reportRepository.getMonthlyAmountList(report);
		return list;
	}
	
	//전월대비 증감 비율 조회
	@Override
	public List<Map<String, String>> getMonthlyRate(Report report) {
		List<Map<String, String>> list = this.reportRepository.getMonthlyRate(report);
		return list;
	}
	
	//지역별 결제 금액 조회
	@Override
	public List<Map<String, String>> getMonthlyAreaAmountList(Report report) {
		List<Map<String, String>> list = this.reportRepository.getMonthlyAreaAmountList(report);
		return list;
	}
	
	//결체 추이 조회
	@Override
	public List<Map<String, String>> getMonthlyPaymentTrend(Report report) {
		List<Map<String, String>> list = this.reportRepository.getMonthlyPaymentTrend(report);		
		return list;
	}
	//요일별 매출현황 조회
	@Override
	public List<Map<String, String>> getMonthlyPaymentWeek(Report report) {
		List<Map<String, String>> list = this.reportRepository.getMonthlyPaymentWeek(report);
		return list;
	}
	
	//보고서 최고매출 상품 TOP5 조회
	@Override
	public List<Map<String, String>> getMonthlyPaymentTypeRank(Report report) {
		List<Map<String, String>> list = this.reportRepository.getMonthlyPaymentTypeRank(report);
		return list;
	}
	
	@Override
	public List getMonthlyChannelPaymentList(Report report) {
		List list = new ArrayList();
		
		//채널목록
		List<Map<String, String>> channelList = this.reportRepository.getMonthlyChannelPaymentChannelList(report);
		List<String> channelIdList = new ArrayList<String>();
		
		//chart title
		ArrayList tempList = new ArrayList ();
		tempList.add("year");
		for (Map<String, String> map : channelList) {
			tempList.add(map.get("channelName"));
			channelIdList.add(map.get("channelId"));
		}
		list.add(tempList);

		//월목록
		List<Map<String, String>> monthList = this.reportRepository.getMonthlyChannelPaymentMonthList(report);
		//매출목록
		List<Map<String, String>> paymentList = this.reportRepository.getMonthlyChannelPaymentList(report);
		String selMonth = ""; 
		double payAmount = 0.0;
		
		String tempData = "";
		String tempId = "";
		String tempAmount = "";
		String tempSelMonth ="";
		for (Map<String, String> month : monthList) {
			selMonth = month.get("paymentDate"); 
			tempList = new ArrayList ();
			tempSelMonth = selMonth; //selMonth.substring(0, 4)+"."+selMonth.substring(4, 6);
			tempList.add(tempSelMonth);
			for (String channelId : channelIdList) {
				payAmount = 0;
				for (Map<String, String> payment : paymentList) {
					tempData = payment.get("paymentDate");
					tempId = payment.get("channelid");					
					tempAmount =String.valueOf(payment.get("paymentAmount"));
					if(selMonth.equals(tempData) && channelId.equals(tempId)) {
						payAmount = Integer.parseInt(tempAmount)/1000;
					}
				}
				tempList.add(payAmount);
			}
			list.add(tempList);
		}
		//Map<String, String> paymentList = new HashMap<String, String>(); 
		
		return list;
	}
}




























