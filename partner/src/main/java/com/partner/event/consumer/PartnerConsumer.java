package com.partner.event.consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.partner.service.PartnerService;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

@Component
public class PartnerConsumer {
	
	@Autowired
	PartnerService partnerService;
	
	public static String AMQP_HOST = "15.164.1.112";
	public static String AMQP_USERNAME = "kirei";
	public static String AMQP_PASSWORD = "0956";
	
	public void receiveOrder(String queueName) throws Exception {		
	    ConnectionFactory factory = new ConnectionFactory();
	    factory.setHost(AMQP_HOST);
		factory.setUsername(AMQP_USERNAME);
		factory.setPassword(AMQP_PASSWORD);	 		
		
	    Connection connection = factory.newConnection();
	    Channel channel = connection.createChannel();

	    channel.queueDeclare(queueName , false, false, false, null);
	    
	    DeliverCallback deliverCallback = (consumerTag, delivery) -> {
	    	String message = new String(delivery.getBody(), "UTF-8");
	        partnerService.order(message);
	    };
	     
	    channel.basicConsume(queueName, true, deliverCallback, consumerTag -> { });	
	}
}
