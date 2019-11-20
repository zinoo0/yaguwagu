package com.client.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.client.event.producer.ClientProducer;
import com.client.repository.ClientOrderRepository;

@Service
public class ClientService {
	
	
	@Autowired
	ClientProducer clientProducer;
	
	@Autowired 
	ClientOrderRepository clientOrderRepository;
	
	
	public void clientOrder(String message) throws Exception {
		clientProducer.sendOrder("order", message);
	}
}
