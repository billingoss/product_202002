package com.api.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.model.User;
import com.api.model.billing.ChannelBillingInformation;
import com.api.model.billing.ChannelPaymentMethod;
import com.api.service.ChannelService;
import com.api.service.CodeService;
import com.api.service.UserService;


@RestController
@RequestMapping("channel")
@Transactional(rollbackFor=Exception.class)
public class ChannelController {

	
	@Autowired 
	UserService userService;
		
	@Autowired 
	CodeService codeService;

	@Autowired 
	ChannelService channelService;
	
	private Logger log = LoggerFactory.getLogger(getClass());
	
		
	/**
	 * 채널/업체 별 납부 가능 여부 조회
	 * @param channelBillInfo
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getPayableYn/{channelId}/{providerNumber}", method = RequestMethod.GET)
	public String selectPayableYn(@PathVariable(value = "channelId") String channelId,@PathVariable(value = "providerNumber") int providerNumber, Model model, Principal principal) {	
		//Login하지 않고 접근 할 수 도 있으므로
		String payableYn = this.channelService.selectPayableYn(channelId, providerNumber);
		
		return payableYn;
	}
	
	/**
	 * 채널/업체 별 선납 여부 조회
	 * @param channelBillInfo
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getPrePaymentYn/{channelId}/{providerNumber}", method = RequestMethod.GET)
	public String selectPrePaymentYn(@PathVariable(value = "channelId") String channelId,@PathVariable(value = "providerNumber") int providerNumber, Model model, Principal principal) {	
		//Login하지 않고 접근 할 수 도 있으므로
		String prePaymentYn = this.channelService.selectPrePaymentYn(channelId, providerNumber);
		
		return prePaymentYn;
	}
	
	/**
	 *채널별 납부 방법 목록 조회
	 * @param channelPaymentMethod
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getChannelPaymentMethodList", method = RequestMethod.GET)
	public Map getChannelPaymentMethodList(@ModelAttribute ChannelPaymentMethod channelPaymentMethod, Model model, Principal principal){
		Map map = new HashMap();
		User user = userService.readUser(principal.getName());		
		
		List<ChannelPaymentMethod> payMethodList = this.channelService.selectChannelPaymentMethodList(channelPaymentMethod);
	
		map.put("payMethodList", payMethodList); // 리스트fetch

		return map;
	}
	

	/**
	 * 파일 전송이 가능한 채널 조회
	 * @param channelBillingInformation
	 * @param model
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/getInvoiceFileSendChannelList", method = RequestMethod.GET)
	public Map getInvoiceFileSendChannelList(@ModelAttribute ChannelBillingInformation channelBillingInformation, Model model, Principal principal){
		Map map = new HashMap();
		User user = userService.readUser(principal.getName());
		channelBillingInformation.setProviderNumber(user.getProviderNumber());
		
		List<ChannelBillingInformation> channelList= this.channelService.selectChannelBillingInformationList(channelBillingInformation);
		
		map.put("channelList", channelList); // 리스트fetch
		
		return map;
	}
	
	
	
	
}