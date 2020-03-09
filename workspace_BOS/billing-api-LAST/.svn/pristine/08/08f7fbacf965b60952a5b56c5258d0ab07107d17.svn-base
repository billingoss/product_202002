package com.api.controller;

import java.net.URLEncoder;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.api.billing.login.model.User;
import com.api.billing.model.order.Order;
import com.api.model.Criteria;
import com.api.model.PageMaker;
import com.api.report.model.ArticleInput;
import com.api.report.model.ArticleOutput;
import com.api.report.model.CustomerContractTotalOutput;
import com.api.report.model.InvoiceMonthlyOutput;
import com.api.report.model.InvoiceReportOutput;
import com.api.report.model.OrderReport;
import com.api.report.model.ProductRatioOutput;
import com.api.report.model.reportInput;
import com.api.service.OrderService;
import com.api.service.ReportService;
import com.api.service.UserService;
import com.api.util.SXSSFExcelUtil;

@RestController
@RequestMapping(value = "report")
@Transactional(rollbackFor=Exception.class)
public class ReportController {

	@Autowired
	ReportService reportservice;
	
	@Autowired 
	UserService userService;
	
	@Autowired
	OrderService orderService;

	@RequestMapping(value = "/main", method = { RequestMethod.GET, RequestMethod.POST }, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewSearchBar(HttpServletRequest request,Principal principal,Model model) {
		System.out.println("===================report-main=====================" );
		User user = userService.readUser(principal.getName());
		System.out.println("====="+user.getName());
        request.getSession(true).setAttribute("loginname", user.getName());
        request.getSession(true).setAttribute("businessname", user.getBusinessname());
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/report/main");
		return modelAndView;
	 }
	
	@RequestMapping(value = "/writeNoticePopup", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView writeNoticePopup(Model model) {
		System.out.println("===================writeNoticePopup=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/writeNoticePopup");
		return modelAndView;
	 }
	
	@RequestMapping(value = "/getTotalCustomerandContract/{todaydate}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public CustomerContractTotalOutput getTotalCustomerandContract(
			 @PathVariable(value = "todaydate") String todaydate
			 ,Model model
			 ,Principal principal) {
		/*ID mapping*/
		reportInput ri =  new reportInput();
		ri.setCalfromDate(todaydate);
		User user = userService.readUser(principal.getName());
		ri.setProvidernumber(user.getProvidernumber());
		ri.setUsername(user.getUsername());
		/*ID mapping*/
		System.out.println("===================getTotalCustomerandContract=====================");
		CustomerContractTotalOutput couptup = null;
		couptup = reportservice.getTotalCustomerandContract(ri);
		if(couptup == null) {
			return null;
		}
		System.out.println("couptup = " +  couptup.getTotal_contract_register());
		return couptup;
	 }
	
	@RequestMapping(value = "/getRatioProduct", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public List<ProductRatioOutput> getRatioProduct(Model model,Principal principal) {
		System.out.println("===================getRatioProduct=====================");
		/*ID mapping*/
		reportInput ri =  new reportInput();
		User user = userService.readUser(principal.getName());
		ri.setProvidernumber(user.getProvidernumber());
		ri.setUsername(user.getUsername());
		/*ID mapping*/
		List<ProductRatioOutput> productratio = reportservice.getRatioProduct(ri);
		System.out.println("productratio = " +  productratio.size());
		return productratio;
	 }
	@RequestMapping(value = "/getRatioProductRank/{monthdate}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public List<ProductRatioOutput> getRatioProductRank(
			 @PathVariable(value = "monthdate") String monthdate
			 ,Model model
			 ,Principal principal) {
		/*ID mapping*/
		reportInput ri =  new reportInput();
		ri.setCalfromDate(monthdate);
		User user = userService.readUser(principal.getName());
		ri.setProvidernumber(user.getProvidernumber());
		ri.setUsername(user.getUsername());
		/*ID mapping*/
		System.out.println("===================getRatioProductRank=====================");
		List<ProductRatioOutput> productratio = reportservice.getRatioProductRank(ri);
		System.out.println("productratio = " +  productratio.size());
		return productratio;
	 }
	
	@RequestMapping(value = "/getInvoiceReportOutput", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public InvoiceReportOutput getInvoiceReportOutput(Model model,Principal principal) {
		System.out.println("===================getRatioProductRank=====================");
		/*ID mapping*/
		reportInput ri =  new reportInput();
		User user = userService.readUser(principal.getName());
		ri.setProvidernumber(user.getProvidernumber());
		ri.setUsername(user.getUsername());
		/*ID mapping*/
		InvoiceReportOutput iro = reportservice.getInvoiceReportOutput(ri);
		return iro;
	 }
	
	@RequestMapping(value = "/getInvoiceReportMonthOutput", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public List<InvoiceMonthlyOutput> getInvoiceReportMonthOutput(Model model,Principal principal) {
		System.out.println("===================getInvoiceReportMonthOutput=====================");
		/*ID mapping*/
		reportInput ri =  new reportInput();
		User user = userService.readUser(principal.getName());
		ri.setProvidernumber(user.getProvidernumber());
		ri.setUsername(user.getUsername());
		/*ID mapping*/
		List<InvoiceMonthlyOutput> iro = reportservice.getInvoiceReportMonthOutput(ri);
		return iro;
	 }	
	/*article*/
	
	@RequestMapping(value = "/insertarticle", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int insertArticle(
			 @ModelAttribute ArticleInput aci
			 ,Model model
			 ,Principal principal) {
		/*ID mapping*/
		reportInput ri =  new reportInput();
		User user = userService.readUser(principal.getName());
		aci.setProvidernumber(user.getProvidernumber());
		aci.setUsername(user.getUsername());
		/*ID mapping*/
		System.out.println("===================insertArticle=====================");
		int result = reportservice.insertArticle(aci);
		return result;
	 }
	
	@RequestMapping(value = "/getArticle", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<ArticleOutput> getArticle(Model model,Principal principal) {
		System.out.println("===================getArticle=====================");
		/*ID mapping*/
		reportInput ri =  new reportInput();
		User user = userService.readUser(principal.getName());
		ri.setProvidernumber(user.getProvidernumber());
		ri.setUsername(user.getUsername());
		/*ID mapping*/
		List<ArticleOutput> result = reportservice.getArticle(ri);
		return result;
	 }
	
	@RequestMapping(value = "/updateArticle/{articlenum}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int deleteArticle(
			@PathVariable(value = "articlenum") int articlenum
			,Model model
			,Principal principal) {
		System.out.println("===================deleteArticle=====================");
		int result = reportservice.updateArticle(articlenum);
		return result;
	 }
	
	
	@RequestMapping(value = "/progressbar", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewprogressbar(Model model) {
		System.out.println("===================viewprogressbar=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("roundprogressbar");
		return modelAndView;
	 }
	
	@RequestMapping(value = "/reportmain", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewReportMain(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/report/reportmain");
		return modelAndView;
	}	

	@RequestMapping(value = "/reportmenu", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewReportMenu(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/report/reportmenu");
		return modelAndView;
	}	

	@RequestMapping(value = "/monthorderreport", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewMonthOrderReport(Model model, Principal principal) {
		
		Order curDate = orderService.getCurDate(null);
		List<OrderReport> yearList = new ArrayList();
		for (int i=2019; i<Integer.parseInt(curDate.getCurdate().substring(0, 4))+5; i++) {
			OrderReport orderReport = new OrderReport();
			orderReport.setSubscribedatetime(String.valueOf(i));
			yearList.add(orderReport);
		}
		model.addAttribute("yearList", yearList);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/report/monthorderreport");
		return modelAndView;
	}	

	@RequestMapping(value = "/getmonthorderreport", method = RequestMethod.GET)
	public Map getMonthOrderReport(@ModelAttribute OrderReport orderReport, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		orderReport.setProvidernumber(user.getProvidernumber());
		
		List<OrderReport> list;
		if ("order".equals(orderReport.getSearchflag())){
			list = reportservice.getMonthOrderReport(orderReport);
		} else {
			list = reportservice.getMonthDeliveryReport(orderReport);
		}
		
		Map map = new HashMap();
		map.put("list", list);
		
		return map;
	}
	
	@RequestMapping(value = "/getmonthorderreportexcel", method = RequestMethod.POST)
	public void getMonthOrderReportExcel(HttpServletRequest request, HttpServletResponse response, Principal principal)  throws Exception {
		
		OrderReport orderReport = new OrderReport();
		orderReport.setSubscribedatetime(request.getParameter("subscribedatetime"));
		orderReport.setRecurringdeliveryyn(request.getParameter("recurringdeliveryyn"));
		orderReport.setSearchflag(request.getParameter("searchflag"));
		
		User user = userService.readUser(principal.getName());
		orderReport.setProvidernumber(user.getProvidernumber());
		
		List<OrderReport> list;
		if ("order".equals(orderReport.getSearchflag())){
			list = reportservice.getMonthOrderReport(orderReport);
		} else {
			list = reportservice.getMonthDeliveryReport(orderReport);
		}

		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("월별판매내역조회_"+orderReport.getSubscribedatetime());

		//헤더 생성
		excel.createRow();
		int j = 0;
		excel.setCellValue("Y", j++, "order".equals(orderReport.getSearchflag())?"판매월":"배송월");
		excel.setCellValue("Y", j++, "정기배송여부");
		excel.setCellValue("Y", j++, "판매채널구분");
		excel.setCellValue("Y", j++, "회원구분");
		excel.setCellValue("Y", j++, "수량");
	    
	    //바디 생성
	    String value = "";
	    for (int i=0; i<list.size(); i++) {
		    j = 0;
		    excel.createRow();
	    	excel.setCellValue("N", j++, list.get(i).getSubscribedatetime()==null?"합계":list.get(i).getSubscribedatetime().substring(0, 4)+"-"+list.get(i).getSubscribedatetime().substring(4, 6));
	    	excel.setCellValue("N", j++, list.get(i).getRecurringdeliveryyn()==null?(list.get(i).getSubscribedatetime()==null?"":"소계"):("Y".equals(list.get(i).getRecurringdeliveryyn())?"정기배송":"일반배송"));
	    	excel.setCellValue("N", j++, list.get(i).getChannelname()==null?"":list.get(i).getChannelname());
	    	excel.setCellValue("N", j++, list.get(i).getCustomertype()==null?"":list.get(i).getCustomertype());
	    	excel.setCellValue("N", j++, String.valueOf(list.get(i).getQuantity()));
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("월별판매내역조회_"+orderReport.getSubscribedatetime()+".xlsx", "UTF-8"));

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }
	
	@RequestMapping(value = "/dayorderreport", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDayOrderReport(Model model, Principal principal) {

		Order curDate = orderService.getCurDate(null);
		List<OrderReport> yearList = new ArrayList();
		for (int i=2019; i<Integer.parseInt(curDate.getCurdate().substring(0, 4))+5; i++) {
			OrderReport orderReport = new OrderReport();
			orderReport.setSubscribedatetime(String.valueOf(i));
			yearList.add(orderReport);
		}
		model.addAttribute("yearList", yearList);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/report/dayorderreport");
		return modelAndView;
	}	

	@RequestMapping(value = "/getdayorderreport", method = RequestMethod.GET)
	public Map getDayOrderReport(@ModelAttribute OrderReport orderReport, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		orderReport.setProvidernumber(user.getProvidernumber());
		
		List<OrderReport> list;
		if ("order".equals(orderReport.getSearchflag())){
			list = reportservice.getDayOrderReport(orderReport);
		} else {
			list = reportservice.getDayDeliveryReport(orderReport);
		}
		
		Map map = new HashMap();
		map.put("list", list);
		
		return map;
	}
	
	@RequestMapping(value = "/getdayorderreportexcel", method = RequestMethod.POST)
	public void getDayOrderReportExcel(HttpServletRequest request, HttpServletResponse response, Principal principal)  throws Exception {
		
		OrderReport orderReport = new OrderReport();
		orderReport.setSubscribedatetime(request.getParameter("subscribedatetime"));
		orderReport.setRecurringdeliveryyn(request.getParameter("recurringdeliveryyn"));
		orderReport.setSearchflag(request.getParameter("searchflag"));
		
		User user = userService.readUser(principal.getName());
		orderReport.setProvidernumber(user.getProvidernumber());
		
		List<OrderReport> list;
		if ("order".equals(orderReport.getSearchflag())){
			list = reportservice.getDayOrderReport(orderReport);
		} else {
			list = reportservice.getDayDeliveryReport(orderReport);
		}

		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("일별판매내역조회_"+orderReport.getSubscribedatetime());

		//헤더 생성
		excel.createRow();
		int j = 0;
		excel.setCellValue("Y", j++, "order".equals(orderReport.getSearchflag())?"판매일":"배송일");
		excel.setCellValue("Y", j++, "정기배송여부");
		excel.setCellValue("Y", j++, "판매채널구분");
		excel.setCellValue("Y", j++, "회원구분");
		excel.setCellValue("Y", j++, "수량");
	    
	    //바디 생성
	    String value = "";
	    for (int i=0; i<list.size(); i++) {
		    j = 0;
		    excel.createRow();
	    	excel.setCellValue("N", j++, list.get(i).getSubscribedatetime()==null?"합계":list.get(i).getSubscribedatetime().substring(0, 4)+"-"+list.get(i).getSubscribedatetime().substring(4, 6)+"-"+list.get(i).getSubscribedatetime().substring(6, 8));
	    	excel.setCellValue("N", j++, list.get(i).getRecurringdeliveryyn()==null?(list.get(i).getSubscribedatetime()==null?"":"소계"):("Y".equals(list.get(i).getRecurringdeliveryyn())?"정기배송":"일반배송"));
	    	excel.setCellValue("N", j++, list.get(i).getChannelname()==null?"":list.get(i).getChannelname());
	    	excel.setCellValue("N", j++, list.get(i).getCustomertype()==null?"":list.get(i).getCustomertype());
	    	excel.setCellValue("N", j++, String.valueOf(list.get(i).getQuantity()));
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("일별판매내역조회_"+orderReport.getSubscribedatetime()+".xlsx", "UTF-8"));

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }
	
	@RequestMapping(value = "/productreport", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewProductReport(Model model, Principal principal) {

		User user = userService.readUser(principal.getName());
		Order order = new Order();
		order.setProvidernumber(user.getProvidernumber());
		order.setCode("CHANNEL");
		order.setDetailcode("CHANNEL");
		List<Order> list = orderService.getProviderInformation(order);
		model.addAttribute("channellist", list);
		
		Order curDate = orderService.getCurDate(null);
		List<OrderReport> yearList = new ArrayList();
		for (int i=2019; i<Integer.parseInt(curDate.getCurdate().substring(0, 4))+5; i++) {
			OrderReport orderReport = new OrderReport();
			orderReport.setSubscribedatetime(String.valueOf(i));
			yearList.add(orderReport);
		}
		model.addAttribute("yearList", yearList);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/report/productreport");
		
		return modelAndView;
	}	

	@RequestMapping(value = "/getproductreport", method = RequestMethod.GET)
	public Map getProductReport(@ModelAttribute OrderReport orderReport, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		orderReport.setProvidernumber(user.getProvidernumber());
		
		List<OrderReport> list;
		if ("order".equals(orderReport.getSearchflag())){
			if ("year".equals(orderReport.getDurationsearchflag())){
				list = reportservice.getYearProductOrderReport(orderReport);
			} else {
				list = reportservice.getMonthProductOrderReport(orderReport);
			}
		} else {
			if ("year".equals(orderReport.getDurationsearchflag())){
				list = reportservice.getYearProductDeliveryReport(orderReport);
			} else {
				list = reportservice.getMonthProductDeliveryReport(orderReport);
			}
		}
		
		Map map = new HashMap();
		map.put("list", list);
		
		return map;
	}
	
	@RequestMapping(value = "/getproductreportexcel", method = RequestMethod.POST)
	public void getProductReportExcel(HttpServletRequest request, HttpServletResponse response, Principal principal)  throws Exception {
		
		OrderReport orderReport = new OrderReport();
		orderReport.setSubscribedatetime(request.getParameter("subscribedatetime"));
		orderReport.setChannelid(request.getParameter("channelid"));
		orderReport.setSearchflag(request.getParameter("searchflag"));
		orderReport.setDurationsearchflag(request.getParameter("durationsearchflag"));
		
		User user = userService.readUser(principal.getName());
		orderReport.setProvidernumber(user.getProvidernumber());
		
		List<OrderReport> list;
		if ("order".equals(orderReport.getSearchflag())){
			if ("year".equals(orderReport.getDurationsearchflag())){
				list = reportservice.getYearProductOrderReport(orderReport);
			} else {
				list = reportservice.getMonthProductOrderReport(orderReport);
			}
		} else {
			if ("year".equals(orderReport.getDurationsearchflag())){
				list = reportservice.getYearProductDeliveryReport(orderReport);
			} else {
				list = reportservice.getMonthProductDeliveryReport(orderReport);
			}
		}

		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("상품별판매내역조회_"+orderReport.getSubscribedatetime());

		//헤더 생성
		excel.createRow();
		int j = 0;
		if ("month".equals(orderReport.getDurationsearchflag())) {
			excel.setCellValue("Y", j++, "order".equals(orderReport.getSearchflag())?"판매월":"배송월");
		}
		excel.setCellValue("Y", j++, "상품명");
		excel.setCellValue("Y", j++, "판매채널구분");
		excel.setCellValue("Y", j++, "수량");
	    
	    //바디 생성
	    String value = "";
	    for (int i=0; i<list.size(); i++) {
		    j = 0;
		    excel.createRow();
			if ("month".equals(orderReport.getDurationsearchflag())) {
				excel.setCellValue("N", j++, list.get(i).getSubscribedatetime()==null?"합계":list.get(i).getSubscribedatetime().substring(0, 4)+"-"+list.get(i).getSubscribedatetime().substring(4, 6));
		    	excel.setCellValue("N", j++, list.get(i).getProductname()==null?(list.get(i).getSubscribedatetime()==null?"":"소계"):list.get(i).getProductname());
			} else {
		    	excel.setCellValue("N", j++, list.get(i).getProductname()==null?"합계":list.get(i).getProductname());
			}
	    	excel.setCellValue("N", j++, list.get(i).getChannelname()==null?"":list.get(i).getChannelname());
	    	if ("order".equals(orderReport.getSearchflag())) {
	    		excel.setCellValue("N", j++, String.valueOf(list.get(i).getContractcount()));
	    	} else {
	    		excel.setCellValue("N", j++, String.valueOf(list.get(i).getQuantity()));
	    	}
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("상품별판매내역조회_"+orderReport.getSubscribedatetime()+".xlsx", "UTF-8"));

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }

	@RequestMapping(value = "/counsellist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCounselList(Model model, Principal principal) {

		Order order = new Order();
		order.setCodegroupid("COUNSELSTATE");
		List<Order> list = orderService.getCode(order);
		model.addAttribute("counselstateList", list);
		
		Order curDate = orderService.getCurDate(null);
		List<OrderReport> yearList = new ArrayList();
		for (int i=2019; i<Integer.parseInt(curDate.getCurdate().substring(0, 4))+5; i++) {
			OrderReport orderReport = new OrderReport();
			orderReport.setSubscribedatetime(String.valueOf(i));
			yearList.add(orderReport);
		}
		model.addAttribute("yearList", yearList);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/report/counsellist");
		return modelAndView;
	}	

	@RequestMapping(value = "/getcounsellist", method = RequestMethod.GET)
	public Map getCounselList(@ModelAttribute OrderReport orderReport, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		orderReport.setProvidernumber(user.getProvidernumber());
		
		List<OrderReport> list = reportservice.getCounselList(orderReport);
		
		Criteria cri = orderReport;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalcount():0); 
		
		Map map = new HashMap();
		map.put("list", list);
		map.put("pageMaker", pageMaker);
		
		return map;
	}

	@RequestMapping(value = "/getcounsellistexcel", method = RequestMethod.POST)
	public void getCounselListExcel(HttpServletRequest request, HttpServletResponse response, Principal principal)  throws Exception {
		
		OrderReport orderReport = new OrderReport();
		orderReport.setCounsellingdate(request.getParameter("counsellingdate"));
		orderReport.setState(request.getParameter("state"));
		
		User user = userService.readUser(principal.getName());
		orderReport.setProvidernumber(user.getProvidernumber());
		
		List<OrderReport> list = reportservice.getCounselList(orderReport);

		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("고객상담내역조회_"+orderReport.getCounsellingdate());

		//헤더 생성
		excel.createRow();
		int j = 0;
		excel.setCellValue("Y", j++, "등록일시");
		excel.setCellValue("Y", j++, "고객명");
		excel.setCellValue("Y", j++, "전화번호");
		excel.setCellValue("Y", j++, "요청구분");
		excel.setCellValue("Y", j++, "요청내용");
		excel.setCellValue("Y", j++, "상담경로");
		excel.setCellValue("Y", j++, "답변내용");
		excel.setCellValue("Y", j++, "상태");
	    
	    //바디 생성
	    for (int i=0; i<list.size(); i++) {
		    j = 0;
		    excel.createRow();
			excel.setCellValue("N", j++, list.get(i).getCounsellingdate().substring(0, 4)+"-"+list.get(i).getCounsellingdate().substring(4, 6)+"-"+list.get(i).getCounsellingdate().substring(6, 8)+" "+list.get(i).getCounsellingdate().substring(8, 10)+":"+list.get(i).getCounsellingdate().substring(10, 12));
	    	excel.setCellValue("N", j++, list.get(i).getCustomername());
	    	excel.setCellValue("N", j++, "".equals(list.get(i).getPhonenumber())?list.get(i).getCellphonenumber():list.get(i).getPhonenumber());
	    	excel.setCellValue("N", j++, list.get(i).getCategoryname());
	    	excel.setCellValue("N", j++, list.get(i).getMemo());
	    	excel.setCellValue("N", j++, list.get(i).getInboundpathname());
	    	excel.setCellValue("N", j++, list.get(i).getAnswer());
	    	excel.setCellValue("N", j++, list.get(i).getStatename());
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("고객상담내역조회_"+orderReport.getCounsellingdate()+".xlsx", "UTF-8"));

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }

	@RequestMapping(value = "/counselreport", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCounselReport(Model model, Principal principal) {
		
		Order order = new Order();
		order.setCodegroupid("CATEGORY");
		List<Order> categoryList = orderService.getCode(order);
		model.addAttribute("categoryList", categoryList);
		
		order.setCodegroupid("INBOUNDPATH");
		List<Order> inboundpathList = orderService.getCode(order);
		model.addAttribute("inboundpathList", inboundpathList);
		
		Order curDate = orderService.getCurDate(null);
		List<OrderReport> yearList = new ArrayList();
		for (int i=2019; i<Integer.parseInt(curDate.getCurdate().substring(0, 4))+5; i++) {
			OrderReport orderReport = new OrderReport();
			orderReport.setSubscribedatetime(String.valueOf(i));
			yearList.add(orderReport);
		}
		model.addAttribute("yearList", yearList);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/report/counselreport");
		return modelAndView;
	}	

	@RequestMapping(value = "/getcounselreport", method = RequestMethod.GET)
	public Map getCounselReport(@ModelAttribute OrderReport orderReport, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		orderReport.setProvidernumber(user.getProvidernumber());
		
		List<OrderReport> list = reportservice.getCounselReport(orderReport);

		Map map = new HashMap();
		map.put("list", list);
		
		return map;
	}
	
	@RequestMapping(value = "/getcounselreportexcel", method = RequestMethod.POST)
	public void getCounselReportExcel(HttpServletRequest request, HttpServletResponse response, Principal principal)  throws Exception {
		
		OrderReport orderReport = new OrderReport();
		orderReport.setCounsellingdate(request.getParameter("counsellingdate"));
		orderReport.setCategory(request.getParameter("category"));
		orderReport.setInboundpath(request.getParameter("inboundpath"));
		
		User user = userService.readUser(principal.getName());
		orderReport.setProvidernumber(user.getProvidernumber());
		
		List<OrderReport> list = reportservice.getCounselReport(orderReport);

		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("월별고객상담내역조회_"+orderReport.getCounsellingdate());

		//헤더 생성
		excel.createRow();
		int j = 0;
		excel.setCellValue("Y", j++, "등록월");
		excel.setCellValue("Y", j++, "요청구분");
		excel.setCellValue("Y", j++, "상담경로");
		excel.setCellValue("Y", j++, "상담건수");
	    
	    //바디 생성
	    String value = "";
	    for (int i=0; i<list.size(); i++) {
		    j = 0;
		    excel.createRow();
			excel.setCellValue("N", j++, list.get(i).getCounsellingdate()==null?"합계":list.get(i).getCounsellingdate().substring(0, 4)+"-"+list.get(i).getCounsellingdate().substring(4, 6));
	    	excel.setCellValue("N", j++, list.get(i).getCategoryname()==null?"":list.get(i).getCategoryname());
	    	excel.setCellValue("N", j++, list.get(i).getInboundpathname()==null?"":list.get(i).getInboundpathname());
	    	excel.setCellValue("N", j++, String.valueOf(list.get(i).getCounselcount()));
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("월별고객상담내역조회_"+orderReport.getCounsellingdate()+".xlsx", "UTF-8"));

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }
}
