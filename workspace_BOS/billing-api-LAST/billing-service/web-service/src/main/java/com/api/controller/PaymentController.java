package com.api.controller;

import java.security.Principal;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
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

import com.api.billing.invoice.model.ContractInfoDetail;
import com.api.billing.invoice.model.IniPayInfo;
import com.api.billing.invoice.model.InvoiceCalculationInput;
import com.api.billing.invoice.model.PaymentHistoryInput;
import com.api.billing.login.model.User;
import com.api.billing.model.contract.ContractInsert;
import com.api.billing.model.contract.PaymentInformation;
import com.api.service.ContractService;
import com.api.service.InvoiceService;
import com.api.service.UserService;
import com.inicis.inipay4.INIpay;
import com.inicis.inipay4.util.INIdata;
import com.inicis.std.util.HttpUtil;
import com.inicis.std.util.ParseUtil;
import com.inicis.std.util.SignatureUtil;


/**
 * @author Administrator
 *
 */
@RestController
@RequestMapping(value = "payment")
@Transactional(rollbackFor=Exception.class)
public class PaymentController {
		
	private Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired 
	private UserService userService;
	
	@Autowired
	private BillingController billingController;
	
	@Autowired
	private ContractService contractService;

	@Autowired
	private InvoiceService invoiceservice;
	

	/** 
     * INIpay 환경 파일
     */
    //String inipayHome = "/home/parkcap/module/INIpay4JAVA";
	private String mid = "INIBillTst";		// 가맹점 ID(가맹점 수정후 고정)
	
	//Local Test
	private String inipayHome = "C:\\projects\\workspace\\billing-api\\billing-service\\web-service\\src\\main\\resources\\templates\\IniPay45";	 //local Test
	
	//Server
	//private String inipayHome = "/home/openbill/IniPay45";	 
	private String logMode = "INFO"; // 반드시 대문자로 INFO, DEBUG로 설정
	private String keyPW = "1111";
	private String signKey = "SU5JTElURV9UUklQTEVERVNfS0VZU1RS";	// 가맹점에 제공된 웹 표준 사인키(가맹점 수정후 고정)
	private String merchantkey = "b09LVzhuTGZVaEY1WmJoQnZzdXpRdz09";	//상점 대칭키
	
	/**
	 * 이니시스 결제 팝업 호출 후 취소 버튼 클릭
	 * @param model
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/iniPayClose", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	 public ModelAndView viewClose(Model model, HttpServletResponse response) {
		log.info("===================inicis-close=====================");		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("inipay/webClose");
		return modelAndView;
	 }
	
	/**
	 * 이니시스 웹 결제요청 결과
	 * @param model
	 * @param request
	 * @param response
	 * @param principal
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/iniPayReturn", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewReturn(Model model, HttpServletRequest request, HttpServletResponse response,Principal principal) throws Exception{
		log.info("===================inicis-return=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("inipay/webReturn");
		 /*ID mapping*/
		User user = userService.readUser(principal.getName());
		int providernumber = user.getProvidernumber();
		String userName = user.getUsername();
		
		Map<String, String> billKeyResult = this.onlineMakeBillKey(request, principal); 
		if (billKeyResult != null) {
			String billKey = billKeyResult.get("billKey");
			//BillKey 생성 성공
			if (billKey != null && !"".equals(billKey)){				
				int conNumber = Integer.parseInt(billKeyResult.get("conNumber"));
				String paymentMethodCode = billKeyResult.get("paymentMethodCode");
				String cardCode = billKeyResult.get("CARD_Code");
				String totPrice = billKeyResult.get("TotPrice");
								
				Map<String, String> paymentResult = new HashMap<String, String>();				
				ContractInsert idi = new ContractInsert();
				idi.setConNumber(conNumber);
				idi.setProvidernumber(providernumber);
				idi.setContractstate("ACTIVATION");
				idi.setUsername(userName);
				
				//최근 도래 하는 결제건 조회
				InvoiceCalculationInput invoice = this.invoiceservice.getInvoicenumberByOne(idi);
				
				//invoice 정보 설정
				PaymentHistoryInput paymenthistoryinput = new PaymentHistoryInput();							 
				paymenthistoryinput.setInvoicenumber(Integer.parseInt(invoice.getInvoicenumber()));
				paymenthistoryinput.setInvoicedate(invoice.getInvoicedate());
				paymenthistoryinput.setConnumber(conNumber);
				paymenthistoryinput.setPaymentamt(Integer.parseInt(totPrice));
				paymenthistoryinput.setPaymenttypecode("PAYMENT");
				paymenthistoryinput.setCardcorporationcode(cardCode);
				paymenthistoryinput.setProvidernumber(providernumber);							
				paymenthistoryinput.setChannelgubun("C");							 
				paymenthistoryinput.setPaymentmethodcode(paymentMethodCode);							 
				paymenthistoryinput.setUsername(userName);
				
				//카드일 경우 최초 1회에 대한 결제 요청을 한다.
				if("CARD".equals(paymentMethodCode)){
					//빌링결제
					
					//1회 결제 요청		카드 요청일 경우							
					//paymentResult = this.paymentProc(resultMap,  paymenthistoryinput, request, principal, model);
					IniPayInfo iniPayInfo = new IniPayInfo();
					iniPayInfo.setConnumber(conNumber);
					iniPayInfo.setProvidernumber(invoice.getProvidernumber());
					iniPayInfo.setInvoicenumber(Integer.parseInt(invoice.getInvoicenumber()));
					try {						
						paymentResult = this.payProc(iniPayInfo, "ONLINE", principal);
					} catch (Exception e) {
						model.addAttribute("resultCode", "BILL_001");
						model.addAttribute("resultMsg", "결제요청실패!");
					}					
					model.addAttribute("resultCode", paymentResult.get("resultCode"));
					model.addAttribute("resultMsg", paymentResult.get("resultMsg"));
				}else if ("HPP".equalsIgnoreCase(paymentMethodCode)) {
					//핸드폰일 경우 1회 자동 결제 요청 된다.
					model.addAttribute("resultCode", "00");
					model.addAttribute("resultMsg", "핸드폰 빌링요청 성공");
					
					// DB 처리 
					// paymenthistoryinput.setCardapprovenumber(authCode);
					// paymenthistoryinput.setTid(tid);
					try {
						int resultCnt = billingController.savePaymentInfo(paymenthistoryinput);
						model.addAttribute("resultCode", billKeyResult.get("resultCode"));
						model.addAttribute("resultMsg", billKeyResult.get("resultMsg"));						
					} catch (Exception e) {
						// TODO: handle exception						
						PaymentHistoryInput paymentHistoryInput = new PaymentHistoryInput();
						paymentHistoryInput.setInvoicenumber(Integer.parseInt(paymentResult.get("InvoiceNumber")));
						paymentHistoryInput.setCardapprovenumber(paymentResult.get("authCode"));
						paymentHistoryInput.setTid(paymentResult.get("tid"));
						paymentHistoryInput.setUsername(userName);
						
						String errorMsg = "결제내역 저장 실패";
						paymentHistoryInput.setCancelMsg(errorMsg);
						Map<String, Object> resultMap = this.payCancleProc(paymentHistoryInput);		
						model.addAttribute("resultCode", "BILL_001");
						model.addAttribute("resultMsg", "결제요청실패!");
					}
				}
				model.addAttribute("paymentResult", paymentResult);
			}
		}

