package com.api.service.logic;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.BizException;
import com.api.model.product.Discount;
import com.api.model.product.Product;
import com.api.model.product.ProductDiscount;
import com.api.model.product.ProductPackage;
import com.api.repository.DiscountRepository;
import com.api.repository.ProductRepository;
import com.api.service.ProductService;

@Service
public class ProductLogic implements ProductService
{

	@Autowired
    private ProductRepository productRepository;
	
	@Autowired
    private DiscountRepository discountRepository;
	
	//상품목록조회
	@Override
	public List<Product> selectProductList(Product product)
	{
		List<Product> list = this.productRepository.selectProductList(product);
		return list;
	}
/*	
	//신규 상품 ID 찾기
	@Override
	public String findProductid() {
		String newProductId = this.productRepository.findProductid();				
		return newProductId;
	}
	//상품 등록
	@Override
	public int insertProduct(Product product) {
		int resultCnt = this.productRepository.insertProduct(product);
		return resultCnt;
	}
	
*/	
	//상품 저장
	public int saveProduct(Product product) {
		
		String productId = "";		
		int resultCnt = 0;
		//step1. 상품유형이 패키지 일 경우 패키지 여부를 Y로 설정 한다.
		if("PACKAGE".equals(product.getProductType())) {
			product.setPackageYn("Y");
		}else {
			product.setPackageYn("N");			
		}
		
		//step2. 신규생성 , 수정 상태를 판단하여 저장 한다.
		if (product.getUpdateProductFlag()) {
			//수정
			productId = product.getProductId();
			
			//step3. 상품정보를 수정 한다.
			resultCnt = this.productRepository.updateProduct(product);
		}else {
			//신규 상품 ID를 조회 한다.
			productId = this.productRepository.selectNewProductId();
			product.setProductId(productId);
			//step3. 상품정보를 등록 한다.
			resultCnt = this.productRepository.insertProduct(product);
		}
		
		if(resultCnt >0) {
			//step4. 패키지 상품일 경우 패키지 상품목록을 저장한다. -- main 상품 id를 세팅하고 저장 한다.
			if ("Y".equals(product.getPackageYn())) {				
				String packageId = "";
				if (product.getUpdateProductFlag()) {
					//수정
					packageId = product.getPackageId();
				}else {
					//신규 패키지 ID를 조회 한다.
					packageId = this.productRepository.selectNewProductPackageId();
				}
				
				//등록 화면에서 전달 받은 패키지 목록
				List<ProductPackage> packageList = product.getProductPackageList();
				
				//step5. 패키지 내역을 저장 한다.
				for (ProductPackage item : packageList) {
					//상품 ID가 없는 경우 화면에서 삭제된 항목으로 판단하여 저장을 skip 한다.
					if(!"".equals(item.getCompositionProductId())) {						
						item.setPackageId(packageId);
						item.setProviderNumber(product.getProviderNumber());
						item.setMainProductId(productId);
						item.setAuditId(product.getAuditId());		
						if("C".equals(item.getPackageModiFlag())) {							
							this.productRepository.insertProductPackage(item);
						}else if("U".equals(item.getPackageModiFlag())) {
							this.productRepository.updateProductPackage(item);
						}
					}
				}				
			}

			//step6. 상품 할인내역을 저장 한다.
			List<ProductDiscount> discountList = product.getProductDiscountList();
			for (ProductDiscount productDiscount : discountList) {
				if(!"".equals(productDiscount.getDiscountId())) {					
					productDiscount.setProviderNumber(product.getProviderNumber());
					productDiscount.setProductId(productId);
					productDiscount.setAuditId(product.getAuditId());	
					if ("C".equals(productDiscount.getProductDiscountModiFlag())) {						
						this.productRepository.insertProductDiscount(productDiscount);
					}else if ("U".equals(productDiscount.getProductDiscountModiFlag())) {
						this.productRepository.updateProductDiscount(productDiscount);						
					}					
				}
			}
		}else {
			throw new BizException("상품 정보 저장에 실패 하였습니다.");
		}		
		return resultCnt;
	}
	
	//상품정보삭제
	@Override
	public int deleteProduct(Product product) {
		String[] deleteList = product.getDeleteProductId();
		int resultCnt = 0;
		for (String productId : deleteList) {
			product.setProductId(productId);
			resultCnt += this.productRepository.deleteProduct(product);
		}
		return resultCnt;
	}
	
	//상품 상세 정보 및 패키지 상품일 경우 패키지 목록을 조회 한다.
	@Override
	public Map selectProductDetail(Product product) {
		Map resultMap = new HashMap();
		//step1. 상품 상세 정보를 조회 한다
		List<Product> productList = this.productRepository.selectProductList(product);
		Product productDetail = null; 
		if (productList != null && productList.size() == 1) {
			productDetail = productList.get(0);
		}else {
			throw new BizException("상품 정보가 없거나 1건 이상 존재 합니다.");
		}		
		resultMap.put("productDetail", productDetail);
		
		//step2. 패키지 정보를 조회 한다.
		List<ProductPackage> packageList = this.productRepository.selectProductPackageList(product);
		
		//step3. 할인정보를 조회 한다.
		List<ProductDiscount> productDiscountList = this.productRepository.selectProductDiscountList(product);
		
		resultMap.put("packageList", packageList);
		resultMap.put("productDiscountList", productDiscountList);
		return resultMap;
	}
	
	//사용 가능한 상품목록 및 할인 목록 조회
	@Override
	public Map selectProductDiscountList(Product product, Discount discount) {
		Map resultMap = new HashMap();
		List<Product> productList = this.productRepository.selectProductList(product);
		resultMap.put("productList", productList);
		
		//적용 가능 할인 목록을 조회 한다.
		List<Discount> discountList = this.discountRepository.selectDiscountList(discount);
		resultMap.put("discountList", discountList);
		
		return resultMap;
	}
	
	//상품 할인 삭제
	@Override
	public int deleteProductDiscount(ProductDiscount productDiscount) {
		int ret = this.productRepository.deleteProductDiscount(productDiscount);
		return ret;
	}
	
	//상품 패키지 삭제
	@Override
	public int deleteProductPackage(ProductPackage productPackage) {
		int ret = this.productRepository.deleteProductPackage(productPackage);
		return ret;
	}
}