
package com.api.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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

import com.api.BizException;
import com.api.model.Criteria;
import com.api.model.PageMaker;
import com.api.model.User;
import com.api.model.biz.Business;
import com.api.model.biz.BusinessInput;
import com.api.model.biz.Employee;
import com.api.service.BusinessService;
import com.api.service.UserService;

@RestController
@RequestMapping("business")
@Transactional(rollbackFor=Exception.class)
public class BusinessController {

	@Autowired 
	UserService userService;
	
	@Autowired 
	BusinessService bizService;
	
	@Autowired
	CommonController commonController;
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private Logger log = LoggerFactory.getLogger(getClass());
	
	/**
	 * 회원사 등록 화면 호출
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/createBusiness", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewAddBusiness(Model model) {
		log.info("===================createCompany=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("online/business/createBusiness");
		return modelAndView;
	 }
	
	/**
	 * 회원사 수정 화면 호출
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/updateBusiness", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewUpdateBusiness(Model model, Principal principal) {
		log.info("===================updateBusiness=====================");
		//사용자 정보
		User user = userService.readUser(principal.getName());
		
		//회원사 정보 상세 조회
		String businessregistrationnumber = user.getBusinessRegistrationNumber();
		BusinessInput bizInfo = this.bizService.selectBusinessDetail(businessregistrationnumber);
		
		if(bizInfo == null) {
			throw new BizException("회원사 정보가 없습니다.");
		}
		
		model.addAttribute("bizInfo", bizInfo); // 회원사 상세 정보		
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("online/business/updateBusiness");
		return modelAndView;
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
		int resultCnt = this.bizService.selectIIdDupCount(businessInput);		
		return resultCnt;
	}
	
	/**
	 * email 중복 체크
	 * @param businessInput
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/isEmailDup", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int isEmailDup(@ModelAttribute BusinessInput businessInput, Model model, Principal principal) {		
		int resultCnt = this.bizService.selectEmailDupCount(businessInput);		
		return resultCnt;
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
		businessInput.setAuditId(businessInput.getLoginId());
		
		/********************************************************************
		 * Step1. 사업장 정보 등록 (Business)
		 ********************************************************************/
		//Step1-1. 사업자 등록 번호 중복 여부 체크
		Business businessInfo = this.bizService.selectBusiness(businessInput);
		
		if (businessInfo == null) {
			//Step1-2. 사업자 주소 ID 조회
			String addressId = this.bizService.selectAddressId(businessInput);
			
			//Step1-3. 사업자 주소 정보 저장(address)
			if(addressId != null && !"".equals(addressId)) {
				businessInput.setBusinessAddressId(addressId);				
				resultCnt  = this.bizService.insertAddress(businessInput);			
				//Step1-4. 사업장 정보 저장(Business)			
				resultCnt = this.bizService.insertBusiness(businessInput);
			}else {				
				errMsg = "주소 등록에 실패 했습니다.";
			}
		}else {
			errMsg = "이미 등록된 사업자 등록 번호 입니다.";			
		}				
		/********************************************************************
		 * Step2. 제공자 등록 (provider)
		 ********************************************************************/
		if (resultCnt == 0) {
			throw new BizException(errMsg);
		}else {			
			//provider name을 회사명과 동일하게 간다
			businessInput.setProviderName(businessInput.getBusinessName());
			resultCnt = this.bizService.insertProvider(businessInput);		
		}
		
		/********************************************************************
		 * Step3. 관리자 사원정보 등록
		 ********************************************************************/
		if(resultCnt == 0) {			
			errMsg = "사업자 등록에 실패 했습니다.(provider)";					
			throw new Exception(errMsg);
		}else {			
			//Step3-1. ID 중복 체크
			int newAdminUser = this.bizService.selectIIdDupCount(businessInput);
			if(newAdminUser > 0 ) {			
				errMsg = "이미 존재하는 ID 입니다.";	
				throw new BizException(errMsg);
			}else {				
				//Step3-2. 사원 정보 등록
				businessInput.setProviderName(businessInput.getBusinessName());
				businessInput.setAdminYn("Y");
				resultCnt = this.bizService.insertEmployee(businessInput);
			}
		}
		
