package com.api.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.model.counselling.Counselling;
import com.api.repository.CounsellingRepository;
import com.api.service.CounsellingService;

@Service
public class CounsellingLogic implements CounsellingService
{

	@Autowired
    private CounsellingRepository counsellingRepository;

	@Override
	public List<Counselling> getCounsellingList(Counselling counselling) 
	{
		List<Counselling> result = counsellingRepository.getCounsellingList(counselling);
		return result;
	}

	@Override
	public Counselling getCounselling(Counselling counselling) 
	{
		Counselling result = counsellingRepository.getCounselling(counselling);
		return result;
	}

	@Override
	public int insertCounselling(Counselling counselling) 
	{
		int result = counsellingRepository.insertCounselling(counselling);
		return result;
	}

	@Override
	public int updateCounselling(Counselling counselling) 
	{
		int result = counsellingRepository.updateCounselling(counselling);
		return result;
	}

	@Override
	public int deleteCounselling(Counselling counselling) 
	{
		int result = counsellingRepository.deleteCounselling(counselling);
		return result;
	}

	@Override
	public List<Counselling> getCounsellingListByCustomerNumber(Counselling counselling) 
	{
		List<Counselling> result = counsellingRepository.getCounsellingListByCustomerNumber(counselling);
		return result;
	}

}
