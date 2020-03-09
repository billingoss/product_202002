package com.api.service;

import java.util.List;

import com.api.model.product.Discount;

public interface DiscountService
{

	//할인목록조회
	List<Discount> selectDiscountList(Discount discount);
	//할인목록조회
	Discount selectDiscountDetail(Discount discount);
	
	//할인저장
	int saveDiscount(Discount discount);
	
}
