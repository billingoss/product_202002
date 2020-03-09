package com.api.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.security.Principal;
import java.util.List;

import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.api.BizException;
import com.api.model.User;
import com.api.model.biz.BusinessInput;
import com.api.model.report.Report;
import com.api.service.ReportService;
import com.api.service.UserService;
import com.api.service.logic.MailContentBuilder;
import com.api.util.StringUtil;

@Controller
public class CommonController {
	
	private Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private JavaMailSender sender;
	
	@Autowired 
	UserService userService;
		
	@Autowired 
	ReportService reportService;
	
	@Autowired
	private MailContentBuilder mcb;
/*	InvoiceDetailInput idi;
	
	@Autowired UserService userService;*/
	
	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();;

	
	/**
	 * Login path 접근
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = {"/login" , "/"}, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView login(HttpServletRequest request, HttpServletResponse response, Model model,final HttpSession session)  throws IOException, ServletException {
		log.info("===================login=====================");
		//session.setAttribute(UserConfig, value);
	    //session.setAttribute(UserConfig.SESS_USER_ID, '1');
	    //session.setAttribute(UserConfig.SESS_USER_NAME, '2');
	    // expired in 10 minutes
	    //session.setMaxInactiveInterval(60 * 10);
		
		ModelAndView modelAndView = new ModelAndView();
		
		//빌레터
		if (request.getServerPort() == 8888) {
			redirectStrategy.sendRedirect(request, response, "/billletter/doctornoah");
			return modelAndView;
		//어드민
		} else {
			modelAndView.setViewName("login");

			String errorCode = request.getParameter("error");
			String errorMsg = "";
			if ("NOTFOUNDUSER".equals(errorCode)) {
				errorMsg = "사용자를 찾을수 없습니다.";
			}else if ("DISABLED".equals(errorCode)) {
				errorMsg = "중지된 계정입니다.";			
			}else if ("LOCKED".equals(errorCode)) {
				errorMsg = "계정이 잠겼습니다.";						
			}else if ("BADCREDENTIALS".equals(errorCode)) {
				errorMsg = "아이디 또는 비밀번호를 다시 확인하세요.";									
			}else {
				errorMsg = "";												
			}
			
			model.addAttribute("errorMsg", errorMsg);
			return modelAndView;
		}
	 }
	
	/**
	 * Login path 접근
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/main", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView main(Model model,final HttpSession session, Principal principal) {
		log.info("===================login=====================");
		//session.setAttribute(UserConfig, value);
		//session.setAttribute(UserConfig.SESS_USER_ID, '1');
		//session.setAttribute(UserConfig.SESS_USER_NAME, '2');
		// expired in 10 minutes
		//session.setMaxInactiveInterval(60 * 10);	
		
		User user = userService.readUser(principal.getName());	//loginid
		//session.setAttribute("loginName", user.getUserName());
		session.setAttribute("loginName", user.getName());
		session.setAttribute("loginId", user.getUserName());
		session.setAttribute("businessName", user.getBusinessName());
		session.setAttribute("adminYn", user.getAdminYn());
		
		Report report = new Report();
		report.setProviderNumber(user.getProviderNumber());
		
		//배송일정
		List<Report> deliveryList = reportService.getDeliveryList(report);
		model.addAttribute("deliveryList",deliveryList);

		//전체고객건수 등..
		Report contractCount = reportService.getContractCount(report);
		model.addAttribute("contractCount",contractCount);

		//월별매출액
		List<Report> monthlyAmount = reportService.getMonthlyAmount(report);
		model.addAttribute("monthlyAmount",monthlyAmount);

		//30일판매TOP5
		List<Report> productList = reportService.getProductList(report);
		model.addAttribute("productList",productList);
        
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("main");
		return modelAndView;
	}
	
	 @RequestMapping(value = "/loadinggif", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewloading() {		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("loading");
		return modelAndView;
	 }
	
	
/*	 @RequestMapping(value ="/sendmail", method = RequestMethod.GET)
		@ResponseBody
	String getEmailSendinfo(@RequestParam("sendEmailAddress") String sendEmailAddress ,Principal principal) { //sendEmailAddress
	System.out.println("====================getEmailSendinfo======================");
	//idi = new InvoiceDetailInput(invoicenumber, invoicedate, connumber);
	ID mapping
	User user = userService.readUser(principal.getName());
	//idi.setProvidernumber(user.getProvidernumber());
	//idi.setUsername(user.getUsername());
	ID mapping
	try {
		sendEmail(sendEmailAddress);
		return "Email Sent!";
	} catch (Exception ex) {
		throw new BizException("Error in sending email: " + ex);
	//return "Error in sending email: " + ex;
		}
	}
	*/

	public void sendEmail(String sendEmailAddress, String mailType, Object sendObject, boolean addAttachFlag) throws Exception {
		mailType = StringUtil.nullConvert(mailType);
		String txt = "";
		String attachmentFileName = "";
		String mailText = "";
		String mailSubject ="";
	
		if("TemporaryPassword".equals(mailType)) {
			if( sendObject instanceof BusinessInput) {
				BusinessInput businessInput = (BusinessInput)sendObject;
				txt = mcb.buildTemporaryPassword(businessInput);
				attachmentFileName = "비밀번호초기화.html";
				mailText = txt;				
				mailSubject ="고객님의 임시 비밀 번호 입니다.";
				
			}else {			
				throw new BizException("이메일 발송을 실패 하였습니다.");
			}			
		}else {
			throw new BizException("이메일 발송을 실패 하였습니다.");			
		}
		
		
		/*BufferedWriter output = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filetmp.getPath()), "UTF-8"));
		output.write(txt);
		output.close();*/
		
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		helper.setTo(sendEmailAddress);
		//helper.setText(mailText);		
		helper.setText(mailText, true);		
		helper.setSubject(mailSubject);		
		
		if (addAttachFlag) {
			File filetmp = File.createTempFile("tmp", "html");		
			PrintWriter printWriter = new PrintWriter(filetmp);
			printWriter.println(txt);
			printWriter.close();
			helper.addAttachment(attachmentFileName, filetmp);
		}
		sender.send(message);
	}
	
	/**
	 * 개인정보처리방침
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/personalinformation", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView personalInformation(Model model,final HttpSession session, Principal principal) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("personalinformation");
		return modelAndView;
	}
	
	/**
	 * 이용약관
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/agreement", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView agreement(Model model,final HttpSession session, Principal principal) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("agreement");
		return modelAndView;
	}
	
}
