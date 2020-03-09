package com.api.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.billing.login.model.User;
import com.api.billing.model.order.Order;
import com.api.repository.OrderRepository;
import com.api.service.OrderService;

@Service
public class OrderServiceLogic implements OrderService
{

	@Autowired
    private OrderRepository orderRepository;

	@Override
	public Order getCurDate(Order order) 
	{
		Order orderNumber = orderRepository.getCurDate(order);
		return orderNumber;
	}

	@Override
	public List<Order> getChannelList(User user) 
	{
		List<Order> channelList = orderRepository.getChannelList(user);
		return channelList;
	}

	@Override
	public List<Order> getChannelItemList(Order order) 
	{
		List<Order> channelItemList = orderRepository.getChannelItemList(order);
		return channelItemList;
	}

	@Override
	public List<Order> getProviderInformationByCode(Order order) 
	{
		List<Order> list = orderRepository.getProviderInformationByCode(order);
		return list;
	}

	@Override
	public Order getOrderNumber(Order order) 
	{
		Order orderNumber = orderRepository.getOrderNumber(order);
		return orderNumber;
	}

	@Override
	public Order getChannelContractNumber(Order order) 
	{
		Order channelContractNumber = orderRepository.getChannelContractNumber(order);
		return channelContractNumber;
	}

	@Override
	public int insertChannelContract(Order order) 
	{
		int result = orderRepository.insertChannelContract(order);
		return result;
	}
	
	@Override
	public Order getAddressid(Order order) 
	{
		Order addressid = orderRepository.getAddressid(order);
		return addressid;
	}

	@Override
	public List getCustomerNumber(Order order) 
	{
		List<Order> list = orderRepository.getCustomerNumber(order);
		return list;
	}

	@Override
	public int insertCustomer(Order order) 
	{
		int result = orderRepository.insertCustomer(order);
		return result;
	}
	
	@Override
	public int insertAddress(Order order) 
	{
		int result = orderRepository.insertAddress(order);
		return result;
	}
	
	@Override
	public int insertDeliveryCustomer(Order order) 
	{
		int result = orderRepository.insertDeliveryCustomer(order);
		return result;
	}
	
	@Override
	public int insertContract(Order order) 
	{
		int result = orderRepository.insertContract(order);
		return result;
	}
	
	@Override
	public int insertContractProduct(Order order) 
	{
		int result = orderRepository.insertContractProduct(order);
		return result;
	}
	
	@Override
	public int insertPaymentInformation(Order order) 
	{
		int result = orderRepository.insertPaymentInformation(order);
		return result;
	}
	
	@Override
	public Order getDeliveryDate1(Order order) 
	{
		Order result = orderRepository.getDeliveryDate1(order);
		return result;
	}

	@Override
	public Order getDeliveryDate2(Order order) 
	{
		Order result = orderRepository.getDeliveryDate2(order);
		return result;
	}

	@Override
	public int insertDeliveryDetail(Order order) 
	{
		int result = orderRepository.insertDeliveryDetail(order);
		return result;
	}

	@Override
	public int insertDeliveryDetail1(Order order) 
	{
		int result = orderRepository.insertDeliveryDetail1(order);
		return result;
	}

	@Override
	public int insertDeliveryDetail2(Order order) 
	{
		int result = orderRepository.insertDeliveryDetail2(order);
		return result;
	}
	
	@Override
	public List<Order> getDeleteChannelContract(Order order) 
	{
		List<Order> list = orderRepository.getDeleteChannelContract(order);
		return list;
	}

	@Override
	public List<Order> getDeleteContract(Order order) 
	{
		List<Order> list = orderRepository.getDeleteContract(order);
		return list;
	}

	@Override
	public int deleteChannelContract(Order order) 
	{
		int result = orderRepository.deleteChannelContract(order);
		return result;
	}
	
	@Override
	public int deleteContract(Order order) 
	{
		int result = orderRepository.deleteContract(order);
		return result;
	}
	
	@Override
	public int deleteContractProduct(Order order) 
	{
		int result = orderRepository.deleteContractProduct(order);
		return result;
	}
	
	@Override
	public int deleteDeliveryDetail(Order order) 
	{
		int result = orderRepository.deleteDeliveryDetail(order);
		return result;
	}
	
	@Override
	public int deletePaymentInformation(Order order) 
	{
		int result = orderRepository.deletePaymentInformation(order);
		return result;
	}
	
