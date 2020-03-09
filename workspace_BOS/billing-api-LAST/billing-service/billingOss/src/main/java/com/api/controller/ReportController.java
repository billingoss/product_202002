package com.api.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.api.model.User;
import com.api.model.report.Report;
import com.api.service.ReportService;
import com.api.service.UserService;
import com.api.util.DateUtil;

@RestController
@RequestMapping("report")
@Transactional(rollbackFor=Exception.class)
public class ReportController {

	@Autowired
	private ReportService reportService;
	
	@Autowired 
	UserService userService;
		
	@RequestMapping(value = "/dashboard", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Map<String,Object> getDashBoard(Model model, Principal principal) {
		Map<String,Object> map = new HashMap<String,Object>();
		
		User user = userService.readUser(principal.getName());
		Report report = new Report();
		report.setProviderNumber(user.getProviderNumber());

		//월별매출
		List<Report> monthlyAmountList = reportService.getMonthlyAmountList(report);
		map.put("monthlyAmountList",monthlyAmountList);

		//평균주문건수
		List<Report> weekContractCount = reportService.getWeekContractCount(report);
		map.put("weekContractCount",weekContractCount);
		
		return map;
	}	
	
	@RequestMapping(value = "/report", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewContractList(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();

		modelAndView.setViewName("online/report/report");
		return modelAndView;
	}
	
	@RequestMapping(value = "/reportInfo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Map<String,Object> get(Report report , Model model, Principal principal) {
		Map<String,Object> map = new HashMap<String,Object>();
		
		User user = userService.readUser(principal.getName());
		//Report report = new Report();
		report.setProviderNumber(user.getProviderNumber());
		report.setSearchDate(report.getSearchYear()+report.getSearchMonth()+"01");

		/*********************************************
		 * 환불
		 *********************************************/
		report.setSearchPaymentTypeCode("REFUND");

		//상품별 환불 top5
		List<Map<String,String>> monthlyProductRefundRank = this.reportService.getMonthlyPaymentTypeRank(report);
		map.put("monthlyProductRefundRank",monthlyProductRefundRank);	
		
		/*********************************************
		 * 결제(수납)
		 *********************************************/		
		report.setSearchPaymentTypeCode("PAYMENT");
		
		//전월 대비 증감율
		List<Map<String,String>> monthlyList = this.reportService.getMonthlyRate(report);
		map.put("monthlyList",monthlyList);		
		
		//지역별 결제 금액 조회
		List<Map<String,String>> monthlyAreaList = this.reportService.getMonthlyAreaAmountList(report);
		map.put("monthlyAreaList",monthlyAreaList);	
		
		//지역별 결제 금액 조회
		List<Map<String,String>> monthlyPaymentWeek = this.reportService.getMonthlyPaymentWeek(report);
		map.put("monthlyPaymentWeek",monthlyPaymentWeek);	
		
		//상품별 매출 top5
		
		List<Map<String,String>> monthlyProductPaynemtRank = this.reportService.getMonthlyPaymentTypeRank(report);
		map.put("monthlyProductPaynemtRank",monthlyProductPaynemtRank);	

		//조회 기준일자 당월로 변경
		report.setSearchDate(DateUtil.getToday());
		
		//채널별 매출목록		
		List channelPaymentList = this.reportService.getMonthlyChannelPaymentList(report);
		map.put("channelPaymentList",channelPaymentList);	
		
		//결제 추이 조회 (현재월 기준)
		List<Map<String,String>> monthlyPaymentTrend = this.reportService.getMonthlyPaymentTrend(report);
		map.put("monthlyPaymentTrend",monthlyPaymentTrend);	
		
		return map;
	}	
}