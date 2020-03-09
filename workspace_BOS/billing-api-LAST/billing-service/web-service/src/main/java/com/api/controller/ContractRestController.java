package com.api.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.api.billing.invoice.model.InvoiceCreatePrePayInvoiceInput;
import com.api.billing.invoice.model.PaymentPrePayInvoiceInput;
import com.api.billing.login.model.User;
import com.api.billing.model.contract.BatchContract;
import com.api.billing.model.contract.Contract;
import com.api.billing.model.contract.ContractInsert;
import com.api.billing.model.contract.CouponBalance;
import com.api.billing.model.contract.CouponUseHistory;
import com.api.billing.model.contract.Discount2;
import com.api.billing.model.contract.DiscountEffectDate;
import com.api.billing.model.contract.PaymentInformation;
import com.api.billing.model.contract.Product;
import com.api.billing.model.contract.Product2;
import com.api.billing.model.customer.Address;
import com.api.billing.model.customer.CounsellingHistory;
import com.api.billing.model.customer.Customer;
import com.api.billing.model.customer.CustomerCharacteristic;
import com.api.billing.model.customer.CustomerSearchBar;
import com.api.billing.model.order.Order;
import com.api.billing.model.product.Discount;
import com.api.billing.model.product.DiscountSearchBar;
import com.api.billing.model.product.Product3;
import com.api.billing.model.product.ProductPackage;
import com.api.model.Criteria;
import com.api.model.PageMaker;
import com.api.service.ContractService;
import com.api.service.CustomerService;
import com.api.service.InvoiceService;
import com.api.service.OrderService;
import com.api.service.ProductService;
import com.api.service.UserService;

@RestController
@RequestMapping("contract")
@Transactional(rollbackFor=Exception.class)
public class ContractRestController {

	@Autowired
	private ContractService contractService;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private ProductService productService;

	@Autowired
	private InvoiceService invoiceService;

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private BillingController billingController;

	@Autowired
	UserService userService;

