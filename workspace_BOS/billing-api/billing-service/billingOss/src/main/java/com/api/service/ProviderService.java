package com.api.service;

import java.util.List;

import com.api.model.ProviderInformation;

public interface ProviderService
{
	List<ProviderInformation> getProviderInformationByCode(ProviderInformation providerInformation);
	List<ProviderInformation> getProviderInformation(ProviderInformation providerInformation);
	ProviderInformation getProviderInformationOne(ProviderInformation providerInformation);
}
