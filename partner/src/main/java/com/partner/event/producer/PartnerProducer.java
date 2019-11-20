package com.partner.event.producer;

import java.nio.charset.Charset;

import org.springframework.stereotype.Component;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

@Component
public class PartnerProducer {
	public static String AMQP_HOST = "15.164.1.112";
	public static String AMQP_USERNAME = "kirei";
	public static String AMQP_PASSWORD = "0956";
	
	public void sendOrder(String queueName, String message) throws Exception {
		
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost(AMQP_HOST);
		factory.setUsername(AMQP_USERNAME);
		factory.setPassword(AMQP_PASSWORD);
		
		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();
		
		channel.queueDeclare(queueName, false, false, false, null);
		channel.basicPublish("", queueName, null, message.getBytes(Charset.forName("UTF-8")));

        channel.close();
        connection.close();		
		
		System.out.println(" [x] Sent '" + message + "'");
	}
}
