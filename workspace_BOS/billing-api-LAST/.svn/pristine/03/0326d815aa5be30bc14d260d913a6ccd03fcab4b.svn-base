package com.api.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.api.model.customer.Customer;

@Mapper
@Repository
public interface CustomerRepository {
	List<Customer> getCustomerSearch(Customer customer);
	List<Customer> getCustomerList(Customer customer);
	Customer getCustomer(Customer customer);
	int insertCustomer(Customer customer);
	int updateCustomer(Customer customer);
	List<Customer> getCustomerNumber(Customer customer);
}
