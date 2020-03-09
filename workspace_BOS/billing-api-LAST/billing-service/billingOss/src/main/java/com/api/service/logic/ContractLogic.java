package com.api.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.model.contract.ContractInsert;
import com.api.repository.ContractRepository;
import com.api.service.ContractService;

@Service
public class ContractLogic implements ContractService
{

	@Autowired
    private ContractRepository contractRepository;

	@Override
	public List<ContractInsert> getProductList(ContractInsert contractInsert) 
	{
		List<ContractInsert> result = contractRepository.getProductList(contractInsert);
		return result;
	}
	
	@Override
	public List<ContractInsert> getProductListByGroup(ContractInsert contractInsert) 
	{
		List<ContractInsert> result = contractRepository.getProductListByGroup(contractInsert);
		return result;
	}
	
	@Override
	public List<ContractInsert> getDiscountList(ContractInsert contractInsert) 
	{
		List<ContractInsert> result = contractRepository.getDiscountList(contractInsert);
		return result;
	}
	
	@Override
	public List<ContractInsert> getProduct(ContractInsert contractInsert) 
	{
		List<ContractInsert> result = contractRepository.getProduct(contractInsert);
		return result;
	}
	
	@Override
	public ContractInsert getAddressid(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		ContractInsert result = contractRepository.getAddressid(contractInsert);
		return result;
	}

	@Override
	public int createDeliveryAddress(ContractInsert contractInsert) {
		return contractRepository.createDeliveryAddress(contractInsert);
	}
	
	@Override
	public List<ContractInsert> getCustomerNumber(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		List<ContractInsert> result = contractRepository.getCustomerNumber(contractInsert);
		return result;
	}

	@Override
	public int insertCustomer(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.insertCustomer(contractInsert);
	}

	@Override
	public int insertDeliveryCustomer(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.insertDeliveryCustomer(contractInsert);
	}
	
	@Override
	public List<ContractInsert> getContractDone(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.getContractDone(contractInsert);
	}
	
	@Override
	public List<ContractInsert> getContractList(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.getContractList(contractInsert);
	}
	
	@Override
	public List<ContractInsert> getDeliveryList(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.getDeliveryList(contractInsert);
	}
	
	@Override
	public List<ContractInsert> getInvoiceList(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.getInvoiceList(contractInsert);
	}
	@Override
	public int paymentInfoInsert(ContractInsert contractInsert) {
		int paymentInfoInsertFlag = contractRepository.paymentInfoInsert(contractInsert);
		return paymentInfoInsertFlag;
	}
	
	@Override
	public ContractInsert getDeliveryDate(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		ContractInsert result = contractRepository.getDeliveryDate(contractInsert);
		return result;
	}
	@Override
	public ContractInsert getDeliveryCount1(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		ContractInsert result = contractRepository.getDeliveryCount1(contractInsert);
		return result;
	}
	@Override
	public ContractInsert getDeliveryCount2(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		ContractInsert result = contractRepository.getDeliveryCount2(contractInsert);
		return result;
	}
	@Override
	public ContractInsert getDeliveryDate1(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		ContractInsert result = contractRepository.getDeliveryDate1(contractInsert);
		return result;
	}
	@Override
	public ContractInsert getDeliveryDate2(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		ContractInsert result = contractRepository.getDeliveryDate2(contractInsert);
		return result;
	}
	@Override
	public ContractInsert getDeliveryWeekCount1(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		ContractInsert result = contractRepository.getDeliveryWeekCount1(contractInsert);
		return result;
	}
	@Override
	public ContractInsert getDeliveryWeekCount2(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		ContractInsert result = contractRepository.getDeliveryWeekCount2(contractInsert);
		return result;
	}
	@Override
	public ContractInsert getDeliveryDateWeek1(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		ContractInsert result = contractRepository.getDeliveryDateWeek1(contractInsert);
		return result;
	}
	@Override
	public ContractInsert getDeliveryDateWeek2(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		ContractInsert result = contractRepository.getDeliveryDateWeek2(contractInsert);
		return result;
	}
	
	@Override
	public int insertDeliveryDetail(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.insertDeliveryDetail(contractInsert);
	}
	@Override
	public int insertDeliveryDetail1(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.insertDeliveryDetail1(contractInsert);
	}
	@Override
	public int insertDeliveryDetail2(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.insertDeliveryDetail2(contractInsert);
	}
	@Override
	public int insertDeliveryDetailWeek1(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.insertDeliveryDetailWeek1(contractInsert);
	}
	@Override
	public int insertDeliveryDetailWeek2(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.insertDeliveryDetailWeek2(contractInsert);
	}

	@Override
	public int createContract(ContractInsert contractInsert) {
		int createContractFlag = contractRepository.createContract(contractInsert);
		return createContractFlag;
	}

	@Override
	public int createContractProduct(ContractInsert contractInsert) {
		int createContractProductFlag = contractRepository.createContractProduct(contractInsert);
		return createContractProductFlag;
	}

	@Override
	public int createContractDiscount(ContractInsert contractInsert) {
		int result = contractRepository.createContractDiscount(contractInsert);
		return result;
	}

	@Override
	public List<ContractInsert> getDeliveryChargeAmount(ContractInsert contractInsert) {
		List<ContractInsert> result = contractRepository.getDeliveryChargeAmount(contractInsert);
		return result;
	}

	@Override
	public List<ContractInsert> getCustomerByChannelCustomerNumber(ContractInsert contractInsert) {
		List<ContractInsert> result = contractRepository.getCustomerByChannelCustomerNumber(contractInsert);
		return result;
	}


	@Override
	public List<ContractInsert> getDeliveryDateByDeliverySeq(ContractInsert contractInsert) {
		List<ContractInsert> result = contractRepository.getDeliveryDateByDeliverySeq(contractInsert);
		return result;
	}
	
	@Override
	public int insertDeliveryDetailByDeliveryDay(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.insertDeliveryDetailByDeliveryDay(contractInsert);
	}

	@Override
	public int insertContractAddition(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.insertContractAddition(contractInsert);
	}

	@Override
	public int updateCustomerEmail(ContractInsert contractInsert) {
		// TODO Auto-generated method stub
		return contractRepository.updateCustomerEmail(contractInsert);
	}

	@Override
	public List<ContractInsert> getProviderTerms(ContractInsert contractInsert) 
	{
		List<ContractInsert> result = contractRepository.getProviderTerms(contractInsert);
		return result;
	}

	@Override
	public List<ContractInsert> getContractByChannelOrderNumber(ContractInsert contractInsert) 
	{
		List<ContractInsert> result = contractRepository.getContractByChannelOrderNumber(contractInsert);
		return result;
	}
}
