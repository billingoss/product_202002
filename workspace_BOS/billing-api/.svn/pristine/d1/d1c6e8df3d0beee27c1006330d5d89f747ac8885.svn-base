package com.api.controller;

import java.net.URLEncoder;
import java.security.Principal;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.api.model.CodeGroupDetail;
import com.api.model.Criteria;
import com.api.model.PageMaker;
import com.api.model.User;
import com.api.model.counselling.Counselling;
import com.api.service.CodeService;
import com.api.service.CounsellingService;
import com.api.service.UserService;
import com.api.util.SXSSFExcelUtil;

@RestController
@RequestMapping("counselling")
@Transactional(rollbackFor=Exception.class)
public class CounsellingController {

	@Autowired 
	UserService userService;
	
	@Autowired 
	CodeService codeService;
		
	@Autowired 
	CounsellingService counsellingService;

	//상담관리
	@RequestMapping(value = "/counsellinglist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCounsellingList(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		//상태
		List<CodeGroupDetail> stateList = codeService.finCodeGroupDetailByCodeGroupId("COUNSELSTATE");
		model.addAttribute("stateList",stateList);
		
		//상담유형
		List<CodeGroupDetail> categoryList = codeService.finCodeGroupDetailByCodeGroupId("CATEGORY");
		model.addAttribute("categoryList",categoryList);

		//상담경로
		List<CodeGroupDetail> inboundPathList = codeService.finCodeGroupDetailByCodeGroupId("INBOUNDPATH");
		model.addAttribute("inboundPathList",inboundPathList);

		modelAndView.setViewName("online/counselling/counsellinglist");
		return modelAndView;
	}	
	
	//상담관리 조회
	@RequestMapping(value = "/getcounsellinglist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Map<String,Object> getCounsellingList(@ModelAttribute Counselling counselling, Model model, Principal principal) {
		Map<String,Object> map = new HashMap<String,Object>();

		User user = userService.readUser(principal.getName());
		counselling.setProviderNumber(user.getProviderNumber());
		
		List<Counselling> list = counsellingService.getCounsellingList(counselling);
		
		Criteria cri = counselling;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalCount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 
		
		return map;
	}	
	
