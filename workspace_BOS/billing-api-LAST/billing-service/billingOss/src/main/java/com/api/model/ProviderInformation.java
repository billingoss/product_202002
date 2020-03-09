package com.api.model;

import java.util.List;

/**
 */
public class ProviderInformation  extends Criteria 
{
	private int providerNumber;
	private String code;
	private String detailCode;
	private int seq;
	private String value1;
	private String value2;
	private String value3;
	private String optionCode;
	private String optionValue1;
	private String optionValue2;
	private String optionValue3;
	private String description;
	private String effectStartdate;
	private String effectEnddate;
	private String effectDateFlag;
	private List codeList;

	public List getCodeList() {
		return codeList;
	}
	public void setCodeList(List codeList) {
		this.codeList = codeList;
	}
	public String getValue3() {
		return value3;
	}
	public void setValue3(String value3) {
		this.value3 = value3;
	}
	public String getOptionValue3() {
		return optionValue3;
	}
	public void setOptionValue3(String optionValue3) {
		this.optionValue3 = optionValue3;
	}
	public int getProviderNumber() {
		return providerNumber;
	}
	public void setProviderNumber(int providerNumber) {
		this.providerNumber = providerNumber;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDetailCode() {
		return detailCode;
	}
	public void setDetailCode(String detailCode) {
		this.detailCode = detailCode;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getValue1() {
		return value1;
	}
	public void setValue1(String value1) {
		this.value1 = value1;
	}
	public String getValue2() {
		return value2;
	}
	public void setValue2(String value2) {
		this.value2 = value2;
	}
	public String getOptionCode() {
		return optionCode;
	}
	public void setOptionCode(String optionCode) {
		this.optionCode = optionCode;
	}
	public String getOptionValue1() {
		return optionValue1;
	}
	public void setOptionValue1(String optionValue1) {
		this.optionValue1 = optionValue1;
	}
	public String getOptionValue2() {
		return optionValue2;
	}
	public void setOptionValue2(String optionValue2) {
		this.optionValue2 = optionValue2;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getEffectStartdate() {
		return effectStartdate;
	}
	public void setEffectStartdate(String effectStartdate) {
		this.effectStartdate = effectStartdate;
	}
	public String getEffectEnddate() {
		return effectEnddate;
	}
	public void setEffectEnddate(String effectEnddate) {
		this.effectEnddate = effectEnddate;
	}
	public String getEffectDateFlag() {
		return effectDateFlag;
	}
	public void setEffectDateFlag(String effectDateFlag) {
		this.effectDateFlag = effectDateFlag;
	}
	
}
