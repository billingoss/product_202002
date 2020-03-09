package com.api.controller;

import java.io.InputStream;
import java.net.URLEncoder;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.api.billing.login.model.User;
import com.api.billing.model.order.Order;
import com.api.model.Criteria;
import com.api.model.PageMaker;
import com.api.service.OrderService;
import com.api.service.UserService;
import com.api.util.SXSSFExcelUtil;

@RestController
@RequestMapping("order")
@Transactional(rollbackFor=Exception.class)
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@Autowired 
	UserService userService;
		
	@RequestMapping(value = "/information", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewOrderInformation(HttpServletRequest request,Principal principal,Model model) {
		User user = userService.readUser(principal.getName());
        request.getSession(true).setAttribute("loginname", user.getName());
        request.getSession(true).setAttribute("businessname", user.getBusinessname());
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/order/information");
		return modelAndView;
	}
	
	@RequestMapping(value = "/informationmenu", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewInformationMenu(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/order/informationmenu");
		return modelAndView;
	}	

	@RequestMapping(value = "/orderupload", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewOrderUpload(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		User user = userService.readUser(principal.getName());
		Order order = new Order();
		order.setProvidernumber(user.getProvidernumber());
		
		List<Order> channelList = orderService.getChannelList(user);
		List<Order> channelItemList = orderService.getChannelItemList(order);
		
		List[] itemlist = new ArrayList[channelList.size()];
		int idx = -1;
		String channelid = "";
		
		for (int i=0; i<channelItemList.size(); i++) {
			
			if (i==0 || !channelid.equals(channelItemList.get(i).getChannelid())) {
				idx = idx + 1;
				itemlist[idx] = new ArrayList();
			}
			
			itemlist[idx].add(channelItemList.get(i));
			channelid = channelList.get(idx).getChannelid();
		}
		
		for (int i=0; i<channelList.size(); i++) {
			channelList.get(i).setItemlist(itemlist[i]);
		}
		
		model.addAttribute("channelList",channelList);

		modelAndView.setViewName("admin/order/orderupload");
		return modelAndView;
	}	
	
	@RequestMapping(value = "/orderuploadexceldown/{channelid}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void orderUploadExcelDown(HttpServletResponse response, @PathVariable(value="channelid")String channelid, Principal principal) throws Exception {
		Order order = new Order();
		
		User user = userService.readUser(principal.getName());
		order.setProvidernumber(user.getProvidernumber());
		order.setChannelid(channelid);
		
		List<Order> list = orderService.getChannelItemList(order);
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("업로드양식_"+channelid);

		//헤더 생성
		excel.createRow();
	    for (int i=0; i<list.size(); i++) {
			excel.setCellValue("Y", i, list.get(i).getItemname());
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("주문업로드양식_"+order.getChannelid()+".xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());
	}	

	/*
	@RequestMapping(value = "/uploadorder", method = RequestMethod.POST)
	public int uploadOrder(@RequestParam(value="itemcodearray")String[] itemcode, @RequestParam(value="itemvaluearray")String[] itemvalue, Principal principal) {
		
		orderService.setAutoCommitOff();
		
		int result;
		
		try {
			User user = userService.readUser(principal.getName());
			Order curDate = orderService.getCurDate(null);
			
			Map<String,String> map = new HashMap<String,String>();
			for (int i=0; i<itemcode.length; i++) {
				map.put(itemcode[i], String.valueOf(i));
			};
			
			Order order = new Order();
			
			order.setProvidernumber(user.getProvidernumber());
			order.setChannelid(map.get("channelid") == null ? "":itemvalue[Integer.parseInt((String)map.get("channelid"))]);
			
			if (map.get("productordernumber") == null && map.get("ordernumber") == null) {
				Order orderNumber = orderService.getOrderNumber(order);
				order.setProductordernumber(orderNumber.getOrdernumber());
				order.setOrdernumber(orderNumber.getOrdernumber());
			} else if (map.get("productordernumber") == null) {
				order.setProductordernumber(itemvalue[Integer.parseInt((String)map.get("ordernumber"))]);
				order.setOrdernumber(itemvalue[Integer.parseInt((String)map.get("ordernumber"))]);
			} else {
				order.setProductordernumber(itemvalue[Integer.parseInt((String)map.get("productordernumber"))]);
				order.setOrdernumber(itemvalue[Integer.parseInt((String)map.get("ordernumber"))]);
			}	
			order.setRegistrationdatetime(curDate.getCurdate());
			order.setProcessstate("UPLOAD");
			order.setCustomername(map.get("customername") == null?"":itemvalue[Integer.parseInt((String)map.get("customername"))]);
			order.setCustomeremail(map.get("customeremail") == null ? "":itemvalue[Integer.parseInt((String)map.get("customeremail"))]);
			order.setCustomerid(map.get("customerid") == null ? "":itemvalue[Integer.parseInt((String)map.get("customerid"))]);
			order.setCustomertype(map.get("customertype") == null ? "":itemvalue[Integer.parseInt((String)map.get("customertype"))]);
			order.setSex(map.get("sex") == null ? "":itemvalue[Integer.parseInt((String)map.get("sex"))]);
			order.setDeliverycustomername(map.get("deliverycustomername") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverycustomername"))]);
			order.setDeliveryphonenumber1(map.get("deliveryphonenumber1") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryphonenumber1"))].replace("-", ""));
			order.setDeliveryphonenumber2(map.get("deliveryphonenumber2") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryphonenumber2"))].replace("-", ""));
			order.setDeliveryaddress(map.get("deliveryaddress") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryaddress"))]);
			order.setCustomerphonenumber(map.get("customerphonenumber") == null ? "":itemvalue[Integer.parseInt((String)map.get("customerphonenumber"))].replace("-", ""));
			order.setDeliveryzipcode(map.get("deliveryzipcode") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryzipcode"))].replace("-", ""));
			order.setOrderstate(map.get("orderstate") == null ? "":itemvalue[Integer.parseInt((String)map.get("orderstate"))]);
			order.setOrderdetailstate(map.get("orderdetailstate") == null ? "":itemvalue[Integer.parseInt((String)map.get("orderdetailstate"))]);
			order.setOrdertype(map.get("ordertype") == null ? "":itemvalue[Integer.parseInt((String)map.get("ordertype"))]);
			order.setOrderaddinfo(map.get("orderaddinfo") == null ? "":itemvalue[Integer.parseInt((String)map.get("orderaddinfo"))]);
			order.setOrderdatetime(map.get("orderdatetime") == null ? "":itemvalue[Integer.parseInt((String)map.get("orderdatetime"))].replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
			order.setProductnumber(map.get("productnumber") == null ? "":itemvalue[Integer.parseInt((String)map.get("productnumber"))]);
			order.setProductname(map.get("productname") == null ? "":itemvalue[Integer.parseInt((String)map.get("productname"))]);
			order.setOptioninfo(map.get("optioninfo") == null ? "":itemvalue[Integer.parseInt((String)map.get("optioninfo"))]);
			order.setQuantity(map.get("quantity") == null ? "1":itemvalue[Integer.parseInt((String)map.get("quantity"))].replace(",", ""));
			order.setPriceamount(map.get("priceamount") == null ? "":itemvalue[Integer.parseInt((String)map.get("priceamount"))].replace(",", ""));
			order.setTotalamount(map.get("totalamount") == null ? "":itemvalue[Integer.parseInt((String)map.get("totalamount"))].replace(",", ""));
			order.setAddproductname(map.get("addproductname") == null ? "":itemvalue[Integer.parseInt((String)map.get("addproductname"))]);
			order.setProductdescription1(map.get("productdescription1") == null ? "":itemvalue[Integer.parseInt((String)map.get("productdescription1"))]);
			order.setProductdescription2(map.get("productdescription2") == null ? "":itemvalue[Integer.parseInt((String)map.get("productdescription2"))]);
			order.setProductdescription3(map.get("productdescription3") == null ? "":itemvalue[Integer.parseInt((String)map.get("productdescription3"))]);
			order.setProductdescription4(map.get("productdescription4") == null ? "":itemvalue[Integer.parseInt((String)map.get("productdescription4"))]);
			order.setProductdescription5(map.get("productdescription5") == null ? "":itemvalue[Integer.parseInt((String)map.get("productdescription5"))]);
			order.setBigissuequantity(map.get("bigissuequantity") == null ? "":itemvalue[Integer.parseInt((String)map.get("bigissuequantity"))].replace(",", ""));
			order.setPaymentdate(map.get("paymentdate") == null ? "":itemvalue[Integer.parseInt((String)map.get("paymentdate"))].replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
			order.setPaymentmethod(map.get("paymentmethod") == null ? "":itemvalue[Integer.parseInt((String)map.get("paymentmethod"))]);
			order.setBankname(map.get("bankname") == null ? "":itemvalue[Integer.parseInt((String)map.get("bankname"))]);
			order.setCardexpirationdate(map.get("cardexpirationdate") == null ? "":itemvalue[Integer.parseInt((String)map.get("cardexpirationdate"))].replace("-", "").replace("/", "").replace(".", ""));
			order.setPaymentnumber(map.get("paymentnumber") == null ? "":itemvalue[Integer.parseInt((String)map.get("paymentnumber"))].replace("-", ""));
			order.setPaymentname(map.get("paymentname") == null ? "":itemvalue[Integer.parseInt((String)map.get("paymentname"))]);
			order.setDiscountamount(map.get("discountamount") == null ? "":itemvalue[Integer.parseInt((String)map.get("discountamount"))].replace(",", ""));
			order.setPaymentamount(map.get("paymentamount") == null ? "":itemvalue[Integer.parseInt((String)map.get("paymentamount"))].replace(",", ""));
			order.setDeliverymethod(map.get("deliverymethod") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverymethod"))]);
			order.setDeliverycompany(map.get("deliverycompany") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverycompany"))]);
			order.setTrackingnumber(map.get("trackingnumber") == null ? "":itemvalue[Integer.parseInt((String)map.get("trackingnumber"))]);
			order.setDeliverydate(map.get("deliverydate") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverydate"))].replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
			order.setDeliverychargetype(map.get("deliverychargetype") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverychargetype"))]);
			order.setDeliverychargeamount(map.get("deliverychargeamount") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverychargeamount"))].replace(",", ""));
			order.setDeliveryremark(map.get("deliveryremark") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryremark"))]);
			order.setEnddate(map.get("enddate") == null ? "":itemvalue[Integer.parseInt((String)map.get("enddate"))].replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
			order.setContractterm(map.get("contractterm") == null ? "":itemvalue[Integer.parseInt((String)map.get("contractterm"))]);
			order.setDeliverycycle(map.get("deliverycycle") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverycycle"))]);
			order.setDeliverycount(map.get("deliverycount") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverycount"))].replace(",", ""));
			order.setDeliveryday(map.get("deliveryday") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryday"))]);
			order.setDeliverytype(map.get("deliverytype") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverytype"))]);
			order.setTotaldeliverycount(map.get("totaldeliverycount") == null ? "":itemvalue[Integer.parseInt((String)map.get("totaldeliverycount"))].replace(",", ""));
			order.setCurrentdeliverycount(map.get("currentdeliverycount") == null ? "":itemvalue[Integer.parseInt((String)map.get("currentdeliverycount"))].replace(",", ""));
			order.setRemark(map.get("remark") == null ? "":itemvalue[Integer.parseInt((String)map.get("remark"))]);
			order.setRecurringdeliveryyn(map.get("recurringdeliveryyn") == null ? "":itemvalue[Integer.parseInt((String)map.get("recurringdeliveryyn"))]);
			order.setChannelkind(map.get("channelkind") == null ? "":itemvalue[Integer.parseInt((String)map.get("channelkind"))]);
			order.setEtcitem1(map.get("etcitem1") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem1"))]);
			order.setEtcitem2(map.get("etcitem2") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem2"))]);
			order.setEtcitem3(map.get("etcitem3") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem3"))]);
			order.setEtcitem4(map.get("etcitem4") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem4"))]);
			order.setEtcitem5(map.get("etcitem5") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem5"))]);
			order.setEtcitem6(map.get("etcitem6") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem6"))]);
			order.setEtcitem7(map.get("etcitem7") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem7"))]);
			order.setEtcitem8(map.get("etcitem8") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem8"))]);
			order.setEtcitem9(map.get("etcitem9") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem9"))]);
			order.setEtcitem10(map.get("etcitem10") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem10"))]);
			order.setEtcitem11(map.get("etcitem11") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem11"))]);
			order.setEtcitem12(map.get("etcitem12") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem12"))]);
			order.setEtcitem13(map.get("etcitem13") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem13"))]);
			order.setEtcitem14(map.get("etcitem14") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem14"))]);
			order.setEtcitem15(map.get("etcitem15") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem15"))]);
			order.setEtcitem16(map.get("etcitem16") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem16"))]);
			order.setEtcitem17(map.get("etcitem17") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem17"))]);
			order.setEtcitem18(map.get("etcitem18") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem18"))]);
			order.setEtcitem19(map.get("etcitem19") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem19"))]);
			order.setEtcitem20(map.get("etcitem20") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem20"))]);
			order.setEtcitem21(map.get("etcitem21") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem21"))]);
			order.setEtcitem22(map.get("etcitem22") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem22"))]);
			order.setEtcitem23(map.get("etcitem23") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem23"))]);
			order.setEtcitem24(map.get("etcitem24") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem24"))]);
			order.setEtcitem25(map.get("etcitem25") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem25"))]);
			order.setEtcitem26(map.get("etcitem26") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem26"))]);
			order.setEtcitem27(map.get("etcitem27") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem27"))]);
			order.setEtcitem28(map.get("etcitem28") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem28"))]);
			order.setEtcitem29(map.get("etcitem29") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem29"))]);
			order.setEtcitem30(map.get("etcitem30") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem30"))]);
			order.setEtcitem31(map.get("etcitem31") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem31"))]);
			order.setEtcitem32(map.get("etcitem32") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem32"))]);
			order.setEtcitem33(map.get("etcitem33") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem33"))]);
			order.setEtcitem34(map.get("etcitem34") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem34"))]);
			order.setEtcitem35(map.get("etcitem35") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem35"))]);
			order.setEtcitem36(map.get("etcitem36") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem36"))]);
			order.setEtcitem37(map.get("etcitem37") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem37"))]);
			order.setEtcitem38(map.get("etcitem38") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem38"))]);
			order.setEtcitem39(map.get("etcitem39") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem39"))]);
			order.setEtcitem40(map.get("etcitem40") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem40"))]);
			order.setEtcitem41(map.get("etcitem41") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem41"))]);
			order.setEtcitem42(map.get("etcitem42") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem42"))]);
			order.setEtcitem43(map.get("etcitem43") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem43"))]);
			order.setEtcitem44(map.get("etcitem44") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem44"))]);
			order.setEtcitem45(map.get("etcitem45") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem45"))]);
			order.setEtcitem46(map.get("etcitem46") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem46"))]);
			order.setEtcitem47(map.get("etcitem47") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem47"))]);
			order.setEtcitem48(map.get("etcitem48") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem48"))]);
			order.setEtcitem49(map.get("etcitem49") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem49"))]);
			order.setEtcitem50(map.get("etcitem50") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem50"))]);
			order.setAuditid(user.getUsername());
			
			Order channelContractNumber = orderService.getChannelContractNumber(order);
			order.setChannelcontractnumber(channelContractNumber.getChannelcontractnumber());
			
			//판매정보 저장
			result = orderService.insertChannelContract(order);
			
			//배송주소 저장
			Order deliveryaddressid = orderService.getAddressid(order);
			order.setDeliveryaddressid(deliveryaddressid.getDeliveryaddressid());
			orderService.insertAddress(order);
			
			//고객정보 저장
			if ("".equals(order.getCustomername())) {
				order.setCustomername(order.getDeliverycustomername());
			}
			if ("".equals(order.getCustomerphonenumber())) {
				order.setCustomerphonenumber("".equals(order.getDeliveryphonenumber1())?order.getDeliveryphonenumber2():order.getDeliveryphonenumber1());
			}
			
			Order param = new Order();
			param.setDeliverycustomername(order.getCustomername());
			param.setDeliveryphonenumber1(order.getCustomerphonenumber());
			param.setDeliveryphonenumber2(order.getCustomerphonenumber());
			param.setProvidernumber(user.getProvidernumber());
			
			List<Order> customerList = orderService.getCustomerNumber(param);
			if (customerList.size() == 0) {
				orderService.insertCustomer(order);
			} else {
				order.setCustomernumber(customerList.get(0).getCustomernumber());
			}
			int customernumber = order.getCustomernumber();
			
			//배송고객 저장
			if ("".equals(order.getDeliveryphonenumber1()) && !"".contentEquals(order.getDeliveryphonenumber2())) {
				order.setDeliveryphonenumber1(order.getDeliveryphonenumber2());
			} else if (!"".equals(order.getDeliveryphonenumber1()) && "".contentEquals(order.getDeliveryphonenumber2())) {
				order.setDeliveryphonenumber2(order.getDeliveryphonenumber1());
			} 

			List<Order> deliveryList = orderService.getCustomerNumber(order);
			if (deliveryList.size() == 0) {
				orderService.insertDeliveryCustomer(order);
				int deliverycustomernumber = order.getCustomernumber();
				order.setCustomernumber(customernumber);
				order.setDeliverycustomernumber(deliverycustomernumber);
			} else {
				order.setDeliverycustomernumber(deliveryList.get(0).getCustomernumber());
			}
			
			//납부정보 저장
			orderService.insertPaymentInformation(order);
			
			//계약정보 셋팅
			if ("REGULARDELIVERY".equals(order.getChannelid())) {
				order.setContractterm("99");
				order.setRecurringdeliveryyn("Y");
				order.setDeliverycycle("OTHERMONTH");
				order.setDeliverycount("2");
				//order.setDeliveryday("");
				order.setRecurringinvoiceyn("Y");
				order.setTotaldeliverycount("99");
				order.setEffectenddatetime("99991231");
			} else {
				if (order.getProductname().contains("3개월")) { 
					order.setContractterm("3");
					order.setRecurringdeliveryyn("Y");
					order.setDeliverycycle("MONTH");
					order.setDeliverycount("2");
					order.setDeliveryday("1/15");
					order.setRecurringinvoiceyn("Y");
					order.setTotaldeliverycount("6");
					if (!"BASIC".equals(order.getChannelid())) {
						order.setCurrentdeliverycount("0");
					}	
				} else if (order.getProductname().contains("6개월")) {
					order.setContractterm("6");
					order.setRecurringdeliveryyn("Y");
					order.setDeliverycycle("MONTH");
					order.setDeliverycount("2");
					order.setDeliveryday("1/15");
					order.setRecurringinvoiceyn("Y");
					order.setTotaldeliverycount("12");
					if (!"BASIC".equals(order.getChannelid())) {
						order.setCurrentdeliverycount("0");
					}	
				} else if (order.getProductname().contains("12개월")) {
					order.setContractterm("12");
					order.setRecurringdeliveryyn("Y");
					order.setDeliverycycle("MONTH");
					order.setDeliverycount("2");
					order.setDeliveryday("1/15");
					order.setRecurringinvoiceyn("Y");
					order.setTotaldeliverycount("24");
					if (!"BASIC".equals(order.getChannelid())) {
						order.setCurrentdeliverycount("0");
					}	
				} else {
					order.setContractterm("1");
					order.setRecurringdeliveryyn("N");
					order.setDeliverycycle("");
					order.setDeliverycount("1");
					order.setRecurringinvoiceyn("N");
					order.setTotaldeliverycount("1");
					order.setCurrentdeliverycount("0");
					order.setDeliverydate(order.getRegistrationdatetime().substring(0, 8));
				}
			}
			order.setIntcontractterm(Integer.parseInt(order.getContractterm()));
			if ("BASIC".equals(order.getChannelid())) {
				order.setInttotaldeliverycount(Integer.parseInt(order.getTotaldeliverycount()) - Integer.parseInt(order.getCurrentdeliverycount()));
			} else {
				order.setInttotaldeliverycount(Integer.parseInt(order.getTotaldeliverycount()));
			}
			
			if (order.getProductname().contains("우편")) {
				order.setDeliverytype("POST");
				order.setDeliverycompany("POSTOFFICE");
			} else if (order.getProductname().contains("택배")) {
				order.setDeliverytype("PARCEL");
				if (order.getProvidernumber() == 10000001) {
					order.setDeliverycompany("EZADMIN");
				} else {
					order.setDeliverycompany("LOGEN");
				}
			} else if (order.getProductname().contains("각인")) {
				order.setDeliverytype("POST");
				order.setDeliverycompany("POSTOFFICE");
			} else if (!"".equals(order.getProductdescription1()) || !"".equals(order.getProductdescription2()) || !"".equals(order.getProductdescription3()) ||
				!"".equals(order.getProductdescription4()) || !"".equals(order.getProductdescription5())){
				order.setDeliverytype("POST");
				order.setDeliverycompany("POSTOFFICE");
			} else if ("REGULARDELIVERY".equals(order.getChannelid())) {
				order.setDeliverytype("POST");
				order.setDeliverycompany("POSTOFFICE");
			} else if ("(SET) 천연 유래성분 99.7%, 안전한 치약(30g)".equals(order.getProductname())){
				order.setDeliverytype("POST");
				order.setDeliverycompany("POSTOFFICE");
			} else {
				order.setDeliverytype("PARCEL");
				if (order.getProvidernumber() == 10000001) {
					order.setDeliverycompany("EZADMIN");
				} else {
					order.setDeliverycompany("LOGEN");
				}
			}
			
			order.setSubscribedatetime("".equals(order.getOrderdatetime())?order.getRegistrationdatetime().substring(0, 8):order.getOrderdatetime());
			
			//배송정보 셋팅
			order.setDeliverystate("BEFORE");
			order.setContractstate("ACTIVATION");
			
			if ("OTHERMONTH".equals(order.getDeliverycycle())) {
				Order deliveryDate = orderService.getDeliveryDate1(order);
				order.setDeliverydate(deliveryDate.getDeliverydate());
				order.setDeliverystartdatetime(deliveryDate.getDeliverystartdatetime());
				if (order.getEffectenddatetime()==null||"".equals(order.getEffectenddatetime())) order.setEffectenddatetime(deliveryDate.getEffectenddatetime());
				orderService.insertContract(order);
				orderService.insertDeliveryDetail1(order);
			} else if ("MONTH".equals(order.getDeliverycycle())) {
				order.setDeliveryday1("1");
				order.setDeliveryday2("15");
				Order deliveryDate = orderService.getDeliveryDate2(order);
				order.setDeliverydate1(deliveryDate.getDeliverydate1());
				order.setDeliverydate2(deliveryDate.getDeliverydate2());
				if ("BASIC".equals(order.getChannelid())) {
					order.setDeliverystartdatetime(order.getOrderdatetime());
					order.setEffectenddatetime(order.getEnddate());
					if (order.getTotaldeliverycount().equals(order.getCurrentdeliverycount())) {
						order.setContractstate("DONE");
					}
				} else {
					order.setDeliverystartdatetime(deliveryDate.getDeliverystartdatetime());
				}
				if (order.getEffectenddatetime()==null||"".equals(order.getEffectenddatetime())) order.setEffectenddatetime(deliveryDate.getEffectenddatetime());
				orderService.insertContract(order);
				orderService.insertDeliveryDetail2(order);
			} else {
				order.setDeliverystartdatetime(order.getDeliverydate());
				order.setEffectenddatetime(order.getDeliverydate());
				orderService.insertContract(order);
				orderService.insertDeliveryDetail(order);
			}
			
			orderService.insertContractProduct(order);
			
			orderService.dbCommit();
			
		} catch (Exception e) {
			orderService.dbRollback();
			throw e;
		} finally {
			orderService.setAutoCommitOn();
		}
		
		return result;
	}

	@RequestMapping(value = "/uploadorder", method = RequestMethod.POST)
	public int uploadOrder(@RequestParam(value="itemcodearray")String[] itemcode, @RequestParam(value="itemvaluearray")String[] itemvalue, Principal principal) {
		
		orderService.setAutoCommitOff();
		
		int result;
		
		try {
			User user = userService.readUser(principal.getName());
			Order curDate = orderService.getCurDate(null);
			
			Map<String,String> map = new HashMap<String,String>();
			for (int i=0; i<itemcode.length; i++) {
				map.put(itemcode[i], String.valueOf(i));
			};
			
			Order order = new Order();
			
			order.setProvidernumber(user.getProvidernumber());
			order.setChannelid(map.get("channelid") == null ? "":itemvalue[Integer.parseInt((String)map.get("channelid"))]);
			
			if (map.get("productordernumber") == null && map.get("ordernumber") == null) {
				Order orderNumber = orderService.getOrderNumber(order);
				order.setProductordernumber(orderNumber.getOrdernumber());
				order.setOrdernumber(orderNumber.getOrdernumber());
			} else if (map.get("productordernumber") == null) {
				order.setProductordernumber(itemvalue[Integer.parseInt((String)map.get("ordernumber"))]);
				order.setOrdernumber(itemvalue[Integer.parseInt((String)map.get("ordernumber"))]);
			} else {
				order.setProductordernumber(itemvalue[Integer.parseInt((String)map.get("productordernumber"))]);
				order.setOrdernumber(itemvalue[Integer.parseInt((String)map.get("ordernumber"))]);
			}	
			order.setRegistrationdatetime(curDate.getCurdate());
			order.setProcessstate("UPLOAD");
			order.setCustomername(map.get("customername") == null?"":itemvalue[Integer.parseInt((String)map.get("customername"))]);
			order.setCustomeremail(map.get("customeremail") == null ? "":itemvalue[Integer.parseInt((String)map.get("customeremail"))]);
			order.setCustomerid(map.get("customerid") == null ? "":itemvalue[Integer.parseInt((String)map.get("customerid"))]);
			order.setCustomertype(map.get("customertype") == null ? "":itemvalue[Integer.parseInt((String)map.get("customertype"))]);
			order.setSex(map.get("sex") == null ? "":itemvalue[Integer.parseInt((String)map.get("sex"))]);
			order.setDeliverycustomername(map.get("deliverycustomername") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverycustomername"))]);
			order.setDeliveryphonenumber1(map.get("deliveryphonenumber1") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryphonenumber1"))].replace("-", ""));
			order.setDeliveryphonenumber2(map.get("deliveryphonenumber2") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryphonenumber2"))].replace("-", ""));
			order.setDeliveryaddress(map.get("deliveryaddress") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryaddress"))]);
			order.setCustomerphonenumber(map.get("customerphonenumber") == null ? "":itemvalue[Integer.parseInt((String)map.get("customerphonenumber"))].replace("-", ""));
			order.setDeliveryzipcode(map.get("deliveryzipcode") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryzipcode"))].replace("-", ""));
			order.setOrderstate(map.get("orderstate") == null ? "":itemvalue[Integer.parseInt((String)map.get("orderstate"))]);
			order.setOrderdetailstate(map.get("orderdetailstate") == null ? "":itemvalue[Integer.parseInt((String)map.get("orderdetailstate"))]);
			order.setOrdertype(map.get("ordertype") == null ? "":itemvalue[Integer.parseInt((String)map.get("ordertype"))]);
			order.setOrderaddinfo(map.get("orderaddinfo") == null ? "":itemvalue[Integer.parseInt((String)map.get("orderaddinfo"))]);
			order.setOrderdatetime(map.get("orderdatetime") == null ? "":itemvalue[Integer.parseInt((String)map.get("orderdatetime"))].replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
			order.setProductnumber(map.get("productnumber") == null ? "":itemvalue[Integer.parseInt((String)map.get("productnumber"))]);
			order.setProductname(map.get("productname") == null ? "":itemvalue[Integer.parseInt((String)map.get("productname"))]);
			order.setOptioninfo(map.get("optioninfo") == null ? "":itemvalue[Integer.parseInt((String)map.get("optioninfo"))]);
			order.setQuantity(map.get("quantity") == null ? "1":itemvalue[Integer.parseInt((String)map.get("quantity"))].replace(",", ""));
			order.setPriceamount(map.get("priceamount") == null ? "":itemvalue[Integer.parseInt((String)map.get("priceamount"))].replace(",", ""));
			order.setTotalamount(map.get("totalamount") == null ? "":itemvalue[Integer.parseInt((String)map.get("totalamount"))].replace(",", ""));
			order.setAddproductname(map.get("addproductname") == null ? "":itemvalue[Integer.parseInt((String)map.get("addproductname"))]);
			order.setProductdescription1(map.get("productdescription1") == null ? "":itemvalue[Integer.parseInt((String)map.get("productdescription1"))]);
			order.setProductdescription2(map.get("productdescription2") == null ? "":itemvalue[Integer.parseInt((String)map.get("productdescription2"))]);
			order.setProductdescription3(map.get("productdescription3") == null ? "":itemvalue[Integer.parseInt((String)map.get("productdescription3"))]);
			order.setProductdescription4(map.get("productdescription4") == null ? "":itemvalue[Integer.parseInt((String)map.get("productdescription4"))]);
			order.setProductdescription5(map.get("productdescription5") == null ? "":itemvalue[Integer.parseInt((String)map.get("productdescription5"))]);
			order.setBigissuequantity(map.get("bigissuequantity") == null ? "":itemvalue[Integer.parseInt((String)map.get("bigissuequantity"))].replace(",", ""));
			order.setPaymentdate(map.get("paymentdate") == null ? "":itemvalue[Integer.parseInt((String)map.get("paymentdate"))].replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
			order.setPaymentmethod(map.get("paymentmethod") == null ? "":itemvalue[Integer.parseInt((String)map.get("paymentmethod"))]);
			order.setBankname(map.get("bankname") == null ? "":itemvalue[Integer.parseInt((String)map.get("bankname"))]);
			order.setCardexpirationdate(map.get("cardexpirationdate") == null ? "":itemvalue[Integer.parseInt((String)map.get("cardexpirationdate"))].replace("-", "").replace("/", "").replace(".", ""));
			order.setPaymentnumber(map.get("paymentnumber") == null ? "":itemvalue[Integer.parseInt((String)map.get("paymentnumber"))].replace("-", ""));
			order.setPaymentname(map.get("paymentname") == null ? "":itemvalue[Integer.parseInt((String)map.get("paymentname"))]);
			order.setDiscountamount(map.get("discountamount") == null ? "":itemvalue[Integer.parseInt((String)map.get("discountamount"))].replace(",", ""));
			order.setPaymentamount(map.get("paymentamount") == null ? "":itemvalue[Integer.parseInt((String)map.get("paymentamount"))].replace(",", ""));
			order.setDeliverymethod(map.get("deliverymethod") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverymethod"))]);
			order.setDeliverycompany(map.get("deliverycompany") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverycompany"))]);
			order.setTrackingnumber(map.get("trackingnumber") == null ? "":itemvalue[Integer.parseInt((String)map.get("trackingnumber"))]);
			order.setDeliverydate(map.get("deliverydate") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverydate"))].replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
			order.setDeliverychargetype(map.get("deliverychargetype") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverychargetype"))]);
			order.setDeliverychargeamount(map.get("deliverychargeamount") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverychargeamount"))].replace(",", ""));
			order.setDeliveryremark(map.get("deliveryremark") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryremark"))]);
			order.setEnddate(map.get("enddate") == null ? "":itemvalue[Integer.parseInt((String)map.get("enddate"))].replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
			order.setContractterm(map.get("contractterm") == null ? "":itemvalue[Integer.parseInt((String)map.get("contractterm"))]);
			order.setDeliverycycle(map.get("deliverycycle") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverycycle"))]);
			order.setDeliverycount(map.get("deliverycount") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverycount"))].replace(",", ""));
			order.setDeliveryday(map.get("deliveryday") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliveryday"))]);
			order.setDeliverytype(map.get("deliverytype") == null ? "":itemvalue[Integer.parseInt((String)map.get("deliverytype"))]);
			order.setTotaldeliverycount(map.get("totaldeliverycount") == null ? "":itemvalue[Integer.parseInt((String)map.get("totaldeliverycount"))].replace(",", ""));
			order.setCurrentdeliverycount(map.get("currentdeliverycount") == null ? "":itemvalue[Integer.parseInt((String)map.get("currentdeliverycount"))].replace(",", ""));
			order.setRemark(map.get("remark") == null ? "":itemvalue[Integer.parseInt((String)map.get("remark"))]);
			order.setRecurringdeliveryyn(map.get("recurringdeliveryyn") == null ? "":itemvalue[Integer.parseInt((String)map.get("recurringdeliveryyn"))]);
			order.setChannelkind(map.get("channelkind") == null ? "":itemvalue[Integer.parseInt((String)map.get("channelkind"))]);
			order.setEtcitem1(map.get("etcitem1") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem1"))]);
			order.setEtcitem2(map.get("etcitem2") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem2"))]);
			order.setEtcitem3(map.get("etcitem3") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem3"))]);
			order.setEtcitem4(map.get("etcitem4") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem4"))]);
			order.setEtcitem5(map.get("etcitem5") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem5"))]);
			order.setEtcitem6(map.get("etcitem6") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem6"))]);
			order.setEtcitem7(map.get("etcitem7") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem7"))]);
			order.setEtcitem8(map.get("etcitem8") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem8"))]);
			order.setEtcitem9(map.get("etcitem9") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem9"))]);
			order.setEtcitem10(map.get("etcitem10") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem10"))]);
			order.setEtcitem11(map.get("etcitem11") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem11"))]);
			order.setEtcitem12(map.get("etcitem12") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem12"))]);
			order.setEtcitem13(map.get("etcitem13") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem13"))]);
			order.setEtcitem14(map.get("etcitem14") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem14"))]);
			order.setEtcitem15(map.get("etcitem15") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem15"))]);
			order.setEtcitem16(map.get("etcitem16") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem16"))]);
			order.setEtcitem17(map.get("etcitem17") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem17"))]);
			order.setEtcitem18(map.get("etcitem18") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem18"))]);
			order.setEtcitem19(map.get("etcitem19") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem19"))]);
			order.setEtcitem20(map.get("etcitem20") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem20"))]);
			order.setEtcitem21(map.get("etcitem21") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem21"))]);
			order.setEtcitem22(map.get("etcitem22") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem22"))]);
			order.setEtcitem23(map.get("etcitem23") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem23"))]);
			order.setEtcitem24(map.get("etcitem24") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem24"))]);
			order.setEtcitem25(map.get("etcitem25") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem25"))]);
			order.setEtcitem26(map.get("etcitem26") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem26"))]);
			order.setEtcitem27(map.get("etcitem27") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem27"))]);
			order.setEtcitem28(map.get("etcitem28") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem28"))]);
			order.setEtcitem29(map.get("etcitem29") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem29"))]);
			order.setEtcitem30(map.get("etcitem30") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem30"))]);
			order.setEtcitem31(map.get("etcitem31") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem31"))]);
			order.setEtcitem32(map.get("etcitem32") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem32"))]);
			order.setEtcitem33(map.get("etcitem33") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem33"))]);
			order.setEtcitem34(map.get("etcitem34") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem34"))]);
			order.setEtcitem35(map.get("etcitem35") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem35"))]);
			order.setEtcitem36(map.get("etcitem36") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem36"))]);
			order.setEtcitem37(map.get("etcitem37") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem37"))]);
			order.setEtcitem38(map.get("etcitem38") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem38"))]);
			order.setEtcitem39(map.get("etcitem39") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem39"))]);
			order.setEtcitem40(map.get("etcitem40") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem40"))]);
			order.setEtcitem41(map.get("etcitem41") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem41"))]);
			order.setEtcitem42(map.get("etcitem42") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem42"))]);
			order.setEtcitem43(map.get("etcitem43") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem43"))]);
			order.setEtcitem44(map.get("etcitem44") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem44"))]);
			order.setEtcitem45(map.get("etcitem45") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem45"))]);
			order.setEtcitem46(map.get("etcitem46") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem46"))]);
			order.setEtcitem47(map.get("etcitem47") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem47"))]);
			order.setEtcitem48(map.get("etcitem48") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem48"))]);
			order.setEtcitem49(map.get("etcitem49") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem49"))]);
			order.setEtcitem50(map.get("etcitem50") == null ? "":itemvalue[Integer.parseInt((String)map.get("etcitem50"))]);
			order.setAuditid(user.getUsername());
			
			Order channelContractNumber = orderService.getChannelContractNumber(order);
			order.setChannelcontractnumber(channelContractNumber.getChannelcontractnumber());
			
			//판매정보 저장
			result = orderService.insertChannelContract(order);
			
			//배송주소 저장
			Order deliveryaddressid = orderService.getAddressid(order);
			order.setDeliveryaddressid(deliveryaddressid.getDeliveryaddressid());
			orderService.insertAddress(order);
			
			//고객정보 저장
			if ("".equals(order.getCustomername())) {
				order.setCustomername(order.getDeliverycustomername());
			}
			if ("".equals(order.getCustomerphonenumber())) {
				order.setCustomerphonenumber("".equals(order.getDeliveryphonenumber1())?order.getDeliveryphonenumber2():order.getDeliveryphonenumber1());
			}
			
			Order param = new Order();
			param.setDeliverycustomername(order.getCustomername());
			param.setDeliveryphonenumber1(order.getCustomerphonenumber());
			param.setDeliveryphonenumber2(order.getCustomerphonenumber());
			param.setProvidernumber(user.getProvidernumber());
			
			List<Order> customerList = orderService.getCustomerNumber(param);
			if (customerList.size() == 0) {
				orderService.insertCustomer(order);
			} else {
				order.setCustomernumber(customerList.get(0).getCustomernumber());
			}
			int customernumber = order.getCustomernumber();
			
			//배송고객 저장
			if ("".equals(order.getDeliveryphonenumber1()) && !"".contentEquals(order.getDeliveryphonenumber2())) {
				order.setDeliveryphonenumber1(order.getDeliveryphonenumber2());
			} else if (!"".equals(order.getDeliveryphonenumber1()) && "".contentEquals(order.getDeliveryphonenumber2())) {
				order.setDeliveryphonenumber2(order.getDeliveryphonenumber1());
			} 

			List<Order> deliveryList = orderService.getCustomerNumber(order);
			if (deliveryList.size() == 0) {
				orderService.insertDeliveryCustomer(order);
				int deliverycustomernumber = order.getCustomernumber();
				order.setCustomernumber(customernumber);
				order.setDeliverycustomernumber(deliverycustomernumber);
			} else {
				order.setDeliverycustomernumber(deliveryList.get(0).getCustomernumber());
			}
			
			//납부정보 저장
			orderService.insertPaymentInformation(order);
			
			//사업자별 정보 조회
			order.setCode("UPLOADCONDITION");
			List<Order> infoList = orderService.getProviderInformationByCode(order);

			//배송정보 셋팅
			Order infoOrder;
			String value = "";
			for (int i=0; i<infoList.size(); i++) {
				infoOrder = infoList.get(i);
				
				if ("productname".equals(infoOrder.getOptionvalue1())) value = order.getProductname();
				else if ("productdescription1".equals(infoOrder.getOptionvalue1())) value = order.getProductdescription1();
				else if ("productdescription2".equals(infoOrder.getOptionvalue1())) value = order.getProductdescription2();
				else if ("productdescription3".equals(infoOrder.getOptionvalue1())) value = order.getProductdescription3();
				else if ("productdescription4".equals(infoOrder.getOptionvalue1())) value = order.getProductdescription4();
				else if ("productdescription5".equals(infoOrder.getOptionvalue1())) value = order.getProductdescription5();
				else if ("channelid".equals(infoOrder.getOptionvalue1())) value = order.getChannelid();
				
				if ("default".equals(infoOrder.getOptioncode()) || 
				   ("contains".equals(infoOrder.getOptioncode()) && value.contains(infoOrder.getOptionvalue2())) || 
				   ("not equals".equals(infoOrder.getOptioncode()) && !infoOrder.getOptionvalue2().equals(value)) || 
				   ("equals".equals(infoOrder.getOptioncode()) && infoOrder.getOptionvalue2().equals(value))) {
					if ("contractterm".equals(infoOrder.getDetailcode())) order.setContractterm(infoOrder.getValue1());
					else if ("currentdeliverycount".equals(infoOrder.getDetailcode())) order.setCurrentdeliverycount(infoOrder.getValue1());
					else if ("deliverycompany".equals(infoOrder.getDetailcode())) order.setDeliverycompany(infoOrder.getValue1());
					else if ("deliverycount".equals(infoOrder.getDetailcode())) order.setDeliverycount(infoOrder.getValue1());
					else if ("deliverycycle".equals(infoOrder.getDetailcode())) order.setDeliverycycle(infoOrder.getValue1());
					else if ("deliveryday".equals(infoOrder.getDetailcode())) order.setDeliveryday(infoOrder.getValue1());
					else if ("deliverytype".equals(infoOrder.getDetailcode())) order.setDeliverytype(infoOrder.getValue1());
					else if ("effectenddatetime".equals(infoOrder.getDetailcode())) order.setEffectenddatetime(infoOrder.getValue1());
					else if ("recurringdeliveryyn".equals(infoOrder.getDetailcode())) order.setRecurringdeliveryyn(infoOrder.getValue1());
					else if ("recurringinvoiceyn".equals(infoOrder.getDetailcode())) order.setRecurringinvoiceyn(infoOrder.getValue1());
					else if ("totaldeliverycount".equals(infoOrder.getDetailcode())) order.setTotaldeliverycount(infoOrder.getValue1());
				}
			}
			
			if ("N".equals(order.getRecurringdeliveryyn())) {
				order.setDeliverydate(order.getRegistrationdatetime().substring(0, 8));
			}
			
			order.setIntcontractterm(Integer.parseInt(order.getContractterm()));
			if ("BASIC".equals(order.getChannelid())) {
				order.setInttotaldeliverycount(Integer.parseInt(order.getTotaldeliverycount()) - Integer.parseInt(order.getCurrentdeliverycount()));
			} else {
				order.setInttotaldeliverycount(Integer.parseInt(order.getTotaldeliverycount()));
			}
			
			order.setSubscribedatetime("".equals(order.getOrderdatetime())?order.getRegistrationdatetime().substring(0, 8):order.getOrderdatetime());
			
			//배송정보 셋팅
			order.setDeliverystate("BEFORE");
			order.setContractstate("ACTIVATION");
			
			if ("OTHERMONTH".equals(order.getDeliverycycle())) {
				Order deliveryDate = orderService.getDeliveryDate1(order);
				order.setDeliverydate(deliveryDate.getDeliverydate());
				order.setDeliverystartdatetime(deliveryDate.getDeliverystartdatetime());
				if (order.getEffectenddatetime()==null||"".equals(order.getEffectenddatetime())) order.setEffectenddatetime(deliveryDate.getEffectenddatetime());
				orderService.insertContract(order);
				orderService.insertDeliveryDetail1(order);
			} else if ("MONTH".equals(order.getDeliverycycle())) {
				if ("1".equals(order.getDeliverycount())) {
					Order deliveryDate = orderService.getDeliveryDate1(order);
					order.setDeliverydate(deliveryDate.getDeliverydate());
					order.setDeliverystartdatetime(deliveryDate.getDeliverystartdatetime());
					if (order.getEffectenddatetime()==null||"".equals(order.getEffectenddatetime())) order.setEffectenddatetime(deliveryDate.getEffectenddatetime());
					orderService.insertContract(order);
					orderService.insertDeliveryDetail1(order);
				} else if ("2".equals(order.getDeliverycount())) {
					order.setDeliveryday1(order.getDeliveryday().split("/")[0]);
					order.setDeliveryday2(order.getDeliveryday().split("/")[1]);
					Order deliveryDate = orderService.getDeliveryDate2(order);
					order.setDeliverydate1(deliveryDate.getDeliverydate1());
					order.setDeliverydate2(deliveryDate.getDeliverydate2());
					if ("BASIC".equals(order.getChannelid())) {
						order.setDeliverystartdatetime(order.getOrderdatetime());
						order.setEffectenddatetime(order.getEnddate());
						if (order.getTotaldeliverycount().equals(order.getCurrentdeliverycount())) {
							order.setContractstate("DONE");
						}
					} else {
						order.setDeliverystartdatetime(deliveryDate.getDeliverystartdatetime());
					}
					if (order.getEffectenddatetime()==null||"".equals(order.getEffectenddatetime())) order.setEffectenddatetime(deliveryDate.getEffectenddatetime());
					orderService.insertContract(order);
					orderService.insertDeliveryDetail2(order);
				}
			} else {
				order.setDeliverystartdatetime(order.getDeliverydate());
				order.setEffectenddatetime(order.getDeliverydate());
				orderService.insertContract(order);
				orderService.insertDeliveryDetail(order);
			}
			
			orderService.insertContractProduct(order);
			
			orderService.dbCommit();
			
		} catch (Exception e) {
			orderService.dbRollback();
			throw e;
		} finally {
			orderService.setAutoCommitOn();
		}
		
		return result;
	}
	*/

	@RequestMapping(value = "/uploadorder", method = RequestMethod.POST)
	public Map<String,String> uploadOrder(HttpServletRequest request, Model model, Principal principal) throws Exception{
		
		String result = "";
		String channelid = "";
		int totalCnt = 0;
		int successCnt = 0;
		int errorCnt = 0;
		Map<String,String> resultmap = new HashMap<String,String>();
		
		MultipartHttpServletRequest servletRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> excelFile = servletRequest.getFileMap();
		Iterator<Entry<String, MultipartFile>> iterator = excelFile.entrySet().iterator();
		
		MultipartFile multipartFile = null;
		InputStream is = null;
		
		while(iterator.hasNext()) {
			Entry<String, MultipartFile> entry = iterator.next();
			channelid = entry.getKey();
			multipartFile = entry.getValue();
			if (multipartFile.getSize() == 0) {
				continue;
			}
			is = multipartFile.getInputStream();
			
			Workbook wb = WorkbookFactory.create(is);
			
			User user = userService.readUser(principal.getName());
			Order itemParam = new Order();
			itemParam.setProvidernumber(user.getProvidernumber());
			
			int rowCnt = 0;
			int cellCnt = 0;
			
			Sheet sheet = wb.getSheetAt(0);
			rowCnt = sheet.getPhysicalNumberOfRows();
			if (rowCnt > 0) {
				cellCnt = sheet.getRow(0).getPhysicalNumberOfCells();
			} else {
				continue;
			}
			
			Map<String, String> map = new HashMap<String, String>();
			itemParam.setChannelid(channelid);
			List<Order> channelItemList = orderService.getChannelItemList(itemParam);
			
			if (cellCnt != channelItemList.size()) {
				result = result + "* " + channelid + " 업로드 파일의 CELL 갯수가 일치하지 않습니다. 확인후 업로드 하십시오.\n";
				wb.close();
				continue;
			}
			
			for (int i=1; i<rowCnt; i++) {
				
				Order order = new Order();
				Row row = sheet.getRow(i);
				
				if (row != null) {
					for (int j=0; j<cellCnt; j++) {
						String value = "";
						Cell cell = row.getCell(j);
						
						if (cell != null) {
							switch(cell.getCellType()) {
								case FORMULA : 
									value = cell.getCellFormula();
									break;
								case NUMERIC : 
									value = String.valueOf(cell.getNumericCellValue());
									if (".0".equals(value.substring(value.length()-2, value.length()))) value = value.replace(".0", "");
									break;
								case STRING : 
									value = String.valueOf(cell.getStringCellValue());
									break;
								case ERROR : 
									value = String.valueOf(cell.getErrorCellValue());
									break;
								default :
									value = String.valueOf(cell.getStringCellValue());
							}
							map.put(channelItemList.get(j).getItemcode(), value);
						} else {
							map.put(channelItemList.get(j).getItemcode(), "");
						}
					}
					
					if ("".equals(map.get("deliverycustomername")) && "".equals(map.get("deliveryphonenumber1")) && "".equals(map.get("deliveryaddress")) && ("".equals(map.get("productname")))) {
						continue;
					}
				} else {
					continue;
				}
				
				try {
					orderService.setAutoCommitOff();
					
					totalCnt = totalCnt + 1;
					
					//업로드 값 셋팅
					order = setUploadOrder(map, channelid, user);
					
					//계약번호 셋팅
					Order channelContractNumber = orderService.getChannelContractNumber(order);
					order.setChannelcontractnumber(channelContractNumber.getChannelcontractnumber());
					
					//판매정보 저장
					orderService.insertChannelContract(order);
					
					//배송주소 저장
					Order deliveryaddressid = orderService.getAddressid(order);
					order.setDeliveryaddressid(deliveryaddressid.getDeliveryaddressid());
					orderService.insertAddress(order);
					
					//고객정보 저장
					if ("".equals(order.getCustomername())) {
						order.setCustomername(order.getDeliverycustomername());
					}
					if ("".equals(order.getCustomerphonenumber())) {
						order.setCustomerphonenumber("".equals(order.getDeliveryphonenumber1())?order.getDeliveryphonenumber2():order.getDeliveryphonenumber1());
					}
					
					Order param = new Order();
					param.setDeliverycustomername(order.getCustomername());
					param.setDeliveryphonenumber1(order.getCustomerphonenumber());
					param.setDeliveryphonenumber2(order.getCustomerphonenumber());
					param.setProvidernumber(user.getProvidernumber());
					
					List<Order> customerList = orderService.getCustomerNumber(param);
					if (customerList.size() == 0) {
						orderService.insertCustomer(order);
					} else {
						order.setCustomernumber(customerList.get(0).getCustomernumber());
					}
					int customernumber = order.getCustomernumber();
					
					//배송고객 저장
					if ("".equals(order.getDeliveryphonenumber1()) && !"".contentEquals(order.getDeliveryphonenumber2())) {
						order.setDeliveryphonenumber1(order.getDeliveryphonenumber2());
					} else if (!"".equals(order.getDeliveryphonenumber1()) && "".contentEquals(order.getDeliveryphonenumber2())) {
						order.setDeliveryphonenumber2(order.getDeliveryphonenumber1());
					} 
		
					List<Order> deliveryList = orderService.getCustomerNumber(order);
					if (deliveryList.size() == 0) {
						orderService.insertDeliveryCustomer(order);
						int deliverycustomernumber = order.getCustomernumber();
						order.setCustomernumber(customernumber);
						order.setDeliverycustomernumber(deliverycustomernumber);
					} else {
						order.setDeliverycustomernumber(deliveryList.get(0).getCustomernumber());
					}
					
					//납부정보 저장
					orderService.insertPaymentInformation(order);
					
					//사업자별 정보 조회
					order.setCode("UPLOADCONDITION");
					List<Order> infoList = orderService.getProviderInformationByCode(order);
		
					//배송정보 셋팅
					Order infoOrder;
					String value = "";
					
					for (int k=0; k<infoList.size(); k++) {
						infoOrder = infoList.get(k);
						
						if ("productname".equals(infoOrder.getOptionvalue1())) value = order.getProductname();
						else if ("productdescription1".equals(infoOrder.getOptionvalue1())) value = order.getProductdescription1();
						else if ("productdescription2".equals(infoOrder.getOptionvalue1())) value = order.getProductdescription2();
						else if ("productdescription3".equals(infoOrder.getOptionvalue1())) value = order.getProductdescription3();
						else if ("productdescription4".equals(infoOrder.getOptionvalue1())) value = order.getProductdescription4();
						else if ("productdescription5".equals(infoOrder.getOptionvalue1())) value = order.getProductdescription5();
						else if ("channelid".equals(infoOrder.getOptionvalue1())) value = order.getChannelid();
						
						if ("default".equals(infoOrder.getOptioncode()) || 
						   ("contains".equals(infoOrder.getOptioncode()) && value.contains(infoOrder.getOptionvalue2())) || 
						   ("not equals".equals(infoOrder.getOptioncode()) && !infoOrder.getOptionvalue2().equals(value)) || 
						   ("equals".equals(infoOrder.getOptioncode()) && infoOrder.getOptionvalue2().equals(value))) {
							if ("contractterm".equals(infoOrder.getDetailcode())) order.setContractterm(infoOrder.getValue1());
							else if ("currentdeliverycount".equals(infoOrder.getDetailcode())) order.setCurrentdeliverycount(infoOrder.getValue1());
							else if ("deliverycompany".equals(infoOrder.getDetailcode())) order.setDeliverycompany(infoOrder.getValue1());
							else if ("deliverycount".equals(infoOrder.getDetailcode())) order.setDeliverycount(infoOrder.getValue1());
							else if ("deliverycycle".equals(infoOrder.getDetailcode())) order.setDeliverycycle(infoOrder.getValue1());
							else if ("deliveryday".equals(infoOrder.getDetailcode())) order.setDeliveryday(infoOrder.getValue1());
							else if ("deliverytype".equals(infoOrder.getDetailcode())) order.setDeliverytype(infoOrder.getValue1());
							else if ("effectenddatetime".equals(infoOrder.getDetailcode())) order.setEffectenddatetime(infoOrder.getValue1());
							else if ("recurringdeliveryyn".equals(infoOrder.getDetailcode())) order.setRecurringdeliveryyn(infoOrder.getValue1());
							else if ("recurringinvoiceyn".equals(infoOrder.getDetailcode())) order.setRecurringinvoiceyn(infoOrder.getValue1());
							else if ("totaldeliverycount".equals(infoOrder.getDetailcode())) order.setTotaldeliverycount(infoOrder.getValue1());
						}
					}
					
					if ("N".equals(order.getRecurringdeliveryyn())) {
						order.setDeliverydate(order.getRegistrationdatetime().substring(0, 8));
					}
					
					order.setIntcontractterm(Integer.parseInt(order.getContractterm()));
					if ("BASIC".equals(order.getChannelid())) {
						order.setInttotaldeliverycount(Integer.parseInt(order.getTotaldeliverycount()) - Integer.parseInt(order.getCurrentdeliverycount()));
					} else {
						order.setInttotaldeliverycount(Integer.parseInt(order.getTotaldeliverycount()));
					}
					
					order.setSubscribedatetime("".equals(order.getOrderdatetime())?order.getRegistrationdatetime().substring(0, 8):order.getOrderdatetime());
					
					//배송정보 저장
					order.setDeliverystate("BEFORE");
					order.setContractstate("ACTIVATION");
					
					if ("OTHERMONTH".equals(order.getDeliverycycle())) {
						Order deliveryDate = orderService.getDeliveryDate1(order);
						order.setDeliverydate(deliveryDate.getDeliverydate());
						order.setDeliverystartdatetime(deliveryDate.getDeliverystartdatetime());
						if (order.getEffectenddatetime()==null||"".equals(order.getEffectenddatetime())) order.setEffectenddatetime(deliveryDate.getEffectenddatetime());
						orderService.insertContract(order);
						orderService.insertDeliveryDetail1(order);
					} else if ("MONTH".equals(order.getDeliverycycle())) {
						if ("1".equals(order.getDeliverycount())) {
							Order deliveryDate = orderService.getDeliveryDate1(order);
							order.setDeliverydate(deliveryDate.getDeliverydate());
							order.setDeliverystartdatetime(deliveryDate.getDeliverystartdatetime());
							if (order.getEffectenddatetime()==null||"".equals(order.getEffectenddatetime())) order.setEffectenddatetime(deliveryDate.getEffectenddatetime());
							orderService.insertContract(order);
							orderService.insertDeliveryDetail1(order);
						} else if ("2".equals(order.getDeliverycount())) {
							order.setDeliveryday1(order.getDeliveryday().split("/")[0]);
							order.setDeliveryday2(order.getDeliveryday().split("/")[1]);
							Order deliveryDate = orderService.getDeliveryDate2(order);
							order.setDeliverydate1(deliveryDate.getDeliverydate1());
							order.setDeliverydate2(deliveryDate.getDeliverydate2());
							if ("BASIC".equals(order.getChannelid())) {
								order.setDeliverystartdatetime(order.getOrderdatetime());
								order.setEffectenddatetime(order.getEnddate());
								if (order.getTotaldeliverycount().equals(order.getCurrentdeliverycount())) {
									order.setContractstate("DONE");
								}
							} else {
								order.setDeliverystartdatetime(deliveryDate.getDeliverystartdatetime());
							}
							if (order.getEffectenddatetime()==null||"".equals(order.getEffectenddatetime())) order.setEffectenddatetime(deliveryDate.getEffectenddatetime());
							orderService.insertContract(order);
							orderService.insertDeliveryDetail2(order);
						}
					} else {
						order.setDeliverystartdatetime(order.getDeliverydate());
						order.setEffectenddatetime(order.getDeliverydate());
						orderService.insertContract(order);
						orderService.insertDeliveryDetail(order);
					}
					
					orderService.insertContractProduct(order);

					orderService.dbCommit();
					successCnt = successCnt + 1;
					
				} catch (Exception e) {
					orderService.dbRollback();
					result = result + order.getChannelid() + " : " + i + "행 (고객명 : " + order.getCustomername() + ")\n";
					errorCnt = errorCnt + 1;
					System.out.println(result);
					e.printStackTrace();
				} finally {
					orderService.setAutoCommitOn();
				}
			} //for
			
			wb.close();
		} //while
		
		result = "총 "+totalCnt+"건중 성공 "+successCnt+"건, 실패 "+errorCnt+"건 처리됐습니다.\n실패내역 :\n"+result;
		resultmap.put("resultmessage", result);
		
		return resultmap;
	}
	
	private Order setUploadOrder(Map<String, String> map, String channelid, User user) {
		Order curDate = orderService.getCurDate(null);
		Order order = new Order();
		
		order.setProvidernumber(user.getProvidernumber());
		order.setChannelid(channelid);
		
		if (map.get("productordernumber") == null && map.get("ordernumber") == null) {
			Order orderNumber = orderService.getOrderNumber(order);
			order.setProductordernumber(orderNumber.getOrdernumber());
			order.setOrdernumber(orderNumber.getOrdernumber());
		} else if (map.get("productordernumber") == null) {
			order.setProductordernumber((String)map.get("ordernumber"));
			order.setOrdernumber((String)map.get("ordernumber"));
		} else {
			order.setProductordernumber((String)map.get("productordernumber"));
			order.setOrdernumber((String)map.get("ordernumber"));
		}	
		order.setRegistrationdatetime(curDate.getCurdate());
		order.setProcessstate("UPLOAD");
		order.setCustomername(map.get("customername") == null?"":(String)map.get("customername"));
		order.setCustomeremail(map.get("customeremail") == null ? "":(String)map.get("customeremail"));
		order.setCustomerid(map.get("customerid") == null ? "":(String)map.get("customerid"));
		order.setCustomertype(map.get("customertype") == null ? "":(String)map.get("customertype"));
		order.setSex(map.get("sex") == null ? "":(String)map.get("sex"));
		order.setDeliverycustomername(map.get("deliverycustomername") == null ? "":(String)map.get("deliverycustomername"));
		order.setDeliveryphonenumber1(map.get("deliveryphonenumber1") == null ? "":((String)map.get("deliveryphonenumber1")).replace("-", ""));
		order.setDeliveryphonenumber2(map.get("deliveryphonenumber2") == null ? "":((String)map.get("deliveryphonenumber2")).replace("-", ""));
		order.setDeliveryaddress(map.get("deliveryaddress") == null ? "":(String)map.get("deliveryaddress"));
		order.setCustomerphonenumber(map.get("customerphonenumber") == null ? "":((String)map.get("customerphonenumber")).replace("-", ""));
		order.setDeliveryzipcode(map.get("deliveryzipcode") == null ? "":((String)map.get("deliveryzipcode")).replace("-", ""));
		order.setOrderstate(map.get("orderstate") == null ? "":(String)map.get("orderstate"));
		order.setOrderdetailstate(map.get("orderdetailstate") == null ? "":(String)map.get("orderdetailstate"));
		order.setOrdertype(map.get("ordertype") == null ? "":(String)map.get("ordertype"));
		order.setOrderaddinfo(map.get("orderaddinfo") == null ? "":(String)map.get("orderaddinfo"));
		order.setOrderdatetime(map.get("orderdatetime") == null ? "":((String)map.get("orderdatetime")).replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
		order.setProductnumber(map.get("productnumber") == null ? "":(String)map.get("productnumber"));
		order.setProductname(map.get("productname") == null ? "":(String)map.get("productname"));
		order.setOptioninfo(map.get("optioninfo") == null ? "":(String)map.get("optioninfo"));
		order.setQuantity(map.get("quantity") == null ? "1":((String)map.get("quantity")).replace(",", ""));
		order.setPriceamount(map.get("priceamount") == null ? "":((String)map.get("priceamount")).replace(",", ""));
		order.setTotalamount(map.get("totalamount") == null ? "":((String)map.get("totalamount")).replace(",", ""));
		order.setAddproductname(map.get("addproductname") == null ? "":(String)map.get("addproductname"));
		order.setProductdescription1(map.get("productdescription1") == null ? "":(String)map.get("productdescription1"));
		order.setProductdescription2(map.get("productdescription2") == null ? "":(String)map.get("productdescription2"));
		order.setProductdescription3(map.get("productdescription3") == null ? "":(String)map.get("productdescription3"));
		order.setProductdescription4(map.get("productdescription4") == null ? "":(String)map.get("productdescription4"));
		order.setProductdescription5(map.get("productdescription5") == null ? "":(String)map.get("productdescription5"));
		order.setBigissuequantity(map.get("bigissuequantity") == null ? "":((String)map.get("bigissuequantity")).replace(",", ""));
		order.setPaymentdate(map.get("paymentdate") == null ? "":((String)map.get("paymentdate")).replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
		order.setPaymentmethod(map.get("paymentmethod") == null ? "":(String)map.get("paymentmethod"));
		order.setBankname(map.get("bankname") == null ? "":(String)map.get("bankname"));
		order.setCardexpirationdate(map.get("cardexpirationdate") == null ? "":((String)map.get("cardexpirationdate")).replace("-", "").replace("/", "").replace(".", ""));
		order.setPaymentnumber(map.get("paymentnumber") == null ? "":((String)map.get("paymentnumber")).replace("-", ""));
		order.setPaymentname(map.get("paymentname") == null ? "":(String)map.get("paymentname"));
		order.setDiscountamount(map.get("discountamount") == null ? "":((String)map.get("discountamount")).replace(",", ""));
		order.setPaymentamount(map.get("paymentamount") == null ? "":((String)map.get("paymentamount")).replace(",", ""));
		order.setDeliverymethod(map.get("deliverymethod") == null ? "":(String)map.get("deliverymethod"));
		order.setDeliverycompany(map.get("deliverycompany") == null ? "":(String)map.get("deliverycompany"));
		order.setTrackingnumber(map.get("trackingnumber") == null ? "":(String)map.get("trackingnumber"));
		order.setDeliverydate(map.get("deliverydate") == null ? "":((String)map.get("deliverydate")).replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
		order.setDeliverychargetype(map.get("deliverychargetype") == null ? "":(String)map.get("deliverychargetype"));
		order.setDeliverychargeamount(map.get("deliverychargeamount") == null ? "":((String)map.get("deliverychargeamount")).replace(",", ""));
		order.setDeliveryremark(map.get("deliveryremark") == null ? "":(String)map.get("deliveryremark"));
		order.setEnddate(map.get("enddate") == null ? "":((String)map.get("enddate")).replace("-", "").replace("/", "").replace(":", "").replace(".", ""));
		order.setContractterm(map.get("contractterm") == null ? "":(String)map.get("contractterm"));
		order.setDeliverycycle(map.get("deliverycycle") == null ? "":(String)map.get("deliverycycle"));
		order.setDeliverycount(map.get("deliverycount") == null ? "":((String)map.get("deliverycount")).replace(",", ""));
		order.setDeliveryday(map.get("deliveryday") == null ? "":(String)map.get("deliveryday"));
		order.setDeliverytype(map.get("deliverytype") == null ? "":(String)map.get("deliverytype"));
		order.setTotaldeliverycount(map.get("totaldeliverycount") == null ? "":((String)map.get("totaldeliverycount")).replace(",", ""));
		order.setCurrentdeliverycount(map.get("currentdeliverycount") == null ? "":((String)map.get("currentdeliverycount")).replace(",", ""));
		order.setRemark(map.get("remark") == null ? "":(String)map.get("remark"));
		order.setRecurringdeliveryyn(map.get("recurringdeliveryyn") == null ? "":(String)map.get("recurringdeliveryyn"));
		order.setChannelkind(map.get("channelkind") == null ? "":(String)map.get("channelkind"));
		order.setEtcitem1(map.get("etcitem1") == null ? "":(String)map.get("etcitem1"));
		order.setEtcitem2(map.get("etcitem2") == null ? "":(String)map.get("etcitem2"));
		order.setEtcitem3(map.get("etcitem3") == null ? "":(String)map.get("etcitem3"));
		order.setEtcitem4(map.get("etcitem4") == null ? "":(String)map.get("etcitem4"));
		order.setEtcitem5(map.get("etcitem5") == null ? "":(String)map.get("etcitem5"));
		order.setEtcitem6(map.get("etcitem6") == null ? "":(String)map.get("etcitem6"));
		order.setEtcitem7(map.get("etcitem7") == null ? "":(String)map.get("etcitem7"));
		order.setEtcitem8(map.get("etcitem8") == null ? "":(String)map.get("etcitem8"));
		order.setEtcitem9(map.get("etcitem9") == null ? "":(String)map.get("etcitem9"));
		order.setEtcitem10(map.get("etcitem10") == null ? "":(String)map.get("etcitem10"));
		order.setEtcitem11(map.get("etcitem11") == null ? "":(String)map.get("etcitem11"));
		order.setEtcitem12(map.get("etcitem12") == null ? "":(String)map.get("etcitem12"));
		order.setEtcitem13(map.get("etcitem13") == null ? "":(String)map.get("etcitem13"));
		order.setEtcitem14(map.get("etcitem14") == null ? "":(String)map.get("etcitem14"));
		order.setEtcitem15(map.get("etcitem15") == null ? "":(String)map.get("etcitem15"));
		order.setEtcitem16(map.get("etcitem16") == null ? "":(String)map.get("etcitem16"));
		order.setEtcitem17(map.get("etcitem17") == null ? "":(String)map.get("etcitem17"));
		order.setEtcitem18(map.get("etcitem18") == null ? "":(String)map.get("etcitem18"));
		order.setEtcitem19(map.get("etcitem19") == null ? "":(String)map.get("etcitem19"));
		order.setEtcitem20(map.get("etcitem20") == null ? "":(String)map.get("etcitem20"));
		order.setEtcitem21(map.get("etcitem21") == null ? "":(String)map.get("etcitem21"));
		order.setEtcitem22(map.get("etcitem22") == null ? "":(String)map.get("etcitem22"));
		order.setEtcitem23(map.get("etcitem23") == null ? "":(String)map.get("etcitem23"));
		order.setEtcitem24(map.get("etcitem24") == null ? "":(String)map.get("etcitem24"));
		order.setEtcitem25(map.get("etcitem25") == null ? "":(String)map.get("etcitem25"));
		order.setEtcitem26(map.get("etcitem26") == null ? "":(String)map.get("etcitem26"));
		order.setEtcitem27(map.get("etcitem27") == null ? "":(String)map.get("etcitem27"));
		order.setEtcitem28(map.get("etcitem28") == null ? "":(String)map.get("etcitem28"));
		order.setEtcitem29(map.get("etcitem29") == null ? "":(String)map.get("etcitem29"));
		order.setEtcitem30(map.get("etcitem30") == null ? "":(String)map.get("etcitem30"));
		order.setEtcitem31(map.get("etcitem31") == null ? "":(String)map.get("etcitem31"));
		order.setEtcitem32(map.get("etcitem32") == null ? "":(String)map.get("etcitem32"));
		order.setEtcitem33(map.get("etcitem33") == null ? "":(String)map.get("etcitem33"));
		order.setEtcitem34(map.get("etcitem34") == null ? "":(String)map.get("etcitem34"));
		order.setEtcitem35(map.get("etcitem35") == null ? "":(String)map.get("etcitem35"));
		order.setEtcitem36(map.get("etcitem36") == null ? "":(String)map.get("etcitem36"));
		order.setEtcitem37(map.get("etcitem37") == null ? "":(String)map.get("etcitem37"));
		order.setEtcitem38(map.get("etcitem38") == null ? "":(String)map.get("etcitem38"));
		order.setEtcitem39(map.get("etcitem39") == null ? "":(String)map.get("etcitem39"));
		order.setEtcitem40(map.get("etcitem40") == null ? "":(String)map.get("etcitem40"));
		order.setEtcitem41(map.get("etcitem41") == null ? "":(String)map.get("etcitem41"));
		order.setEtcitem42(map.get("etcitem42") == null ? "":(String)map.get("etcitem42"));
		order.setEtcitem43(map.get("etcitem43") == null ? "":(String)map.get("etcitem43"));
		order.setEtcitem44(map.get("etcitem44") == null ? "":(String)map.get("etcitem44"));
		order.setEtcitem45(map.get("etcitem45") == null ? "":(String)map.get("etcitem45"));
		order.setEtcitem46(map.get("etcitem46") == null ? "":(String)map.get("etcitem46"));
		order.setEtcitem47(map.get("etcitem47") == null ? "":(String)map.get("etcitem47"));
		order.setEtcitem48(map.get("etcitem48") == null ? "":(String)map.get("etcitem48"));
		order.setEtcitem49(map.get("etcitem49") == null ? "":(String)map.get("etcitem49"));
		order.setEtcitem50(map.get("etcitem50") == null ? "":(String)map.get("etcitem50"));
		order.setAuditid(user.getUsername());
		
		return order;
	}

	@RequestMapping(value = "/orderlist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewOrderList(Model model, Principal principal) {
		
		User user = userService.readUser(principal.getName());
		model.addAttribute("displayproductdescription",user.getProvidernumber()==10000001?"Y":"N");
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/order/orderlist");
		return modelAndView;
	}	

	@RequestMapping(value = "/searchbarorder", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewSearchbarOrder(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		Order param = new Order();
		User user = userService.readUser(principal.getName());
		param.setProvidernumber(user.getProvidernumber());
		param.setCode("CHANNEL");
		param.setDetailcode("CHANNEL");
		param.setEffectdateflag("N");
		List<Order> codeList = orderService.getProviderInformation(param);
		model.addAttribute("channelList",codeList);
		
		modelAndView.setViewName("admin/order/searchbarorder");
		return modelAndView;
	}	

	@RequestMapping(value = "/getorderlist", method = RequestMethod.GET)
	public Map getContractList(@ModelAttribute Order order, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());

		order.setProvidernumber(user.getProvidernumber());
		
		List<Order> list = orderService.getContractList(order);

		Criteria cri = order;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalcount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker);
		map.put("displayproductdescription",user.getProvidernumber()==10000001?"Y":"N");
		
		return map;
	}	

	@RequestMapping(value = "/deletechannelcontract", method = RequestMethod.POST)
	public Map deleteChannelContract(@RequestParam(value="connumber")String[] connumber, Principal principal) {
		
		Map result = new HashMap();

		User user = userService.readUser(principal.getName());

		int doneCnt = 0;
		int totalCnt = connumber.length;
		int successCnt = 0;

		for (int i=0; i<connumber.length; i++) {
			Order order = new Order();
			order.setConnumber(Integer.parseInt(connumber[i]));
			
			List<Order> deleteContract = orderService.getDeleteContract(order);
			
			if (deleteContract.size() > 0) {
				Order param = deleteContract.get(0);
				
				if ("DONE".equals(param.getDeliverystate())) {
					doneCnt = doneCnt + 1;
					continue;
				}
				
				param.setProvidernumber(user.getProvidernumber());

				orderService.deleteChannelContract(param);
				orderService.deleteContract(param);
				orderService.deleteContractProduct(param);
				orderService.deleteDeliveryDetail(param);
				orderService.deletePaymentInformation(param);			

				successCnt = successCnt + 1;
			} 
		}

		result.put("totalCnt", totalCnt);
		result.put("successCnt", successCnt);
		result.put("doneCnt", doneCnt);
		
		return result;
	}	
	
	@RequestMapping(value = "/deletechannelcontractall", method = RequestMethod.POST)
	public Map deleteChannelContractAll(@ModelAttribute Order order, Model model, Principal principal) {
		
		Map result = new HashMap();

		User user = userService.readUser(principal.getName());
		order.setProvidernumber(user.getProvidernumber());
		
		List<Order> list = orderService.getDeleteChannelContract(order);
		
		int doneCnt = 0;
		int totalCnt = list.size();
		int successCnt = 0;
		
		for (int i=0; i<list.size(); i++) {
			List<Order> deleteContract = orderService.getDeleteContract(list.get(i));
			if (deleteContract.size() > 0) {
				Order param = deleteContract.get(0);
				
				if ("DONE".equals(param.getDeliverystate())) {
					doneCnt = doneCnt + 1;
					continue;
				}
				
				param.setProvidernumber(user.getProvidernumber());

				orderService.deleteChannelContract(param);
				orderService.deleteContract(param);
				orderService.deleteContractProduct(param);
				orderService.deleteDeliveryDetail(param);
				orderService.deletePaymentInformation(param);			

				successCnt = successCnt + 1;
			} 
		}
		
		result.put("totalCnt", totalCnt);
		result.put("successCnt", successCnt);
		result.put("doneCnt", doneCnt);
		
		return result;
	}	

	@RequestMapping(value = "/delivery", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDelivery(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/order/delivery");
		return modelAndView;
	}	

	@RequestMapping(value = "/deliverymenu", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDeliveryMenu(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/order/deliverymenu");
		return modelAndView;
	}	

	@RequestMapping(value = "/deliverylist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDeliveryList(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/order/deliverylist");
		User user = userService.readUser(principal.getName());
		model.addAttribute("displayproductdescription",user.getProvidernumber()==10000001?"Y":"N");
		return modelAndView;
	}	

	@RequestMapping(value = "/searchbardelivery", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewSearchbarDelivery(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		User user = userService.readUser(principal.getName());

		Order param = new Order();
		param.setCodegroupid("DELIVERYTYPE");
		List<Order> codeList = orderService.getCode(param);
		model.addAttribute("codeList",codeList);
		
		Order curDate = orderService.getCurDate(null);
		
		List<Order> deliveryYearList = new ArrayList();
		for (int i=2019; i<Integer.parseInt(curDate.getCurdate().substring(0, 4))+5; i++) {
			Order deliveryYear = new Order();
			deliveryYear.setDeliverydate(String.valueOf(i));
			deliveryYearList.add(deliveryYear);
		}
		model.addAttribute("deliveryYearList", deliveryYearList);
		
		modelAndView.setViewName("admin/order/searchbardelivery");
		return modelAndView;
	}	
	
	@RequestMapping(value = "/getdeliverylist", method = RequestMethod.GET)
	public Map getDeliveryList(@ModelAttribute Order order, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		
		order.setProvidernumber(user.getProvidernumber());
		List<Order> list = orderService.getDeliveryList(order);

		Criteria cri = order;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalcount():0);
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 
		map.put("displayproductdescription",user.getProvidernumber()==10000001?"Y":"N");
		return map;
	}	

	@RequestMapping(value = "/donecontractlist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDoneContractList(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/order/donecontractlist");
		User user = userService.readUser(principal.getName());
		model.addAttribute("displayproductdescription",user.getProvidernumber()==10000001?"Y":"N");
		return modelAndView;
	}	

	@RequestMapping(value = "/searchbardonecontract", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewSearchbarContractDelivery(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		User user = userService.readUser(principal.getName());

		Order param = new Order();
		param.setCodegroupid("CONTRACTSTATE");
		List<Order> codeList = orderService.getCode(param);
		model.addAttribute("codeList",codeList);
		
		Order curDate = orderService.getCurDate(null);
		
		List<Order> deliveryYearList = new ArrayList();
		for (int i=2019; i<Integer.parseInt(curDate.getCurdate().substring(0, 4))+5; i++) {
			Order deliveryYear = new Order();
			deliveryYear.setDeliverydate(String.valueOf(i));
			deliveryYearList.add(deliveryYear);
		}
		model.addAttribute("deliveryYearList", deliveryYearList);
		
		modelAndView.setViewName("admin/order/searchbardonecontract");
		return modelAndView;
	}	
	
	@RequestMapping(value = "/getdonecontractlist", method = RequestMethod.GET)
	public Map getDoneContractList(@ModelAttribute Order order, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		
		order.setProvidernumber(user.getProvidernumber());
		List<Order> list = orderService.getDoneContractList(order);

		Criteria cri = order;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalcount():0);
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 
		map.put("displayproductdescription",user.getProvidernumber()==10000001?"Y":"N");
		return map;
	}	
	
	@RequestMapping(value = "/deliverydetailpopup", method = RequestMethod.GET)
	public ModelAndView viewDeliveryDetailPopup(@ModelAttribute Order order, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		User user = userService.readUser(principal.getName());
		order.setProvidernumber(user.getProvidernumber());
		
		Order contract = orderService.getContract(order);
		model.addAttribute("contract",contract);
		
		modelAndView.setViewName("popup/deliverydetailpopup");
		
		return modelAndView;
	}	

	@RequestMapping(value = "/deliverydetail", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDeliveryDetail(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/order/deliverydetail");
		return modelAndView;
	}	

	@RequestMapping(value = "/deliverydetaillist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDeliveryDetailList(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();

		Order param = new Order();
		User user = userService.readUser(principal.getName());
		param.setProvidernumber(user.getProvidernumber());
		param.setCode("DELIVERYCOMPANY");
		param.setDetailcode("DELIVERYCOMPANY");
		param.setEffectdateflag("N");
		List<Order> codeList = orderService.getProviderInformation(param);
		model.addAttribute("codeList",codeList);
		
		Order curDate = orderService.getCurDate(null);
		param.setDeliverydate(curDate.getCurdate().substring(0,6));
		
		List<Order> deliveryDateList = orderService.getDeliveryDate(param);
		model.addAttribute("deliveryDateList", deliveryDateList);
		
		List<Order> deliveryYearList = new ArrayList();
		for (int i=2019; i<Integer.parseInt(curDate.getCurdate().substring(0, 4))+5; i++) {
			Order deliveryYear = new Order();
			deliveryYear.setDeliverydate(String.valueOf(i));
			deliveryYearList.add(deliveryYear);
		}
		model.addAttribute("deliveryYearList", deliveryYearList);

		modelAndView.setViewName("admin/order/deliverydetaillist");
		return modelAndView;
	}	

	@RequestMapping(value = "/searchbardeliverydetail", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewSearchbarDeliveryDetail(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		User user = userService.readUser(principal.getName());
		Order param = new Order();
		param.setProvidernumber(user.getProvidernumber());
		param.setCode("DELIVERYCOMPANY");
		param.setDetailcode("DELIVERYCOMPANY");
		param.setEffectdateflag("N");
		List<Order> codeList = orderService.getProviderInformation(param);
		model.addAttribute("codeList",codeList);
		
		modelAndView.setViewName("admin/order/searchbardeliverydetail");
		return modelAndView;
	}	

	@RequestMapping(value = "/deliverydate", method = RequestMethod.GET)
	public Map getDeliveryDate(@ModelAttribute Order order, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		
		order.setProvidernumber(user.getProvidernumber());
		List<Order> deliveryDateList = orderService.getDeliveryDate(order);

		map.put("lists", deliveryDateList); // 리스트fetch
		return map;
	}	

	@RequestMapping(value = "/getdeliverydetaillist", method = RequestMethod.GET)
	public Map getDeliveryDetailList(@ModelAttribute Order order, Model model, Principal principal) {
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		
		order.setProvidernumber(user.getProvidernumber());
		List<Order> list = orderService.getDeliveryDetailList(order);

		Criteria cri = order;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalcount():0);
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker); 
		return map;
	}	

	@RequestMapping(value = "/savedeliverypopup", method = RequestMethod.GET)
	public ModelAndView viewSaveDeliveryPopup(@ModelAttribute Order order, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		
		User user = userService.readUser(principal.getName());
		order.setProvidernumber(user.getProvidernumber());
		
		Order param = new Order();
		param.setCodegroupid("DELIVERYSTATE");
		List<Order> codeList = orderService.getCode(param);
		
		List<Order> list = orderService.getDeliveryDetail(order);
		if (list.size() > 0) list.get(0).setSaveflag(order.getSaveflag());
		
		model.addAttribute("lists",list);
		model.addAttribute("codeList",codeList);
		model.addAttribute("returnobject", order.getReturnobject());
		
		modelAndView.setViewName("popup/savedeliverypopup");
		
		return modelAndView;
	}	

	@RequestMapping(value = "/savedelivery", method = RequestMethod.POST)
	public void saveDelivery(@ModelAttribute Order order, Model model, Principal principal) {
		
		User user = userService.readUser(principal.getName());
		order.setProvidernumber(user.getProvidernumber());
		order.setAuditid(user.getUsername());
		
		if ("I".equals(order.getSaveflag().substring(0, 1))) {
			if ("I".equals(order.getSaveflag().substring(1, 2))) {
				Order deliveryaddressid = orderService.getAddressid(order);
				order.setDeliveryaddressid(deliveryaddressid.getDeliveryaddressid());
				orderService.insertAddress(order);
			} 
			orderService.insertDeliveryDetail(order);
		} else {
			if ("I".equals(order.getSaveflag().substring(1, 2))) {
				Order deliveryaddressid = orderService.getAddressid(order);
				order.setDeliveryaddressid(deliveryaddressid.getDeliveryaddressid());
				orderService.insertAddress(order);
			} 
			orderService.updateDeliveryDetail(order);
		}
		
		return;
	}	

	@RequestMapping(value = "/getdeliverydetailexcel", method = RequestMethod.POST)
	public void getdeliverydetailexcel(HttpServletRequest request, HttpServletResponse response, Principal principal)  throws Exception {
		Order order = new Order();
		
		User user = userService.readUser(principal.getName());
		order.setProvidernumber(user.getProvidernumber());
		order.setDeliverydate(request.getParameter("deliverydate"));
		order.setDeliverycompany(request.getParameter("deliverycompany"));
		order.setCode("DELIVERYDOWNITEM");
		order.setDetailcode(request.getParameter("deliverycompany"));
		
		Order curdate = orderService.getCurDate(order);
		//배송내역 헤더 조회
		List<Order> infoList = orderService.getProviderInformation(order);
		//배송내역 조회
		List<Order> list = orderService.getDeliveryDetailExcel(order);
		
		//엑셀 다운로드
		SXSSFExcelUtil excel = new SXSSFExcelUtil();
		excel.createSheet("배송내역조회_"+order.getDeliverycompany()+"_"+order.getDeliverydate());

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
			    	value =  list.get(i).getProductname();
			    } else if ("customername".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getCustomername();
			    } else if ("deliveryzipcode".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getDeliveryzipcode();
			    } else if ("deliveryaddress".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getDeliveryaddress();
			    } else if ("customerphonenumber".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getCustomerphonenumber();
			    } else if ("channelname".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getChannelname();
			    } else if ("etcitem1".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getEtcitem1();
			    } else if ("quantity".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getQuantity();
			    } else if ("deliveryremark".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getDeliveryremark();
			    } else if ("deliverypostareacode".equals(infoList.get(j).getValue1())) {
			    	value =  list.get(i).getDeliverypostareacode();
			    }  
			    
			    if ("replace".equals(infoList.get(j).getOptioncode())) {
			    	value = value.replace(infoList.get(j).getOptionvalue1(), infoList.get(j).getOptionvalue2());
			    } else if ("seq".equals(infoList.get(j).getOptioncode())) {
			    	if ("yymmdd".equals(infoList.get(j).getOptionvalue1())) {
					    value = curdate.getCurdate().substring(2,8)+(Integer.parseInt(infoList.get(j).getOptionvalue2())+i);
			    	} else if ("yyyymmdd".equals(infoList.get(j).getOptionvalue1())) {
					    value = curdate.getCurdate().substring(0,8)+(Integer.parseInt(infoList.get(j).getOptionvalue2())+i);
			    	} else if ("".equals(infoList.get(j).getOptionvalue1())) {
					    value = String.valueOf(Integer.parseInt(infoList.get(j).getOptionvalue2())+i);
			    	}  
			    }
			    
		    	excel.setCellValue("N", j, value);
		    }
	    }

	    // 컨텐츠 타입과 파일명 지정
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode("배송내역_"+order.getDeliverycompany()+"_"+order.getDeliverydate()+".xlsx", "UTF-8"));
		//response.setHeader("Set-Cookie", "fileDownload=true; path=/");

		// 엑셀 출력
		excel.write(response.getOutputStream());
    }
    
	@RequestMapping(value = "/savedeliverystate", method = RequestMethod.POST)
	public void saveDeliveryDetailState(@ModelAttribute Order order, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		order.setProvidernumber(user.getProvidernumber());
		order.setAuditid(user.getUsername());

		orderService.updateDeliveryDetailState(order);
		
		orderService.updateContractState(order);
		
		return;
	}	

	@RequestMapping(value = "/counsel", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCounsel(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/order/counsel");
		return modelAndView;
	}
	
	@RequestMapping(value = "/counsellist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCounselList(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();

		User user = userService.readUser(principal.getName());
		model.addAttribute("displayproductdescription",user.getProvidernumber()==10000001?"Y":"N");
		
		modelAndView.setViewName("admin/order/counsellist");
		return modelAndView;
	}
	
	@RequestMapping(value = "/searchbarcounsel", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewSearchBarCounsel(Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/order/searchbarcounsel");
		return modelAndView;
	}	

	@RequestMapping(value = "/getcustomercontractlist", method = RequestMethod.GET)
	public Map getCustomerContractList(@ModelAttribute Order order, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());

		order.setProvidernumber(user.getProvidernumber());
		
		List<Order> list = orderService.getCustomerContractList(order);

		Criteria cri = order;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalcount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker);
		map.put("displayproductdescription",user.getProvidernumber()==10000001?"Y":"N");
		
		return map;
	}	

	@RequestMapping(value = "/getcustomerdeliverylist", method = RequestMethod.GET)
	public Map getCustomerDeliveryList(@ModelAttribute Order order, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());

		order.setProvidernumber(user.getProvidernumber());
		
		List<Order> list = orderService.getCustomerDeliveryList(order);

		Criteria cri = order;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalcount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker);
		
		return map;
	}	

	@RequestMapping(value = "/getcounsellist", method = RequestMethod.GET)
	public Map getCounselList(@ModelAttribute Order order, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());

		order.setProvidernumber(user.getProvidernumber());
		
		List<Order> list = orderService.getCounselList(order);

		Criteria cri = order;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalcount():0);
		
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker);
		
		return map;
	}	
	
	@RequestMapping(value = "/savecounselpopup", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewSaveCounselPopup(@ModelAttribute Order order, Model model) {
		ModelAndView modelAndView = new ModelAndView();
		
		Order result = new Order();

		if ("I".equals(order.getSaveflag())) {
			result = order;
		} else {
			result = orderService.getCounsel(order);
			result.setCustomername(order.getCustomername());
			result.setCustomerphonenumber(order.getCustomerphonenumber());
			result.setSaveflag(order.getSaveflag());
		}
		model.addAttribute("counsel",result);
		
		Order param = new Order();
		param.setCodegroupid("CATEGORY");
		List<Order> categoryList = orderService.getCode(param);
		
		param.setCodegroupid("INBOUNDPATH");
		List<Order> inboundpathList = orderService.getCode(param);
		
		param.setCodegroupid("COUNSELSTATE");
		List<Order> counselstateList = orderService.getCode(param);
		
		model.addAttribute("categoryList", categoryList);
		model.addAttribute("inboundpathList", inboundpathList);
		model.addAttribute("counselstateList", counselstateList);
		
		modelAndView.setViewName("popup/savecounselpopup");
		return modelAndView;
	}
	
	@RequestMapping(value = "/savecounsel", method = RequestMethod.POST)
	public void saveCounsel(@ModelAttribute Order order, Model model, Principal principal) {
		
		User user = userService.readUser(principal.getName());
		order.setProvidernumber(user.getProvidernumber());
		order.setAuditid(user.getUsername());
		
		if ("I".equals(order.getSaveflag())) {
			orderService.insertCounsel(order);
		} else {
			orderService.updateCounsel(order);
		}
			
		return;
	}	

	@RequestMapping(value = "/customerpopup", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCustomerPopup(@ModelAttribute Order order, Model model) {
		ModelAndView modelAndView = new ModelAndView();
		
		model.addAttribute("customername",order.getCustomername());
		model.addAttribute("customerphonenumber", order.getCustomerphonenumber());
		
		modelAndView.setViewName("popup/customerpopup");
		return modelAndView;
	}

	@RequestMapping(value = "/getcustomerlist", method = RequestMethod.GET)
	public Map getCustomerList(@ModelAttribute Order order, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());

		order.setProvidernumber(user.getProvidernumber());
		
		List<Order> list = orderService.getCustomerList(order);

		Criteria cri = order;
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(list.size()>0?list.get(0).getTotalcount():0);
		
		map.put("lists", list); // 리스트fetch
		map.put("pageMaker", pageMaker);
		
		return map;
	}	
	
	@RequestMapping(value = "/updatecontract", method = RequestMethod.POST)
	public void updateContract(@ModelAttribute Order order, Model model, Principal principal) {
		
		User user = userService.readUser(principal.getName());
		order.setAuditid(user.getUsername());
		
		if ("TERMINATION".equals(order.getContractstate())) {
			orderService.upateContractTermination(order);
		} else if ("SUSPEND".equals(order.getContractstate()) || "ACTIVATION".equals(order.getContractstate())) {
			orderService.upateContractSuspend(order);
		} 
		
		return;
	}	
}