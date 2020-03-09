package com.api.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.api.model.billing.ChannelBillingInformation;
import com.api.model.billing.ChannelPGInformation;
import com.api.model.billing.ChannelPaymentMethod;

@Mapper
@Repository
public interface ChannelRepository {
	
	
	/*채널/업체 별 청구 정보 조회*/
	ChannelBillingInformation selectChannelBillingInformation(ChannelBillingInformation inputObj);	
	ChannelBillingInformation selectChannelBillingInforByConnumber(int conNumber);	
	List<ChannelBillingInformation> selectChannelBillingInformationList(ChannelBillingInformation inputObj);	
	/*채널/업체 별 청구 정보 등록*/
	int insertChannelBillingInformation(ChannelBillingInformation inputObj);	
	/*채널/업체 별 청구 정보 수정*/
	int updateChannelBillingInformation(ChannelBillingInformation inputObj);
	
	/*채널별 납부 방법 목록 조회*/
	List<ChannelPaymentMethod> selectChannelPaymentMethodList(ChannelPaymentMethod inputObj);	
	/*채널별 납부 방법 등록*/
	int insertChannelPaymentMethod(ChannelPaymentMethod inputObj);
	/*채널별 납부 방법 수정*/
	int updateChannelPaymentMethod(ChannelPaymentMethod inputObj);
	
	/*채널/업체 별 PG 정보 조회 */
	List<ChannelPGInformation> selectChannelPGInformationList(ChannelPGInformation inputObj);
	/*계약 기준 채널/업체 별 PG 정보 조회*/
	List<ChannelPGInformation> selectContractPGInformationList(ChannelPGInformation inputObj);
	/*채널/업체 별 PG 정보 등록 */
	int insertChannelPGInformationList(ChannelPGInformation inputObj);
	/*채널/업체 별 PG 정보 수정 */
	int updateChannelPGInformationList(ChannelPGInformation inputObj);
	
	
}
