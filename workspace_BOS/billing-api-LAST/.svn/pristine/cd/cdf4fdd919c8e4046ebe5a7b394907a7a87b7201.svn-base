package com.api.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.model.billing.ChannelBillingInformation;
import com.api.model.billing.ChannelPGInformation;
import com.api.model.billing.ChannelPaymentMethod;
import com.api.repository.ChannelRepository;
import com.api.service.ChannelService;

@Service
@Transactional
public class ChannelLogic implements ChannelService {

	@Autowired
	private ChannelRepository channelRepository;
	
	/*채널/업체 별 청구 정보 조회*/
	@Override
	public ChannelBillingInformation selectChannelBillingInformation(ChannelBillingInformation inputObj) {
		ChannelBillingInformation resultObj = this.channelRepository.selectChannelBillingInformation(inputObj);
		return resultObj;
	}
	
	@Override
	public ChannelBillingInformation selectChannelBillingInformation(String channelId, int providerNumber) {
		// parameter set
		ChannelBillingInformation inputObj = new ChannelBillingInformation ();
		inputObj.setChannelId(channelId);
		inputObj.setProviderNumber(providerNumber);		
		
		//조회
		ChannelBillingInformation resultObj = this.selectChannelBillingInformation(inputObj);
		return resultObj;
	}
	
	/*계약 번호 기준 채널/업체 별 청구 정보 조회*/
	@Override
	public ChannelBillingInformation selectChannelBillingInforByConnumber(int conNumber) {
		ChannelBillingInformation resultObj = this.channelRepository.selectChannelBillingInforByConnumber(conNumber);
		return resultObj;
	}
	
	@Override
	public List<ChannelBillingInformation> selectChannelBillingInformationList(ChannelBillingInformation inputObj) {
		List<ChannelBillingInformation> resultList = this.channelRepository.selectChannelBillingInformationList(inputObj);
		return resultList;
	}
	
	/*채널/업체 별 선납 여부 조회*/	
	@Override
	public String selectPrePaymentYn(String channelId, int providerNumber) {		
		String prePaymentYn = "N";	//반활될 선납여부 값		
		ChannelBillingInformation resultObj = this.selectChannelBillingInformation(channelId, providerNumber);
		
		//조회가 결과가 null이 아닌 경우
		if(resultObj != null && resultObj.getPrePaymentYn() != null) {
			prePaymentYn = resultObj.getPrePaymentYn();
		}
		return prePaymentYn;
	}
	
	/*채널/업체 별 수납 가능 여부 조회*/	
	@Override
	public String selectPayableYn(String channelId, int providerNumber) {
		String payableYn = "N";	//반활될 납부가능여부 값		
		ChannelBillingInformation resultObj = this.selectChannelBillingInformation(channelId, providerNumber);
		
		//조회가 결과가 null이 아닌 경우
		if(resultObj != null && resultObj.getPayableYn() != null) {
			payableYn = resultObj.getPayableYn();
		}
		return payableYn;		
	}
	
	/*채널/업체 별 청구 정보 등록*/
	@Override
	public int insertChannelBillingInformation(ChannelBillingInformation inputObj) {
		int resultCnt = this.channelRepository.insertChannelBillingInformation(inputObj);
		return resultCnt;
	}
	
	/*채널/업체 별 청구 정보 수정*/
	@Override
	public int updateChannelBillingInformation(ChannelBillingInformation inputObj) {
		int resultCnt = this.channelRepository.updateChannelBillingInformation(inputObj);
		return resultCnt;
	}
	
	/*채널별 납부 방법 목록 조회*/
	@Override
	public List<ChannelPaymentMethod> selectChannelPaymentMethodList(ChannelPaymentMethod inputObj) {
		List<ChannelPaymentMethod> returnObj = this.selectChannelPaymentMethodList(inputObj);
		return returnObj;
	}
	
	/*채널별 납부 방법 목록 조회*/
	@Override
	public List<ChannelPaymentMethod> selectChannelPaymentMethodList(String channelId, String useYn) {
		ChannelPaymentMethod inputObj = new ChannelPaymentMethod();
		inputObj.setChannelId(channelId);
		inputObj.setUseYn(useYn);
		List<ChannelPaymentMethod> returnObj  = this.selectChannelPaymentMethodList(inputObj);
		return returnObj;
	}
	
	/*채널별 납부 방법 등록*/
	@Override
	public int insertChannelPaymentMethod(ChannelPaymentMethod inputObj) {
		int resultCnt = this.channelRepository.insertChannelPaymentMethod(inputObj);
		return resultCnt;
	}
	
	/*채널별 납부 방법 수정*/
	@Override
	public int updateChannelPaymentMethod(ChannelPaymentMethod inputObj) {
		int resultCnt = this.channelRepository.updateChannelPaymentMethod(inputObj);
		return resultCnt;
	}
	
	/*채널/업체 별 PG 정보 조회 */
	@Override
	public List<ChannelPGInformation> selectChannelPGInformationList(ChannelPGInformation inputObj) {
		List<ChannelPGInformation> retunObj = this.channelRepository.selectChannelPGInformationList(inputObj);
		return retunObj;
	}
	
	/*계약 기준 채널/업체 별 PG 정보 조회*/	
	@Override
	public List<ChannelPGInformation> selectContractPGInformationList(ChannelPGInformation inputObj) {
		List<ChannelPGInformation> retunObj = this.channelRepository.selectContractPGInformationList(inputObj);
		return retunObj;
	}
	
	/*채널/업체 별 PG 정보 등록 */
	@Override
	public int insertChannelPGInformationList(ChannelPGInformation inputObj) {
		int resultCnt = this.channelRepository.insertChannelPGInformationList(inputObj);
		return resultCnt;
	}	
	
	/*채널/업체 별 PG 정보 수정 */
	@Override
	public int updateChannelPGInformationList(ChannelPGInformation inputObj) {
		int resultCnt = this.channelRepository.updateChannelPGInformationList(inputObj);
		return resultCnt;
	}
	
}
