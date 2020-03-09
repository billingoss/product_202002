package com.api.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.api.billing.login.model.User;
import com.api.billing.model.biz.Business;
import com.api.billing.model.biz.BusinessInput;
import com.api.billing.model.biz.Employee;
import com.api.service.BizService;
import com.api.service.UserService;

@Transactional(rollbackFor=Exception.class)
@RestController
@RequestMapping("bizRest")
public class BizRestController {

	@Autowired UserService userService;
	
	@Autowired BizService bizService;
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private Logger log = LoggerFactory.getLogger(getClass());

	
	/**
	 * 관리자 메인 호출
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/managerMain", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewManagerMain(Model model) {
		log.info("===================managerMain=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/manager/main");
		return modelAndView;
	}
	
	/**
	 * 관리자 메인 메뉴 호출
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/managerMenu", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewManagerMenu(HttpServletRequest request,Principal principal,Model model) {
		log.info("===================managerMenu=====================");
		User user = userService.readUser(principal.getName());
        request.getSession(true).setAttribute("manageryn", user.getManageryn());
        request.getSession(true).setAttribute("adminyn", user.getAdminyn());
        request.getSession(true).setAttribute("loginid", user.getUsername());
        
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/manager/menu");
		return modelAndView;
	}
	
	/**
	 * 회원사 등록 화면 호출
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/addBusinessMain", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewAddBusinessMain(@ModelAttribute BusinessInput businessInput ,Model model,Principal principal) {
		log.info("===================addBusinessMain=====================");
		//사용자 정보
		User user = userService.readUser(principal.getName());
		
		//회원사 정보 상세 조회
		String businessregistrationnumber = user.getBusinessregistrationnumber();
		BusinessInput bizInfo = this.bizService.selectBusinessDetail(businessregistrationnumber);
		
		//사원 목록 조회
		String providernumber = Integer.toString(user.getProvidernumber());
		Employee empInput = new Employee();
		empInput.setProvidernumber(providernumber);
		empInput.setExpiredSearchFlag(true);
		List<Employee> empList = this.bizService.selectEmplyee(empInput);
			
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/manager/businessUpdate");		
		modelAndView.addObject("bizInfo", bizInfo);
		modelAndView.addObject("empList", empList);
		return modelAndView;
	}
	
	/**
	 * 사원 등록 화면 호출
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/viewEmployeeManager", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewEmployeeManager(@ModelAttribute BusinessInput businessInput ,Model model,Principal principal) {
		log.info("===================viewEmployeeManager=====================");
		//사용자 정보
		User user = userService.readUser(principal.getName());

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/manager/employeeManager");		
		//사원 정보 조회
		BusinessInput bizInfo = new BusinessInput();		
		modelAndView.setViewName("admin/manager/employeeManager");
		
		//사원 목록 조회
		String providernumber = Integer.toString(user.getProvidernumber());
		Employee empInput = new Employee();
		empInput.setProvidernumber(providernumber);
		empInput.setExpiredSearchFlag(false);
		List<Employee> empList = this.bizService.selectEmplyee(empInput);		
		modelAndView.addObject("bizInfo", bizInfo);
		modelAndView.addObject("adminViewYn", "Y");
		modelAndView.addObject("empList", empList);
		return modelAndView;
	}
	
	/**
	 * 회원사 등록 팝업 호출
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/addBusinessDialog", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewAddBusiness(Model model) {
		log.info("===================addBusinessDialog=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/businessCreatePopup");
		return modelAndView;
	 }
	
	/**
	 * 회원사 등록 팝업 호출
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/empPassResetDialog", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewEmpPassReset(Model model) {
		log.info("===================addBusinessDialog=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/empPassResetPopup");
		return modelAndView;
	}
		
	/**
	 * 회원사 정보 등록 (사업장, 제공자, 관리자, login)
	 * @param businessInput
	 * @param model
	 * @param principal
	 * @return
	 */
	
