package com.api.service;

import java.util.List;

import com.api.model.biz.Business;
import com.api.model.biz.BusinessInput;
import com.api.model.biz.Employee;


public interface BusinessService {
	
	//회원사 및 담당자 ID 생성
	int insertBusiness(BusinessInput bizInput);
	//회원사 수정
	int updateBusiness(BusinessInput bizInput);
	//회원사 삭제
	int deleteBusiness(BusinessInput bizInput);
	//회원사 주소 등록
	int insertAddress(BusinessInput bizInput);
	//회원사 주소 id  조회
	String selectAddressId(BusinessInput bizInput);
	
	//회원사 주소 수정
	int updateAddress(BusinessInput bizInput);	
	//회원사 조회
	Business selectBusiness(BusinessInput bizInput);
	//회원사 상세 조회
	BusinessInput selectBusinessDetail(String businessregistrationnumber);
	
	//제공자 등록
	int insertProvider(BusinessInput bizInput);
	//제공자 수정
	int updateProvider(BusinessInput bizInput);
	//사원 등록
	int insertEmployee(BusinessInput bizInput);
	//사원 수정
	int updateEmployee(BusinessInput bizInput);
	//사원 조회
	List<Employee> selectEmployeeList(Employee empInput);
	//사원 조회 총 건수
	int selectEmployeeListTotalCnt(Employee empInput);
	//사원 상세 조회
	BusinessInput selectEmployeeDetail(String loginId);
	//login 등록
	int insertLogin(BusinessInput bizInput);
	//login 수정
	int updateLogin(BusinessInput bizInput);
	//login 비밀번호 수정
	int updateLoginPassword(BusinessInput bizInput);	
	//login email 중복건수
	int selectEmailDupCount(BusinessInput bizInput);
	//login id 중복건수
	int selectIIdDupCount(BusinessInput bizInput);

}
