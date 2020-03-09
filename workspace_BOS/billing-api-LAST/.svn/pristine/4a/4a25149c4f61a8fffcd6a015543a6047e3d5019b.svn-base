package com.api.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.billing.model.biz.Business;
import com.api.billing.model.biz.BusinessInput;
import com.api.billing.model.biz.Employee;
import com.api.repository.BizRepository;
import com.api.service.BizService;

@Service
@Transactional
public class BizLogic implements BizService {

	@Autowired
	private BizRepository bizRepository;
	
	//회원사 및 담당자 ID 생성
	@Override
	public int insertBusiness(BusinessInput bizInput) {
		int resultCnt = this.bizRepository.insertBusiness(bizInput);
		return resultCnt;
	}
	
	//회원사 수정
	@Override
	public int updateBusiness(BusinessInput bizInput) {
		int resultCnt = this.bizRepository.updateBusiness(bizInput);
		return resultCnt;
	}
	
	//회원사 삭제
	@Override
	public int deleteBusiness(BusinessInput bizInput) {
		int resultCnt = this.bizRepository.deleteBusiness(bizInput);
		return resultCnt;
	}
	
	//회원사 주소 등록
	@Override
	public int insertAddress(BusinessInput bizInput) {
		int resultCnt = this.bizRepository.insertAddress(bizInput);
		return resultCnt;
	}
	
	//회원사 주소 수정
	@Override
	public int updateAddress(BusinessInput bizInput) {
		int resultCnt = this.bizRepository.updateAddress(bizInput);
		return resultCnt;
	}	
	
	//회원사 주소ID 수정
	@Override
	public String selectAddressId(BusinessInput bizInput) {
		String addressId = this.bizRepository.selectAddressId(bizInput);
		return addressId;
	}
	
	//회원사 조회
	@Override
	public Business selectBusiness(BusinessInput bizInput) { 
		Business retBusiness = this.bizRepository.selectBusiness(bizInput); 
		return retBusiness;
	}
	
	///회원사 상세 조회
	@Override
	public BusinessInput selectBusinessDetail(String businessregistrationnumber) {
		BusinessInput retBusinessInput = this.bizRepository.selectBusinessDetail(businessregistrationnumber); 
		return retBusinessInput;
	}
	
	//제공자 등록
	@Override
	public int insertProvider(BusinessInput bizInput) {
		int resultCnt = this.bizRepository.insertProvider(bizInput);
		return resultCnt;
	}
	
	//제공자 수정
	@Override
	public int updateProvider(BusinessInput bizInput) {
		int resultCnt = this.bizRepository.updateProvider(bizInput);
		return resultCnt;
	}

	//사원등록
	@Override
	public int insertEmployee(BusinessInput bizInput) {
		int employeenumber = this.bizRepository.insertEmployee(bizInput);
		return employeenumber;
	}
	
	//사원수정
	@Override
	public int updateEmployee(BusinessInput bizInput) {
		int resultCnt = this.bizRepository.updateEmployee(bizInput);
		return resultCnt;
	}
	//사원 조회
	@Override
	public List<Employee> selectEmplyee(Employee empInput) {
		List<Employee> empList = this.bizRepository.selectEmplyee(empInput);
		return empList;
	}
	
	//사원 상세 조회	
	@Override
	public BusinessInput selectEmplyeeDetail(String loginId) {
		BusinessInput empDetail = this.bizRepository.selectEmplyeeDetail(loginId);
		return empDetail;
	}
	
	//login 사용자 등록
	@Override
	public int insertLogin(BusinessInput bizInput) {
		int resultCnt = this.bizRepository.insertLogin(bizInput);
		return resultCnt;
	}
	
	//login 사용자 수정
	@Override
	public int updateLogin(BusinessInput bizInput) {
		int resultCnt = this.bizRepository.updateLogin(bizInput);
		return resultCnt;
	}
	
	//login 사용자 비밀번호 수정
	@Override
	public int updateLoginPassword(BusinessInput bizInput) {
		int resultCnt = this.bizRepository.updateLoginPassword(bizInput);
		return resultCnt;
	}
	
	/*@Override
	public List<CodeGroupDetail> finCodeGroupDetailByCodeGroupId(String codeGroupId) {
		List<CodeGroupDetail> codeGroupDetail = codeRepository.finCodeGroupDetailByCodeGroupId(codeGroupId);
		return codeGroupDetail;
	}*/

}
