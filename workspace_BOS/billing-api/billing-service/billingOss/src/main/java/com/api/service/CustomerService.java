package com.api.service;

import java.util.List;

import com.api.model.customer.Customer;

public interface CustomerService
{
	List<Customer> getCustomerSearch(Customer customer);
	List<Customer> getCustomerList(Customer customer);
	Customer getCustomer(Customer customer);
	int insertCustomer(Customer customer);
	int updateCustomer(Customer customer);
	List<Customer> getCustomerNumber(Customer customer);
}
