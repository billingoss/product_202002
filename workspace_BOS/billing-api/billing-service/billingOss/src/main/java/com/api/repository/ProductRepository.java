package com.api.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.api.model.product.Product;
import com.api.model.product.ProductDiscount;
import com.api.model.product.ProductPackage;

@Mapper
@Repository
public interface ProductRepository {
	//List<Product> getProductSearch(Product product);
	//상품목록조회
	List<Product> selectProductList(Product product);
	//신규 상품 ID 조회
	String selectNewProductId();
	//상품저장
	int insertProduct(Product product);
	//상품수정
	int updateProduct(Product product);
	//상품삭제
	int deleteProduct(Product product);
	//신규 패키지 ID 조회
	String selectNewProductPackageId();
	//패키지구성상품저장
	int insertProductPackage(ProductPackage productPackage);
	//패키지구성상품수정
	int updateProductPackage(ProductPackage productPackage);
	//패키지구성상품목록조회
	List<ProductPackage> selectProductPackageList(Product product);
	//패키지구성상품삭제
	int deleteProductPackage(ProductPackage productPackage);	
	
	//상품할인저장
	int insertProductDiscount(ProductDiscount productDiscount);
	//상품할인수정
	int updateProductDiscount(ProductDiscount productDiscount);
	//상품할인목록조회
	List<ProductDiscount> selectProductDiscountList(Product product);
	//상품할인삭제
	int deleteProductDiscount(ProductDiscount productDiscount);	
}
