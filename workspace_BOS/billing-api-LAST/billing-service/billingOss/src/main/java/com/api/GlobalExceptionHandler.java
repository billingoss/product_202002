package com.api;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.multiaction.NoSuchRequestHandlingMethodException;

@ControllerAdvice
public class GlobalExceptionHandler {

	private Logger log = LoggerFactory.getLogger(getClass());
	
	@ExceptionHandler(value = { Exception.class })
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	protected ModelAndView handleConflict(Exception ex, WebRequest request) {		
		
		log.error("error",ex);
				
		String errorCode = "";
		String errorMessage = "";
		String viewName = "error";
		//file not found
		if (ex instanceof NoHandlerFoundException) {
			errorCode = "404";
			errorMessage = "[지원되지 않는 유형입니다."; 
		}else if (ex instanceof HttpMediaTypeNotAcceptableException) {
			errorMessage = "지원되지 않는 유형입니다."; 
			errorCode = "406";
		}else if (ex instanceof ConversionNotSupportedException) {
			errorCode = "500";
			errorMessage = "형 변환을 지원하지 않습니다."; 
		}else if (ex instanceof BindException) {
			errorCode = "400";
			errorMessage = "지원되지 않는 유형입니다."; 
		}else if (ex instanceof HttpMediaTypeNotSupportedException) {
			errorCode = "415";
			errorMessage = "지원되지 않는 유형입니다."; 
		}else if (ex instanceof NoSuchRequestHandlingMethodException) {
			errorCode = "404";
			errorMessage = "파일이 존재하지 않습니다."; 
		}else if (ex instanceof AccessDeniedException) {
			errorCode = "403";
			errorMessage = "권한이 없는 사용자 입니다.";
			viewName = "login";
		}else if (ex instanceof NullPointerException){
			errorMessage = "빈 값을 입력 할 수 없습니다."; 
		}else {
			errorCode = "000";			
			errorMessage = ex.getLocalizedMessage(); 
		}
		
		Map<String, Object> resultMap = new HashMap<>();		
		resultMap.put("errorCode", errorCode);
		resultMap.put("message", "["+errorMessage+"]");
		
		ModelAndView mav = new ModelAndView();
		boolean ajax = "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
		if (ajax) {
			mav.setViewName("jsonView");
		} else {			
			mav.setViewName(viewName);
		}		
		mav.addAllObjects(resultMap);
		
		return mav;
	}
	
	@ExceptionHandler(value = { BizException.class })
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	protected ModelAndView handleBiz(BizException ex, WebRequest request) {
		
		Map<String, Object> m = new HashMap<>();
		m.put("code", "100");
		m.put("message", ex.getMessage());;
		
		ModelAndView mav = new ModelAndView();
		
		boolean ajax = "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
		if (ajax) {
			
			mav.setViewName("jsonView");
		} else {
			
			mav.setViewName("error");
		}
		
		mav.addAllObjects(m);
		
		return mav;
	}
}