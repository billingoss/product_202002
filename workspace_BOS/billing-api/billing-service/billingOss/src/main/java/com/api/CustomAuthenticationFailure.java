package com.api;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class CustomAuthenticationFailure implements AuthenticationFailureHandler{
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
		 
		 /*request.setAttribute("errorMsg", "아이디 또는 비밀번호를 다시 확인하세요.");
		 request.getRequestDispatcher("/").forward(request, response);*/
		 		 
		 if (exception.getClass().isAssignableFrom(UsernameNotFoundException.class) || exception.getClass().isAssignableFrom(InternalAuthenticationServiceException.class)) {
			response.sendRedirect(request.getContextPath() + "/login?error=NOTFOUNDUSER");
		}else if (exception.getClass().isAssignableFrom(DisabledException.class)) {
			response.sendRedirect(request.getContextPath() + "/login?error=DISABLED");
		}else if (exception.getClass().isAssignableFrom(LockedException.class)) {
			response.sendRedirect(request.getContextPath() + "/login?error=LOCKED");
		}else if (exception.getClass().isAssignableFrom(BadCredentialsException.class)) {
			response.sendRedirect(request.getContextPath() + "/login?error=BADCREDENTIALS");				 
		}else {
			//org.springframework.security.authentication.InternalAuthenticationServiceException
			response.sendRedirect(request.getContextPath() + "/login?error=NOTFOUNDUSER");				 			
		}
		
	}

 }

