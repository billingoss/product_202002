package com.api.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.api.model.product.Discount;

@Mapper
@Repository
public interface DiscountRepository {
	//할인목록조회
	List<Discount> selectDiscountList(Discount discount);
	//신규 할인 ID 조회
	String selectNewDiscountId();
	//할인저장
	int insertDiscount(Discount discount);
	//할인수정
	int updateDiscount(Discount discount);

}
