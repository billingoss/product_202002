package com.api.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.api.billing.model.biz.Business;
import com.api.billing.model.biz.BusinessInput;
import com.api.billing.model.biz.Employee;

@Mapper
@Repository
public interface BizRepository {
	
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
	//사원 조회
	List<Employee> selectEmplyee(Employee empInput);	
	//사원 수정
	int updateEmployee(BusinessInput bizInput);
	//사원 상세 조회
	BusinessInput selectEmplyeeDetail(String loginId);
	//login 등록
	int insertLogin(BusinessInput bizInput);
	//login 수정
	int updateLogin(BusinessInput bizInput);
	//login 비밀번호 수정
	int updateLoginPassword(BusinessInput bizInput);

}
