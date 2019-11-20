package com.client.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.client.entity.ClientPartnerEntity;
import com.client.entity.ClientUserEntity;
import com.client.repository.ClientPartnerRepository;
import com.client.repository.ClientUserRepository;
import com.client.service.ClientService;

@RestController
public class ClientController {

	
	@Autowired
	ClientUserRepository clientUserRepository;
	
	@Autowired
	ClientPartnerRepository clientPartnerRepository;
	
	@Autowired
	ClientService clientService;
	
	@RequestMapping(value="/order" , method=RequestMethod.POST)
	public String orderMenu(@RequestBody String message) throws Exception {
		clientService.clientOrder(message);
		return "Success";
	}
}
