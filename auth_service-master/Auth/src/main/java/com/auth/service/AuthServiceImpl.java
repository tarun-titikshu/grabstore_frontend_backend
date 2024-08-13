package com.auth.service;

import com.auth.dto.LoginRequest;
import com.auth.dto.SignupRequest;
import com.auth.dto.UserDTO;
import com.auth.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth.repository.UserRepository;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private BCryptPasswordEncoder encoder;



	@Override
	public UserDTO registerUser(SignupRequest signupRequest) throws Exception {
		try {
			Optional<User> existingUser = userRepo.findByEmail(signupRequest.getEmail());
			if(existingUser.isPresent()) {
				throw new Exception("User already exists");
			}else{
				User user = new User();
				user.setEmail(signupRequest.getEmail());
				user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
				user.setRole(signupRequest.getRole());
				userRepo.save(user);
				return new UserDTO(user.getId(),user.getEmail(),user.getRole());
			}
		}catch (Exception e){
			
			throw new Exception(e.getMessage());
		}

	}

	@Override
	public UserDTO authenticateUser(LoginRequest loginrequest) throws Exception {

		try {
			Optional<User> byEmail = userRepo.findByEmail(loginrequest.getEmail());
			if (byEmail.isEmpty()) {
				throw  new Exception("User does not exist");
			}else {
				boolean matches = passwordEncoder.matches(loginrequest.getPassword(),byEmail.get().getPassword());
				if(!matches) {
					throw new RuntimeException("Invalid Crededntials!");
				}
				return new UserDTO(byEmail.get().getId(), byEmail.get().getEmail(), byEmail.get().getRole());
			}


		}catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}


	
	
	

}
