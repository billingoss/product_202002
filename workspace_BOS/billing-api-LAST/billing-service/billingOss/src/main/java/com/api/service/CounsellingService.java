package com.api.service;

import java.util.List;

import com.api.model.counselling.Counselling;

public interface CounsellingService
{
	List<Counselling> getCounsellingList(Counselling counselling);
	Counselling getCounselling(Counselling counselling); 
	int insertCounselling(Counselling counselling); 
	int updateCounselling(Counselling counselling);
	int deleteCounselling(Counselling counselling); 
	List<Counselling> getCounsellingListByCustomerNumber(Counselling counselling);
}
