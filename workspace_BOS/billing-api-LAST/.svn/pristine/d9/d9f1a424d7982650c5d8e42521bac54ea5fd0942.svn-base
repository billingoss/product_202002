package com.api;

import javax.servlet.Filter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
@SpringBootApplication
@EnableScheduling
public class WebApplication {
	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}
	
	@Bean
	 public Filter characterEncodingFilter() {
		 CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
	     characterEncodingFilter.setEncoding("UTF-8");
	     characterEncodingFilter.setForceEncoding(true);
	     return characterEncodingFilter;
	 }
	
	

}
