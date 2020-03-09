package com.api;

public class BizException extends RuntimeException {

	private String code;
	
	public BizException(String msg) {
		super(msg);
	}
	
	public BizException(String code, String msg) {
		super(msg);
		this.code = code;
	}
	
}
