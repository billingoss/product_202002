package com.api.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.model.ProviderInformation;
import com.api.repository.ProviderRepository;
import com.api.service.ProviderService;

@Service
public class ProviderLogic implements ProviderService
{

	@Autowired
    private ProviderRepository providerRepository;

	@Override
	public List<ProviderInformation> getProviderInformationByCode(ProviderInformation providerInformation) 
	{
		List<ProviderInformation> list = providerRepository.getProviderInformationByCode(providerInformation);
		return list;
	}
	
	@Override
	public List<ProviderInformation> getProviderInformation(ProviderInformation providerInformation) 
	{
		List<ProviderInformation> list = providerRepository.getProviderInformation(providerInformation);
		return list;
	}
	
	@Override
	public ProviderInformation getProviderInformationOne(ProviderInformation providerInformation) 
	{
		List<ProviderInformation> list = providerRepository.getProviderInformation(providerInformation);
					
		ProviderInformation providerInfo = null;
		if (list != null && list.size() ==1) {
			providerInfo = list.get(0);
		}
		
		return providerInfo;
	}

	@Override
	public List<ProviderInformation> getProviderInformationByValue(ProviderInformation providerInformation) 
	{
		List<ProviderInformation> list = providerRepository.getProviderInformationByValue(providerInformation);
		return list;
	}

	@Override
	public List<ProviderInformation> getProviderInformationDetail(ProviderInformation providerInformation) 
	{
		List<ProviderInformation> list = providerRepository.getProviderInformationDetail(providerInformation);
		return list;
	}
}
