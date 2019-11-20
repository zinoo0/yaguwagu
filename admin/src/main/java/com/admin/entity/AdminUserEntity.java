package com.admin.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="users")
@NoArgsConstructor
@Data
public class AdminUserEntity {
	
	@Id
	@Column(nullable=false)
	private String uid;
	
	@Column(nullable=false)
	private String email;

	@Column(nullable=false)
	private String username;
	
	@Column(nullable=false)
	private String profileUrl;
	
	@Column(nullable=true)
	private String phone;
	
	@Column(nullable=true)
	private String team;
	
	@Column(nullable=false)
	private String createdAt;
}