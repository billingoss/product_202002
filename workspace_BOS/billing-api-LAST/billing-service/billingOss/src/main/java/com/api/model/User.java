package com.api.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class User implements UserDetails {
     private String userName;
     private String password;
     private String name;
     private boolean isAccountNonExpired;
     private boolean isAccountNonLocked;
     private boolean isCredentialsNonExpired;
     private boolean isEnabled;
     private int customerNumber;
     private Collection<? extends GrantedAuthority> authorities;
     private String businessName;
     private String businessRegistrationNumber;
     private String adminYn;
     private String managerYn;
     private String email;
     
     private int providerNumber;
     private String providerName;
     
	@Override
     public Collection<? extends GrantedAuthority> getAuthorities() {
          return authorities;
     }

     @Override
     public String getPassword() {
          return password;
     }

     @Override
     public String getUsername() {
          return userName;
     }

     @Override
     public boolean isAccountNonExpired() {
          return isAccountNonExpired;
     }

     @Override
     public boolean isAccountNonLocked() {
          return isAccountNonLocked;
     }

     @Override
     public boolean isCredentialsNonExpired() {
          return isCredentialsNonExpired;
     }

     @Override
     public boolean isEnabled() {
          return isEnabled;
     }

     public String getName() {
          return name;
     }

     public void setName(String name) {
          this.name = name;
     }

     public void setPassword(String password) {
          this.password = password;
     }

     public void setAccountNonExpired(boolean isAccountNonExpired) {
          this.isAccountNonExpired = isAccountNonExpired;
     }

     public void setAccountNonLocked(boolean isAccountNonLocked) {
          this.isAccountNonLocked = isAccountNonLocked;
     }

     public void setCredentialsNonExpired(boolean isCredentialsNonExpired) {
          this.isCredentialsNonExpired = isCredentialsNonExpired;
     }

     public void setEnabled(boolean isEnabled) {
          this.isEnabled = isEnabled;
     }

     public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
          this.authorities = authorities;
     }

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getCustomerNumber() {
		return customerNumber;
	}

	public void setCustomerNumber(int customerNumber) {
		this.customerNumber = customerNumber;
	}

	public String getBusinessName() {
		return businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	public String getAdminYn() {
		return adminYn;
	}

	public void setAdminYn(String adminYn) {
		this.adminYn = adminYn;
	}

	public String getManagerYn() {
		return managerYn;
	}

	public void setManagerYn(String managerYn) {
		this.managerYn = managerYn;
	}

	public int getProviderNumber() {
		return providerNumber;
	}

	public void setProviderNumber(int providerNumber) {
		this.providerNumber = providerNumber;
	}

	public String getBusinessRegistrationNumber() {
		return businessRegistrationNumber;
	}

	public void setBusinessRegistrationNumber(String businessRegistrationNumber) {
		this.businessRegistrationNumber = businessRegistrationNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProviderName() {
		return providerName;
	}

	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}


     
     
}