package com.api.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.api.model.contract.ContractInsert;

@Mapper
@Repository
public interface ContractRepository {
	List<ContractInsert> getProductList(ContractInsert contractInsert); 
	List<ContractInsert> getDiscountList(ContractInsert contractInsert); 
	ContractInsert getProduct(ContractInsert contractInsert);
	ContractInsert getAddressid(ContractInsert contractInsert);
	int createDeliveryAddress(ContractInsert contractInsert);
	List<ContractInsert> getCustomerNumber(ContractInsert contractInsert);
	int insertCustomer(ContractInsert contractInsert);
	int insertDeliveryCustomer(ContractInsert contractInsert);
	List<ContractInsert> getContractDone(ContractInsert contractInsert);
	List<ContractInsert> getContractList(ContractInsert contractInsert);
	List<ContractInsert> getDeliveryList(ContractInsert contractInsert);
	List<ContractInsert> getInvoiceList(ContractInsert contractInsert);
	int paymentInfoInsert(ContractInsert contractInsert);
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
	int createContract(ContractInsert contractInsert);
	int createContractProduct(ContractInsert contractInsert);
	int createContractDiscount(ContractInsert contractInsert);
}