	@RequestMapping(value = "/addBusinessProc", method = RequestMethod.POST)
	public BusinessInput addBusinessProc(@ModelAttribute BusinessInput businessInput ,Model model,Principal principal) throws Exception{
		BusinessInput resultBiz = new BusinessInput();
		int resultCnt = 0;
		String errMsg = "";

		//현재 등록되는 loginID 로 적용 
		businessInput.setAuditid(businessInput.getLoginid());
		
		/***********************************************************
		 * Step1. 사업장 정보 등록 (Business)
		 ***********************************************************/
		//Step1-1. 사업자 등록 번호 중복 여부 체크
		Business businessInfo = this.bizService.selectBusiness(businessInput);
		
		if (businessInfo == null) {
			//Step1-2. 사업자 주소 ID 조회
			String addressId = this.bizService.selectAddressId(businessInput);
			
			//Step1-3. 사업자 주소 정보 저장(address)
			if(addressId != null && !"".equals(addressId)) {
				businessInput.setBusinessaddressid(addressId);				
				resultCnt  = this.bizService.insertAddress(businessInput);			
				//Step1-4. 사업장 정보 저장(Business)			
				resultCnt = this.bizService.insertBusiness(businessInput);
			}else {				
				errMsg = "주소 등록에 실패 했습니다.";
			}
		}else {
			errMsg = "이미 등록된 사업자 등록 번호 입니다.";			
		}				
		/***********************************************************
		 * Step2. 제공자 등록 (provider)
		 ***********************************************************/
		if (resultCnt == 0) {
			throw new RuntimeException(errMsg);
		}else {			
			resultCnt = this.bizService.insertProvider(businessInput);		
		}
		
		/***********************************************************
		 * Step3. 관리자 사원정보 등록
		 ***********************************************************/
		if(resultCnt == 0) {			
			errMsg = "사업자 등록에 실패 했습니다.(provider)";					
			throw new Exception(errMsg);
		}else {			
			//Step3-1. ID 중복 체크
			User newAdminUser = this.userService.readUser(businessInput.getLoginid());
			if(newAdminUser != null) {			
				errMsg = "이미 존재하는 ID 입니다.";	
				throw new RuntimeException(errMsg);
			}else {				
				//Step3-2. 사원 정보 등록
				businessInput.setProvidername(businessInput.getBusinessname());
				businessInput.setAdminyn("Y");
				resultCnt = this.bizService.insertEmployee(businessInput);
			}
		}
		
		/***********************************************************
		 * Step4. Login에 관리자 등록
		 ***********************************************************/
		if(resultCnt == 0) {			
			errMsg = "사원 등록에 실패 했습니다.";					
			throw new RuntimeException(errMsg);
		}else {
			//비밀번호
			String password = passwordEncoder.encode("1234");
			businessInput.setPassword(password);
			businessInput.setIsAccountNonExpired("1");
			businessInput.setIsAccountNonLocked("1");
			businessInput.setIsCredentialsNonExpired("1");
			businessInput.setIsEnabled("1");
			resultCnt = this.bizService.insertLogin(businessInput);		
		}
		
		/***********************************************************
		 * Step5. 회사 정보에 관리자 ID update
		 ***********************************************************/
		if(resultCnt == 0) {			
			errMsg = "사원 등록에 실패 했습니다.";					
			throw new RuntimeException(errMsg);
		}else {
			//관리자ID setting
			businessInput.setManagerid(businessInput.getLoginid());
			resultCnt = this.bizService.updateBusiness(businessInput);		
		}
		
		//결과 setting		
		if (errMsg != null && !"".equals(errMsg)) {			
			//등록 건수가 없을 경우 에러 처리
			resultBiz.setErrMsg(errMsg);			
		}else {
			resultBiz = businessInput;
		}

		return resultBiz;
	}
	
	/**
	 * 회원사 정보 수정 (사업장, 제공자, 관리자, login)
	 * @param businessInput
	 * @param model
	 * @param principal
	 * @return
	 */
	
