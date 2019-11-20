package com.partner;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.partner.event.consumer.PartnerConsumer;

@SpringBootApplication
public class PartnerApplication {

	@Autowired
	PartnerConsumer partnerComsumer;
	
	public static void main(String[] args) {
		SpringApplication.run(PartnerApplication.class, args);
	}
	
	@PostConstruct
	public void receiver() throws Exception {
		partnerComsumer.receiveOrder("order");
	}

}