		/********************************************************************
		 * Step4. Login에 관리자 등록
		 ********************************************************************/
		if(resultCnt == 0) {			
			errMsg = "사원 등록에 실패 했습니다.";					
			throw new BizException(errMsg);
		}else {
			//비밀번호
			String password = passwordEncoder.encode(businessInput.getPassWord());
			businessInput.setPassWord(password);
			//Master 등록은 승인을 받도록 하기 위해 상태를 불가 상태로 등록 한다.
			businessInput.setIsAccountNonExpired("0");
			businessInput.setIsAccountNonLocked("0");
			businessInput.setIsCredentialsNonExpired("0");
			businessInput.setIsEnabled("0");
			resultCnt = this.bizService.insertLogin(businessInput);		
		}
		
		/********************************************************************
		 * Step5. 회사 정보에 관리자 ID update
		 ********************************************************************/
		if(resultCnt == 0) {			
			errMsg = "사원 등록에 실패 했습니다.";					
			throw new BizException(errMsg);
		}else {
			//관리자ID setting
			businessInput.setManagerId(businessInput.getLoginId());
			resultCnt = this.bizService.updateBusiness(businessInput);		
		}
		
		/********************************************************************				
		 * Step6. 처리 결과 setting
		 ********************************************************************/		
		if (errMsg != null && !"".equals(errMsg)) {			
			//등록 건수가 없을 경우 에러 처리
			resultBiz.setErrMsg(errMsg);			
		}else {
			resultBiz = businessInput;
		}
		
		/********************************************************************
		 * Step7. 회원사 신규 등록 후 담당자에게 알림 Email 발송
		 ********************************************************************/		
		/*try {
			this.commonController.sendEmail("feelfor@nate.com", "CreateBusinessAlert", resultBiz, false);				
		} catch (Exception e) {
			throw new BizException("회원사 신규가입 알림에 실패 하였습니다.");
		}*/
		
