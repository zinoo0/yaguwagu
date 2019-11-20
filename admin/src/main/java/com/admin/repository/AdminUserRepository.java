package com.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.entity.AdminUserEntity;

public interface AdminUserRepository extends JpaRepository<AdminUserEntity, Integer>{
	
}
