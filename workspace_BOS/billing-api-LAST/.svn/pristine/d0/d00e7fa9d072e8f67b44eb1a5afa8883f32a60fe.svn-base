package com.api.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.api.model.ProviderInformation;

@Mapper
@Repository
public interface ProviderRepository {
	List<ProviderInformation> getProviderInformationByCode(ProviderInformation providerInformation);
	List<ProviderInformation> getProviderInformation(ProviderInformation providerInformation);
	List<ProviderInformation> getProviderInformationByValue(ProviderInformation providerInformation);
	List<ProviderInformation> getProviderInformationDetail(ProviderInformation providerInformation);
}