	//상담관리 엑셀
	@RequestMapping(value = "/getcounsellinglistexcel", method = RequestMethod.POST)
	public void getCounsellingListExcel(HttpServletRequest request, HttpServletResponse response, @ModelAttribute Counselling counselling, Principal principal)  throws Exception {
		
		User user = userService.readUser(principal.getName());
		counselling.setProviderNumber(user.getProviderNumber());
		counselling.setStartDate(counselling.getStartDate().replace("-", ""));
		counselling.setEndDate(counselling.getEndDate().replace("-",""));
		
		//주문리스트 조회
		List<Counselling> list = counsellingService.getCounsellingList(counselling);
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("상담관리_"+counselling.getStartDate()+"~"+counselling.getEndDate());

		//헤더 생성
		int j = 0;
		excel.createRow();
		excel.setCellValue("Y", j++, "번호");
		excel.setCellValue("Y", j++, "고객명");
		excel.setCellValue("Y", j++, "전화번호");
		excel.setCellValue("Y", j++, "상담유형");
		excel.setCellValue("Y", j++, "주문번호");
		excel.setCellValue("Y", j++, "제목");
		excel.setCellValue("Y", j++, "상태");
		excel.setCellValue("Y", j++, "등록일시");
		excel.setCellValue("Y", j++, "처리일시");
		excel.setCellValue("Y", j++, "처리자");
	    
	    //바디 생성
	    Counselling result;
	    for (int i=0; i<list.size(); i++) {
	    	result = list.get(i);
		    j = 0;
		    excel.createRow();
	    	excel.setCellValue("N", j++, String.valueOf(i+1));
	    	excel.setCellValue("N", j++, result.getCustomerName());
	    	excel.setCellValue("N", j++, result.getPhoneNumber());
	    	excel.setCellValue("N", j++, result.getCategoryName());
	    	excel.setCellValue("N", j++, String.valueOf(result.getConNumber()==0?"":result.getConNumber()));
	    	excel.setCellValue("N", j++, result.getTitle());
	    	excel.setCellValue("N", j++, result.getStateName());
	    	excel.setCellValue("N", j++, result.getCounsellingDate()+result.getCounsellingTime().substring(0,4));
	    	excel.setCellValue("N", j++, "DONE".equals(result.getState())?result.getAuditDateTime():"");
	    	excel.setCellValue("N", j++, result.getEmployeeName());
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("상담관리_"+counselling.getStartDate()+"~"+counselling.getEndDate()+".xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }
	
	//상담삭제
	@RequestMapping(value = "/deletecounselling", method = RequestMethod.POST)
	public void deleteCounselling(@RequestParam(value="counselling")String[] param, Model model, Principal principal) {
		
		User user = userService.readUser(principal.getName());
		Counselling counselling = new Counselling();
		counselling.setAuditId(user.getUsername());
		
		for (int i=0; i<param.length; i++) {
			
			counselling.setCustomerNumber(Integer.parseInt(param[i].split("\\|")[0]));
			counselling.setCounsellingDate(param[i].split("\\|")[1]);
			counselling.setCounsellingTime(param[i].split("\\|")[2]);
			
			counsellingService.deleteCounselling(counselling);
		}
		
		return;
	}	

	//상담수정 팝업
	@RequestMapping(value = "/getcounselling", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Map getCounselling(@ModelAttribute Counselling counselling, Model model, Principal principal) {

		Map<String, Object> map = new HashMap<String, Object>();
		
		Counselling result = counsellingService.getCounselling(counselling);
		map.put("counselling", result);
		
		return map;
	}	
	
	//상담저장
	@RequestMapping(value = "/savecounselling", method = RequestMethod.POST)
	public void saveCounselling(@ModelAttribute Counselling counselling, Model model, Principal principal) {
		
		User user = userService.readUser(principal.getName());
		counselling.setAuditId(user.getUserName());
		
		if ("I".equals(counselling.getSaveFlag())) {
			counsellingService.insertCounselling(counselling);
		} else {
			counsellingService.updateCounselling(counselling);
		}
		
		return;
	}	
	
	//고객관리 > 상담관리
	@RequestMapping(value = "/customercounsellinglist/{customernumber}/{searchcondition}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCustomerCounsellingList(@PathVariable(value = "customernumber") int customerNumber, @PathVariable(value = "searchcondition") String searchCondition, Model model, Principal principal) {
		
		model.addAttribute("customerNumber", customerNumber);
		model.addAttribute("searchCondition", searchCondition);

		//상태
		List<CodeGroupDetail> stateList = codeService.finCodeGroupDetailByCodeGroupId("COUNSELSTATE");
		model.addAttribute("stateList",stateList);
		
		//상담유형
		List<CodeGroupDetail> categoryList = codeService.finCodeGroupDetailByCodeGroupId("CATEGORY");
		model.addAttribute("categoryList",categoryList);

		//상담경로
		List<CodeGroupDetail> inboundPathList = codeService.finCodeGroupDetailByCodeGroupId("INBOUNDPATH");
		model.addAttribute("inboundPathList",inboundPathList);
		
		//성별
		List<CodeGroupDetail> sexList = codeService.finCodeGroupDetailByCodeGroupId("SEXTYPE");
		model.addAttribute("sexList",sexList);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("online/counselling/customercounsellinglist");
		return modelAndView;
	}
	
	//고객관리 > 상담관리 : 상담조회
	@RequestMapping(value = "/getcustomercounsellinglist", method = RequestMethod.GET)
	public Map<String,Object> getCustomerCounsellingList(@ModelAttribute Counselling counselling, Model model, Principal principal) {
		
		Map<String,Object> map = new HashMap<String,Object>();

		map.put("counselling",counselling);
		
		//상담조회
		List<Counselling> list = counsellingService.getCounsellingListByCustomerNumber(counselling);
		
		Criteria cri = counselling;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalCount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 

		return map;
	}
}