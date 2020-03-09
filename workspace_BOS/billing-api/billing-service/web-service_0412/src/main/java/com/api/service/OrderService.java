package com.api.service;

import java.util.List;

import com.api.billing.login.model.User;
import com.api.billing.model.order.Order;

public interface OrderService 
{
	Order getCurDate(Order order);
	List<Order> getChannelList(User user);
	List<Order> getChannelItemList(User user);
	Order getOrderNumber(Order order);
	Order getChannelContractNumber(Order order);
	int insertChannelContract(Order order);
	Order getAddressid(Order order); 
	List getCustomerNumber(Order order);
	int insertCustomer(Order order);
	int insertAddress(Order order);
	int insertDeliveryCustomer(Order order);
	int insertContract(Order order);
	int insertContractProduct(Order order);
	int insertPaymentInformation(Order order);
	Order getDeliveryDate1(Order order);
	Order getDeliveryDate2(Order order);
	int insertDeliveryDetail(Order order);
	int insertDeliveryDetail1(Order order);
	int insertDeliveryDetail2(Order order);
	List<Order> getDeleteChannelContract(Order order);
	List<Order> getDeleteContract(Order order);
	int deleteChannelContract(Order order);
	int deleteContract(Order order);
	int deleteContractProduct(Order order);
	int deleteDeliveryDetail(Order order);
	int deletePaymentInformation(Order order);
	List<Order> getContractList(Order order);
	List<Order> getDeliveryList(Order order);
	Order getContract(Order order);
	List<Order> getDeliveryCompany(Order order);
	List<Order> getDeliveryDetailList(Order order);
	List<Order> getDeliveryDetail(Order order);
	int updateDeliveryDetailState(Order order);
	int updateContractState(Order order);
	int updateDeliveryDetail(Order order);
	int updateAddress(Order order);
	List<Order> getCode(Order order);
	List<Order> getDeliveryDetailExcel(Order order);
	List<Order> getDeliveryDate(Order order);
	void setAutoCommitOff();
	void setAutoCommitOn();
	void dbCommit();
	void dbRollback();
	List<Order> getCustomerList(Order order);
	List<Order> getCustomerContractList(Order order);
	List<Order> getCustomerDeliveryList(Order order);
	List<Order> getCounselList(Order order);
	Order getCounsel(Order order);
	int updateCounsel(Order order);
	int insertCounsel(Order order);
	int upateContractTermination(Order order);
	int upateContractSuspend(Order order);
	List<Order> getDoneContractList(Order order);
}
