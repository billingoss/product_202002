package com.api.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.api.model.counselling.Counselling;

@Mapper
@Repository
public interface CounsellingRepository {
	List<Counselling> getCounsellingList(Counselling counselling);
	Counselling getCounselling(Counselling counselling); 
	int insertCounselling(Counselling counselling); 
	int updateCounselling(Counselling counselling);
	int deleteCounselling(Counselling counselling); 
	List<Counselling> getCounsellingListByCustomerNumber(Counselling counselling);
}
