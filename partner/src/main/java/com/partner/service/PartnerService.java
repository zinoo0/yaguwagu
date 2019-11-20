package com.partner.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.partner.entity.PartnerOrderEntity;
import com.partner.entity.PartnerOrderMenuEntity;
import com.partner.repository.PartnerOrderMenuRepository;
import com.partner.repository.PartnerOrderRepository;

@Service
public class PartnerService {
	
	@Autowired
	PartnerOrderRepository partnerOrderRepository;
	
	@Autowired
	PartnerOrderMenuRepository partnerOrderMenuRepository;
	
	int insertId = 0;
	
	public void order(String message) {
		//JSON Parser
		JSONParser parser = new JSONParser();
		try {
			// Parsing
			Object orderObj = parser.parse(message);
			JSONObject order = (JSONObject) orderObj;
			// Insert Order Table
			insertOrder(order);
			 
			// Parsing
			JSONArray orderMenuJsonArray = (JSONArray) order.get("menu");
			
			for(Object menu : orderMenuJsonArray.toArray()) {
				Object menuObj = parser.parse(menu.toString());
				JSONObject orderMenu = (JSONObject) menuObj;
				// Insert OrderMenu Table
				insertOrderMenu(orderMenu); 
			}
		} catch (ParseException e) {}
	}
	
	public void insertOrder(JSONObject order) {
		PartnerOrderEntity partnerOrderEntity = new PartnerOrderEntity();
		partnerOrderEntity.setSeat((String) order.get("seat"));
		partnerOrderRepository.save(partnerOrderEntity);
		insertId = partnerOrderEntity.getId();
	}
	
	public void insertOrderMenu(JSONObject orderMenu) {
		PartnerOrderMenuEntity partnerOrderMenuEntity = new PartnerOrderMenuEntity();
		partnerOrderMenuEntity.setPartnerOrderId(insertId); 
		partnerOrderMenuEntity.setName((String) orderMenu.get("name"));
		partnerOrderMenuEntity.setPrice(Integer.parseInt(orderMenu.get("price").toString())); 
		
		partnerOrderMenuRepository.save(partnerOrderMenuEntity);
	}
	
} 