	@RequestMapping(value = "/updateBusinessProc", method = RequestMethod.POST)
	public BusinessInput updateBusinessProc(@ModelAttribute BusinessInput businessInput ,Model model,Principal principal) throws Exception{
		BusinessInput resultBiz = new BusinessInput();
		int resultCnt = 0;
		String errMsg = "";
		
		//현재 등록되는 loginID 로 적용 
		businessInput.setAuditid(businessInput.getLoginid());
		
		/***********************************************************
		 * Step1. 사업장 정보 수정 (Business)
		 ***********************************************************/
		resultCnt = this.bizService.updateBusiness(businessInput);
		/***********************************************************
		 * Step2. 제공자 수정 (provider)
		 ***********************************************************/		
		if(resultCnt == 0) {			
			errMsg = "회원사 수정에 실패 했습니다.";					
			throw new RuntimeException(errMsg);
		}else {
			businessInput.setProvidername(businessInput.getBusinessname());
			resultCnt = this.bizService.updateProvider(businessInput);		
		}		
		/***********************************************************
		 * Step3. 회원사 주소 정보 수정
		 ***********************************************************/
		if(resultCnt == 0) {			
			errMsg = "회원사 수정에 실패 했습니다.";					
			throw new RuntimeException(errMsg);
		}else {			
			businessInput.setAddressId(businessInput.getBusinessaddressid());
			resultCnt = this.bizService.updateAddress(businessInput);		
		}		
		
		//결과 setting		
		if (errMsg != null && !"".equals(errMsg)) {			
			//등록 건수가 없을 경우 에러 처리
			resultBiz.setErrMsg(errMsg);			
		}else {
			resultBiz = businessInput;
		}
		
		return resultBiz;
	}
	
	/**
	 *  사원 정보 저장 (관리자, login)
	 * @param businessInput
	 * @param model
	 * @param principal
	 * @return
	 */
	
	@RequestMapping(value = "/addEmployeeProc", method = RequestMethod.POST)
	public BusinessInput addEmployeeProc(@ModelAttribute BusinessInput businessInput ,Model model,Principal principal) throws Exception{
		BusinessInput resultBiz = new BusinessInput();
		int resultCnt = 0;
		String errMsg = "";
		User user = userService.readUser(principal.getName());

		//현재 등록되는 loginID 로 적용 
		businessInput.setAuditid(user.getUsername());	
		
		/***********************************************************
		 * Step1. 사원정보 등록
		 ***********************************************************/		
		//Step1-1. ID 중복 체크
		User newAdminUser = this.userService.readUser(businessInput.getLoginid());
		if(newAdminUser != null) {			
			errMsg = "이미 존재하는 ID 입니다.";	
			RuntimeException e = new  RuntimeException(errMsg);
			throw new RuntimeException(errMsg);
		}else {
			businessInput.setProvidernumber(user.getProvidernumber());			
			resultCnt = this.bizService.insertEmployee(businessInput);
		}
		
		/***********************************************************
		 * Step3. Login에 관리자 등록
		 ***********************************************************/
		if(resultCnt == 0) {			
			errMsg = "사원 등록에 실패 했습니다.";					
			throw new RuntimeException(errMsg);
		}else {
			//비밀번호
			String password = passwordEncoder.encode(businessInput.getPassword());
			businessInput.setPassword(password);
			businessInput.setIsAccountNonExpired("1");
			businessInput.setIsAccountNonLocked("1");
			businessInput.setIsCredentialsNonExpired("1");
			businessInput.setIsEnabled("1");
			resultCnt = this.bizService.insertLogin(businessInput);		
		}
		
		//결과 setting		
		if (errMsg != null && !"".equals(errMsg)) {			
			//등록 건수가 없을 경우 에러 처리
			resultBiz.setErrMsg(errMsg);			
		}else {
			resultBiz = businessInput;
		}

		return resultBiz;
	}
	
	/**
	 *  사원 정보 수정 (관리자, login)
	 * @param businessInput
	 * @param model
	 * @param principal
	 * @return
	 */
	
