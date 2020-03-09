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
import com.api.model.product.Product;
import com.api.model.product.ProductDiscount;
import com.api.model.product.ProductPackage;
import com.api.service.CodeService;
import com.api.service.ProductService;
import com.api.service.UserService;
import com.api.util.DateUtil;
import com.api.util.NumberUtil;
import com.api.util.SXSSFExcelUtil;

@RestController
@RequestMapping("product")
@Transactional(rollbackFor=Exception.class)
public class ProductController {

	
	@Autowired 
	UserService userService;
		
	@Autowired 
	CodeService codeService;

	@Autowired 
	ProductService productService;
		
	private Logger log = LoggerFactory.getLogger(getClass());

	/**
	 * 상품관리 > 상품관리
	 * 상품 목록을 조회 화면으로 이동 한다.
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/productlist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewProductList(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();

		//상품유형
		List<CodeGroupDetail> productTypeList = codeService.finCodeGroupDetailByCodeGroupId("PRODUCTTYPE");
		model.addAttribute("productTypeList",productTypeList);
		
		//상태
		List<CodeGroupDetail> productStateList = codeService.finCodeGroupDetailByCodeGroupId("PRODUCTSTATE");
		model.addAttribute("productStateList",productStateList);
		
		
		modelAndView.setViewName("online/product/productlist");
		return modelAndView;
	}	

	/**
	 * 상품 목록을 조회 한다.
	 * @param product
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getproductlist", method = RequestMethod.GET)
	public Map getProductList(@ModelAttribute Product product, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		product.setProviderNumber(user.getProviderNumber());
		
		List<Product> list = productService.selectProductList(product);
		
		
		Criteria cri = product;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalCount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 

		return map;
	}
	
	/**
	 * 상품 목록을 엑셀 다운로드 한다.
	 * @param request
	 * @param response
	 * @param product
	 * @param principal
	 * @throws Exception
	 */
	@RequestMapping(value = "/getproductlistexcel", method = RequestMethod.POST)
	public void getProductListExcel(HttpServletRequest request, HttpServletResponse response, @ModelAttribute Product product, Principal principal)  throws Exception {
		
		User user = userService.readUser(principal.getName());
		product.setProviderNumber(user.getProviderNumber());
		
		List<Product> list = productService.selectProductList(product);
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("상품관리");

		//헤더 생성
		int colNum = 0;
		int rowNum = 0;
		
		excel.createRow();
		excel.setCellValue("Y", colNum++, "번호");
		excel.setCellValue("Y", colNum++, "상품유형");
		excel.setCellValue("Y", colNum++, "상품명");
		excel.setCellValue("Y", colNum++, "패키지유형");
		excel.setCellValue("Y", colNum++, "상품가격");
//		excel.setCellValue("Y", colNum++, "상태");
		excel.setCellValue("Y", colNum++, "판매종료여부");
		excel.setCellValue("Y", colNum++, "노출여부");
		excel.setCellValue("Y", colNum++, "판매시작일");
		excel.setCellValue("Y", colNum++, "판매종료일");
		excel.setCellValue("Y", colNum++, "상품설명");
		excel.setCellValue("Y", colNum++, "등록일");
	    
	    //바디 생성
	    for (Product productResult : list) {	    	
	    	colNum = 0;
	    	excel.createRow();
	    	excel.setCellValue("N", colNum++, String.valueOf(++rowNum));
	    	excel.setCellValue("N", colNum++, productResult.getProductTypeName());
	    	excel.setCellValue("N", colNum++, productResult.getProductName());
	    	excel.setCellValue("N", colNum++, "Y".equals(productResult.getPackagePriceReferenceYn())?"종량형":"정액형");
	    	excel.setCellValue("N", colNum++, NumberUtil.getCommaNumber(productResult.getPriceAmount())+"원");
	    	excel.setCellValue("N", colNum++, productResult.getSaleStopYn());
	    	excel.setCellValue("N", colNum++, productResult.getExposureYn());
	    	//excel.setCellValue("N", colNum++, productResult.getProductStateName());
	    	excel.setCellValue("N", colNum++, DateUtil.getDateFormat(productResult.getSubscribeStartDateTime(), "-"));
	    	excel.setCellValue("N", colNum++, DateUtil.getDateFormat(productResult.getSubscribeEndDateTime(), "-"));
	    	excel.setCellValue("N", colNum++, productResult.getProductDescription().replace("<br/>", "\n"));
	    	excel.setCellValue("N", colNum++, DateUtil.getDateFormat(productResult.getAuditDateTime(), "-"));
		}

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("상품관리.xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }
	
	/**
	 * 사용 가능한 상품목록 및 할인 목록 조회
	 * @param product
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/selectProductDiscountList", method = RequestMethod.GET)
	public Map selectProductDiscountList(@ModelAttribute Product product, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		/**********************************************		
		 * 패키지 선정 가능 상품 목록을 조회 한다.
		 **********************************************/
		product.setProviderNumber(user.getProviderNumber());
		product.setProductState("OPERATION");
		product.setSubscribeEndDateTime(DateUtil.getToday());
		product.setSubscribeEndDateTime(DateUtil.getToday());
		product.setExposureYn("Y");
		product.setSaleStopYn("N");
		
		
		/**********************************************		
		 * 적용 가능 할인 목록을 조회 한다.
		 **********************************************/
		Discount discount = new Discount();
		discount.setProviderNumber(product.getProviderNumber());
		discount.setDiscountState("OPERATION");
		discount.setDiscountTarget("PRODUCT");	/*상품단위 할인 목록 조회*/
		discount.setSubscribeStartDateTime(DateUtil.getToday());
		discount.setSubscribeEndDateTime(DateUtil.getToday());
		
		map = this.productService.selectProductDiscountList(product, discount);
		
		return map;
	}	
	
	/**
	 * 상품등록
	 * @param product
	 * @param model
	 * @param principal
	 * @return
	 */
	
	@RequestMapping(value = "/saveProduct", method = RequestMethod.POST)
	public Map saveProduct(@ModelAttribute Product product ,Model model,Principal principal){
		Map map = new HashMap();
		User user = userService.readUser(principal.getName());
		product.setProviderNumber(user.getProviderNumber());
		product.setAuditId(user.getUsername());
		
		int resultCnt = 0;
		String resultMsg = "상품을 저장 하였습니다.";
		try {
			resultCnt = this.productService.saveProduct(product);
		} catch (Exception e) {
			// TODO: handle exception
			resultMsg = e.getMessage();
		}
		
		map.put("resultCnt", resultCnt);
		map.put("resultMsg", resultMsg);
		return map;
	}
	
	/**
	 * 상품삭제
	 * @param product
	 * @param model
	 * @param principal
	 * @return
	 */
	
	@RequestMapping(value = "/deleteProduct", method = RequestMethod.POST)
	public Map deleteProduct(@ModelAttribute Product product ,Model model,Principal principal){
		Map map = new HashMap();
		User user = userService.readUser(principal.getName());
		product.setProviderNumber(user.getProviderNumber());
		product.setAuditId(user.getUsername());
		
		int resultCnt = 0;
		String resultMsg = "상품 삭제 하였습니다.";
		try {
			resultCnt = this.productService.deleteProduct(product);
		} catch (Exception e) {
			// TODO: handle exception
			resultMsg = e.getMessage();
		}		
		map.put("resultCnt", resultCnt);
		map.put("resultMsg", resultMsg);
		return map;
	}
	
	/**
	 * 상품 상세 정보를 저장 한다.
	 * @param product
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/selectProductDetail", method = RequestMethod.POST)
	public Map selectProductDetail(@ModelAttribute Product product ,Model model,Principal principal){
		Map map = new HashMap();
		User user = userService.readUser(principal.getName());
		product.setProviderNumber(user.getProviderNumber());
		product.setAuditId(user.getUsername());
		String resultMsg = "조회가 완료 되었습니다.";
		try {
			map = this.productService.selectProductDetail(product);
		} catch (Exception e) {
			// TODO: handle exception
			resultMsg = e.getMessage();
		}
		map.put("resultMsg", resultMsg);
		return map;
	}
	
	/**
	 * 상품패키지삭제
	 * @param product
	 * @param model
	 * @param principal
	 * @return
	 */
	
	@RequestMapping(value = "/deletePackage", method = RequestMethod.POST)
	public Map deletePackage(@ModelAttribute ProductPackage productPackage ,Model model,Principal principal){
		Map map = new HashMap();
		User user = userService.readUser(principal.getName());
		productPackage.setProviderNumber(user.getProviderNumber());
		productPackage.setAuditId(user.getUsername());
		
		int resultCnt = 0;
		String resultMsg = "패키지 상품을 삭제 하였습니다.";
		try {
			resultCnt = this.productService.deleteProductPackage(productPackage);			
		} catch (Exception e) {
			// TODO: handle exception
			resultMsg = e.getMessage();
		}		
		map.put("resultCnt", resultCnt);
		map.put("resultMsg", resultMsg);
		return map;
	
	}
	/**
	 * 상품할인삭제
	 * @param product
	 * @param model
	 * @param principal
	 * @return
	 */
	
	@RequestMapping(value = "/deleteDiscount", method = RequestMethod.POST)
	public Map deleteDiscount(@ModelAttribute ProductDiscount productDiscount ,Model model,Principal principal){
		Map map = new HashMap();
		User user = userService.readUser(principal.getName());
		productDiscount.setProviderNumber(user.getProviderNumber());
		productDiscount.setAuditId(user.getUsername());
		
		int resultCnt = 0;
		String resultMsg = "상품 할인을 삭제 하였습니다.";
		try {
			resultCnt = this.productService.deleteProductDiscount(productDiscount);			
		} catch (Exception e) {
			// TODO: handle exception
			resultMsg = e.getMessage();
		}		
		map.put("resultCnt", resultCnt);
		map.put("resultMsg", resultMsg);
		return map;
	}
		
}