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
import com.api.model.ProviderInformation;
import com.api.model.User;
import com.api.model.contract.ContractList;
import com.api.service.CodeService;
import com.api.service.ContractListService;
import com.api.service.ProviderService;
import com.api.service.UserService;
import com.api.util.DateUtil;
import com.api.util.SXSSFExcelUtil;

@RestController
@RequestMapping("contractlist")
@Transactional(rollbackFor=Exception.class)
public class ContractListController {

	@Autowired
	private ContractListService contractListService;
	
	@Autowired
	private ProviderService providerService;
	
	@Autowired 
	UserService userService;
		
	@Autowired 
	CodeService codeService;


	@RequestMapping(value = "/contractlist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewContractList(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();

		modelAndView.setViewName("online/contract/contractlist");
		return modelAndView;
	}	

	@RequestMapping(value = "/contractlist/{contractstate}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewContractListByContractState(@PathVariable(value = "contractstate") String contractState, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		model.addAttribute("contractState", contractState);
		
		modelAndView.setViewName("online/contract/contractlist");
		return modelAndView;
	}	
	
	@RequestMapping(value = "/contractlist/searchcondition/{searchcondition}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewContractListBySearchCondition(@PathVariable(value = "searchcondition") String searchCondition, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();

		model.addAttribute("searchCondition", searchCondition);
		
		modelAndView.setViewName("online/contract/contractlist");
		return modelAndView;
	}	
	
	@RequestMapping(value = "/getcontractlist", method = RequestMethod.GET)
	public Map getContractList(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		contractList.setProviderNumber(user.getProviderNumber());
		
		List<ContractList> list = contractListService.getContractList(contractList);

		Criteria cri = contractList;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalCount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 

		return map;
	}
	
