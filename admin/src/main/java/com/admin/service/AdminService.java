package com.admin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.entity.AdminPartnerEntity;
import com.admin.entity.AdminPartnerMainImageEntity;
import com.admin.entity.AdminPartnerMenuEntity;
import com.admin.entity.AdminPartnerMenuImageEntity;
import com.admin.repository.AdminPartnerMainImageRepository;
import com.admin.repository.AdminPartnerMenuImageRepository;
import com.admin.repository.AdminPartnerMenuRepository;
import com.admin.repository.AdminPartnerRepository;

@Service
public class AdminService {
	
	@Autowired
	AdminPartnerRepository adminPartnerRepositery;
	
	@Autowired
	AdminPartnerMainImageRepository adminPartnerMainImageRepositery;
	
	@Autowired
	AdminPartnerMenuImageRepository adminPartnerMenuImageRepositery;
	
	@Autowired
	AdminPartnerMenuRepository adminPartnerMenuRepositery;
	
	
	@Transactional
	public void insertPartner(AdminPartnerEntity entity) throws Exception{
		
		// AdminPartner
		AdminPartnerEntity adminPartnerEntity = new AdminPartnerEntity();
		adminPartnerEntity.setName(entity.getName());
		adminPartnerEntity.setPhone(entity.getPhone());
		adminPartnerEntity.setTime(entity.getTime());
		adminPartnerRepositery.save(adminPartnerEntity);
		
		for(AdminPartnerMainImageEntity mainImage : entity.getMainImages()) {
			mainImage.setPartnerId(adminPartnerEntity.getId());
		}
		adminPartnerMainImageRepositery.saveAll(entity.getMainImages());

		for(AdminPartnerMenuImageEntity menuImage : entity.getMenuImages()) {
			menuImage.setPartnerId(adminPartnerEntity.getId());
		}
		adminPartnerMenuImageRepositery.saveAll(entity.getMenuImages());
		
		for(AdminPartnerMenuEntity menu : entity.getMenus()) {
			menu.setPartnerId(adminPartnerEntity.getId());
		}
		adminPartnerMenuRepositery.saveAll(entity.getMenus());
		
	}
}
