package com.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.api.config.AjaxAwareAuthenticationEntryPoint;
import com.api.service.UserService;




@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
     @Autowired UserService userService;
     
     
     
     @Override
     protected void configure(HttpSecurity https) throws Exception {
         /* http
               .csrf().disable()
               .authorizeRequests()
                    .anyRequest().authenticated()
                    .and()
               .formLogin().loginPage("/login");
        */
    	/* http
 		.csrf().disable()
         .authorizeRequests()
             .antMatchers(
                     "/**",
                     "/js/**",
                     "/css/**",
                     "/img/**",
                     "/webjars/**").permitAll()
             .antMatchers("/user/**").hasRole("USER")
             .anyRequest().authenticated()
         .and()
         .authorizeRequests()
             .antMatchers(
                     "/**",
                     "/js/**",
                     "/css/**",
                     "/img/**",
                     "/webjars/**").permitAll()
             .antMatchers("/admin/**").hasRole("ADMIN")
             .anyRequest().authenticated()
         .and()
         .formLogin()
             .loginPage("/login")
             .permitAll()
             .usernameParameter("username")
             .passwordParameter("password")
             .successHandler(new CustomAuthenticationSuccess())
         .and()
         .logout()
             .invalidateHttpSession(true)
             .clearAuthentication(true)
             .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
             .logoutSuccessUrl("/login?logout")
             .permitAll(); */
    	 /*http .csrf().disable() 
    	 .authorizeRequests() 
    	 .anyRequest().authenticated() 
    	 .and() 
    	 .formLogin();
*/
    	 https  		
    	 .csrf().disable().anonymous()
    	 .and()
        	.exceptionHandling().authenticationEntryPoint(new AjaxAwareAuthenticationEntryPoint("/login"))        
   		.and()
          .authorizeRequests()
          		.antMatchers("/loadinggif").permitAll()              
          		.antMatchers("/business/createBusiness").permitAll()              
          		.antMatchers("/business/isEmailDup").permitAll()              
          		.antMatchers("/business/isLoginIdDup").permitAll()              
          		.antMatchers("/business/addBusinessProc").permitAll()              
          		.antMatchers("/business/tempPasswordProc").permitAll()              
          		/*.antMatchers("/bizRest/empPassResetDialog").permitAll()              
          		.antMatchers("/bizRest/addBusinessProc").permitAll()              
          		.antMatchers("/bizRest/updatePasswordProc").permitAll()              
          		.antMatchers("/bizRest/isLoginIdDup").permitAll()   */           
          		.antMatchers("/billletter/**").permitAll()              
          		.antMatchers("/payment/setPaymentReqInfo/**").permitAll()              
          		.antMatchers("/payment/iniPayMobileReturn").permitAll()              
          		.antMatchers("/payment/iniPayMobileMakeBillKeyReturn").permitAll()              
          		.antMatchers("/payment/payProc").permitAll()              
          		.antMatchers(
          				"/mobileResources/**",
          				"/mobileResources/js/**",
          				"/mobileResources/css/**",
          				"/mobileResources/img/**").permitAll()              
          		.antMatchers(
          				"/resources/**",
          				"/resources/js/**",
          				"/resources/css/**",
          				"/resources/img/**",
          				"/webjars/**").permitAll()              
          		.antMatchers("/login").permitAll()              
          		.antMatchers("/**").authenticated()
          		.antMatchers("/admin/**").hasRole("ADMIN")
          		.anyRequest().authenticated()              
          .and()
          .formLogin()
              .loginPage("/login")
              .permitAll()
              .usernameParameter("username")
              .passwordParameter("password")
              .successHandler(new CustomAuthenticationSuccess())
              .failureHandler(new CustomAuthenticationFailure())
          
          .and()
          .logout()
              .invalidateHttpSession(true)
              .clearAuthentication(true)
              .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
              .logoutSuccessUrl("/login?logout")
              .permitAll();
              ;
    	 //운영빌레터앱 - 사용안함
    	 //https.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    	 //운영어드민, 개발, 로컬 - 사용안함
    	 //https.sessionManagement().invalidSessionUrl("/login");
         //빌레터,어드민 동일하게 아래소스로 사용
		 https.sessionManagement()
			.maximumSessions(1)  // 같은 아이디로 1명만 로그인 할 수 있음
			.maxSessionsPreventsLogin(false); // 신규 로그인 사용자의 로그인이 허용되고, 기존 사용자는 세션아웃 됨
    	 https.headers().frameOptions().disable();
     }


     @Override
     protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    	 
    	 auth.userDetailsService(userService).passwordEncoder(userService.passwordEncoder()) ; 

     }
        
     
     @Bean
     @Override
     public AuthenticationManager authenticationManagerBean() throws Exception {
          return super.authenticationManagerBean();
     }
}