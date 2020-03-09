package com.api.controller;

import java.net.URLEncoder;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.api.model.CodeGroupDetail;
import com.api.model.Criteria;
import com.api.model.PageMaker;
import com.api.model.User;
import com.api.model.product.Discount;
import com.api.service.CodeService;
import com.api.service.DiscountService;
import com.api.service.UserService;
import com.api.util.DateUtil;
import com.api.util.NumberUtil;
import com.api.util.SXSSFExcelUtil;

@RestController
@RequestMapping("discount")
@Transactional(rollbackFor=Exception.class)
public class DiscountController {

	
	@Autowired 
	UserService userService;
		
	@Autowired 
	CodeService codeService;

	@Autowired 
	DiscountService discountService;
	
	private Logger log = LoggerFactory.getLogger(getClass());
	
	/**
	 * 상품관리 > 할인관리
	 * 상품 목록을 조회 화면으로 이동 한다.
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/discountList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDiscountList(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		//할인유형
		List<CodeGroupDetail> discountTypeList = codeService.finCodeGroupDetailByCodeGroupId("DISCOUNTTYPE");		
		model.addAttribute("discountTypeList",discountTypeList);
		
		//할인상태
		List<CodeGroupDetail> discountStateList = codeService.finCodeGroupDetailByCodeGroupId("DISCOUNTSTATE");
		model.addAttribute("discountStateList",discountStateList);
		
		
		modelAndView.setViewName("online/product/discountList");
		return modelAndView;
	}
	
	/**
	 * 할인 목록을 조회 한다.
	 * @param discount
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getDiscountList", method = RequestMethod.GET)
	public Map getDiscountList(@ModelAttribute Discount discount, Model model, Principal principal){
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		discount.setProviderNumber(user.getProviderNumber());
		
		List<Discount> list = this.discountService.selectDiscountList(discount);
		
		
		Criteria cri = discount;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalCount():0);
		
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 

		return map;
	}
	
	@RequestMapping(value = "/getDiscountListExcel", method = RequestMethod.POST)
	public void getDiscountListExcel(HttpServletRequest request, HttpServletResponse response, @ModelAttribute Discount discount, Principal principal)  throws Exception {
		
		User user = userService.readUser(principal.getName());
		discount.setProviderNumber(user.getProviderNumber());
		
		List<Discount> list = this.discountService.selectDiscountList(discount);
		
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("할인관리");

		//헤더 생성
		int colNum = 0;
		int rowNum = 0;
		String discountVal = ""; 
		
		excel.createRow();
		excel.setCellValue("Y", colNum++, "번호");
		excel.setCellValue("Y", colNum++, "할일유형");
		excel.setCellValue("Y", colNum++, "할인명");
		excel.setCellValue("Y", colNum++, "할인율/금액");
//		excel.setCellValue("Y", colNum++, "상태");
		excel.setCellValue("Y", colNum++, "할인시작일");
		excel.setCellValue("Y", colNum++, "할인종료일");
		excel.setCellValue("Y", colNum++, "할인설명");
		excel.setCellValue("Y", colNum++, "등록일");
	    
	    //바디 생성
		for (Discount item : list) {	    	
	    	colNum = 0;
	    	excel.createRow();
	    	excel.setCellValue("N", colNum++, String.valueOf(++rowNum));
	    	excel.setCellValue("N", colNum++, item.getDiscountTypeName());
	    	excel.setCellValue("N", colNum++, item.getDiscountName());
	    	discountVal = NumberUtil.getCommaNumber(item.getDiscountValue());
	    	if ("RATE".equals(item.getDiscountType())) {
	    		discountVal += "%";
	    	}else {	    		
	    		discountVal += "원";
	    	}
	    	excel.setCellValue("N", colNum++, discountVal);
//	    	excel.setCellValue("N", colNum++, item.getDiscountState());
	    	excel.setCellValue("N", colNum++, DateUtil.getDateFormat(item.getSubscribeStartDateTime(),"-"));
	    	excel.setCellValue("N", colNum++, DateUtil.getDateFormat(item.getSubscribeEndDateTime(),"-"));
	    	excel.setCellValue("N", colNum++, item.getDiscountDescription().replace("<br/>", "\n"));
	    	excel.setCellValue("N", colNum++, DateUtil.getDateFormat(item.getAuditDateTime(),"-"));
			
		}

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("할인관리.xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }	
	
	/**
	 * 할인 상세 정보를 조회 한다.
	 * @param discount
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/selectDiscountDetail", method = RequestMethod.POST)
	public Map selectDiscountDetail(@ModelAttribute Discount discount, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		discount.setProviderNumber(user.getProviderNumber());
		
		Discount discountDetail = this.discountService.selectDiscountDetail(discount);
		map.put("discountDetail", discountDetail); // 리스트fetch
		return map;
	}
	
	/**
	 * 할일등록
	 * @param discount
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/saveDiscount", method = RequestMethod.POST)
	public Map saveDiscount(@ModelAttribute Discount discount ,Model model,Principal principal){
		Map map = new HashMap();
		User user = userService.readUser(principal.getName());
		discount.setProviderNumber(user.getProviderNumber());
		discount.setAuditId(user.getUsername());
		
		int resultCnt = 0;
		String resultMsg = "할인 정보를 저장 하였습니다.";
		try {
			resultCnt = this.discountService.saveDiscount(discount);
		} catch (Exception e) {
			// TODO: handle exception
			resultMsg = e.getMessage();
		}
		
		map.put("resultCnt", resultCnt);
		map.put("resultMsg", resultMsg);
		return map;
	}	
}