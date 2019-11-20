package com.admin.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="partner_menus")
@NoArgsConstructor
@Data
public class AdminPartnerMenuEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(nullable=false)
	private int partnerId;
	
	@Column(nullable=false)
	private String name;
	
	@Column(nullable=false)
	private String price;
}