		return modelAndView;
	}
	
	/**
	 * Online BillKey 생성
	 * @param request
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/onlineMakeBillKey", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public  Map<String, String> onlineMakeBillKey(HttpServletRequest request, Principal principal) {
		//return object
		Map<String, String> resultMakeBillKey = new HashMap<String, String>();
		
		 /*ID mapping*/
		User user = userService.readUser(principal.getName());
		int providernumber = user.getProvidernumber();
		String userName = user.getUsername();
		try{

			/**********************************
			 인증결과 파라미터 일괄 수신
			**********************************/
			request.setCharacterEncoding("UTF-8");
			Map<String,String> paramMap = new Hashtable<String,String>();
			Enumeration elems = request.getParameterNames();
			
			String temp = ""; //인증결과 파라미터  임시저장
			while(elems.hasMoreElements()){
				temp = (String) elems.nextElement();
				paramMap.put(temp, request.getParameter(temp));
			}			
			System.out.println("paramMap : "+ paramMap.toString());
			
			/**********************************
			 인증이 성공일 경우만
			**********************************/
			if("0000".equals(paramMap.get("resultCode"))){

				log.info("####인증성공/승인요청####");
				
				/************************************************
				* 1.전문 필드 값 설정(***가맹점 개발수정***)
				************************************************/				
				String mid 		= paramMap.get("mid");						// 가맹점 ID 수신 받은 데이터로 설정
				String signKey	= "SU5JTElURV9UUklQTEVERVNfS0VZU1RS";		// 가맹점에 제공된 키(이니라이트키) (가맹점 수정후 고정) !!!절대!! 전문 데이터로 설정금지
				String timestamp= SignatureUtil.getTimestamp();				// util에 의해서 자동생성
				String charset 	= "UTF-8";								    // 리턴형식[UTF-8,EUC-KR](가맹점 수정후 고정)
				String format 	= "JSON";								    // 리턴형식[XML,JSON,NVP](가맹점 수정후 고정)
				String authToken= paramMap.get("authToken");			    // 취소 요청 tid에 따라서 유동적(가맹점 수정후 고정)
				String authUrl	= paramMap.get("authUrl");				    // 승인요청 API url(수신 받은 값으로 설정, 임의 세팅 금지)
				String netCancel= paramMap.get("netCancelUrl");			 	// 망취소 API url(수신 받은 값으로 설정, 임의 세팅 금지)
				String ackUrl 	= paramMap.get("checkAckUrl");			    // 가맹점 내부 로직 처리후 최종 확인 API URL(수신 받은 값으로 설정, 임의 세팅 금지)		
				String merchantData = paramMap.get("merchantData");			// 가맹점 관리데이터 수신
				
				/************************************************
				* 2.signature 생성
				************************************************/
				Map<String, String> signParam = new HashMap<String, String>();
				signParam.put("authToken",	authToken);		// 필수
				signParam.put("timestamp",	timestamp);		// 필수

				// signature 데이터 생성 (모듈에서 자동으로 signParam을 알파벳 순으로 정렬후 NVP 방식으로 나열해 hash)
				String signature = SignatureUtil.makeSignature(signParam);

	      		String price = "";  // 가맹점에서 최종 결제 가격 표기 (필수입력아님)
	      		
			    // 1. 가맹점에서 승인시 주문번호가 변경될 경우 (선택입력) 하위 연결.  
			    // String oid = "";             
	      
	      		/************************************************
				* 3.API 요청 전문 생성
				************************************************/
				Map<String, String> authMap = new Hashtable<String, String>();
				authMap.put("mid"			    ,mid);			  // 필수
				authMap.put("authToken"		,authToken);	// 필수
				authMap.put("signature"		,signature);	// 필수
				authMap.put("timestamp"		,timestamp);	// 필수
				authMap.put("charset"		  ,charset);		// default=UTF-8
				authMap.put("format"		  ,format);		  // default=XML
	      		//authMap.put("price" 		,price);		    // 가격위변조체크기능 (선택사용)
	      
				System.out.println("##승인요청 API 요청##");

				HttpUtil httpUtil = new HttpUtil();

				try{
					/************************************************
					* 4.API 통신 시작
					************************************************/

					String authResultString = "";

					authResultString = httpUtil.processHTTP(authMap, authUrl);
					
					/************************************************
					* 5.API 통신결과 처리(***가맹점 개발수정***)
					/************************************************/
					log.info("## 승인 API 결과 ##");					
					String mapParsing = authResultString.replace(",", "&").replace(":", "=").replace("\"", "").replace(" ","").replace("\n", "").replace("}", "").replace("{", "");
					//out.println("<pre>"+authResultString.replaceAll("<", "&lt;").replaceAll(">", "&gt;")+"</pre>");
					
					Map<String, String> resultMap = new HashMap<String, String>();					
					resultMap = ParseUtil.parseStringToMap(mapParsing); //문자열을 MAP형식으로 파싱
									
					log.info("resultMap == " + resultMap);
					
					/*************************  결제보안 강화 2016-05-18 START ****************************/ 
					Map<String , String> secureMap = new HashMap<String, String>();
					secureMap.put("mid"			, mid);								//mid
					secureMap.put("tstamp"		, timestamp);						//timestemp
					secureMap.put("MOID"		, resultMap.get("MOID"));			//MOID
					secureMap.put("TotPrice"	, resultMap.get("TotPrice"));		//TotPrice
					
					// signature 데이터 생성 
					String secureSignature = SignatureUtil.makeSignatureAuth(secureMap);
					/*************************  결제보안 강화 2016-05-18 END ****************************/
					
					//결과정보
					resultMakeBillKey.put("resultCode", resultMap.get("resultCode"));
					resultMakeBillKey.put("resultMsg", resultMap.get("resultMsg"));

					if("0000".equals(resultMap.get("resultCode")) && secureSignature.equals(resultMap.get("authSignature")) ){	//결제보안 강화 2016-05-18
					   /**************************************************************************************************
				       * 여기에 가맹점 내부 DB에 결제 결과를 반영하는 관련 프로그램 코드를 구현한다.  					   
						 [중요!] 승인내용에 이상이 없음을 확인한 뒤 가맹점 DB에 해당건이 정상처리 되었음을 반영함
								  처리중 에러 발생시 망취소를 한다.
				       ***************************************************************************************************/	
						//TODO
						 ContractInsert idi = new ContractInsert();							 
						 int conNumber = Integer.parseInt(resultMap.get("MOID").replaceAll(mid+"_", ""));;
						 idi.setConNumber(conNumber);
						 idi.setProvidernumber(providernumber);
						 idi.setContractstate("ACTIVATION");
						 idi.setUsername(userName);
						 
						 //계약번호 반환
						 resultMakeBillKey.put("conNumber", Integer.toString(conNumber));
						 
						 ContractInfoDetail contInfo = this.invoiceservice.getContractInfoDetail(conNumber);/*계약정보 상세 조회*/
						
						String billKey = "";
						String paymentMethodCode = "";
						if("Bill".equals(resultMap.get("payMethod"))){//빌링결제
							billKey = resultMap.get("CARD_BillKey");	//빌링키
							paymentMethodCode = "CARD";
						}else if("Auth".equals(resultMap.get("payMethod"))){//빌링결제
							if ("BILL_CARD".equalsIgnoreCase(resultMap.get("payMethodDetail"))) {
								billKey = resultMap.get("CARD_BillKey");	//빌링키
								paymentMethodCode = "CARD";								
							} else  if ("BILL_HPP".equalsIgnoreCase(resultMap.get("payMethodDetail"))) {
								billKey = resultMap.get("HPP_BillKey");	//빌링키
								paymentMethodCode = "HPP";
							}
						}									
						//계약번호 반환
						resultMakeBillKey.put("TotPrice", resultMap.get("TotPrice"));
						resultMakeBillKey.put("CARD_Code", resultMap.get("CARD_Code"));
						resultMakeBillKey.put("paymentMethodCode", paymentMethodCode);
						
						//모든 유형에서 생성된 bill key 설정	
						resultMap.put("billKey", billKey);
						
						//return 값 설정
						resultMakeBillKey.put("billKey", billKey);
						
						 //paymentinfo billkey  수정
						 PaymentInformation payment = new PaymentInformation ();
						 payment.setPaymentInformationNumber(contInfo.getPaymentinformationnumber());
						 payment.setPaymentMethod(paymentMethodCode);
						 payment.setCardcorporationcode(resultMap.get("CARD_Code"));
						 payment.setBillKey(billKey);						 
						 payment.setUsername(userName);
						 
						 int i = this.invoiceservice.updatePaymentinformation(payment);							 				
												 							  
					} else {
						//결제보안키가 다른 경우
						if (!secureSignature.equals(resultMap.get("authSignature")) && "0000".equals(resultMap.get("resultCode"))) {						
							//망취소
							if ("0000".equals(resultMap.get("resultCode"))) {
								throw new Exception("데이터 위변조 체크 실패");
							}
						}
					}
						
					//공통 부분만
					/*model.addAttribute("tid", resultMap.get("tid"));	//거래 번호
					model.addAttribute("payMethod", resultMap.get("payMethod"));	//결제방법(지불수단)
					model.addAttribute("TotPrice", resultMap.get("TotPrice"));	//결제완료금액
					model.addAttribute("MOID", resultMap.get("MOID"));	//주문 번호
					model.addAttribute("applDate", resultMap.get("applDate"));	//승인날짜
					model.addAttribute("applTime", resultMap.get("applTime"));	//승인시간
					
					if("VBank".equals(resultMap.get("payMethod"))){ //가상계좌						
						model.addAttribute("VACT_Num", resultMap.get("VACT_Num"));	//입금 계좌번호
						model.addAttribute("VACT_BankCode", resultMap.get("VACT_BankCode"));	//입금 은행코드
						model.addAttribute("vactBankName", resultMap.get("vactBankName"));	//입금 은행명
						model.addAttribute("VACT_Name", resultMap.get("VACT_Name"));	//예금주 명
						model.addAttribute("VACT_InputName", resultMap.get("VACT_InputName"));	//송금자 명
						model.addAttribute("VACT_Date", resultMap.get("VACT_Date"));	//송금 일자						
						model.addAttribute("VACT_Time", resultMap.get("VACT_Time"));	//송금 시간
						
					}else if("DirectBank".equals(resultMap.get("payMethod"))){ //실시간계좌이체
						model.addAttribute("ACCT_BankCode", resultMap.get("ACCT_BankCode"));	//은행코드
						model.addAttribute("CSHR_ResultCode", resultMap.get("CSHR_ResultCode"));	//현금영수증 발급결과코드
						model.addAttribute("CSHR_Type", resultMap.get("CSHR_Type"));	//현금영수증 발급구분코드
						
					}else if("iDirectBank".equals(resultMap.get("payMethod"))){ //실시간계좌이체
						model.addAttribute("ACCT_BankCode", resultMap.get("ACCT_BankCode"));	//은행코드
						model.addAttribute("CSHRResultCode", resultMap.get("CSHRResultCode"));	//현금영수증 발급결과코드
						model.addAttribute("CSHR_Type", resultMap.get("CSHR_Type"));	//현금영수증 발급구분코드(0 - 소득공제용, 1 - 지출증빙용)
						 
					}else if("HPP".equals(resultMap.get("payMethod"))){ //휴대폰
						model.addAttribute("HPP_Corp", resultMap.get("HPP_Corp"));	//통신사
						model.addAttribute("payDevice", resultMap.get("payDevice"));	//결제장치						
						model.addAttribute("HPP_Num", resultMap.get("HPP_Num"));	//휴대폰번호
						
					}else if("DGCL".equals(resultMap.get("payMethod"))){//게임문화상품권
						String sum="0",sum2="0",sum3="0",sum4="0",sum5="0",sum6="0";						
						model.addAttribute("GAMG_ApplPrice", resultMap.get("GAMG_ApplPrice"));	//게임문화상품권승인금액
						model.addAttribute("GAMG_Cnt", resultMap.get("GAMG_Cnt"));	//사용한 카드수
						model.addAttribute("GAMG_Num1", resultMap.get("GAMG_Num1"));	//사용한 카드번호						
						model.addAttribute("GAMG_Price1", resultMap.get("GAMG_Price1"));	//카드잔액
						
						if(!"".equals(resultMap.get("GAMG_Num2"))){
							model.addAttribute("GAMG_Num2", resultMap.get("GAMG_Num2"));	//사용한 카드번호						
							model.addAttribute("GAMG_Price2", resultMap.get("GAMG_Price2"));	//카드잔액
							
						}
						if(!"".equals(resultMap.get("GAMG_Num3"))){
							model.addAttribute("GAMG_Num3", resultMap.get("GAMG_Num3"));	//사용한 카드번호						
							model.addAttribute("GAMG_Price3", resultMap.get("GAMG_Price3"));	//카드잔액
							
						}
						if(!"".equals(resultMap.get("GAMG_Num4"))){
							model.addAttribute("GAMG_Num4", resultMap.get("GAMG_Num4"));	//사용한 카드번호						
							model.addAttribute("GAMG_Price4", resultMap.get("GAMG_Price4"));	//카드잔액
							
						}
						if(!"".equals(resultMap.get("GAMG_Num5"))){
							model.addAttribute("GAMG_Num5", resultMap.get("GAMG_Num5"));	//사용한 카드번호						
							model.addAttribute("GAMG_Price5", resultMap.get("GAMG_Price5"));	//카드잔액							
						}
						if(!"".equals(resultMap.get("GAMG_Num6"))){
							model.addAttribute("GAMG_Num6", resultMap.get("GAMG_Num6"));	//사용한 카드번호						
							model.addAttribute("GAMG_Price6", resultMap.get("GAMG_Price6"));	//카드잔액
							
						}
						
					}else if("OCBPoint".equals(resultMap.get("payMethod"))){ //오케이 캐쉬백
						model.addAttribute("PayOption", resultMap.get("PayOption"));	//지불구분
						model.addAttribute("OCB_Num", resultMap.get("OCB_Num"));	//OCB 카드번호						
						model.addAttribute("OCB_SaveApplNum", resultMap.get("OCB_SaveApplNum"));	//적립 승인번호
						model.addAttribute("OCB_PayApplNum", resultMap.get("OCB_PayApplNum"));	//사용 승인번호
						model.addAttribute("OCB_PayPrice", resultMap.get("OCB_PayPrice"));	//OCB 지불 금액
						
					}else if("GSPT".equals(resultMap.get("payMethod"))){ //GSPoint										
						model.addAttribute("PayOption", resultMap.get("PayOption"));	//지불구분
						model.addAttribute("GSPT_ApplPrice", resultMap.get("GSPT_ApplPrice"));	//GS 포인트 승인금액			
						model.addAttribute("GSPT_SavePrice", resultMap.get("GSPT_SavePrice"));	//GS 포인트 적립금액
						model.addAttribute("GSPT_PayPrice", resultMap.get("GSPT_PayPrice"));	//GS 포인트 지불금액
						
					}else if("UPNT".equals(resultMap.get("payMethod"))){ //U-포인트						
						model.addAttribute("UPoint_Num", resultMap.get("UPoint_Num"));	//U포인트 카드번호
						model.addAttribute("UPoint_usablePoint", resultMap.get("UPoint_usablePoint"));	//가용포인트
						model.addAttribute("UPoint_ApplPrice", resultMap.get("UPoint_ApplPrice"));	//포인트지불금액
						
					}
					else if("KWPY".equals(resultMap.get("payMethod"))){ //뱅크월렛 카카오
						model.addAttribute("payMethod", resultMap.get("payMethod"));	//결제방법
						model.addAttribute("resultCode", resultMap.get("resultCode"));	//결과 코드						
						model.addAttribute("resultMsg", resultMap.get("resultMsg"));	//결과 내용
						model.addAttribute("tid", resultMap.get("tid"));	//거래 번호
						model.addAttribute("MOID", resultMap.get("MOID"));	//주문 번호
						model.addAttribute("price", resultMap.get("price"));	//결제완료금액
						model.addAttribute("applDate", resultMap.get("applDate"));	//사용일자						
						model.addAttribute("applTime", resultMap.get("applTime"));	//사용시간
						
					}else if("Culture".equals(resultMap.get("payMethod"))){//문화 상품권
						model.addAttribute("CULT_UserID", resultMap.get("CULT_UserID"));	//컬처랜드 아이디
						
					}else if("TEEN".equals(resultMap.get("payMethod"))){//틴캐시						
						model.addAttribute("TEEN_ApplNum", resultMap.get("TEEN_ApplNum"));	//틴캐시 승인번호
						model.addAttribute("TEEN_UserID", resultMap.get("TEEN_UserID"));	//틴캐시아이디
						model.addAttribute("TEEN_ApplPrice", resultMap.get("TEEN_ApplPrice"));	//틴캐시승인금액											
						
					}else if("Bookcash".equals(resultMap.get("payMethod"))){//도서문화상품권
						model.addAttribute("BCSH_ApplNum", resultMap.get("BCSH_ApplNum"));	//도서상품권 승인번호
						model.addAttribute("BCSH_UserID", resultMap.get("BCSH_UserID"));	//도서상품권 사용자ID
						model.addAttribute("BCSH_ApplPrice", resultMap.get("BCSH_ApplPrice"));	//도서상품권 승인금액
						
					}else if("PhoneBill".equals(resultMap.get("payMethod"))){//폰빌전화결제
						model.addAttribute("PHNB_Num", resultMap.get("PHNB_Num"));	//승인전화번호
						
					}else if("Bill".equals(resultMap.get("payMethod"))){//빌링결제
						model.addAttribute("CARD_BillKey", resultMap.get("CARD_BillKey"));	//빌링키
						
					}else if("Auth".equals(resultMap.get("payMethod"))){//빌링결제
						if ("BILL_CARD".equalsIgnoreCase(resultMap.get("payMethodDetail"))) {
							model.addAttribute("CARD_BillKey", resultMap.get("CARD_BillKey"));	//빌링키
							
						} else  if ("BILL_HPP".equalsIgnoreCase(resultMap.get("payMethodDetail"))) {
							model.addAttribute("HPP_BillKey", resultMap.get("HPP_BillKey"));	//빌링키
							model.addAttribute("HPP_Corp", resultMap.get("HPP_Corp"));	//통신사
							model.addAttribute("payDevice", resultMap.get("payDevice"));	//결제장치							
							model.addAttribute("HPP_Num", resultMap.get("HPP_Num"));	//휴대폰번호
							model.addAttribute("goodName", resultMap.get("goodName"));	//상품명

						} else {
							//
						}		
					}else if("HPMN".equals(resultMap.get("payMethod"))){//해피머니
						
					}else{//카드
						int  quota=Integer.parseInt(resultMap.get("CARD_Quota"));
						if(resultMap.get("EventCode")!=null){							
							model.addAttribute("EventCode", resultMap.get("EventCode"));	//이벤트 코드
							
						}
						
						model.addAttribute("CARD_Num", resultMap.get("CARD_Num"));	//카드번호
						model.addAttribute("applNum", resultMap.get("applNum"));	//승인번호
						model.addAttribute("CARD_Quota", resultMap.get("CARD_Quota"));	//할부기간
						model.addAttribute("CARD_Code", resultMap.get("CARD_Code"));	//카드 종류
						model.addAttribute("CARD_BankCode", resultMap.get("CARD_BankCode"));	//카드 발급사
						
						if(resultMap.get("OCB_Num")!=null && resultMap.get("OCB_Num") != ""){
							model.addAttribute("OCB_Num", resultMap.get("OCB_Num"));	//OK CASHBAG 카드번호
							model.addAttribute("OCB_SaveApplNum", resultMap.get("OCB_SaveApplNum"));	//OK CASHBAG 적립 승인번호
							model.addAttribute("OCB_PayPrice", resultMap.get("OCB_PayPrice"));	//OK CASHBAG 포인트지불금액
							
						}
						if(resultMap.get("GSPT_Num")!=null && resultMap.get("GSPT_Num") != ""){
							model.addAttribute("GSPT_Num", resultMap.get("GSPT_Num"));	//GS&Point 카드번호
							model.addAttribute("GSPT_Remains", resultMap.get("GSPT_Remains"));	//GS&Point 잔여한도
							model.addAttribute("GSPT_ApplPrice", resultMap.get("GSPT_ApplPrice"));	//GS&Point 승인금액
							
						}
						
						if(resultMap.get("UNPT_CardNum")!=null && resultMap.get("UNPT_CardNum") != ""){
							model.addAttribute("UNPT_CardNum", resultMap.get("UNPT_CardNum"));	//U-Point 카드번호
							model.addAttribute("UPNT_UsablePoint", resultMap.get("UPNT_UsablePoint"));	//U-Point 가용포인트
							model.addAttribute("UPNT_PayPrice", resultMap.get("UPNT_PayPrice"));	//U-Point 포인트지불금액
						}
				    }
				*/
					// 수신결과를 파싱후 resultCode가 "0000"이면 승인성공 이외 실패
					// 가맹점에서 스스로 파싱후 내부 DB 처리 후 화면에 결과 표시

					// payViewType을 popup으로 해서 결제를 하셨을 경우
					// 내부처리후 스크립트를 이용해 opener의 화면 전환처리를 하세요

					//throw new Exception("강제 Exception");
				} catch (Exception ex) {

					//####################################
					// 실패시 처리(***가맹점 개발수정***)
					//####################################

					//---- db 저장 실패시 등 예외처리----//
					log.info("==>"+ex);

					//#####################
					// 망취소 API
					//#####################
					String netcancelResultString = httpUtil.processHTTP(authMap, netCancel);	// 망취소 요청 API url(고정, 임의 세팅 금지)
					resultMakeBillKey.put("resultCode","BILL_001");	
					resultMakeBillKey.put("resultMsg", "내부 오류!! ["+ex+"]");	//인증 실패 오류

					log.info("## 망취소 API 결과 ##");

					// 취소 결과 확인
					log.info(netcancelResultString.replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
				}

			}else{

				//#############
				// 인증 실패시
				//#############
				log.info("<br/>");
				log.info("####인증실패####");

				resultMakeBillKey.put("errorMsg", paramMap.toString());	//인증 실패 오류
				resultMakeBillKey.put("resultCode","BILL_002");	
				resultMakeBillKey.put("resultMsg", "인증실패");	//인증 실패 오류
				
			}

		}catch(Exception e){

			System.out.println(e);
		}				
		return resultMakeBillKey;
	}	
	
	/**
	 * 이니시스 모바일 결제 요청 결과
	 * @param model
	 * @param request
	 * @param response
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/iniPayMobileReturn", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewMobileReturn(Model model, HttpServletRequest request, HttpServletResponse response,Principal principal) {
		log.info("===================inicis-mobileReturn=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("inipay/mobileReturn");
		
		ContractInfoDetail contInfo = new ContractInfoDetail();//계약정보
			
		try {
			//#############################
			// 인증결과 파라미터 일괄 수신
			//#############################
			request.setCharacterEncoding("UTF-8");
			
			Map<String,String> resultMap = new Hashtable<String,String>();
			
			Enumeration elems = request.getParameterNames();
			
			String temp = "";
			
			while(elems.hasMoreElements())
			{
				temp = (String) elems.nextElement();
				resultMap.put(temp, request.getParameter(temp));
			}
			
			System.out.println("resultMap : "+ resultMap.toString());

			//#####################
			// 인증이 성공일 경우만
			//#####################
			String resultcode = resultMap.get("resultcode");
			String resultmsg = resultMap.get("resultmsg");
			String orderid = resultMap.get("orderid");
			String billkey = resultMap.get("billkey");
			String cardno = resultMap.get("cardno");		//카드번호
			String hppcorp = resultMap.get("hppcorp");	//통신사
			String buyername = resultMap.get("buyername");
			
			//계약번호
			int connumber = Integer.parseInt(orderid.replaceAll(mid+"_", ""));
			//계약정보 상세 조회
			contInfo = this.invoiceservice.getContractInfoDetail(connumber);
			if("00".equals(resultcode)){
				//카드 일 경우 1회 결제 설정
				
				/*
				 *Step1. 계약 정보 조회
				 */
				ContractInsert idi = new ContractInsert();							 
				idi.setConNumber(connumber);				
				idi.setContractstate("ACTIVATION");				
				idi.setProvidernumber(Integer.parseInt(contInfo.getProvidernumber()));
				
				
				String paymentmethodcode = "";
				if (cardno != null && !"".equals(cardno)) {
					//카드
					paymentmethodcode = "CARD";
				}else if (hppcorp!= null && !"".equals(hppcorp)){
					//핸드폰
					paymentmethodcode = "HPP";
				}
				//paymentinfo billkey  수정
				PaymentInformation payment = new PaymentInformation ();
				payment.setPaymentInformationNumber(contInfo.getPaymentinformationnumber());
				payment.setPaymentMethod(paymentmethodcode);
				payment.setCardcorporationcode(resultMap.get("cardcd"));
				payment.setBillKey(billkey);						 
				payment.setUsername(contInfo.getAuditid());
				
				
				int i = this.invoiceservice.updatePaymentinformation(payment);	
								
				Map<String, String> paymentResult = new HashMap<String, String>();
				//최근 도래 하는 결제건 조회
				InvoiceCalculationInput invoice = this.invoiceservice.getInvoicenumberByOne(idi);
				
				if (invoice != null ) {					
					//invoice 정보 설정
					PaymentHistoryInput paymenthistoryinput = new PaymentHistoryInput();							 
					paymenthistoryinput.setInvoicenumber(Integer.parseInt(invoice.getInvoicenumber()));
					paymenthistoryinput.setInvoicedate(invoice.getInvoicedate());
					paymenthistoryinput.setConnumber(connumber);
					paymenthistoryinput.setPaymentamt(invoice.getInvoiceamount());
					paymenthistoryinput.setPaymenttypecode("PAYMENT");
					paymenthistoryinput.setCardcorporationcode(resultMap.get("cardcd"));
					paymenthistoryinput.setProvidernumber(Integer.parseInt(contInfo.getProvidernumber()));							
					paymenthistoryinput.setChannelgubun("C");							 
					paymenthistoryinput.setPaymentmethodcode(paymentmethodcode);							 
					paymenthistoryinput.setUsername(contInfo.getAuditid());
					
					//카드일 경우 최초 1회에 대한 결제 요청을 한다.
					if("CARD".equals(paymentmethodcode)){//빌링결제
						
						//1회 결제 요청		카드 요청일 경우							
						//paymentResult = this.paymentProc(resultMap,  paymenthistoryinput, request, principal, model);
						IniPayInfo iniPayInfo = new IniPayInfo();
						iniPayInfo.setConnumber(connumber);
						iniPayInfo.setProvidernumber(invoice.getProvidernumber());
						iniPayInfo.setInvoicenumber(Integer.parseInt(invoice.getInvoicenumber()));
						paymentResult = this.payProc(iniPayInfo, "MOBILE", principal);
						
						resultcode = paymentResult.get("resultCode");
						resultmsg = paymentResult.get("resultMsg");
						
					}else if ("HPP".equals(paymentmethodcode)) {
						
						// DB 처리 
						// paymenthistoryinput.setCardapprovenumber(authCode);
						// paymenthistoryinput.setTid(tid);
						int resultCnt = billingController.savePaymentInfo(paymenthistoryinput);
					}else {
						
					}
					
					model.addAttribute("paymentResult", paymentResult);		

				}else{
					resultcode = "BILL_01";
					resultmsg = "납부 대상이 존재하지 않습니다.";
				}
				
			}
			//#####################
			// 결과 setting
			//#####################
			
			model.addAttribute("contInfo", contInfo);
			model.addAttribute("resultCode", resultcode);
			model.addAttribute("resultMsg", resultmsg);
			model.addAttribute("billKey", billkey);
			
		} catch (Exception e) {
			// TODO: handle exception
			model.addAttribute("resultCode", "BILL_01");
			model.addAttribute("resultMsg", "정기결제 요청 실패!["+e+"]");
			log.info("==>"+e);
			//페이지 이동
		}finally {
			ContractInsert contractInsert = new ContractInsert();
			contractInsert.setConNumber(Integer.parseInt(contInfo.getConnumber()));
			//판매완료 정보 조회
			List<ContractInsert> contractList = contractService.getContractDone(contractInsert);
			model.addAttribute("contractList",contractList);
		}
		return modelAndView;
	}
	
	
	/**
	 * Billkey로 결제 요청 후 결제 정보 Billing oss 에 update
	 * @param inputMap
	 * @return
	 */
	/*public Map<String, String> paymentProc( Map<String, String> inputMap, PaymentHistoryInput paymenthistoryinput, HttpServletRequest request, Principal principal, Model model) throws Exception{
	    
	    Map<String, String> result = new HashMap<String, String>();
		//#############################################################################
		//# 1. 인스턴스 생성 #
		//####################
		  INIpay inipay = new INIpay();
		  INIdata data = new INIdata();

		  
		//#############################################################################
		//# 2. 정보 설정 #
		//################
		  data.setData("type", "reqrealbill");                             // 결제 type, 고정 
		  data.setData("inipayHome", inipayHome);                           // 이니페이가 설치된 절대경로
		  data.setData("logMode", logMode);                                 // logMode
		  data.setData("keyPW",keyPW);                                      // 키패스워드
		  data.setData("subPgip","203.238.37.3");                           // Sub PG IP (고정)
		  data.setData("mid", mid);                 // 상점아이디
		  data.setData("uid", mid);                // INIpay User ID
		  data.setData("goodname", inputMap.get("goodName"));       // 상품명 (최대 40자)
		  data.setData("currency", inputMap.get("currency"));       // 화폐단위
		  //data.setData("price", inputMap.get("price"));             // 가격
		  data.setData("price", inputMap.get("TotPrice"));             // 가격
		  data.setData("buyername", inputMap.get("buyerName"));     // 구매자 (최대 15자)
		  data.setData("buyertel", inputMap.get("buyerTel"));       // 구매자이동전화
		  data.setData("buyeremail", inputMap.get("buyerEmail"));   // 구매자이메일
		  data.setData("paymethod", "Card");                                // 지불방법, 카드빌링
		  data.setData("billkey", inputMap.get("billKey"));         // 빌링등록 키(빌키)
		  data.setData("moid", inputMap.get("moid"));               // 빌링등록 키(빌키)
		  data.setData("url", "http://www.your_domain.co.kr");              // 홈페이지 주소(URL)
		  data.setData("cardquota", inputMap.get("CARD_Quota"));
		  data.setData("authentification", "00");			//본인인증
		  data.setData("cardpass", inputMap.get("cardpass"));       // 카드비번 앞자리 2자리
		  data.setData("regnumber", inputMap.get("regnumber"));     // 주민번호 및 사업자번호
		  //data.setData("uip", request.getRemoteAddr());                     // IP Addr
		  //data.setData("authentification", inputMap.get("authentification"));
		  
		  data.setData("authField1", inputMap.get("authField1"));
		  data.setData("authField2", inputMap.get("authField2"));
		  data.setData("authField3", inputMap.get("authField3"));
		  data.setData("crypto", "execure");                                // Extrus 암호화 모듈 적용(고정)
		  
		//###############################################################################
		//# 3. 지불 요청 #
		//################  
		  data = inipay.payRequest(data);
		  
		//###############################################################################
		//# 3-1. 요청 결과 #
		//################  
		  String resultCode = data.getData("ResultCode");      // "00"이면 신용카드 빌링요청 성공
		  String resultMsg  = data.getData("ResultMsg");       // 결과에 대한 설명
		  String authCode   = data.getData("CardAuthCode");  // 승인번호
		  String pgAuthDate = data.getData("PGauthdate");      // 이니시스 승인날짜(YYYYMMDD)
		  String pgAuthTime = data.getData("PGauthtime");      // 이니시스 승인시간(HHMMSS)
		  String tid        	= data.getData("tid");             // 거래번호

		  //###############################################################################
		  //# 4. ACK 요청 및 DB처리 #
		  //################ 
		  if ("00".equals(data.getData("ResultCode")))
		  {
			  // DB 처리 
			  paymenthistoryinput.setCardapprovenumber(authCode);
			  paymenthistoryinput.setTid(tid);
			  int resultCnt = billingController.savePaymentInfo(paymenthistoryinput);
			  
			  //결제 내역 저장 건이 없을 경우 승인 취소후 에러 처리 한다.
			  if(resultCnt == 0) {				  
				  //승인 취소				  
				  String errorMsg = "결제내역 저장 실패";
				  paymenthistoryinput.setCancelMsg(errorMsg);
				  Map<String, Object> resultMap = this.payCancleProc(paymenthistoryinput, principal);		
		         result.put("resultCode", "BILL_0001");
		         result.put("resultMsg", errorMsg);				 
		         throw new Exception(errorMsg);
			  }
		  }
		  

		//###############################################################################
		//# 5. 요청 결과 #
		//################  
         
         result.put("resultCode", resultCode);
         result.put("resultMsg", resultMsg);
         result.put("authCode", authCode);
         result.put("pgAuthDate", pgAuthDate);
         result.put("pgAuthTime", pgAuthTime);
         result.put("tid", tid);
		 return result;
	}*/
	
	
	/**
	 * 결제 처리
	 * @param iniPayInfo
	 * @param principal
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/payProc", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Map<String, String> payProc(@ModelAttribute IniPayInfo iniPayInfo, String channelDiv, Principal principal) throws Exception{

		int providernumber = 0;
		String userName = "";
		Map<String, String> result = new HashMap<String, String>();
		
		//#############################################################################
		//# 1. 인스턴스 생성 #
		//####################
		INIpay inipay = new INIpay();
		INIdata data = new INIdata();
		
		iniPayInfo = this.invoiceservice.getIniPayInfo(iniPayInfo);
		
		/*ID mapping*/		
		if ("MOBILE".equals(channelDiv) || "BATCH".equals(channelDiv) || principal == null) {
			//모바일일 경우 Login 정보 없음
			providernumber = iniPayInfo.getProvidernumber();
			userName = iniPayInfo.getAuditid();
		}else {			
			User user = userService.readUser(principal.getName());
			providernumber = user.getProvidernumber();
			userName = user.getUsername();
		}
		
		//TODO TEST
		//iniPayInfo.setPrice("1000");
		iniPayInfo.setBuyerEmail("feelfor@nate.com");
		iniPayInfo.setBuyerTel("01062279243");
		
		//홈페이지 주소(URL) 설정
		iniPayInfo.setUrl("http://localhost");
		
		//#############################################################################
		//# 2. 정보 설정 #
		//################
		  data.setData("type", "reqrealbill");                           // 결제 type, 고정 
		  data.setData("inipayHome", inipayHome);                  // 이니페이가 설치된 절대경로
		  data.setData("logMode", logMode);                        // logMode
		  data.setData("keyPW",keyPW);                               // 키패스워드
		  data.setData("subPgip","203.238.37.3");                     // Sub PG IP (고정)
		  data.setData("mid", mid);										// 상점아이디
		  data.setData("uid", mid);										// INIpay User ID
		  data.setData("goodname", iniPayInfo.getGoodName());	// 상품명 (최대 40자)
		  data.setData("currency", iniPayInfo.getCurrency());		// 화폐단위
		  data.setData("price", iniPayInfo.getPrice());					// 가격
		  data.setData("buyername", iniPayInfo.getBuyerName());	// 구매자 (최대 15자)
		  data.setData("buyertel", iniPayInfo.getBuyerTel());			// 구매자이동전화
		  data.setData("buyeremail", iniPayInfo.getBuyerTel());		// 구매자이메일
		  data.setData("paymethod", iniPayInfo.getPayMethod());	// 지불방법, 카드빌링
		  data.setData("billkey", iniPayInfo.getBillKey());				// 빌링등록 키(빌키)
		  data.setData("moid", iniPayInfo.getMoid());				// 빌링등록 키(빌키)
		  data.setData("url", iniPayInfo.getUrl());						// 홈페이지 주소(URL)
		  data.setData("cardquota", iniPayInfo.getCardquota());	// 할부개월 (일시불 00)
		  data.setData("authentification", iniPayInfo.getAuthentification());	//본인인증
		  data.setData("crypto", "execure");							// Extrus 암호화 모듈 적용(고정)
		
		//###############################################################################
		//# 3. 지불 요청 #
		//################  
		data = inipay.payRequest(data);
		
		//###############################################################################
		//# 3-1. 요청 결과 #
		//################  
		String resultCode = data.getData("ResultCode");      // "00"이면 신용카드 빌링요청 성공
		String resultMsg  = data.getData("ResultMsg");       // 결과에 대한 설명
		String authCode   = data.getData("CardAuthCode");  // 승인번호
		String pgAuthDate = data.getData("PGauthdate");      // 이니시스 승인날짜(YYYYMMDD)
		String pgAuthTime = data.getData("PGauthtime");      // 이니시스 승인시간(HHMMSS)
		String tid        	= data.getData("tid");             // 거래번호
		
		//###############################################################################
		//# 4. ACK 요청 및 DB처리 #
		//################ 
		if ("00".equals(data.getData("ResultCode")))
		{
			PaymentHistoryInput paymentHistoryInput = new PaymentHistoryInput();
			paymentHistoryInput.setProvidernumber(iniPayInfo.getProvidernumber());
			paymentHistoryInput.setInvoicenumber(iniPayInfo.getInvoicenumber());
			paymentHistoryInput.setConnumber(iniPayInfo.getConnumber());
			paymentHistoryInput.setPaymentamt(Integer.parseInt(iniPayInfo.getPrice()));
			paymentHistoryInput.setPaymentmethodcode(iniPayInfo.getPayMethod());
			paymentHistoryInput.setCardcorporationcode(iniPayInfo.getCardcorporationcode());
			paymentHistoryInput.setCardapprovenumber(authCode);
			paymentHistoryInput.setTid(tid);
			paymentHistoryInput.setUsername(userName);
			paymentHistoryInput.setInvoicedate(iniPayInfo.getInvoicedate());
			
			// DB 처리
			int resultCnt = billingController.savePaymentInfo(paymentHistoryInput);
			
			//결제 내역 저장 건이 없을 경우 승인 취소후 에러 처리 한다.anj
			if(resultCnt == 0) {				  
				//승인 취소				  
				String errorMsg = "결제내역 저장 실패";
				paymentHistoryInput.setCancelMsg(errorMsg);
				Map<String, Object> resultMap = this.payCancleProc(paymentHistoryInput);		
				/*result.put("resultCode", "BILL_0001");
				result.put("resultMsg", errorMsg);				 
				throw new Exception(errorMsg);*/
				resultCode = "BILL_0001";
				resultMsg = errorMsg;
			}
		}
		
		
		//###############################################################################
		//# 5. 요청 결과 #
		//################  		
		
		result.put("InvoiceNumber", Integer.toString(iniPayInfo.getInvoicenumber()));
		result.put("resultCode", resultCode);
		result.put("resultMsg", resultMsg);
		result.put("authCode", authCode);
		result.put("pgAuthDate", pgAuthDate);
		result.put("pgAuthTime", pgAuthTime);
		result.put("tid", tid);
		return result;
	}
	
	/**
	 * 이니시스 결제창을 팝업으로 호출 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/iniPayPopup", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewPopup(Model model) {
		log.info("===================inicis-popup=====================");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("inipay/webPopup");
		return modelAndView;
	}
	
	/**
	 * 빌키 생성을 위한 기본 정보 설정
	 * @param connumber
	 * @param billType
	 * @param channelgubun
	 * @param model
	 * @param principal
	 * @return
	 */
	//@RequestMapping(value = "/setPaymentReqInfo/{connumber}/{billType}/{channelgubun}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequestMapping(value = "/setPaymentReqInfo", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public  Map<String, Object> setPaymentReqInfo(@ModelAttribute IniPayInfo iniPayInput , Model model,HttpServletRequest request, Principal principal) {		
