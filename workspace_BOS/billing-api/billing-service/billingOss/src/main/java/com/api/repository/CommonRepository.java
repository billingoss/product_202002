package com.api.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface CommonRepository  {
	
	//시스템 속성 조회
    public String selectSystemProperties(String propertiesKey);    
}
