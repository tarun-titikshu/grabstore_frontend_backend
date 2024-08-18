package com.auth.dto;

import com.auth.model.Role;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {
	private int id;
	private String email;
	private Role role;
	

	public UserDTO(int id, String email, Role role) {
		super();
		this.id = id;
		this.email = email;
		this.role = role;
	}
	public UserDTO() {
		super();
	}
}
