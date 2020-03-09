package com.api.service;

import java.util.List;

import com.api.model.contract.ContractList;

public interface ContractListService 
{
	List<ContractList> getContractList(ContractList contractList); 
	ContractList getContract(ContractList contractList);
	List<ContractList> getContractProduct(ContractList contractList);
	int updateContractTermination(ContractList contractList); 
	int updateContractSuspend(ContractList contractList);
	List<ContractList> getAddressId(ContractList contractList);
	int insertAddress(ContractList contractList);
	int insertDeliveryDetail(ContractList contractList); 
	List<ContractList> getContractDeliveryList(ContractList contractList); 
	ContractList getConctractAddress(ContractList contractList);
	ContractList getDeliveryAddress(ContractList contractList);
	List<ContractList> getDeliveryList(ContractList contractList); 
	List<ContractList> getDeliveryDate(ContractList contractList); 
	List<ContractList> getDeliveryDetailExcel(ContractList contractList); 
	int updateDeliveryDetailDate(ContractList contractList);
	int updateDeliveryDetail(ContractList contractList);
	int updateDeliveryDetailState(ContractList contractList);
	int updateContractState(ContractList contractList);
	List<ContractList> getContractSearch(ContractList ContractList);
	int updateContractDelivery(ContractList contractList);
	int updateContractDeliveryDetail(ContractList contractList);
	ContractList getDeliveryRemainCount(ContractList contractList);
	ContractList getDeliveryProductCount(ContractList contractList);
	List<ContractList> getContractAddition(ContractList contractList);
	int deleteContractAddition(ContractList contractList);
	int insertContractAddition(ContractList contractList);
	int insertDeliveryDetailBatch(ContractList contractList);
	int updateDeliveryDetailOnlyDate(ContractList contractList);
	int insertChannelContractChange(ContractList contractList);
	int updateChannelContractChangeProcess(ContractList contractList);
	int updateContractChannelState(ContractList contractList);
	int updateChannelContractChangeDone(ContractList contractList);
}