package com.auth.service;

import java.util.Optional;


import com.auth.dto.ResetPasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth.dto.LoginRequest;
import com.auth.dto.SignupRequest;
import com.auth.dto.UserDTO;
import com.auth.model.User;
import com.auth.repository.UserRepository;


public interface AuthService {
	

	
	public UserDTO registerUser(SignupRequest signupRequest) throws Exception;
	public UserDTO authenticateUser(LoginRequest loginrequest) throws Exception;
	public UserDTO resetPassword(ResetPasswordRequest resetPasswordRequest) throws Exception;

//	public Object loadUserByUsername(String email) {
//		return email;
//	}
	
	
	
	
	
}