	@Override
	public List<Order> getContractList(Order order) 
	{
		List<Order> orderList = orderRepository.getContractList(order);
		return orderList;
	}

	@Override
	public List<Order> getDeliveryList(Order order) 
	{
		List<Order> orderList = orderRepository.getDeliveryList(order);
		return orderList;
	}
	
	@Override
	public Order getContract(Order order) 
	{
		Order result = orderRepository.getContract(order);
		return result;
	}

	@Override
	public List<Order> getDeliveryCompany(Order order) 
	{
		List<Order> orderList = orderRepository.getDeliveryCompany(order);
		return orderList;
	}

	@Override
	public List<Order> getDeliveryDetailList(Order order) 
	{
		List<Order> orderList = orderRepository.getDeliveryDetailList(order);
		return orderList;
	}
	
	@Override
	public int updateDeliveryDetailState(Order order) 
	{
		int result = orderRepository.updateDeliveryDetailState(order);
		return result;
	}
	
	@Override
	public int updateContractState(Order order) 
	{
		int result = orderRepository.updateContractState(order);
		return result;
	}
	
	@Override
	public int updateDeliveryDetail(Order order) 
	{
		int result = orderRepository.updateDeliveryDetail(order);
		return result;
	}
	
	@Override
	public int updateAddress(Order order) 
	{
		int result = orderRepository.updateAddress(order);
		return result;
	}

	@Override
	public List<Order> getCode(Order order) 
	{
		List<Order> orderNumber = orderRepository.getCode(order);
		return orderNumber;
	}
	
	@Override
	public List<Order> getDeliveryDetail(Order order) 
	{
		List<Order> orderList = orderRepository.getDeliveryDetail(order);
		return orderList;
	}
	
	@Override
	public List<Order> getProviderInformation(Order order) 
	{
		List<Order> orderList = orderRepository.getProviderInformation(order);
		return orderList;
	}
	
	@Override
	public List<Order> getDeliveryDetailExcel(Order order) 
	{
		List<Order> orderList = orderRepository.getDeliveryDetailExcel(order);
		return orderList;
	}
	
	@Override
	public List<Order> getDeliveryDate(Order order) 
	{
		List<Order> orderList = orderRepository.getDeliveryDate(order);
		return orderList;
	}
	
	@Override
	public void setAutoCommitOff() 
	{
		orderRepository.setAutoCommitOff();
		return;
	}
	
	@Override
	public void setAutoCommitOn() 
	{
		orderRepository.setAutoCommitOn();
		return;
	}
	
	@Override
	public void dbCommit() 
	{
		orderRepository.dbCommit();
		return;
	}
	
	@Override
	public void dbRollback() 
	{
		orderRepository.dbRollback();
		return;
	}

	@Override
	public List<Order> getCustomerList(Order order) 
	{
		List<Order> orderList = orderRepository.getCustomerList(order);
		return orderList;
	}
	
	@Override
	public List<Order> getCustomerContractList(Order order) 
	{
		List<Order> orderList = orderRepository.getCustomerContractList(order);
		return orderList;
	}
	
	@Override
	public List<Order> getCustomerDeliveryList(Order order) 
	{
		List<Order> orderList = orderRepository.getCustomerDeliveryList(order);
		return orderList;
	}
	
	@Override
	public List<Order> getCounselList(Order order) 
	{
		List<Order> orderList = orderRepository.getCounselList(order);
		return orderList;
	}
	
	@Override
	public Order getCounsel(Order order) 
	{
		Order counsel = orderRepository.getCounsel(order);
		return counsel;
	}
	
	@Override
	public int updateCounsel(Order order) 
	{
		int result = orderRepository.updateCounsel(order);
		return result;
	}

	@Override
	public int insertCounsel(Order order) 
	{
		int result = orderRepository.insertCounsel(order);
		return result;
	}

	@Override
	public int upateContractTermination(Order order) 
	{
		int result = orderRepository.upateContractTermination(order);
		return result;
	}

	@Override
	public int upateContractSuspend(Order order) 
	{
		int result = orderRepository.upateContractSuspend(order);
		return result;
	}
	
	@Override
	public List<Order> getDoneContractList(Order order) 
	{
		List<Order> orderList = orderRepository.getDoneContractList(order);
		return orderList;
	}
}
