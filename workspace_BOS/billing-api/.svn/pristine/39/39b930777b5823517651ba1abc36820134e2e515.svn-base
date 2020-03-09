package com.api.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.model.customer.Customer;
import com.api.repository.CustomerRepository;
import com.api.service.CustomerService;

@Service
public class CustomerLogic implements CustomerService
{

	@Autowired
    private CustomerRepository customerRepository;

	@Override
	public List<Customer> getCustomerSearch(Customer customer)
	{
		List<Customer> list = customerRepository.getCustomerSearch(customer);
		return list;
	}

	@Override
	public List<Customer> getCustomerList(Customer customer)
	{
		List<Customer> list = customerRepository.getCustomerList(customer);
		return list;
	}

	@Override
	public Customer getCustomer(Customer customer)
	{
		Customer result = customerRepository.getCustomer(customer);
		return result;
	}
	
	@Override
	public int insertCustomer(Customer customer)
	{
		int result = customerRepository.insertCustomer(customer);
		return result;
	}

	@Override
	public int updateCustomer(Customer customer)
	{
		int result = customerRepository.updateCustomer(customer);
		return result;
	}
	
	@Override
	public List<Customer> getCustomerNumber(Customer customer)
	{
		List<Customer> list = customerRepository.getCustomerNumber(customer);
		return list;
	}

}