/*		public  Map<String, Object> setPaymentReqInfo(@PathVariable(value = "connumber") String connumber
				, @PathVariable(value = "billType") String billType
				, @PathVariable(value = "channelgubun") String channelgubun
				, Model model,HttpServletRequest request, Principal principal) {		
*/		Map<String, Object> iniPayResult = new HashMap<String, Object>();
		
		int connumber = iniPayInput.getConnumber();
		String billType = iniPayInput.getBillType().toUpperCase();
		String channelgubun = iniPayInput.getChannelgubun().toUpperCase();
		try {
				/*
				//*** 위변조 방지체크를 signature 생성 ***
	
					oid, price, timestamp 3개의 키와 값을
	
					key=value 형식으로 하여 '&'로 연결한 하여 SHA-256 Hash로 생성 된값
	
					ex) oid=INIpayTest_1432813606995&price=819000&timestamp=2012-02-01 09:19:04.004
						
	
					 * key기준 알파벳 정렬
	
					 * timestamp는 반드시 signature생성에 사용한 timestamp 값을 timestamp input에 그대로 사용하여야함
			*/
	
			//############################################
			// 1.전문 필드 값 설정(***가맹점 개발수정***)
			//############################################
	
			//계약 번호로 계약 내역 조회			
			ContractInfoDetail contInfo = this.invoiceservice.getContractInfoDetail(connumber);/*계약정보 상세 조회*/			

			// 여기에 설정된 값은 Form 필드에 동일한 값으로 설정
			//String mid = "INIBillTst";		// 가맹점 ID(가맹점 수정후 고정)					
			
			//인증			
			String timestamp = SignatureUtil.getTimestamp();				// util에 의해서 자동생성
	
			//String oid	 = mid+"_"+SignatureUtil.getTimestamp();			// 가맹점 주문번호(가맹점에서 직접 설정)
			String oid	 = mid+"_"+connumber;			// 가맹점 주문번호(가맹점에서 직접 설정)
			String price = contInfo.getPriceamount();						// 상품가격(특수기호 제외, 가맹점에서 직접 설정)
			
			//일괄 결제일 경우 일괄결제 금액을 가져 온다
			if("N".equals(contInfo.getRecurringinvoiceyn())) {
				price = contInfo.getBulkAmount();
			}
			
			//TODO TEST			
			contInfo.setCustomername("문경은");
			contInfo.setCellphonenumber("01062279243");
			contInfo.setEmail("feelfor@nate.com");

			
			//###############################################
			// 2. 가맹점 확인을 위한 signKey를 해시값으로 변경 (SHA-256방식 사용)
			//###############################################
			String mKey = SignatureUtil.hash(signKey, "SHA-256");
			
			//###############################################
			// 2.signature 생성
			//###############################################
			Map<String, String> signParam = new HashMap<String, String>();
	
			signParam.put("oid", oid); 							// 필수
			signParam.put("price", price);							// 필수
			signParam.put("timestamp",	timestamp);		// 필수
	
			// signature 데이터 생성 (모듈에서 자동으로 signParam을 알파벳 순으로 정렬후 NVP 방식으로 나열해 hash)
			String signature = SignatureUtil.makeSignature(signParam);
			
			
			/* 기타 */
			//String siteDomain = "http://127.0.0.1:7777/INIpayStdSample"; //가맹점 도메인 입력
			//String siteDomain = "http://127.0.0.1:7777/payment/"; //가맹점 도메인 입력
			String siteDomain = request.getRequestURL().toString().replaceAll(request.getRequestURI(), "")+"/payment/"; //가맹점 도메인 입력
			
			
			iniPayResult.put("mid", mid); 
			iniPayResult.put("oid", oid); 
			iniPayResult.put("price", price); 
			iniPayResult.put("timestamp", timestamp); 
			iniPayResult.put("signature", signature); 
			iniPayResult.put("siteDomain",siteDomain ); 
			iniPayResult.put("mKey",mKey ); 
			
			
			//결제 form data
			StringBuffer iniPayForm = new StringBuffer();		
			//채널 구분이 모바일 경우 
			if ("MOBILE".equals(channelgubun)) {

				//데이터 검증을 위한 데이터 해쉬데이터
				String temp = SignatureUtil.hash(mid+"ORDERID123420130808171939b09LVzhuTGZVaEY1WmJoQnZzdXpRdz09", "SHA-256");
				String hashdata = SignatureUtil.hash(mid+oid+timestamp+merchantkey, "SHA-256");
				if ("HPP".equals(billType)) {
					iniPayForm.append("<form id=\"iniPayForm\"  name=\"iniPayForm\" action=\"https://inilite.inicis.com/inibill/inibill_hpp.jsp\" method=\"post\" style=\"display : none;\">"); 
					 
				}else if ("CARD".equals(billType)){
					iniPayForm.append("<form id=\"iniPayForm\" name=\"iniPayForm\" action=\"https://inilite.inicis.com/inibill/inibill_card.jsp\" method=\"post\" style=\"display : none;\">");
					//iniPayForm.append("<form id=\"iniPayForm\" name=\"iniPayForm\" action=\"https://inilite.inicis.com/inibill/inibill_card.jsp\" method=\"post\">");
					
				}
					
				iniPayForm.append("	<input id=\"orderid\" name=\"orderid\" value=\""+oid+"\" />");					
				iniPayForm.append("	<input id=\"hashdata\" name=\"hashdata\" value=\""+hashdata+"\" />"); 
				iniPayForm.append("	<input id=\"returnurl\" name=\"returnurl\" value=\""+siteDomain+"iniPayMobileReturn\" />");
				String offerPeriod = contInfo.getEffectstartdatetime() + contInfo.getEffectenddatetime();
				iniPayForm.append("period	<input id=\"period\" name=\"period\" value=\""+offerPeriod+"\" />");
				
			}else {				
				String offerPeriod = contInfo.getEffectstartdatetime() +"-"+contInfo.getEffectenddatetime();
				//iniPayForm.append("<form name=\"iniPayForm\" method=\"post\" >");
				iniPayForm.append("<form name=\"iniPayForm\" method=\"post\" style=\"display : none;\">");
				iniPayForm.append("	<input id=\"oid\" name=\"oid\" value=\""+oid+"\" />");
				iniPayForm.append("	<input id=\"returnUrl\" name=\"returnUrl\" value=\""+siteDomain+"iniPayReturn\" />");
				iniPayForm.append("	<input id=\"offerPeriod\" name=\"offerPeriod\" value=\""+offerPeriod+"\" />");
			}
			iniPayForm.append("	<input id=\"version\" name=\"version\" value=\"1.0\" />"); 
			iniPayForm.append("	<input id=\"mid\" name=\"mid\" value=\""+mid+"\" />");
			iniPayForm.append("	<input id=\"connumber\" name=\"connumber\" value=\""+contInfo.getConnumber()+"\" />");
			iniPayForm.append("	<input id=\"goodname\" name=\"goodname\" value=\""+contInfo.getProductname()+"\" />"); 			
			iniPayForm.append("	<input id=\"price\" name=\"price\" value=\""+price+"\" />");
			iniPayForm.append("	<input id=\"currency\" name=\"currency\" value=\"WON\" />");
			iniPayForm.append("	<input id=\"buyername\" name=\"buyername\" value=\""+contInfo.getCustomername()+"\" />");
			iniPayForm.append("	<input id=\"buyertel\" name=\"buyertel\" value=\""+contInfo.getCellphonenumber()+"\" />");
			iniPayForm.append("	<input id=\"buyeremail\" name=\"buyeremail\" value=\""+contInfo.getEmail()+"\" />");
			iniPayForm.append("	<input type=\"hidden\" style=\"width:100%;\" id=\"timestamp\" name=\"timestamp\" value=\""+timestamp+"\" />");
			iniPayForm.append("	<input type=\"hidden\" style=\"width:100%;\" id=\"signature\" name=\"signature\" value=\""+signature+"\" />");
			iniPayForm.append("	<input type=\"hidden\" id=\"mKey\"  name=\"mKey\" value=\""+mKey+"\" />");
			iniPayForm.append("	<input type=\"hidden\" style=\"width:100%;\" name=\"gopaymethod\" value=\"\" />");
			
			iniPayForm.append("	<input id=\"billKey\" name=\"billKey\" value=\"\" />");
			
			String billPrint_msg = "고객님의 매월 결제일은 "+contInfo.getPaymentday()+"일 입니다.";
			iniPayForm.append("	<input id=\"billPrint_msg\" name=\"billPrint_msg\" value=\""+billPrint_msg+"\" />");				
			iniPayForm.append("	<input id=\"languageView\" name=\"languageView\" value=\"\" />");
			iniPayForm.append("	<input id=\"charset\" name=\"charset\" value=\"\" /> ");
			iniPayForm.append("	<input id=\"payViewType\" name=\"payViewType\" value=\"\" />"); 
			iniPayForm.append("	<input id=\"closeUrl\" name=\"closeUrl\" value=\""+siteDomain+"iniPayClose\" />");
			iniPayForm.append("	<input id=\"popupUrl\" name=\"popupUrl\" value=\""+siteDomain+"iniPayPopup\" />");
			iniPayForm.append("	<input id=\"merchantData\" name=\"merchantData\" value=\"\" />"); 
			
			String acceptmethod = "BILLAUTH(CARD):POPRETURN";
			if ("HPP".equals(billType)) {
				 acceptmethod = "BILLAUTH(HPP):HPP(4):POPRETURN";
				 iniPayForm.append("	<input type=\"text\" name=\"merchantreserved1\" size=\"20\" value=\"moid=merchant_moid\"/>"); 
				 iniPayForm.append("	<input type=\"text\" name=\"billtype\" size=\"20\" value=\"HPP\"/>"); 
				 
			}else {				
				acceptmethod = "BILLAUTH(CARD):POPRETURN"; 
			}
			
			iniPayForm.append("	<input id=\"acceptmethod\" name=\"acceptmethod\" value=\""+acceptmethod+"\" />"); 
			iniPayForm.append("	<input id=\"channelgubun\" name=\"channelgubun\" value=\""+channelgubun+"\" />"); 
			iniPayForm.append("	<input id=\"iniPayResult\" name=\"iniPayResult\" value=\"\" />"); 
			
			iniPayForm.append("</form>");
			
			iniPayResult.put("iniPayForm", iniPayForm);

			
		} catch (Exception e) {
			// TODO: handle exception
			
		}
		 return iniPayResult;
	}

	/**
	 * 승인 취소
	 * @param connumber
	 * @param billType
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/payCancleProc", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public  Map<String, Object> payCancleProc(@ModelAttribute PaymentHistoryInput paymentHistoryInput) throws Exception{		
		Map<String, Object> iniPayResult = new HashMap<String, Object>();	
		/*ID mapping*/
		//User user = userService.readUser(principal.getName());
		String providernumber = Integer.toString(paymentHistoryInput.getProvidernumber());
		String username = paymentHistoryInput.getUsername();
		
		paymentHistoryInput.setUsername(username);
		
		//배송 상태가 BEFORE인 경우만 환불이 가능 하다.
		
		int resultCnt = 0 ;
		
		resultCnt = this.invoiceservice.getDelivaeryCntNotBefore(paymentHistoryInput);
		
		if (resultCnt > 0) {
			throw new Exception("배송상태를 확인 하세요.");
		}
				
		//#############################################################################
		//# 1. 인스턴스 생성 #
		//####################
			INIpay inipay = new INIpay();
			INIdata data = new INIdata();
			
		//###############################################################################
		//# 2. 환불 처리 DB 저장 #
		//################
			paymentHistoryInput = this.invoiceservice.getPaymentHistoryInfo(paymentHistoryInput);
			paymentHistoryInput.setUsername(username);
			/*ID mapping*/
			
			//환불 이력 등록
			resultCnt = invoiceservice.setRefundHistory(paymentHistoryInput);				
			 		
			//결제 금액 복원
			resultCnt = invoiceservice.updaterefundColInvoice(paymentHistoryInput);
			//결제 금액 상세 복원
			resultCnt = invoiceservice.updaterefundColInvoiceDetail(paymentHistoryInput);
			
			//배송상태 변경
			//배송 정보의 상태 값을 배송대기(BEFORE) 상태에서 계약완료(ORDERDONE) 상태로 변경 한다.
			paymentHistoryInput.setDeliverystate("ORDERDONE");
			resultCnt = invoiceservice.updateDeliverydetailByDeliverystate(paymentHistoryInput);
			
			//계약상태 변경
			//모든 청구가 납부 전일 경우 상태 변경
						

		//#############################################################################
		//# 3. 정보 설정 #
		//################
			data.setData("type", "cancel");							// 결제 type
			data.setData("inipayHome", inipayHome);			// 이니페이가 설치된 절대경로
			data.setData("logMode", logMode);					// logMode
			data.setData("keyPW",keyPW);							// Sub PG IP (고정)
			data.setData("mid", mid);								// 상점아이디
			data.setData("tid", paymentHistoryInput.getTid());									// 취소할 TID
			data.setData("cancelMsg", paymentHistoryInput.getCancelMsg());				// INIpay User ID
			//data.setData("uip", request.getRemoteAddr());		// IP Addr
			data.setData("crypto", "execure");						// Extrus 암호화 모듈 적용(고정)


		//###############################################################################
		//# 4. 취소 요청 #
		//################
			data = inipay.payRequest(data);

		//###############################################################################
		//# 5. 요청 결과 #
		//################
			String resultCode = data.getData("ResultCode");      // "00"이면 신용카드 빌링요청 성공
			String resultMsg  = data.getData("ResultMsg");       // 결과에 대한 설명
			String pgAuthDate = data.getData("PGauthdate");    // 이니시스 승인날짜(YYYYMMDD)
			String pgAuthTime = data.getData("PGauthtime");    // 이니시스 승인시간(HHMMSS)
		 
		//###############################################################################
		//# 6. 환불 처리 Exception  처리 #
		//################
			if (!"00".equals(resultCode)) {				
				//DB rollback
				throw new Exception("환불 처리에 실패 했습니다.");				
			}
		  
		//###############################################################################
		//# 7. 요청 결과 #
		//################
			iniPayResult.put("resultCode", resultCode);
			iniPayResult.put("resultMsg", resultMsg);
			iniPayResult.put("pgAuthDate", pgAuthDate);
			iniPayResult.put("pgAuthTime", pgAuthTime);
			iniPayResult.put("tid", paymentHistoryInput.getTid());

		return iniPayResult;
	}

	
}
