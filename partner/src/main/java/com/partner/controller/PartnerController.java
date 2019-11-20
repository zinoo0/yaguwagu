package com.partner.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.partner.entity.PartnerOrderEntity;
import com.partner.repository.PartnerOrderRepository;


@RestController
public class PartnerController {

	@Autowired
	PartnerOrderRepository partnerOrderRepository;
	
	@RequestMapping(value="/order/{orderId}" , method=RequestMethod.GET)
	public Optional<PartnerOrderEntity> selectPartner(@PathVariable("orderId") int orderId) throws Exception {
		return partnerOrderRepository.findById(orderId);
	}
}
