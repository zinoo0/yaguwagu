package com.partner.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="partner_order_menu")
@NoArgsConstructor
@Data
public class PartnerOrderMenuEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	 
	@Column(nullable=false)
	private int partnerOrderId;
	
	@Column(nullable=false)
	private String name;
	
	@Column(nullable=false)
	private int price;
}
