package com.partner.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.partner.entity.PartnerOrderEntity;

public interface PartnerOrderRepository extends JpaRepository<PartnerOrderEntity, Integer> {

}