	@RequestMapping(value = "/getcontractlistexcel", method = RequestMethod.POST)
	public void getContractListExcel(HttpServletRequest request, HttpServletResponse response, @ModelAttribute ContractList contractList, Principal principal)  throws Exception {
		
		User user = userService.readUser(principal.getName());
		contractList.setProviderNumber(user.getProviderNumber());
		contractList.setStartDate(contractList.getStartDate().replace("-", ""));
		contractList.setEndDate(contractList.getEndDate().replace("-",""));
		
		//주문리스트 조회
		List<ContractList> list = contractListService.getContractList(contractList);
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("주문관리_"+contractList.getStartDate()+"~"+contractList.getEndDate());

		//헤더 생성
		int j = 0;
		excel.createRow();
		excel.setCellValue("Y", j++, "번호");
		excel.setCellValue("Y", j++, "판매채널");
		excel.setCellValue("Y", j++, "주문번호");
		excel.setCellValue("Y", j++, "고객명");
		excel.setCellValue("Y", j++, "전화번호");
		excel.setCellValue("Y", j++, "상품명");
		excel.setCellValue("Y", j++, "수량");
		excel.setCellValue("Y", j++, "다건주문");
		excel.setCellValue("Y", j++, "배송방식");
		excel.setCellValue("Y", j++, "결제방식");
		excel.setCellValue("Y", j++, "주문상태");
		excel.setCellValue("Y", j++, "주문일");
		excel.setCellValue("Y", j++, "고객메모");
		excel.setCellValue("Y", j++, "비고");
		excel.setCellValue("Y", j++, "처리일시");
		excel.setCellValue("Y", j++, "처리자");
		
	    //바디 생성
	    ContractList delivery;
	    for (int i=0; i<list.size(); i++) {
	    	delivery = list.get(i);
		    j = 0;
		    excel.createRow();
	    	excel.setCellValue("N", j++, String.valueOf(i+1));
	    	excel.setCellValue("N", j++, delivery.getChannelName());
	    	excel.setCellValue("N", j++, String.valueOf(delivery.getConNumber()));
	    	excel.setCellValue("N", j++, delivery.getCustomerName());
	    	excel.setCellValue("N", j++, delivery.getPhoneNumber());
	    	excel.setCellValue("N", j++, delivery.getProductName());
	    	excel.setCellValue("N", j++, String.valueOf(delivery.getQuantity()));
	    	excel.setCellValue("N", j++, delivery.getProductCount()>1?"Y":"N");
	    	excel.setCellValue("N", j++, "Y".equals(delivery.getRecurringDeliveryYn())?"정기배송":"일반배송");
	    	excel.setCellValue("N", j++, "Y".equals(delivery.getRecurringInvoiceYn())?"자동정기결제":"일괄결제");
	    	excel.setCellValue("N", j++, delivery.getContractStateName());
	    	excel.setCellValue("N", j++, delivery.getRegistrationDateTime());
	    	excel.setCellValue("N", j++, delivery.getCustomerRemark());
	    	excel.setCellValue("N", j++, delivery.getRemark());
	    	excel.setCellValue("N", j++, delivery.getAuditDateTime());
	    	excel.setCellValue("N", j++, delivery.getEmployeeName());
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("주문관리_"+contractList.getStartDate()+"~"+contractList.getEndDate()+".xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }

	@RequestMapping(value = "/updatecontract", method = RequestMethod.POST)
	public void updateContract(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		
		User user = userService.readUser(principal.getName());
		contractList.setAuditId(user.getUsername());
		
		if ("TERMINATION".equals(contractList.getContractState())) {
			contractList.setContractState("TERMINATION");
			contractListService.updateContractTermination(contractList);
		} else if ("SUSPEND".equals(contractList.getContractState()) || "ACTIVATION".equals(contractList.getContractState())) {
			contractListService.updateContractSuspend(contractList);
		} 
		
		return;
	}	

	@RequestMapping(value = "/contractdeliverylist/{connumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewContractDeliveryList(@PathVariable(value = "connumber") int conNumber, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		ContractList contractList = new ContractList();
		contractList.setConNumber(conNumber);
		
		ContractList contract = contractListService.getContract(contractList);
		model.addAttribute("contract", contract); // 리스트fetch
		
		String searchCondition = contract.getCustomerName() + "|" + contract.getPhoneNumber() + "|" + contract.getProductName() + "|||" + contract.getContractState() + "|";
		searchCondition = searchCondition + DateUtil.getDateFormat(contract.getRegistrationDateTime().substring(0,8),"-") + "|" + DateUtil.getDateFormat(contract.getRegistrationDateTime().substring(0,8),"-") + "|0";
		model.addAttribute("searchCondition", searchCondition);
		
		modelAndView.setViewName("online/contract/contractdeliverylist");
		return modelAndView;
	}	
	
	@RequestMapping(value = "/contractdeliverylist/{connumber}/{searchcondition}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewContractDeliveryList(@PathVariable(value = "connumber") int conNumber, @PathVariable(value = "searchcondition") String searchCondition, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		ContractList contractList = new ContractList();
		contractList.setConNumber(conNumber);
		
		ContractList contract = contractListService.getContract(contractList);
		model.addAttribute("contract", contract); // 리스트fetch
		model.addAttribute("searchCondition", searchCondition);

		modelAndView.setViewName("online/contract/contractdeliverylist");
		return modelAndView;
	}	
	
	@RequestMapping(value = "/getcontractdeliverylist", method = RequestMethod.GET)
	public Map getContractDeliveryList(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		
		contractList.setProviderNumber(user.getProviderNumber());

		List<ContractList> list = contractListService.getContractDeliveryList(contractList);

		Criteria cri = contractList;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalCount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 

		return map;
	}
	
	@RequestMapping(value = "/getcontractdeliverylistexcel", method = RequestMethod.POST)
	public void getContractDeliveryListExcel(HttpServletRequest request, HttpServletResponse response, @ModelAttribute ContractList contractList, Principal principal)  throws Exception {
		
		User user = userService.readUser(principal.getName());
		contractList.setProviderNumber(user.getProviderNumber());

		//주문별 배송리스트 조회
		List<ContractList> list = contractListService.getContractDeliveryList(contractList);
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("주문별배송관리_"+contractList.getConNumber());

		//헤더 생성
		int j = 0;
		excel.createRow();
		excel.setCellValue("Y", j++, "번호");
		excel.setCellValue("Y", j++, "배송일");
		excel.setCellValue("Y", j++, "고객명");
		excel.setCellValue("Y", j++, "전화번호");
		excel.setCellValue("Y", j++, "우편번호");
		excel.setCellValue("Y", j++, "배송주소");
		excel.setCellValue("Y", j++, "배송방식");
		excel.setCellValue("Y", j++, "배송유형");
		excel.setCellValue("Y", j++, "배송업체");
		excel.setCellValue("Y", j++, "배송상태");
		excel.setCellValue("Y", j++, "처리일시");
		excel.setCellValue("Y", j++, "처리자");
	    
	    //바디 생성
	    j = 0;
	    ContractList delivery;
	    for (int i=0; i<list.size(); i++) {
	    	delivery = list.get(i);
	    	j = 0;
		    excel.createRow();
	    	excel.setCellValue("N", j++, String.valueOf(i+1));
	    	excel.setCellValue("N", j++, delivery.getDeliveryDate());
	    	excel.setCellValue("N", j++, delivery.getCustomerName());
	    	excel.setCellValue("N", j++, delivery.getPhoneNumber());
	    	excel.setCellValue("N", j++, delivery.getZipCode());
	    	excel.setCellValue("N", j++, delivery.getBaseAddress() + (!"".equals(delivery.getDetailAddress())?" " + delivery.getDetailAddress() : ""));
	    	excel.setCellValue("N", j++, "Y".equals(delivery.getRecurringDeliveryYn())?"정기배송":"일반배송");
	    	excel.setCellValue("N", j++, delivery.getDeliveryTypeName());
	    	excel.setCellValue("N", j++, delivery.getDeliveryCompanyName());
	    	excel.setCellValue("N", j++, delivery.getDeliveryStateName());
	    	excel.setCellValue("N", j++, delivery.getAuditDateTime());
	    	excel.setCellValue("N", j++, delivery.getEmployeeName());
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("주문별배송관리_"+contractList.getConNumber()+".xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }
	
	@RequestMapping(value = "/updatedeliverydetail", method = RequestMethod.POST)
	public void updateDeliveryDetail(@RequestParam(value="conNumber")String[] conNumber, @RequestParam(value="deliveryNumber")String[] deliveryNumber, @RequestParam(value="deliveryState")String[] deliveryState, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		ContractList contractList = new ContractList();
		contractList.setAuditId(user.getUsername());
		
		for (int i=0; i<deliveryNumber.length; i++) {
			contractList.setDeliveryNumber(Integer.parseInt(deliveryNumber[i]));
			contractList.setDeliveryState(deliveryState[i]);
			contractListService.updateDeliveryDetail(contractList);
			
			if ("DONE".equals(deliveryState[i])) {
				contractList.setConNumber(Integer.parseInt(conNumber[i]));
				ContractList result = contractListService.getDeliveryRemainCount(contractList);
				
				if (result.getDeliveryRemainCount() == 0) {
					contractList.setContractState("DONE");
					contractListService.updateContractTermination(contractList);
				}
			}
		}
		
		return;
	}	

	@RequestMapping(value = "/contractdelivery", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Map viewContractDelivery(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		Map map = new HashMap();
		
		ContractList result = contractListService.getConctractAddress(contractList);

		map.put("contractDelivery", result); // 리스트fetch
		
		return map;
	}	
	
	@RequestMapping(value = "/savecontractdelivery", method = RequestMethod.POST)
	public void saveContractDelivery(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		
		User user = userService.readUser(principal.getName());
		contractList.setProviderNumber(user.getProviderNumber());
		contractList.setAuditId(user.getUsername());
		
		if ("I".equals(contractList.getSaveFlag())) {
			//주소저장
			List<ContractList> list = contractListService.getAddressId(contractList);
			contractList.setAddressId(list.get(0).getAddressId());
			contractListService.insertAddress(contractList);
		}
		
		//계약주소 변경
		contractListService.updateContractDelivery(contractList);
		
		//배송상세주소 변경
		contractListService.updateContractDeliveryDetail(contractList);
		
		return;
	}	

	
	@RequestMapping(value = "/deliverydetail", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Map viewDeliveryDetail(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		Map map = new HashMap();
		
		ContractList result;
		
		if ("I".equals(contractList.getSaveFlag())) {
			result = contractListService.getConctractAddress(contractList);
		} else {
			result = contractListService.getDeliveryAddress(contractList);
		}
		
		map.put("deliveryDetail", result); // 리스트fetch
		
		return map;
	}	
	
	@RequestMapping(value = "/savedeliverydetail", method = RequestMethod.POST)
	public void saveDeliveryDetail(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		
		User user = userService.readUser(principal.getName());
		contractList.setProviderNumber(user.getProviderNumber());
		contractList.setAuditId(user.getUsername());
		
		if ("I".equals(contractList.getSaveFlag().substring(1,2))) {
			List<ContractList> list = contractListService.getAddressId(contractList);
			contractList.setAddressId(list.get(0).getAddressId());
			contractListService.insertAddress(contractList);
		}
		
		if ("I".equals(contractList.getSaveFlag().substring(0, 1)) ) {
			contractListService.insertDeliveryDetail(contractList);
		} else {
			contractListService.updateDeliveryDetailDate(contractList);
		}
		
		return;
	}	
	
	@RequestMapping(value = "/getcontractproduct", method = RequestMethod.GET)
	public Map getContractProduct(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		
		contractList.setProviderNumber(user.getProviderNumber());

		List<ContractList> list = contractListService.getContractProduct(contractList);

		map.put("lists", list); // 리스트fetch

		return map;
	}

	@RequestMapping(value = "/deliverylist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDeliveryList(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		User user = userService.readUser(principal.getName());

		//배송회사
		ProviderInformation param = new ProviderInformation();
		param.setProviderNumber(user.getProviderNumber());
		param.setCode("DELIVERYCOMPANY");
		param.setDetailCode("DELIVERYCOMPANY");
		List<ProviderInformation> deliveryCompanyList = providerService.getProviderInformation(param);
		model.addAttribute("deliveryCompanyList",deliveryCompanyList);

		//배송상태
		List<CodeGroupDetail> deliveryStateList = codeService.finCodeGroupDetailByCodeGroupId("DELIVERYSTATE");
		model.addAttribute("deliveryStateList",deliveryStateList);

		modelAndView.setViewName("online/contract/deliverylist");
		return modelAndView;
	}	
	
	@RequestMapping(value = "/getdeliverylist", method = RequestMethod.GET)
	public Map getDeliveryList(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		
		contractList.setProviderNumber(user.getProviderNumber());

		List<ContractList> list = contractListService.getDeliveryList(contractList);

		Criteria cri = contractList;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalCount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 

		return map;
	}
	
	@RequestMapping(value = "/getdeliverylistexcel", method = RequestMethod.POST)
	public void getDeliveryListExcel(HttpServletRequest request, HttpServletResponse response, @ModelAttribute ContractList contractList, Principal principal)  throws Exception {
		
		User user = userService.readUser(principal.getName());
		contractList.setProviderNumber(user.getProviderNumber());
		contractList.setStartDate(contractList.getStartDate().replace("-", ""));
		contractList.setEndDate(contractList.getEndDate().replace("-",""));

		//배송리스트 조회
		List<ContractList> list = contractListService.getDeliveryList(contractList);
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("배송관리_"+contractList.getStartDate()+"~"+contractList.getEndDate());

		//헤더 생성
		int j = 0;
		excel.createRow();
		excel.setCellValue("Y", j++, "번호");
		excel.setCellValue("Y", j++, "배송일");
		excel.setCellValue("Y", j++, "고객명");
		excel.setCellValue("Y", j++, "전화번호");
		excel.setCellValue("Y", j++, "상품명");
		excel.setCellValue("Y", j++, "수량");
		excel.setCellValue("Y", j++, "다건주문");
		excel.setCellValue("Y", j++, "우편번호");
		excel.setCellValue("Y", j++, "배송주소");
		excel.setCellValue("Y", j++, "배송방식");
		excel.setCellValue("Y", j++, "배송유형");
		excel.setCellValue("Y", j++, "배송업체");
		excel.setCellValue("Y", j++, "배송상태");
		excel.setCellValue("Y", j++, "주문상태");
		excel.setCellValue("Y", j++, "배송회차");
		excel.setCellValue("Y", j++, "고객메모");
		excel.setCellValue("Y", j++, "비고");
		excel.setCellValue("Y", j++, "처리일시");
		excel.setCellValue("Y", j++, "처리자");
	    
	    //바디 생성
	    j = 0;
	    ContractList delivery;
	    for (int i=0; i<list.size(); i++) {
	    	delivery = list.get(i);
	    	j = 0;
		    excel.createRow();
	    	excel.setCellValue("N", j++, String.valueOf(i+1));
	    	excel.setCellValue("N", j++, delivery.getDeliveryDate());
	    	excel.setCellValue("N", j++, delivery.getCustomerName());
	    	excel.setCellValue("N", j++, delivery.getPhoneNumber());
	    	if ("Y".equals(contractList.getProductYn())) {
		    	excel.setCellValue("N", j++, delivery.getProductName());
	    	} else {
		    	excel.setCellValue("N", j++, delivery.getProductName()+(delivery.getProductCount()>1?"외 "+(delivery.getProductCount()-1)+"건":""));
	    	}
	    	excel.setCellValue("N", j++, String.valueOf(delivery.getQuantity()));
	    	excel.setCellValue("N", j++, delivery.getProductCount()>1?"Y":"N");
	    	excel.setCellValue("N", j++, delivery.getZipCode());
	    	excel.setCellValue("N", j++, delivery.getBaseAddress() + " " + delivery.getDetailAddress());
	    	excel.setCellValue("N", j++, "Y".equals(delivery.getRecurringDeliveryYn())?"정기배송":"일반배송");
	    	excel.setCellValue("N", j++, delivery.getDeliveryTypeName());
	    	excel.setCellValue("N", j++, delivery.getDeliveryCompanyName());
	    	excel.setCellValue("N", j++, delivery.getDeliveryStateName());
	    	excel.setCellValue("N", j++, delivery.getContractStateName());
	    	excel.setCellValue("N", j++, String.valueOf(delivery.getDeliverySeq()==0?"":delivery.getDeliverySeq()));
	    	excel.setCellValue("N", j++, delivery.getCustomerRemark());
	    	excel.setCellValue("N", j++, delivery.getRemark());
	    	excel.setCellValue("N", j++, delivery.getAuditDateTime());
	    	excel.setCellValue("N", j++, delivery.getEmployeeName());
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("배송관리_"+contractList.getStartDate()+"~"+contractList.getEndDate()+".xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }
	
	@RequestMapping(value = "/deliverymanagement", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Map viewDeliveryDetailExcel(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		contractList.setProviderNumber(user.getProviderNumber());

		//배송회사
		ProviderInformation param = new ProviderInformation();
		param.setProviderNumber(user.getProviderNumber());
		param.setCode("DELIVERYCOMPANY");
		param.setDetailCode("DELIVERYCOMPANY");
		List<ProviderInformation> deliveryCompanyList = providerService.getProviderInformation(param);
		map.put("deliveryCompanyList",deliveryCompanyList);
		
		List<ContractList> deliveryDateList = contractListService.getDeliveryDate(contractList);
		map.put("deliveryDateList",deliveryDateList);

		return map;
	}	
	
	@RequestMapping(value = "/getdeliverydetailexcel", method = RequestMethod.POST)
	public void getDeliveryDetailExcel(HttpServletRequest request, HttpServletResponse response, Principal principal)  throws Exception {
		ContractList contractList = new ContractList();
		
		User user = userService.readUser(principal.getName());
		contractList.setProviderNumber(user.getProviderNumber());
		contractList.setDeliveryDate(request.getParameter("deliveryDate"));
		contractList.setDeliveryCompany(request.getParameter("deliveryCompany"));
		
		String curdate = DateUtil.getDate("yyyyMMdd");
		
		//배송내역 헤더 조회
		ProviderInformation param = new ProviderInformation();
		param.setProviderNumber(user.getProviderNumber());
		param.setCode("DELIVERYDOWNITEM");
		param.setDetailCode(request.getParameter("deliveryCompany"));
		List<ProviderInformation> infoList = providerService.getProviderInformation(param);
		
		//배송내역 조회
		List<ContractList> list = contractListService.getDeliveryDetailExcel(contractList);
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("배송내역조회_"+contractList.getDeliveryCompany()+"_"+contractList.getDeliveryDate());

		//헤더 생성
		excel.createRow();
	    for (int i=0; i<infoList.size(); i++) {
			excel.setCellValue("Y", i, infoList.get(i).getValue2());
	    }
	    
	    //바디 생성
	    String value = "";
	    for (int i=0; i<list.size(); i++) {
		    excel.createRow();
		    for (int j=0; j<infoList.size(); j++) {
			    if ("productname".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getProductName();
			    } else if ("customername".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getCustomerName();
			    } else if ("zipcode".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getZipCode();
			    } else if ("baseaddresss".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getBaseAddress();
			    } else if ("phonenumber".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getPhoneNumber();
			    } else if ("channelname".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getChannelName();
			    } else if ("quantity".equals(infoList.get(j).getValue1())) {
			    	value =  String.valueOf(list.get(i).getQuantity());
			    } else if ("deliveryremark".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getDeliveryRemark();
			    } else if ("postareacode".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getPostAreaCode();
			    } else if ("remark".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getRemark();
			    } else if ("deliveryseq".equals(infoList.get(j).getValue1())) {
			    	value =  String.valueOf(list.get(i).getDeliverySeq()==0?"":list.get(i).getDeliverySeq());
			    } else if ("samecustomeryn".equals(infoList.get(j).getValue1())) {
			    	value =  String.valueOf(list.get(i).getSameCustomerYn());
			    } else if ("customerremark".equals(infoList.get(j).getValue1())) {
			    	value =  String.valueOf(list.get(i).getCustomerRemark());
			    }  
			    
			    if ("replace".equals(infoList.get(j).getOptionCode())) {
			    	value = value.replace(infoList.get(j).getOptionValue1(), infoList.get(j).getOptionValue2());
			    } else if ("seq".equals(infoList.get(j).getOptionCode())) {
			    	if ("yymmdd".equals(infoList.get(j).getOptionValue1())) {
					    value = curdate.substring(2,8)+(Integer.parseInt(infoList.get(j).getOptionValue2())+i);
			    	} else if ("yyyymmdd".equals(infoList.get(j).getOptionValue1())) {
					    value = curdate.substring(0,8)+(Integer.parseInt(infoList.get(j).getOptionValue2())+i);
			    	} else if ("".equals(infoList.get(j).getOptionValue1())) {
					    value = String.valueOf(Integer.parseInt(infoList.get(j).getOptionValue2())+i);
			    	}  
			    }
			    
		    	excel.setCellValue("N", j, value);
		    }
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("배송내역조회_"+contractList.getDeliveryCompany()+"_"+contractList.getDeliveryDate()+".xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }
	
	@RequestMapping(value = "/savedeliverydetailstate", method = RequestMethod.POST)
	public Map<String,Object> saveDeliveryDetailState(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		contractList.setProviderNumber(user.getProviderNumber());
		contractList.setAuditId(user.getUsername());
		
		ContractList productCount = contractListService.getDeliveryProductCount(contractList);
		
		int result = contractListService.updateDeliveryDetailState(contractList);
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("updateCount", result);
		map.put("productCount", productCount.getProductCount());
		
		contractListService.updateContractState(contractList);
		
		return map;
	}	
	
	/*
	@RequestMapping(value = "/contractsearch", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewContractSearch(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		model.addAttribute("contract", contractList);

		modelAndView.setViewName("online/contract/contractsearch");
		return modelAndView;
	}
	*/	

	@RequestMapping(value = "/getcontractsearch", method = RequestMethod.GET)
	public Map getContractSearch(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		contractList.setProviderNumber(user.getProviderNumber());
		
		List<ContractList> list = contractListService.getContractSearch(contractList);

		Criteria cri = contractList;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalCount():0);
		
		map.put("contractList", contractList);
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 

		return map;
	}
	
	@RequestMapping(value = "/getcontractaddition", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Map getContractAddition(@ModelAttribute ContractList contractList, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		
		//계약정보 조회
		ContractList contract = contractListService.getContract(contractList);
		
		//부가정보 조회
		ProviderInformation param = new ProviderInformation();
		param.setProviderNumber(user.getProviderNumber());
		param.setCode("CONTRACTADDITION");
		param.setDetailCode(contract.getChannelId());
		List<ProviderInformation> contractAdditionList = providerService.getProviderInformation(param);
		
		//부가정보 보기 조회
		for (int i=0; i<contractAdditionList.size(); i++) {
			if (!"".equals(contractAdditionList.get(i).getOptionValue2())) {
				List<CodeGroupDetail> codeList = codeService.finCodeGroupDetailByCodeGroupId(contractAdditionList.get(i).getOptionValue2());
				contractAdditionList.get(i).setCodeList(codeList);
			}
		}
		
		//부가정보조회
		contractList.setProviderNumber(user.getProviderNumber());
		List<ContractList> contractAddition = contractListService.getContractAddition(contractList);

		map.put("contractAdditionList",contractAdditionList);
		map.put("contractAddition",contractAddition);

		return map;
	}
	
	@RequestMapping(value="/savecontractaddition", method=RequestMethod.POST)
	public void saveContractAddition(@RequestParam(value="conNumber")int conNumber, @RequestParam(value="additionCode")String[] additionCode, @RequestParam(value="additionValue")String[] additionValue, Model model, Principal principal) throws Exception{
		
		User user = userService.readUser(principal.getName());

		ContractList contractList = new ContractList();
		contractList.setProviderNumber(user.getProviderNumber());
		contractList.setConNumber(conNumber);
		contractList.setAuditId(user.getUserName());
		
		//부가정보 삭제
		contractListService.deleteContractAddition(contractList);
		
		//부가정보 등록
		for (int i=0; i<additionCode.length; i++) {
			contractList.setAdditionCode(additionCode[i]);
			contractList.setAdditionValue(additionValue[i]);
			contractListService.insertContractAddition(contractList);
		}
		
		return;
	}
	
	@RequestMapping(value="/savedeliverydetaildate", method=RequestMethod.POST)
	public void saveDeliveryDetailDate(@RequestParam(value="deliveryDate")String deliveryDate, @RequestParam(value="deliveryNumber")int[] deliveryNumber, Model model, Principal principal) throws Exception{
		
		User user = userService.readUser(principal.getName());
		ContractList contractList = new ContractList();
		contractList.setAuditId(user.getUserName());
		contractList.setDeliveryDate(deliveryDate);

		//배송일 변경
		for (int i=0; i<deliveryNumber.length; i++) {
			contractList.setDeliveryNumber(deliveryNumber[i]);
			contractListService.updateDeliveryDetailOnlyDate(contractList);
		}
		
		return;
	}
}