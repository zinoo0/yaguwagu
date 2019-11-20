package com.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.admin.entity.AdminUserEntity;
import com.admin.repository.AdminUserRepository;

@RestController
public class AdminUserController {
	
	@Autowired
	AdminUserRepository adminRepository;
	
	@RequestMapping(value="/users" , method=RequestMethod.GET)
	public List<AdminUserEntity> selectUserList() throws Exception {
		
		return adminRepository.findAll();
	}
}
