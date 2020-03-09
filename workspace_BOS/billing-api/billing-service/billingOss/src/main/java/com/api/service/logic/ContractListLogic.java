package com.api.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.model.contract.ContractList;
import com.api.repository.ContractListRepository;
import com.api.service.ContractListService;

@Service
public class ContractListLogic implements ContractListService
{

	@Autowired
    private ContractListRepository contractListRepository;

	@Override
	public List<ContractList> getContractList(ContractList contractList) 
	{
		List<ContractList> list = contractListRepository.getContractList(contractList);
		return list;
	}
	
	@Override
	public ContractList getContract(ContractList contractList) 
	{
		ContractList result = contractListRepository.getContract(contractList);
		return result;
	}
	
	@Override
	public int upateContractTermination(ContractList contractList) 
	{
		int result = contractListRepository.upateContractTermination(contractList);
		return result;
	}
	
	@Override
	public int upateContractSuspend(ContractList contractList) 
	{
		int result = contractListRepository.upateContractSuspend(contractList);
		return result;
	}

	@Override
	public List<ContractList> getAddressId(ContractList contractList) 
	{
		List<ContractList> list = contractListRepository.getAddressId(contractList);
		return list;
	}
	
	@Override
	public int insertAddress(ContractList contractList) 
	{
		int result = contractListRepository.insertAddress(contractList);
		return result;
	}
	
	@Override
	public int insertDeliveryDetail(ContractList contractList) 
	{
		int result = contractListRepository.insertDeliveryDetail(contractList);
		return result;
	}
	
	@Override
	public int updateDeliveryDetailDate(ContractList contractList) 
	{
		int result = contractListRepository.updateDeliveryDetailDate(contractList);
		return result;
	}
	
	@Override
	public List<ContractList> getContractDeliveryList(ContractList contractList) 
	{
		List<ContractList> list = contractListRepository.getContractDeliveryList(contractList);
		return list;
	}

	@Override
	public ContractList getConctractAddress(ContractList contractList) 
	{
		ContractList result = contractListRepository.getConctractAddress(contractList);
		return result;
	}
	
	@Override
	public ContractList getDeliveryAddress(ContractList contractList) 
	{
		ContractList result = contractListRepository.getDeliveryAddress(contractList);
		return result;
	}
	
	@Override
	public List<ContractList> getDeliveryList(ContractList contractList) 
	{
		List<ContractList> list = contractListRepository.getDeliveryList(contractList);
		return list;
	}

	@Override
	public List<ContractList> getDeliveryDate(ContractList contractList) 
	{
		List<ContractList> list = contractListRepository.getDeliveryDate(contractList);
		return list;
	}

	@Override
	public List<ContractList> getDeliveryDetailExcel(ContractList contractList) 
	{
		List<ContractList> list = contractListRepository.getDeliveryDetailExcel(contractList);
		return list;
	}

	@Override
	public int updateDeliveryDetail(ContractList contractList) 
	{
		int result = contractListRepository.updateDeliveryDetail(contractList);
		return result;
	}
	
	@Override
	public int updateDeliveryDetailState(ContractList contractList) 
	{
		int result = contractListRepository.updateDeliveryDetailState(contractList);
		return result;
	}
	
	@Override
	public int updateContractState(ContractList contractList) 
	{
		int result = contractListRepository.updateContractState(contractList);
		return result;
	}
	
	@Override
	public List<ContractList> getContractSearch(ContractList contractList) 
	{
		List<ContractList> result = contractListRepository.getContractSearch(contractList);
		return result;
	}
	
	@Override
	public int updateContractDelivery(ContractList contractList) 
	{
		int result = contractListRepository.updateContractDelivery(contractList);
		return result;
	}
	
	@Override
	public int updateContractDeliveryDetail(ContractList contractList) 
	{
		int result = contractListRepository.updateContractDeliveryDetail(contractList);
		return result;
	}
}