	@RequestMapping(value = "/updateEmployeeProc", method = RequestMethod.POST)
	public BusinessInput updateEmployeeProc(@ModelAttribute BusinessInput businessInput ,Model model,Principal principal) throws Exception{
		BusinessInput resultBiz = new BusinessInput();
		int resultCnt = 0;
		String errMsg = "";
		User user = userService.readUser(principal.getName());
		
		//현재 등록되는 loginID 로 적용 
		businessInput.setAuditid(user.getUsername());	
		
		/***********************************************************
		 * Step1. 비밀번호 확인 - 관리자 수정일 경우는 비밀번호 체크 하지 않는다.
		 ***********************************************************/
		if ("".equals(businessInput.getAdminViewYn()) ||"N".equals(businessInput.getAdminViewYn())) {			
			User employeeInfo = this.userService.readUser(businessInput.getLoginid());
			String password = businessInput.getPassword();
			if(!passwordEncoder.matches(password, employeeInfo.getPassword() )){
				errMsg = "비밀번호가 일지하지 않습니다.";					
				throw new RuntimeException(errMsg);
			}
		}

		/***********************************************************
		 * Step2. 사원정보 수정
		 ***********************************************************/		
		resultCnt = this.bizService.updateEmployee(businessInput);
				
		/***********************************************************
		 * Step3. Login에 수정
		 ***********************************************************/
		if(resultCnt == 0) {			
			errMsg = "사원 등록에 실패 했습니다.";					
			throw new RuntimeException(errMsg);
		}else {
			resultCnt = this.bizService.updateLogin(businessInput);		
		}
		
		//결과 setting		
		if (errMsg != null && !"".equals(errMsg)) {			
			//등록 건수가 없을 경우 에러 처리
			resultBiz.setErrMsg(errMsg);			
		}else {
			resultBiz = businessInput;
		}
		
		return resultBiz;
	}
	
	/**
	 *  비밀번호 변경
	 * @param businessInput
	 * @param model
	 * @param principal
	 * @return
	 */
	
	@RequestMapping(value = "/updatePasswordProc", method = RequestMethod.POST)
	public BusinessInput updatePasswordProc(@ModelAttribute BusinessInput businessInput ,Model model,Principal principal) throws Exception{
		BusinessInput resultBiz = new BusinessInput();
		int resultCnt = 0;
		String errMsg = "";

		businessInput.setAuditid(businessInput.getLoginid());
		/***********************************************************
		 * Step1. 등록된 email과 동일 한지 확인
		 ***********************************************************/	
		BusinessInput employeeInfo = this.bizService.selectEmplyeeDetail(businessInput.getLoginid());
		
		if(!employeeInfo.getEmail().equals(businessInput.getEmail())){
			errMsg = "등록된 E-mail과 일지하지 않습니다.";					
			throw new RuntimeException(errMsg);
		}
	
		/***********************************************************
		 * Step2. Login에 수정
		 ***********************************************************/
		//비밀번호
		String password = passwordEncoder.encode(businessInput.getNewPassword());
		businessInput.setPassword(password);
		businessInput.setNewPassword(password);
		resultCnt = this.bizService.updateLoginPassword(businessInput);		
		//결과 setting		
		if(resultCnt == 0) {			
			errMsg = "비밀번호 변경에 실패 했습니다.";					
			throw new RuntimeException(errMsg);
		}else {
			resultBiz = businessInput;		
		}
		return resultBiz;
	}
	
	/**
	 * 사원정보 상세 등록 팝업 호출
	 * @param model
	 * @return
	 * @RequestMapping(value = "/billing-calculation-contract/{connumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PaymentPrePayInvoiceInput setBillingCalaulationByContract(@PathVariable(value = "connumber") int connumber, Model model, Principal principal) {
	 */
	@RequestMapping(value = "/viewEmployeeDetail/{loginId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewEmployeeDetail(@PathVariable(value = "loginId") String loginId, Model model, Principal principal) {
		log.info("===================viewEmployeeDetail=====================");
		//사원 정보 조회
		BusinessInput bizInfo = this.bizService.selectEmplyeeDetail(loginId);		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/manager/employeeManager");
		modelAndView.addObject("bizInfo", bizInfo);
		return modelAndView;
	}
	
	@RequestMapping(value = "/getEmployeeDetail/{loginId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public Map getEmployeeDetail(@PathVariable(value = "loginId") String loginId, Model model, Principal principal) {
		log.info("===================getEmployeeDetail=====================");
		Map map = new HashMap();
		//사원 정보 조회		
		BusinessInput empInfo = this.bizService.selectEmplyeeDetail(loginId);
		map.put("empInfo", empInfo);
		return map;
	}
	

	/**
	 * Login ID 중복 체크
	 * @param businessInput
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/isLoginIdDup", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int isLoginIdDup(@ModelAttribute BusinessInput businessInput, Model model, Principal principal) {
		User newAdminUser = this.userService.readUser(businessInput.getLoginid());
		int resultCnt = 0;
		if (newAdminUser != null && !"".equals(newAdminUser.getUsername())) {
			resultCnt = 1;
		}
		return resultCnt;
	}
	
}
