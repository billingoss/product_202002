package com.api.service;

import java.util.List;

import com.api.billing.model.contract.Contract;
import com.api.billing.model.contract.ContractInsert;
import com.api.billing.model.contract.ContractProduct;
import com.api.billing.model.contract.CouponBalance;
import com.api.billing.model.contract.CouponUseHistory;
import com.api.billing.model.contract.Discount2;
import com.api.billing.model.contract.DiscountEffectDate;
import com.api.billing.model.contract.PaymentInformation;
import com.api.billing.model.contract.Product2;
import com.api.billing.model.customer.Address;
import com.api.billing.model.customer.Customer;
import com.api.billing.model.customer.CustomerSearchBar;
import com.api.billing.model.product.Discount;
import com.api.billing.model.product.DiscountSearchBar;
import com.api.billing.model.product.Product3;

public interface ContractService {

	Customer findCustomerByCustomerNumber(int customerNumber);
	
	List<Contract> findContractByCustomerNumber(int customerNumber);
	
	PaymentInformation findPaymentInformationByConNumber(int conNumber);
	
	List<Customer> findCustomerBySearchBar(CustomerSearchBar customerSearchBar);
	
	List<Product3> findAllProduct();

	List<Discount> findAllDiscount();

	//추가
	List<Customer> getFindCustomerList(int customerNumber);
	List<Product2> getProductList(Product2 product);
	List<Discount> getDiscountList(DiscountEffectDate discountEffectDate);
	List<Discount2> findDiscountBySearchBar(DiscountSearchBar discountSearchBar);
	List<Discount2> getFindApplyDiscount(DiscountEffectDate discountEffectDate);
	
	int createDeliveryAddress(ContractInsert contractInsert);
	Address findDeliverAddressId(ContractInsert contractInsert);
	int paymentInfoInsert(ContractInsert contractInsert);
	int createContract(ContractInsert contractInsert);
	int createContractProduct(ContractInsert contractInsert);
	int createContractDiscount(ContractInsert contractInsert);
	
	ContractInsert findPackageId(ContractInsert contractInsert);
	
	ContractInsert findSubscribeDateTime(int conNumber);
	
	ContractProduct findContractProductByConNumberAndProductId(ContractProduct contractProduct);
	
	int findProductTotalCount();
	
	
	CouponBalance findCouponBalanceByCustomerNumber(int customerNumber);

	List<CouponUseHistory> findCouponUseHistoryByCustomerNumber(int customerNumber);

	void saveCouponUseHistory(CouponUseHistory couponUseHistory);

	void saveCouponBalance(CouponBalance couponBalance);
	
	//20180920
	CouponBalance findCouponBalanceWhenContractInsert(ContractInsert contractInsert);
	int createCouponBalanceWhenContractInsert(CouponBalance couponBalance);
	int updateCouponBalanceWhenContarctInsert(CouponBalance couponBalance);
	int createCouponUseHIstoryWhenConatractInsert(CouponUseHistory couponUseHistory);
	
	ContractInsert getDeliveryDate(ContractInsert contractInsert);
	ContractInsert getDeliveryDate1(ContractInsert contractInsert);
	ContractInsert getDeliveryDate2(ContractInsert contractInsert);
	ContractInsert getDeliveryCount1(ContractInsert contractInsert);
	ContractInsert getDeliveryCount2(ContractInsert contractInsert);
	ContractInsert getDeliveryDateWeek1(ContractInsert contractInsert);
	ContractInsert getDeliveryDateWeek2(ContractInsert contractInsert);
	ContractInsert getDeliveryWeekCount1(ContractInsert contractInsert);
	ContractInsert getDeliveryWeekCount2(ContractInsert contractInsert);
	int insertDeliveryDetail1(ContractInsert contractInsert);
	int insertDeliveryDetail2(ContractInsert contractInsert);
	int insertDeliveryDetailWeek1(ContractInsert contractInsert);
	int insertDeliveryDetailWeek2(ContractInsert contractInsert);

	ContractInsert getProduct(ContractInsert contractInsert);
	ContractInsert getAddressid(ContractInsert contractInsert);
	List<ContractInsert> getCustomerNumber(ContractInsert contractInsert);
	int insertCustomer(ContractInsert contractInsert);
	int insertDeliveryCustomer(ContractInsert contractInsert);
	List<ContractInsert> getContractDone(ContractInsert contractInsert);
	List<ContractInsert> getContractList(ContractInsert contractInsert);
	List<ContractInsert> getDeliveryList(ContractInsert contractInsert);
	List<ContractInsert> getInvoiceList(ContractInsert contractInsert);
}
