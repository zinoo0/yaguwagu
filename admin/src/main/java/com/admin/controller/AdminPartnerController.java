package com.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.admin.entity.AdminPartnerEntity;
import com.admin.repository.AdminPartnerRepository;
import com.admin.service.AdminService;


@RestController
public class AdminPartnerController {

	@Autowired
	AdminPartnerRepository adminPartnerRepositery;
	
	@Autowired
	AdminService adminService;
	
	@RequestMapping(value="/partners" , method=RequestMethod.GET)
	public List<AdminPartnerEntity> selectPartners() throws Exception {
		
		return adminPartnerRepositery.findAll();
	}
	
	@RequestMapping(value="/partner/save" , method=RequestMethod.POST)
	public String savePartner(@RequestBody AdminPartnerEntity entity) throws Exception {
		
		System.out.println(entity);
		
		adminService.insertPartner(entity);
						
		return "Success";
	}
}
