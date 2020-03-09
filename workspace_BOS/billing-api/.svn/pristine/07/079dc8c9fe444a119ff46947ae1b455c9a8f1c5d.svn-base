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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.api.model.CodeGroupDetail;
import com.api.model.Criteria;
import com.api.model.PageMaker;
import com.api.model.User;
import com.api.model.contract.ContractInsert;
import com.api.model.customer.Customer;
import com.api.service.CodeService;
import com.api.service.ContractService;
import com.api.service.CustomerService;
import com.api.service.UserService;
import com.api.util.SXSSFExcelUtil;

@RestController
@RequestMapping("customer")
@Transactional(rollbackFor=Exception.class)
public class CustomerController {

	@Autowired 
	UserService userService;
		
	@Autowired 
	CustomerService customerService;
	
	@Autowired 
	CodeService codeService;
	
	@Autowired 
	ContractService contractService;

	//고객관리
	@RequestMapping(value = "/customerlist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCustomerList(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		//성별
		List<CodeGroupDetail> sexList = codeService.finCodeGroupDetailByCodeGroupId("SEXTYPE");
		model.addAttribute("sexList",sexList);

		modelAndView.setViewName("online/customer/customerlist");
		return modelAndView;
	}
	
	//고객관리
	@RequestMapping(value = "/customerlist/{searchcondition}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCustomerListBySearchCondition(@PathVariable(value = "searchcondition") String searchCondition, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		model.addAttribute("searchCondition", searchCondition);
		//성별
		List<CodeGroupDetail> sexList = codeService.finCodeGroupDetailByCodeGroupId("SEXTYPE");
		model.addAttribute("sexList",sexList);
		
		modelAndView.setViewName("online/customer/customerlist");
		return modelAndView;
	}	

	//고객관리 조회
	@RequestMapping(value = "/getcustomerlist", method = RequestMethod.GET)
	public Map getCustomerList(@ModelAttribute Customer customer, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		customer.setProviderNumber(user.getProviderNumber());
		
		List<Customer> list = customerService.getCustomerList(customer);

		Criteria cri = customer;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalCount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 

		return map;
	}
	
	//고객관리 엑셀
	@RequestMapping(value = "/getcustomerlistexcel", method = RequestMethod.POST)
	public void getCustomerListExcel(HttpServletRequest request, HttpServletResponse response, @ModelAttribute Customer customer, Principal principal)  throws Exception {
		
		User user = userService.readUser(principal.getName());
		customer.setProviderNumber(user.getProviderNumber());
		customer.setStartDate(customer.getStartDate().replace("-", ""));
		customer.setEndDate(customer.getEndDate().replace("-",""));
		
		List<Customer> list = customerService.getCustomerList(customer);
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("고객관리");

		//헤더 생성
		int j = 0;
		excel.createRow();
		excel.setCellValue("Y", j++, "번호");
		excel.setCellValue("Y", j++, "고객명");
		excel.setCellValue("Y", j++, "전화번호");
		excel.setCellValue("Y", j++, "주소");
		excel.setCellValue("Y", j++, "처리중 상담건수");
		excel.setCellValue("Y", j++, "등록일");
		excel.setCellValue("Y", j++, "처리일시");
		excel.setCellValue("Y", j++, "처리자");
	    
	    //바디 생성
	    Customer customerResult;
	    for (int i=0; i<list.size(); i++) {
	    	customerResult = list.get(i);
		    j = 0;
		    excel.createRow();
	    	excel.setCellValue("N", j++, String.valueOf(i+1));
	    	excel.setCellValue("N", j++, customerResult.getCustomerName());
	    	excel.setCellValue("N", j++, customerResult.getPhoneNumber());
	    	excel.setCellValue("N", j++, customerResult.getBaseAddress()+" "+customerResult.getDetailAddress());
	    	excel.setCellValue("N", j++, String.valueOf(customerResult.getCounsellingCount()>0?customerResult.getCounsellingCount()+"건":"-"));
	    	excel.setCellValue("N", j++, customerResult.getCreateDate());
	    	excel.setCellValue("N", j++, customerResult.getAuditDateTime());
	    	excel.setCellValue("N", j++, customerResult.getEmployeeName());
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("고객관리.xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }
	
	//고객검색 팝업 조회
	@RequestMapping(value = "/getcustomersearch", method = RequestMethod.GET)
	public Map getCustomerSearch(@ModelAttribute Customer customer, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		customer.setProviderNumber(user.getProviderNumber());
		
		List<Customer> list = customerService.getCustomerSearch(customer);

		Criteria cri = customer;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalCount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 

		return map;
	}
	
	//고객관리 > 고객정보
	@RequestMapping(value = "/customerinformation/{customernumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCustomerInformation(@PathVariable(value = "customernumber") int customerNumber, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		Customer customer = new Customer();
		customer.setCustomerNumber(customerNumber);
		
		Customer result = customerService.getCustomer(customer);
		model.addAttribute("customer", result);

		modelAndView.setViewName("online/customer/customerinformation");
		return modelAndView;
	}	
	
	//고객수정 팝업 조회
	@RequestMapping(value = "/getcustomer", method = RequestMethod.GET)
	public Map getCustomer(@ModelAttribute Customer customer, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		customer.setProviderNumber(user.getProviderNumber());
		
		Customer result = customerService.getCustomer(customer);

		map.put("customer", result);

		return map;
	}
	
	//고객저장
	@RequestMapping(value = "/savecustomer", method = RequestMethod.POST)
	public Map saveCustomer(@ModelAttribute Customer customer, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		customer.setProviderNumber(user.getProviderNumber());
		customer.setAuditId(user.getName());
		
		//주소 저장
		ContractInsert contract = new ContractInsert();
		contract.setZipCode(customer.getZipCode());
		contract.setBaseAddress(customer.getBaseAddress());
		contract.setDetailAddress(customer.getDetailAddress());
		
		ContractInsert address = contractService.getAddressid(contract);
		contract.setAddressId(address.getAddressId());
		contractService.createDeliveryAddress(contract);
		customer.setAddressId(contract.getAddressId());
		
		//고객 저장
		if ("I".equals(customer.getSaveFlag())) {
			List<Customer> list = customerService.getCustomerNumber(customer);
			if (list.size() > 0) {
				customer.setCustomerNumber(list.get(0).getCustomerNumber());
				customerService.updateCustomer(customer);
			} else {
				customerService.insertCustomer(customer);
			}
		} else {
			customerService.updateCustomer(customer);
		}

		return map;
	}
}