		return resultBiz;
	}	

	/**
	 *  임시비밀번호 생성
	 * @param businessInput
	 * @param model
	 * @param principal
	 * @return
	 */	
	@RequestMapping(value = "/tempPasswordProc", method = RequestMethod.POST)
	public BusinessInput tempPasswordProc(@ModelAttribute BusinessInput businessInput ,Model model,Principal principal) throws Exception{
		BusinessInput resultBiz = new BusinessInput();
		int resultCnt = 0;
		String errMsg = "";

		businessInput.setAuditId(businessInput.getLoginId());
		/***********************************************************
		 * Step1. 등록된 email과 동일 한지 확인
		 ***********************************************************/	
		BusinessInput employeeInfo = this.bizService.selectEmployeeDetail(businessInput.getLoginId());
		if (employeeInfo == null) {
			errMsg = "등록된 ID가 없습니다.";					
			throw new BizException(errMsg);			
		}else if(!employeeInfo.getEmail().equals(businessInput.getEmail())){
			errMsg = "등록된 E-mail과 일지하지 않습니다.";					
			throw new BizException(errMsg);
		}
	
		/***********************************************************
		 * Step2. Login에 수정
		 ***********************************************************/
		//임시 비밀번호 생성 비밀번호
		String uuid = UUID.randomUUID().toString().replaceAll("-", ""); // -를 제거해 주었다. 
        uuid = uuid.substring(0, 10); //uuid를 앞에서부터 10자리 잘라줌. 
        
        //생성된 임시 비밀 번호 update
		String password = passwordEncoder.encode(uuid);
		businessInput.setNewPassWord(password);
		resultCnt = this.bizService.updateLoginPassword(businessInput);
		
		//임시비밀번호 return value 설정
		businessInput.setPassWord(uuid);
		//결과 setting		
		if(resultCnt == 0) {			
			errMsg = "비밀번호 변경에 실패 했습니다.";					
			throw new BizException(errMsg);
		}else {
			//TODO 생성된 비밀번호 e-mail 발송
			resultBiz = businessInput;
			try {
				this.commonController.sendEmail(resultBiz.getEmail(), "TemporaryPassword", resultBiz, false);				
			} catch (Exception e) {
				throw new BizException("임시 비밀번호 생성에 실패 하였습니다.");
			}
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
	@RequestMapping(value = "/changePasswordProc", method = RequestMethod.POST)
	public BusinessInput changePasswordProc(@ModelAttribute BusinessInput businessInput ,Model model,Principal principal) throws Exception{
		BusinessInput resultBiz = new BusinessInput();
		int resultCnt = 0;
		String errMsg = "";
		
		User user = userService.readUser(principal.getName());
		businessInput.setLoginId(user.getUserName());
		businessInput.setAuditId(user.getUserName());
		
		/***********************************************************
		 * Step0. 비밀번호 확인
		 ***********************************************************/
		//비밀번호
		String passWord = businessInput.getPassWord();
			
		User employeeInfo = this.userService.readUser(businessInput.getLoginId());
		if(!passwordEncoder.matches(passWord, employeeInfo.getPassword() )){
			errMsg = "비밀번호가 일지하지 않습니다.";					
			throw new BizException(errMsg);
		}else {				
			businessInput.setPassWord("");
		}
		
		/***********************************************************
		 * Step1. 비밀번호 변경
		 ***********************************************************/
		//새 비밀번호 encode
		String newPassWord = passwordEncoder.encode(businessInput.getNewPassWord());		
		businessInput.setAuditId(user.getUserName());
		businessInput.setNewPassWord(newPassWord);
		resultCnt = this.bizService.updateLoginPassword(businessInput);
		//결과 setting		
		if(resultCnt == 0) {			
			errMsg = "비밀번호 변경에 실패 했습니다.";					
			throw new BizException(errMsg);
		}else {
			//TODO 생성된 비밀번호 e-mail 발송
			resultBiz = businessInput;
			try {
				//this.commonController.sendEmail(resultBiz.getEmail(), "TemporaryPassword", resultBiz);				
			} catch (Exception e) {
				throw new BizException("비밀번호 변경에 실패 했습니다.");
			}
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
		
		/***********************************************************
		 * Step0. 비밀번호 확인
		 ***********************************************************/
//		//비밀번호
//		String password = businessInput.getPassWord();
//			
//		User employeeInfo = this.userService.readUser(businessInput.getLoginId());
//		if(!passwordEncoder.matches(password, employeeInfo.getPassword() )){
//			errMsg = "비밀번호가 일지하지 않습니다.";					
//			throw new BizException(errMsg);
//		}
//		
//		//현재 등록되는 loginID 로 적용 
//		businessInput.setAuditId(businessInput.getLoginId());
//		businessInput.setProviderNumber(employeeInfo.getProviderNumber());
		
		
		
		//사용자 정보
		User user = userService.readUser(principal.getName());
		
		//현재 등록되는 loginID 로 적용 
		businessInput.setAuditId(user.getUserName());
		businessInput.setProviderNumber(user.getProviderNumber());
		
		/***********************************************************
		 * Step1. 사업장 정보 수정 (Business)
		 ***********************************************************/
		//Step1-1주소가 변경 되었을 경우 주소 신규 생성 하고 주소를 update 한다.		
		BusinessInput bizInfo = this.bizService.selectBusinessDetail(businessInput.getBusinessRegistrationNumber());
		if (bizInfo != null) {			
			if (bizInfo.getZipCode() == null || !bizInfo.getZipCode().equals(businessInput.getZipCode())) {
				//Step1-2. 사업자 주소 ID 조회
				String addressId = this.bizService.selectAddressId(businessInput);
				
				//Step1-3. 사업자 주소 정보 저장(address)
				if(addressId != null && !"".equals(addressId)) {
					businessInput.setBusinessAddressId(addressId);				
					resultCnt  = this.bizService.insertAddress(businessInput);			
				}else {				
					errMsg = "주소 등록에 실패 했습니다.";
					throw new BizException(errMsg);
				}
			}else {			
				businessInput.setBusinessAddressId(bizInfo.getAddressId());				
			}
		}else {
			errMsg = "수정할 사업장 정보가 존재하지 않습니다.";					
			throw new BizException(errMsg);
		}
 
		//회사정보 수정
		resultCnt = this.bizService.updateBusiness(businessInput);
		
		/***********************************************************
		 * Step2. 제공자 수정 (provider)
		 ***********************************************************/		
		if(resultCnt == 0) {			
			errMsg = "회원사 수정에 실패 했습니다.";					
			throw new BizException(errMsg);
		}else {
			businessInput.setProviderName(businessInput.getBusinessName());
			resultCnt = this.bizService.updateProvider(businessInput);		
		}		
		
		/***********************************************************
		 * Step3. 회원사 주소 정보 수정
		 ***********************************************************/
		if(resultCnt == 0) {			
			errMsg = "회원사 수정에 실패 했습니다.";					
			throw new BizException(errMsg);
		}else {			
			businessInput.setAddressId(businessInput.getBusinessAddressId());
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
	 *  내정보 수정 화면 호출
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/updateMyInfo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewUpdateMyInfo(Model model, Principal principal) {
		log.info("===================updateMyInfo=====================");
		//사용자 정보
		User user = userService.readUser(principal.getName());
		String loginId = user.getUsername();
		//내 정보 조회
		BusinessInput bizInfo = this.bizService.selectEmployeeDetail(loginId);
		
		if(bizInfo == null) {
			throw new BizException("내 정보가 없습니다.");
		}
		
		model.addAttribute("bizInfo", bizInfo); // 회원사 상세 정보		
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("online/business/updateMyInfo");
		return modelAndView;
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
		businessInput.setAuditId(user.getUsername());	
		businessInput.setProviderNumber(user.getProviderNumber());
		
		/***********************************************************
		 * Step1. 비밀번호 확인 - 관리자 수정일 경우는 비밀번호 체크 하지 않는다.
		 ***********************************************************/
		if ("".equals(businessInput.getAdminViewYn()) ||"N".equals(businessInput.getAdminViewYn())) {			
			User employeeInfo = this.userService.readUser(businessInput.getLoginId());
			String password = businessInput.getPassWord();
			if(!passwordEncoder.matches(password, employeeInfo.getPassword() )){
				errMsg = "비밀번호가 일지하지 않습니다.";					
				throw new BizException(errMsg);
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
			throw new BizException(errMsg);
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
	 *  사원관리 화면 호출 (admin)
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/employeeList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewEmployeeList(Model model, Principal principal) {
		log.info("===================viewEmployeeList=====================");
		//사용자 정보
		User user = userService.readUser(principal.getName());
		String loginId = user.getUsername();

/*		Employee employee = new Employee();
		employee.setProviderNumber(user.getProviderNumber());
		
		//사원 목록 조회 
		List<Employee> empList = this.bizService.selectEmployee(employee);

		
		model.addAttribute("empList", empList); //사원 목록 조회		
				
		*/
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("online/business/updateEmployee");
		return modelAndView;
	}
	
		
	/**
	 * 사원 목록 조회
	 * @param employee
	 * @param model
	 * @param principal
	 * @return
	 */	
	@RequestMapping(value = "/getEmployeeList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public Map<String, Object> getEmployeeList(@ModelAttribute Employee employee,Model model,Principal principal) {
		log.info("===================getInvoicePaymentList=====================");
		/*ID mapping*/
		User user = userService.readUser(principal.getName());
		employee.setProviderNumber(user.getProviderNumber());
		
		Map<String, Object> map = new HashMap<String, Object>();
		Criteria cri = employee;
		
				
		//사원 목록 조회		 
		List<Employee> empList = this.bizService.selectEmployeeList(employee);
		//총건수
		int empListCnt = this.bizService.selectEmployeeListTotalCnt(employee);
		
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(empListCnt);
		
		log.info("getTotalCount=>" + pageMaker.getTotalCount());

		map.put("empList", empList); // 리스트fetch
		map.put("pageMaker", pageMaker); 
		return map;
	 }	

		
	@RequestMapping(value = "/getEmployeeDetail/{loginId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public Map getEmployeeDetail(@PathVariable(value = "loginId") String loginId, Model model, Principal principal) {
		log.info("===================getEmployeeDetail=====================");
		Map map = new HashMap();
		//사원 정보 조회		
		BusinessInput empInfo = this.bizService.selectEmployeeDetail(loginId);
		map.put("empInfo", empInfo);
		return map;
	}
	
	
	/**
	 *  사원 정보 저장 (관리자, login)
	 * @param businessInput
	 * @param model
	 * @param principal
	 * @return
	 */
	
	@RequestMapping(value = "/insertEmployeeProc", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public BusinessInput insertEmployeeProc(@ModelAttribute BusinessInput businessInput ,Model model,Principal principal) throws Exception{
		BusinessInput resultBiz = new BusinessInput();
		int resultCnt = 0;
		String errMsg = "";
		User user = userService.readUser(principal.getName());

		//현재 등록되는 loginID 로 적용 
		businessInput.setAuditId(user.getUsername());	
		
		/***********************************************************
		 * Step1. 사원정보 등록
		 ***********************************************************/		
		//Step1-1. ID 중복 체크
		User newAdminUser = this.userService.readUser(businessInput.getLoginId());
		if(newAdminUser != null) {			
			errMsg = "이미 존재하는 ID 입니다.";	
			RuntimeException e = new  RuntimeException(errMsg);
			throw new BizException(errMsg);
		}else {
			businessInput.setProviderNumber(user.getProviderNumber());			
			resultCnt = this.bizService.insertEmployee(businessInput);
		}
		
		/***********************************************************
		 * Step3. Login에 관리자 등록
		 ***********************************************************/
		if(resultCnt == 0) {			
			errMsg = "사원 등록에 실패 했습니다.";					
			throw new BizException(errMsg);
		}else {
			//비밀번호
			//String password = passwordEncoder.encode(businessInput.getPassWord()); //임시비번 생성 후 email 발송
			//businessInput.setPassWord(password);
			businessInput.setIsAccountNonExpired("1");
			businessInput.setIsAccountNonLocked("1");
			businessInput.setIsCredentialsNonExpired("1");
			resultCnt = this.bizService.insertLogin(businessInput);		
		}
		
		//결과 setting		
		if (errMsg != null && !"".equals(errMsg)) {			
			//등록 건수가 없을 경우 에러 처리
			resultBiz.setErrMsg(errMsg);			
		}else {
			resultBiz = businessInput;
			
			//임시비밀번호 생성 후  email 발송
			this.tempPasswordProc(businessInput, model, principal);
		}
		
		return resultBiz;
	}
		
	
	
	//여기까지 적용
	
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
        request.getSession(true).setAttribute("manageryn", user.getManagerYn());
        request.getSession(true).setAttribute("adminyn", user.getAdminYn());
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
		String businessregistrationnumber = user.getBusinessRegistrationNumber();
		BusinessInput bizInfo = this.bizService.selectBusinessDetail(businessregistrationnumber);
		
		//사원 목록 조회		
		Employee empInput = new Employee();
		empInput.setProviderNumber(user.getProviderNumber());
		empInput.setExpiredSearchFlag(true);
		List<Employee> empList = this.bizService.selectEmployeeList(empInput);
			
		
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
		Employee empInput = new Employee();
		empInput.setProviderNumber(user.getProviderNumber());
		empInput.setExpiredSearchFlag(false);
		List<Employee> empList = this.bizService.selectEmployeeList(empInput);		
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
	@RequestMapping(value = "/empPassResetDialog", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public ModelAndView viewEmpPassReset(Model model) {
		log.info("===================addBusinessDialog=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/empPassResetPopup");
		return modelAndView;
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
		BusinessInput bizInfo = this.bizService.selectEmployeeDetail(loginId);		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/manager/employeeManager");
		modelAndView.addObject("bizInfo", bizInfo);
		return modelAndView;
	}

}
