package com.api.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.BizException;
import com.api.model.product.Discount;
import com.api.repository.DiscountRepository;
import com.api.service.DiscountService;

@Service
public class DiscountLogic implements DiscountService
{

	@Autowired
    private DiscountRepository discountRepository;

	
	//할인목록조회
	@Override
	public List<Discount> selectDiscountList(Discount discount) {
		List<Discount> list = this.discountRepository.selectDiscountList(discount);
		return list;
	}
	
	//할인목록조회
	@Override
	public Discount selectDiscountDetail(Discount discount) {		
		List<Discount> list = this.discountRepository.selectDiscountList(discount);
		Discount resultDisc = null;
		if (list != null && list.size() == 1) {
			resultDisc = list.get(0);
		}
		return resultDisc;
	}
	
	//할인저장
	@Override
	public int saveDiscount(Discount discount) {
		//step1. 수정 신규 판단
		String discountId = "";
		int resultCnt = 0;
		String message ="";
		if (discount.getUpdateDiscountFlag()) {
			//수정
			discountId = discount.getDiscountId();
			
			//step3. 상품정보를 수정 한다.
			resultCnt = this.discountRepository.updateDiscount(discount);
			message = "할인 정보 수정에 실패 하였습니다.";
		}else {
			//신규 상품 ID를 조회 한다.
			discountId = this.discountRepository.selectNewDiscountId();
			discount.setDiscountId(discountId);
			//step3. 상품정보를 등록 한다.
			resultCnt = this.discountRepository.insertDiscount(discount);
			message = "할인 정보 생성에 실패 하였습니다.";
		}
		
		if (resultCnt == 0) {
			throw new BizException(message);
		}
		
		return resultCnt;
	}
}
