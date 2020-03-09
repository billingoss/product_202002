package com.api.service.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.repository.CommonRepository;
import com.api.service.CommonService;

@Service
public class CommonLogic implements CommonService {

	@Autowired
	private CommonRepository commonRepository;
	

	
	@Override
	public String selectSystemProperties(String propertiesKey) {
		String returnValue = this.commonRepository.selectSystemProperties(propertiesKey);
		return returnValue;
	}

}
