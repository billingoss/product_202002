package com.api.service;

import java.util.List;
import java.util.Map;

import com.api.model.product.Discount;
import com.api.model.product.Product;
import com.api.model.product.ProductDiscount;
import com.api.model.product.ProductPackage;

public interface ProductService
{
	//상품목록조회
	List<Product> selectProductList(Product product);
	
	//상품저장
	int saveProduct(Product product);
	
	//상품삭제
	int deleteProduct(Product product);
	
	//상품상세정보 조회
	Map selectProductDetail(Product product);
	
	//상품목록 및 할인 목록 조회
	Map selectProductDiscountList(Product product, Discount discount);
	
	//패키지삭제
	int deleteProductPackage(ProductPackage productPackage);
	
	//상품할인 삭제
	int deleteProductDiscount(ProductDiscount productDiscount);
	
}