	@RequestMapping(value = "/contractmain", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewContractMain(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/contractmain");
		return modelAndView;
	}

	@RequestMapping(value = "/contractmenu", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewContractMenu(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/contractmenu");
		return modelAndView;
	}

	@RequestMapping(value = "/productsale", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewProductSale(Model model, Principal principal) {
		
		Order param = new Order();
		
		User user = userService.readUser(principal.getName());
		param.setProvidernumber(user.getProvidernumber());

		//배송업체
		param.setCode("DELIVERYCOMPANY");
		param.setDetailcode("DELIVERYCOMPANY");
		List<Order> deliveryCompanyList = orderService.getProviderInformation(param);
		model.addAttribute("deliveryCompanyList",deliveryCompanyList);
		
		//배송주기
		param.setCode("DELIVERYCYCLE");
		param.setDetailcode("DELIVERYCYCLE");
		List<Order> deliveryCycleList = orderService.getProviderInformation(param);
		model.addAttribute("deliveryCycleList",deliveryCycleList);

		//배송횟수
		param.setCode("DELIVERYTIMES");
		param.setDetailcode("DELIVERYTIMES");
		List<Order> deliveryTimesList = orderService.getProviderInformation(param);
		model.addAttribute("deliveryTimesList",deliveryTimesList);

		//배송일
		param.setCode("DELIVERYDAY");
		param.setDetailcode("DELIVERYDAY");
		List<Order> deliveryDayList = orderService.getProviderInformation(param);
		Order order = new Order();
		if (deliveryDayList.size() == 0) {
			for (int i=1; i<=31; i++) {
				order = new Order();
				order.setValue1(String.valueOf(i));
				order.setDescription(String.valueOf(i)+"일");
				deliveryDayList.add(order);
			}
		}
		model.addAttribute("deliveryDayList",deliveryDayList);

		//결제일
		param.setCode("PAYMENTDAY");
		param.setDetailcode("PAYMENTDAY");
		List<Order> paymentDayList = orderService.getProviderInformation(param);
		order = new Order();
		if (paymentDayList.size() == 0) {
			for (int i=1; i<=31; i++) {
				order = new Order();
				order.setValue1(String.valueOf(i));
				order.setDescription(String.valueOf(i)+"일");
				paymentDayList.add(order);
			}
		}
		model.addAttribute("paymentDayList",paymentDayList);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/productsale");
		return modelAndView;
	}

	@RequestMapping(value = "/productsale/selectedcustomer", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewProductSaleByCustomerNumber(@PathVariable(value = "customernumber") int customerNumber) {

		Customer customer = contractService.findCustomerByCustomerNumber(customerNumber);
		List<Contract> contract = contractService.findContractByCustomerNumber(customerNumber);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/productsale");
		modelAndView.addObject("customerResult", customer);
		modelAndView.addObject("contractListResult", contract);
		return modelAndView;
	}

	@RequestMapping(value = "/paymentinformation/{connumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewPaymentInformation(@PathVariable(value = "connumber") int connumber) {
		PaymentInformation paymentInformation = contractService.findPaymentInformationByConNumber(connumber);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/paymentInformation");
		modelAndView.addObject("paymentInformationResult", paymentInformation);
		return modelAndView;
	}

	@RequestMapping(value = "/contractSearchbar", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewSearchBar(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/contractsearchbar");
		return modelAndView;
	}

	@RequestMapping(value = "/findsearchbar", method = RequestMethod.GET)
	public ModelAndView findCustomerBySearchBar(@ModelAttribute CustomerSearchBar customerSearchBar, Model model,
			Principal principal) {
		/* ID mapping */
		User user = userService.readUser(principal.getName());
		customerSearchBar.setProvidernumber(user.getProvidernumber());
		customerSearchBar.setUsername(user.getUsername());
		/* ID mapping */
		List<Customer> customer = contractService.findCustomerBySearchBar(customerSearchBar);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/customerlistpopup");
		modelAndView.addObject("customerListResult", customer);
		return modelAndView;
	}

	@RequestMapping(value = "/findAllProduct", method = RequestMethod.GET)
	public List<Product3> findAllProduct(Principal principal) {
		List<Product3> product = contractService.findAllProduct();
		return product;
	}

	@RequestMapping(value = "/findAllDiscount", method = RequestMethod.GET)
	public List<Discount> findAllDiscount(Principal principal) {
		List<Discount> discount = contractService.findAllDiscount();
		return discount;
	}

	@RequestMapping(value = "/customercreatepopup", method = RequestMethod.GET)
	public ModelAndView viewCustomerCreatePopup(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/customercreatepopup");
		return modelAndView;
	}

	@RequestMapping(value = "/couponuse", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCouponUse() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/productsaletemplate");
		return modelAndView;
	}

	// 추가
	/* new contract */
	@RequestMapping(value = "/productsale/newcontract/{customernumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView NewContract(@PathVariable(value = "customernumber") int customernumber) {

		List<Customer> customerList = contractService.getFindCustomerList(customernumber);

		ModelAndView modelAndView = new ModelAndView();

		modelAndView.addObject("customerList", customerList);
		modelAndView.setViewName("admin/contract/newcontract");
		return modelAndView;
	}

	/* productListPopup searchbar 연계 */
	@RequestMapping(value = "/getProductListPopup", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<Product2> getProductListPopup(@ModelAttribute Product2 product, Model model, Principal principal) {

		/* ID mapping */
		User user = userService.readUser(principal.getName());
		product.setProvidernumber(user.getProvidernumber());
		product.setUsername(user.getUsername());
		/* ID mapping */
		List<Product2> productList = contractService.getProductList(product);

		return productList;
	}

	@RequestMapping(value = "/productListPopup", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView ProductListPopup(Model model) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/productListPopup");
		return modelAndView;
	}

	/* discountListPopup searchbar 연계 */
	@RequestMapping(value = "/getdiscountlist", method = RequestMethod.GET)
	public List<Discount2> getDiscountList(@ModelAttribute DiscountSearchBar discountSearchBar, Model model,
			Principal principal) {
		/* ID mapping */
		User user = userService.readUser(principal.getName());
		discountSearchBar.setProvidernumber(user.getProvidernumber());
		discountSearchBar.setUsername(user.getUsername());
		/* ID mapping */
		List<Discount2> discountList = contractService.findDiscountBySearchBar(discountSearchBar);
		return discountList;
	}

	/* discountListPopup searchbar 연계 */
	@RequestMapping(value = "/findApplyDiscount", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<Discount2> getFindApplyDiscountList(@ModelAttribute DiscountEffectDate discountEffectDate, Model model,
			Principal principal) {
		/* ID mapping */
		User user = userService.readUser(principal.getName());
		discountEffectDate.setProvidernumber(user.getProvidernumber());
		discountEffectDate.setUsername(user.getUsername());
		/* ID mapping */
		List<Discount2> discountList = contractService.getFindApplyDiscount(discountEffectDate);
		return discountList;
	}

	/* discountListPopup (기간에 맞는 할인 목록만 가져오기 기능은 현재는 사용하지 않음) */
	@RequestMapping(value = "/discountListPopup", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewDiscountListPopup(Model model) {
		// System.out.println("discountListPopup.effecStart() = " +
		// discountEffectDate.getEffectiveStartDate());
		// System.out.println("discountListPopup.effectEnd() = " +
		// discountEffectDate.getEffectiveEndDate());
		// List<Discount> discountList =
		// contractService.getDiscountList(discountEffectDate);

		// System.out.println("discountList : " + discountList);
		// model.addAttribute("discountList", discountList);

		ModelAndView modelAndView = new ModelAndView();

		modelAndView.setViewName("popup/discountListPopup");
		return modelAndView;

	}
	
	@RequestMapping(value = "/getDeliveryDate", method = RequestMethod.GET)
	public Map getDeliveryDate(@ModelAttribute ContractInsert contractInsert, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		contractInsert.setProvidernumber(user.getProvidernumber());
		
		ContractInsert deliveryContract = contractService.getDeliveryDate(contractInsert);
		map.put("deliveryContract", deliveryContract);
		
		return map;
	}	

	@RequestMapping(value = "/getDeliveryCount", method = RequestMethod.GET)
	public Map getDeliveryCount(@ModelAttribute ContractInsert contractInsert, Model model, Principal principal) {
		ModelAndView modelAndView = new ModelAndView();
		Map map = new HashMap();
		
		User user = userService.readUser(principal.getName());
		contractInsert.setProvidernumber(user.getProvidernumber());
		
		ContractInsert deliveryContract = new ContractInsert();
		
		if ("OTHERMONTH".equals(contractInsert.getDeliveryCycle()) || "MONTH".equals(contractInsert.getDeliveryCycle())) {
			if ("OTHERMONTH".equals(contractInsert.getDeliveryCycle())) {
				contractInsert.setDeliveryMonth("2");
				contractInsert.setDeliveryTotalCount(contractInsert.getDuration()/2*contractInsert.getDeliveryTimes());
			} else {
				contractInsert.setDeliveryMonth("1");
				contractInsert.setDeliveryTotalCount(contractInsert.getDuration()*contractInsert.getDeliveryTimes());
			}
			
			if (contractInsert.getDeliveryTimes() == 1) {
				
				deliveryContract = contractService.getDeliveryDate1(contractInsert);
				
				contractInsert.setDeliveryDate(deliveryContract.getDeliveryDate());
				contractInsert.setDeliveryCount(contractInsert.getDuration());
				deliveryContract = contractService.getDeliveryCount1(contractInsert);
				
			} else if (contractInsert.getDeliveryTimes() == 2) {
				
				contractInsert.setDeliveryDay1(contractInsert.getDeliveryDay().split("/")[0]);
				contractInsert.setDeliveryDay2(contractInsert.getDeliveryDay().split("/")[1]);
				deliveryContract = contractService.getDeliveryDate2(contractInsert);
				
				contractInsert.setDeliveryDate1(deliveryContract.getDeliveryDate1());
				contractInsert.setDeliveryDate2(deliveryContract.getDeliveryDate2());
				contractInsert.setDeliveryCount(contractInsert.getDuration());
				deliveryContract = contractService.getDeliveryCount2(contractInsert);
				
			} 
		} else if ("WEEK".equals(contractInsert.getDeliveryCycle())) {
			contractInsert.setDeliveryTotalCount(contractInsert.getDuration()*4*contractInsert.getDeliveryTimes());
			if (contractInsert.getDeliveryTimes() == 1) {
				
				deliveryContract = contractService.getDeliveryDateWeek1(contractInsert);
				
				contractInsert.setDeliveryDate(deliveryContract.getDeliveryDate());
				contractInsert.setDeliveryCount(contractInsert.getDuration()*5);
				deliveryContract = contractService.getDeliveryWeekCount1(contractInsert);

			} else if (contractInsert.getDeliveryTimes() == 2) {
				
				contractInsert.setDeliveryDay1(contractInsert.getDeliveryDay().split("/")[0]);
				contractInsert.setDeliveryDay2(contractInsert.getDeliveryDay().split("/")[1]);
				deliveryContract = contractService.getDeliveryDateWeek2(contractInsert);
				
				contractInsert.setDeliveryDate1(deliveryContract.getDeliveryDate1());
				contractInsert.setDeliveryDate2(deliveryContract.getDeliveryDate2());
				contractInsert.setDeliveryCount(contractInsert.getDuration()*5);
				deliveryContract = contractService.getDeliveryWeekCount2(contractInsert);
			} 
		}

		map.put("deliveryContract", deliveryContract);
		
		return map;
	}	

	/* contract Insert */
	@RequestMapping(value="/contractInsert", method=RequestMethod.POST)
	 public PaymentPrePayInvoiceInput createContract(@ModelAttribute ContractInsert contractInsert , Model model,Principal principal) {
		
			/*ID mapping*/
			User user = userService.readUser(principal.getName());
			contractInsert.setProvidernumber(user.getProvidernumber());
			contractInsert.setUsername(user.getUsername());
			contractInsert.setAuditId(user.getUsername());
			/*ID mapping*/
			
			contractInsert.setDeliveryCustomerNumber(contractInsert.getCustomerNumber());
			contractInsert.setInvoiceCycle("MONTH");
			 
			ContractInsert address = contractService.getAddressid(contractInsert);
			contractInsert.setAddressId(address.getAddressId());
			int addressInsertFlag = contractService.createDeliveryAddress(contractInsert);
			//Address address = contractService.findDeliverAddressId(contractInsert);
			String addrId = address.getAddressId();
			contractInsert.setDeliveryAddressId(addrId);	
			int paymentInfoInsertFlag = contractService.paymentInfoInsert(contractInsert);
					 
			int duration = contractInsert.getDuration();
			 
			//contractInsert.setDeliveryTimes(duration);
			//contractInsert.setDeliveryTotalCount(duration);
			contractInsert.setDeliveryRemainCount(contractInsert.getDeliveryTotalCount());
			
			if ("Y".equals(contractInsert.getDeliveryCostYn())) {
				contractInsert.setDeliveryCost("0");
			} else {
				contractInsert.setDeliveryCost(contractInsert.getDeliveryCost().replace(",", ""));
			}
			
			contractInsert.setChannelId("BILLINGOSS");
			 
			int contractInsertFlag = contractService.createContract(contractInsert);
			 
			if(contractInsert.getPackageYn().equals("Y"))
			{
				ContractInsert contractInsertPackageId = contractService.findPackageId(contractInsert);
			
				contractInsert.setPackageId(contractInsertPackageId.getPackageId());
			}
			
			if(contractInsert.getPackageVarietyYn() == "") {
				contractInsert.setPackageVarietyYn(null);
			}
			if(contractInsert.getPackagePriceReferenceYn() == "") {
				contractInsert.setPackagePriceReferenceYn(null);
			}
			
			int contractProductFlag = contractService.createContractProduct(contractInsert);
			
			if(contractInsert.getDiscountId() !=null)
			{
				int contractDiscountFlag = contractService.createContractDiscount(contractInsert);
			}
			
			//20180920
			if(contractInsert.getProductType().equals("COUPONCOUNT")  || contractInsert.getProductType().equals("COUPONPRICE"))
			{	
				//기존 등록 정보 확인
				CouponBalance couponBalance = contractService.findCouponBalanceWhenContractInsert(contractInsert);
				
				if(couponBalance==null)
				{
					couponBalance =  new  CouponBalance();
					couponBalance.setCouponType(contractInsert.getProductType());
					couponBalance.setCustomerNumber(contractInsert.getCustomerNumber());
					couponBalance.setProvidernumber(contractInsert.getProvidernumber());
					couponBalance.setUsername(contractInsert.getUsername());
					
					if(couponBalance.getCouponType().equals("COUPONCOUNT")) 
					{	
						couponBalance.setCouponBalance(Integer.parseInt(contractInsert.getProductQuantity()));
					}
					else
					{	
						int couponPrice = contractInsert.getPriceAmount() * Integer.parseInt(contractInsert.getProductQuantity());
						couponBalance.setCouponBalance(couponPrice);
					}
					couponBalance.setAuditId(user.getUsername());
					//최초등록
						int createCouponBalacneFlag = contractService.createCouponBalanceWhenContractInsert(couponBalance);
						
				}
				else 
				{	
					if(couponBalance.getCouponType().equals("COUPONCOUNT")) 
					{   
						int couponcountupdate = couponBalance.getCouponBalance() + Integer.parseInt(contractInsert.getProductQuantity());
						couponBalance.setCouponBalance(couponcountupdate);
					}
					else
					{
						int couponPrice = contractInsert.getPriceAmount() * Integer.parseInt(contractInsert.getProductQuantity()) + couponBalance.getCouponBalance();
						couponBalance.setCouponBalance(couponPrice);
					}
					
					//업데이트
					int couponBalanceUpdate = couponBalance.getCouponBalance();
					couponBalance.setAuditId(user.getUsername());
					int updateCouponBalanceFlag = contractService.updateCouponBalanceWhenContarctInsert(couponBalance);
				}
				
				CouponUseHistory couponUseHistory = new CouponUseHistory();
				couponUseHistory.setCustomerNumber(contractInsert.getCustomerNumber());
				couponUseHistory.setProvidernumber(contractInsert.getProvidernumber());
				couponUseHistory.setCouponType(contractInsert.getProductType());
				couponUseHistory.setCouponUseType("REGIST");
				couponUseHistory.setUseHistory("쿠폰등록");
				couponUseHistory.setAuditId(user.getUsername());
				
				if(couponUseHistory.getCouponType().equals("COUPONCOUNT"))
				{
					couponUseHistory.setUseAmount(Integer.parseInt(contractInsert.getProductQuantity()));
				}
				else
				{
					int couponPrice = contractInsert.getPriceAmount() * Integer.parseInt(contractInsert.getProductQuantity());
						couponUseHistory.setUseAmount(couponPrice);
				}
				
				int createCouponUseHistory = contractService.createCouponUseHIstoryWhenConatractInsert(couponUseHistory);
			}
			 
			 
			 
/*			if(contractInsert.getRecurringInvoiceYn().equals("N")) {
			 
				int result = 0;
				//contractInsert.setSuspenddatetime("20180913");
				  
				ContractInsert contractSubscribeDateTime = contractService.findSubscribeDateTime(contractInsert.getConNumber());
				  
				InvoiceCreatePrePayInvoiceInput invoicecreateprepayinvoiceinput = new InvoiceCreatePrePayInvoiceInput();
				invoicecreateprepayinvoiceinput.setConnumber(contractInsert.getConNumber());
				invoicecreateprepayinvoiceinput.setCalfromDate(contractSubscribeDateTime.getSubscribeDateTime());
				invoicecreateprepayinvoiceinput.setProvidernumber(user.getProvidernumber());
				invoicecreateprepayinvoiceinput.setUsername(user.getUsername());
				  
				result = insertInvoiceCalculationPrePay(invoicecreateprepayinvoiceinput);
				result = insertInvoiceCalculationPrePayDiscount(invoicecreateprepayinvoiceinput);
				result = insertInvoiceDetailPrePay(invoicecreateprepayinvoiceinput);
				paymentprepayinvoiceinput = insertInvoicePrePay(invoicecreateprepayinvoiceinput);
				  
				//System.out.println("======api 호출 끝====" + paymentprepayinvoiceinput.getInvoicenumber());
				//System.out.println("======api 호출 끝====" + paymentprepayinvoiceinput.getInvoicedate());
				//System.out.println("======api 호출 끝====" + paymentprepayinvoiceinput.getConnumber());
				 
				//팝업 호출			 
			}		 */
				
			//배송생성
			ContractInsert deliveryContract;
			
			if ("OTHERMONTH".equals(contractInsert.getDeliveryCycle()) || "MONTH".equals(contractInsert.getDeliveryCycle())) {
				if ("OTHERMONTH".equals(contractInsert.getDeliveryCycle())) {
					contractInsert.setDeliveryMonth("2");
				} else {
					contractInsert.setDeliveryMonth("1");
				}
				
				if (contractInsert.getDeliveryTimes() == 1) {
					
					deliveryContract = contractService.getDeliveryDate1(contractInsert);

					contractInsert.setDeliveryDate(deliveryContract.getDeliveryDate());
					contractInsert.setDeliveryCount(contractInsert.getDuration());

					int cnt = contractService.insertDeliveryDetail1(contractInsert);
					
				} else if (contractInsert.getDeliveryTimes() == 2) {
					
					contractInsert.setDeliveryDay1(contractInsert.getDeliveryDay().split("/")[0]);
					contractInsert.setDeliveryDay2(contractInsert.getDeliveryDay().split("/")[1]);
					deliveryContract = contractService.getDeliveryDate2(contractInsert);
					
					contractInsert.setDeliveryDate1(deliveryContract.getDeliveryDate1());
					contractInsert.setDeliveryDate2(deliveryContract.getDeliveryDate2());
					contractInsert.setDeliveryCount(contractInsert.getDuration());
					int cnt = contractService.insertDeliveryDetail2(contractInsert);
					
				} 
			} else if ("WEEK".equals(contractInsert.getDeliveryCycle())) {
				if (contractInsert.getDeliveryTimes() == 1) {
					
					deliveryContract = contractService.getDeliveryDateWeek1(contractInsert);
					
					contractInsert.setDeliveryDate(deliveryContract.getDeliveryDate());
					contractInsert.setDeliveryCount(contractInsert.getDuration()*5);
					int cnt = contractService.insertDeliveryDetailWeek1(contractInsert);

				} else if (contractInsert.getDeliveryTimes() == 2) {
					
					contractInsert.setDeliveryDay1(contractInsert.getDeliveryDay().split("/")[0]);
					contractInsert.setDeliveryDay2(contractInsert.getDeliveryDay().split("/")[1]);
					deliveryContract = contractService.getDeliveryDateWeek2(contractInsert);
					
					contractInsert.setDeliveryDate1(deliveryContract.getDeliveryDate1());
					contractInsert.setDeliveryDate2(deliveryContract.getDeliveryDate2());
					contractInsert.setDeliveryCount(contractInsert.getDuration()*5);
					int cnt = contractService.insertDeliveryDetailWeek2(contractInsert);
				} 
			}
			
			PaymentPrePayInvoiceInput paymentprepayinvoiceinput = new PaymentPrePayInvoiceInput();
			//청구 정보 생성 
			paymentprepayinvoiceinput = billingController.setBillingCalaulationByContract(contractInsert.getConNumber(), model, principal);
			
			return paymentprepayinvoiceinput;
	}

	public int insertInvoiceCalculationPrePay(InvoiceCreatePrePayInvoiceInput idi) {
		int result = 0;

		result = invoiceService.setInvoiceCalculationPrepay(idi);
		if (result == 0) {
			return result;
		}
		return result;
	}

	public int insertInvoiceCalculationPrePayDiscount(InvoiceCreatePrePayInvoiceInput idi) {
		int result = 0;
		result += invoiceService.setInvoiceCalculationDiscountRatePrepay(idi);
		result += invoiceService.setInvoiceCalculationDiscountAmountPrepay(idi);
		result += invoiceService.setInvoiceCalculationDiscountOneTimeFeePrepay(idi);
		return result;
	}

	public int insertInvoiceDetailPrePay(InvoiceCreatePrePayInvoiceInput idi) {
		int result = 0;
		result += invoiceService.setInvoiceDetailPrepay(idi);
		result += invoiceService.updateInvoiceDetailPrepay(idi);
		result += invoiceService.updateInvoiceCalculationPrepay(idi);
		return result;
	}

	public PaymentPrePayInvoiceInput insertInvoicePrePay(InvoiceCreatePrePayInvoiceInput idi) {
		int result = 0;
		PaymentPrePayInvoiceInput paymentprepayinvoiceinput = new PaymentPrePayInvoiceInput();
		result += invoiceService.setInvoicePrepay(idi);
		paymentprepayinvoiceinput = invoiceService.getPrePayInvoice(idi);
		return paymentprepayinvoiceinput;
	}

	@RequestMapping(value = "/batchproductsale", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewbatchProductSale() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/batchproductsale");
		return modelAndView;
	}

	@RequestMapping(value = "/productsale/batchproductsale", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewbatchProductSale2() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/batchproductsale");
		return modelAndView;
	}

	@RequestMapping(value = "/batchcontract", method = RequestMethod.POST)
	public void saveBatchContract(@ModelAttribute BatchContract batchContract, Model model, Principal principal) {

		int customerNumber = 0;

		Customer customer = new Customer();
		/* ID mapping */
		User user = userService.readUser(principal.getName());
		customer.setProvidernumber(user.getProvidernumber());
		customer.setUsername(user.getUsername());
		/* ID mapping */
		customer.setCustomerName(batchContract.getCustomerName());
		customer.setBirthday(batchContract.getBirthday());
		customer.setPhoneNumber(batchContract.getPhoneNumber());

		if (customerService.findCustomerByCustomerNameAndBirthdayAndPhoneNumber(customer) != null) {
			customer = customerService.findCustomerByCustomerNameAndBirthdayAndPhoneNumber(customer);
		}


		if (customer.getCustomerNumber() == 0) {
			Address address = customerService.findAddressId();
			address.setZipcode(batchContract.getZipcode());
			address.setBaseAddress(batchContract.getBaseAddress());
			address.setDetailAddress(batchContract.getDetailAddress());
			customerService.saveAddress(address);

			// customer.setProvidernumber(batchContract.getProviderNumber());
			customer.setSex(batchContract.getSex());
			customer.setEmail(batchContract.getEmail());
			customer.setAddressId(address.getAddressId());
			customer.setDeliveryAddressId(address.getAddressId());
			customer.setCustomerType(batchContract.getCustomerType());
			customer.setCreateDate(batchContract.getCreateDate());
			customer.setCurrentDate(batchContract.getCurrentDate());
			customerService.saveCustomer(customer);
			customerNumber = customer.getCustomerNumber();

		} else {
			customerNumber = customer.getCustomerNumber();
		}

		ContractInsert contractInsert = new ContractInsert();
		/* ID mapping */
		contractInsert.setProvidernumber(user.getProvidernumber());
		contractInsert.setUsername(user.getUsername());
		/* ID mapping */
		contractInsert.setCustomerNumber(customerNumber);
		contractInsert.setPaymentMethod(batchContract.getPaymentMethod());
		contractInsert.setDeliveryAddressId(customer.getAddressId());
		contractInsert.setInvoiceDeliveryType(batchContract.getInvoiceDeliveryType());
		contractInsert.setInvoiceEmail(batchContract.getInvoiceEmail());
		int paymentInfoInsertReturn = contractService.paymentInfoInsert(contractInsert);
		int paymentInformationNumber = contractInsert.getPaymentInformationNumber();

		contractInsert.setCustomerNumber(customerNumber);
		contractInsert.setPaymentInformationNumber(paymentInformationNumber);
		contractInsert.setEffectStartDateTime(batchContract.getEffectStartDateTime());
		contractInsert.setEffectEndDateTime(batchContract.getEffectEndDateTime());
		contractInsert.setDeliveryCycle(batchContract.getDeliveryCycle());
		contractInsert.setDeliveryTimes(batchContract.getDeliveryTimes());
		contractInsert.setDeliveryRemark(batchContract.getDeliveryRemark());
		contractInsert.setDeliveryStartDatetime(batchContract.getDeliveryStartDatetime());
		contractInsert.setDeliveryTotalCount(batchContract.getDeliveryTotalCount());
		contractInsert.setDeliveryRemainCount(batchContract.getDeliveryRemainCount());
		contractInsert.setInvoiceCycle(batchContract.getInvoiceCycle());
		int createContractReturn = contractService.createContract(contractInsert);

		Product3 product = new Product3();
		/* ID mapping */
		product.setProvidernumber(user.getProvidernumber());
		product.setUsername(user.getUsername());
		/* ID mapping */
		product.setProductId(batchContract.getProductId());
		product = productService.findProductByProductId(product);
		ProductPackage productPackage = new ProductPackage();
		productPackage.setMainProductId(batchContract.getProductId());
		productPackage = productService.findProductPackageByMainProductId(productPackage);
		contractInsert.setProductId(batchContract.getProductId());
		contractInsert.setProductType(product.getProductType());
		contractInsert.setPackageId(productPackage.getPackageId());
		contractInsert.setPackagePriceReferenceYn(product.getPackagePriceReferenceYn());
		contractInsert.setPackageVarietyYn(product.getPackageVarietyYn());
		contractInsert.setProductQuantity(batchContract.getProductQuantity());
		int createContractProductReturn = contractService.createContractProduct(contractInsert);

		Discount discount = new Discount();

		discount.setDiscountId(batchContract.getDiscountId());
		discount = productService.findDiscountByDiscountId(discount);
		/* ID mapping */
		discount.setProvidernumber(user.getProvidernumber());
		discount.setUsername(user.getUsername());
		/* ID mapping */
		contractInsert.setDiscountId(batchContract.getDiscountId());
		contractInsert.setDiscountType(discount.getDiscountType());
		contractInsert.setDiscountValue(discount.getDiscountValue());
		contractInsert.setDiscountOrder(discount.getDiscountOrder());
		contractInsert.setEffectStartDateTime(batchContract.getContractDiscountEffectStartDateTime());
		contractInsert.setEffectEndDateTime(batchContract.getContractDiscountEffectEndDateTime());
		int createContractDiscountReturn = contractService.createContractDiscount(contractInsert);

		return;
	}

	@RequestMapping(value = "/customersearch", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCustomerSearch(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/customersearch");
		return modelAndView;
	}

	@RequestMapping(value = "/customerlistsearch", method = RequestMethod.GET)
	public Map<String, Object> findAll(@ModelAttribute Customer customer, Model model, Principal principal) {
		Map<String, Object> map = new HashMap<>();
		Criteria cri = customer;
		/* ID mapping */
		User user = userService.readUser(principal.getName());
		customer.setProvidernumber(user.getProvidernumber());
		customer.setUsername(user.getUsername());
		/* ID mapping */
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(customerService.findAllTotalCount(user.getProvidernumber()));
		map.put("lists", customerService.findAll(pageMaker.getCri().getPageStart(), cri.getPerPageNum(),
				user.getProvidernumber())); // 리스트fetch
		map.put("pageMaker", pageMaker);
		return map;
	}

	@RequestMapping(value = "/customersearchbar", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCustomerSearchBar(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/customersearchbar");
		return modelAndView;
	}

	@RequestMapping(value = "/productlist/{customernumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewProductList(@PathVariable(value = "customernumber") int customerNumber) {
		// TODO Auto-generated method stub
		List<Product> product = customerService.findProductByCustomerNumber(customerNumber);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/productlist");
		modelAndView.addObject("productListResult", product);
		return modelAndView;
	}

	@RequestMapping(value = "/findcustomersearchbar", method = RequestMethod.GET)
	public Map<String, Object> findCustomerByCustomerSearchBar(@ModelAttribute CustomerSearchBar customerSearchBar,
			Model model, Principal principal) {
		Map<String, Object> map = new HashMap<>();
		Criteria cri = customerSearchBar;
		/* ID mapping */
		User user = userService.readUser(principal.getName());
		customerSearchBar.setProvidernumber(user.getProvidernumber());
		customerSearchBar.setUsername(user.getUsername());
		/* ID mapping */
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(customerService.findCustomerBySearchBarTotalCount(customerSearchBar));
		map.put("lists", customerService.findCustomerBySearchBar(customerSearchBar)); // 리스트fetch
		map.put("pageMaker", pageMaker);
		return map;
	}

	@RequestMapping(value = "/customerupdate", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCustomerUpdate(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/customerupdatetemplate");
		return modelAndView;
	}

	@RequestMapping(value = "/customerupdate/{customernumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCustomerUpdateByCustomerNumber(@PathVariable(value = "customernumber") int customerNumber) {
		Customer customer = customerService.findCustomerByCustomerNumber(customerNumber);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/customerupdate");
		modelAndView.addObject("customerResult", customer);
		return modelAndView;
	}

	@RequestMapping(value = "/findAddressId", method = RequestMethod.GET)
	public ModelAndView findAddressId(Model model, Principal principal) {
		Address address = customerService.findAddressId();
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/customeraddress");
		modelAndView.addObject("addressResult", address);
		return modelAndView;
	}

	@RequestMapping(value = "/findAddressIdPopUp", method = RequestMethod.GET)
	public ModelAndView findAddressIdPopUp(Model model, Principal principal) {
		Address address = customerService.findAddressId();
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/customeraddresspopup");
		modelAndView.addObject("addressResult", address);
		return modelAndView;
	}

	@RequestMapping(value = "/saveAddress", method = RequestMethod.POST)
	public void saveAddress(@ModelAttribute Address address, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		address.setAuditId(user.getUsername());
		customerService.saveAddress(address);
		return;
	}

	@RequestMapping(value = "/saveAddressUpdate", method = RequestMethod.POST)
	public void saveAddressUpdate(@ModelAttribute Address address, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		address.setAuditId(user.getUsername());
		customerService.saveAddressUpdate(address);
		return;
	}

	@RequestMapping(value = "/saveCustomer", method = RequestMethod.POST)
	public Map saveCustomer(@ModelAttribute Customer customer, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		customer.setProvidernumber(user.getProvidernumber());
		customer.setUsername(user.getUsername());
		customer.setAuditId(user.getUsername());
		customerService.saveCustomer(customer);
		Map map = new HashMap();
		map.put("customerNumber", customer.getCustomerNumber());
		return map;
	}

	@RequestMapping(value = "/saveCustomerUpdate", method = RequestMethod.POST)
	public void saveCustomerUpdate(@ModelAttribute Customer customer, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		customer.setProvidernumber(user.getProvidernumber());
		customer.setUsername(user.getUsername());
		customer.setAuditId(user.getUsername());
		customerService.saveCustomerUpdate(customer);
		return;
	}

	@RequestMapping(value = "/counsellinginformation/{customernumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCounsellingList(@PathVariable(value = "customernumber") int customerNumber) {
		// TODO Auto-generated method stub
		List<CounsellingHistory> counsellingHistory = customerService
				.findCounsellingHistorySummaryByCustomerNumber(customerNumber);
		// System.out.println("counsellingHistory.getCustomerNumber = " +
		// counsellingHistory.iterator().next().getCustomerNumber());
		CustomerCharacteristic customerCharacteristic = customerService
				.findCustomerCharacteristicByCustomerNumber(customerNumber);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/counsellinginformation");
		modelAndView.addObject("counsellingHistoryListResult", counsellingHistory);
		modelAndView.addObject("customerCharacteristicResult", customerCharacteristic);
		return modelAndView;
	}

	@RequestMapping(value = "/customercounselling/{customernumber}", method = RequestMethod.GET)
	public ModelAndView viewCustomerCounselling(@PathVariable(value = "customernumber") int customerNumber) {
		Customer customer = customerService.findCustomerByCustomerNumber(customerNumber);
		CustomerCharacteristic customerCharacteristic = customerService
				.findCustomerCharacteristicByCustomerNumber(customerNumber);
		List<CounsellingHistory> counsellingHistory = customerService
				.findCounsellingHistoryByCustomerNumber(customerNumber);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/customercounselling");
		modelAndView.addObject("customerResult", customer);
		modelAndView.addObject("customerCharacteristicResult", customerCharacteristic);
		modelAndView.addObject("counsellingHistoryListResult", counsellingHistory);
		return modelAndView;
	}

	@RequestMapping(value = "/saveCustomerCharacteristic", method = RequestMethod.POST)
	public void saveCustomerCharacteristic(@ModelAttribute CustomerCharacteristic customerCharacteristic, Model model,
			Principal principal) {
		User user = userService.readUser(principal.getName());
		customerCharacteristic.setProvidernumber(user.getProvidernumber());
		customerCharacteristic.setUsername(user.getUsername());
		customerCharacteristic.setAuditId(user.getUsername());
		customerService.saveCustomerCharacteristic(customerCharacteristic);
		return;
	}

	@RequestMapping(value = "/saveCounsellingHistory", method = RequestMethod.POST)
	public void saveCounsellingHistory(@ModelAttribute CounsellingHistory counsellingHistory, Model model,
			Principal principal) {
		User user = userService.readUser(principal.getName());
		counsellingHistory.setProvidernumber(user.getProvidernumber());
		counsellingHistory.setUsername(user.getUsername());
		counsellingHistory.setAuditId(user.getUsername());
		customerService.saveCounsellingHistory(counsellingHistory);
		return;
	}

	@RequestMapping(value = "/couponusesearchbar", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ModelAndView viewCouponUseSearchBar(Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/couponusesearchbar");
		return modelAndView;
	}

	@RequestMapping(value = "/findcouponusesearchbar", method = RequestMethod.GET)
	public ModelAndView findCouponUseCustomerBySearchBar(@ModelAttribute CustomerSearchBar customerSearchBar,
			Model model, Principal principal) {
		/* ID mapping */
		User user = userService.readUser(principal.getName());
		customerSearchBar.setProvidernumber(user.getProvidernumber());
		customerSearchBar.setUsername(user.getUsername());
		/* ID mapping */
		List<Customer> customer = contractService.findCustomerBySearchBar(customerSearchBar);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("popup/couponusecustomerlistpopup");
		modelAndView.addObject("customerListResult", customer);
		return modelAndView;
	}

	@RequestMapping(value = "/findcouponuse/{customernumber}", method = RequestMethod.GET)
	public ModelAndView viewCouponUse(@PathVariable(value = "customernumber") int customerNumber) {
		CouponBalance couponBalance = contractService.findCouponBalanceByCustomerNumber(customerNumber);
		List<CouponUseHistory> couponUseHistory = contractService.findCouponUseHistoryByCustomerNumber(customerNumber);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/couponuse");
		modelAndView.addObject("couponBalanceResult", couponBalance);
		modelAndView.addObject("couponUseHistoryListResult", couponUseHistory);
		return modelAndView;
	}

	@RequestMapping(value = "/saveCouponUseHistory", method = RequestMethod.POST)
	public void saveCouponUse(@ModelAttribute CouponUseHistory couponUseHistory, Model model, Principal principal) {
		/* ID mapping */
		User user = userService.readUser(principal.getName());
		couponUseHistory.setProvidernumber(user.getProvidernumber());
		couponUseHistory.setUsername(user.getUsername());
		couponUseHistory.setAuditId(user.getUsername());
		/* ID mapping */
		contractService.saveCouponUseHistory(couponUseHistory);

		CouponBalance couponBalance = new CouponBalance();
		couponBalance.setProvidernumber(user.getProvidernumber());
		couponBalance.setUsername(user.getUsername());
		couponBalance.setCustomerNumber(couponUseHistory.getCustomerNumber());
		couponBalance.setCouponType(couponUseHistory.getCouponType());
		couponBalance.setCouponBalance(couponUseHistory.getUseAmount());
		couponBalance.setAuditId(user.getUsername());
		contractService.saveCouponBalance(couponBalance);
		return;
	}

	@RequestMapping(value = "/couponusetemplate", method = RequestMethod.GET)
	public ModelAndView viewCouponUseTemplate() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("admin/contract/couponusetemplate");
		return modelAndView;
	}

	@RequestMapping(value = "/findCustomer", method = RequestMethod.GET)
	public Map findCustomer(@ModelAttribute Customer customer, Model model, Principal principal) {
		User user = userService.readUser(principal.getName());
		customer.setProvidernumber(user.getProvidernumber());
		List<Customer> list = customerService.findCustomerUnique(customer);
		int customerNumber = 0;
		if (list.size() > 0) {
			customerNumber = list.get(0).getCustomerNumber();
		}
		Map map = new HashMap();
		map.put("customerNumber", customerNumber);
		return map;
	}
}
