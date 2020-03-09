package com.api.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import com.api.model.billing.SkPayAuth;


/**
 * @author Administrator
 *
 */
@RestController
@RequestMapping(value = "skPay")
@Transactional(rollbackFor=Exception.class)
public class SkPayController {
		
	private Logger log = LoggerFactory.getLogger(getClass());
	
/*	@Autowired 
	private UserService userService;
	
	@Autowired
	private BillingController billingController;
	
	//@Autowired
	//private BillLetterContractController billLetterContractController;
	
	@Autowired
	private ContractService contractService;

	@Autowired
	private InvoiceService invoiceservice;
	
	@Autowired
	private ProviderService providerService;
	

	*/
	
	/**
	 * skPay Test화면 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/skPayView", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView skPayView(Model model) {
		log.info("===================inicis-popup=====================");
		ModelAndView modelAndView = new ModelAndView();
		
		//User Agent  정보 조회
		/*RestTemplate restTemplate = new RestTemplate();
		SkPayAuth skPayAuth = new SkPayAuth();
		skPayAuth.setIdentifier("skcnc-Billingoss");
		skPayAuth.setCi("I4seuNaN5KTFFkbxyUUa0mAxbvvFDEmr");
		restTemplate.postForObject("http://dev.11pay.co.kr:31558/authorizer/apis/v2/authorizations/grant",new HttpEntity<>(SkPayAuth));
		 UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("http://dev.11pay.co.kr:31558/authorizer/apis/v2/authorizations/grant");
		 builder.*/
		HttpHeaders headers = new HttpHeaders();
        headers.add(
            "skcnc-Billingoss",
            "I4seuNaN5KTFFkbxyUUa0mAxbvvFDEmr"
        );

        
		Map<String, String> parameters = new HashMap<>();		 
		parameters.put("identifier", "skcnc-Billingoss");
		parameters.put("ci", "c2tjbmMtQmlsbGluZ29zczpmeWZnbmVyTkpqcHNhaUhGeUZ2RFpNT0ZNaUlQZlRZYQ==");
		
		HttpEntity<Map<String, String>> request = new HttpEntity<>(parameters, headers);
		
		RestTemplate restTemplate = new RestTemplate();
		
		//restTemplate.get
		SkPayAuth skPayAuth = restTemplate.postForObject("https://dev.sk-pay.co.kr:31558/authorizer/apis/v2/authorizations/grant",request, SkPayAuth.class );
		//SkPayAuth skPayAuth = restTemplate.getForObject("https://stage.sk-pay.co.kr:31558/authorizer/apis/v2/authorizations/grant", SkPayAuth.class,request);
		
		
		modelAndView.setViewName("skpay/skPayView");
		return modelAndView;
	}
	

	
}
