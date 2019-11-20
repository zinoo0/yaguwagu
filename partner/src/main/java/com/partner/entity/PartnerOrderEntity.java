package com.partner.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="partner_order")
@NoArgsConstructor
@Data
public class PartnerOrderEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable=false)
	@OneToMany(mappedBy = "partnerOrderId", cascade=CascadeType.ALL, orphanRemoval = true)	
	private List<PartnerOrderMenuEntity> orderMenu; 
	 
	@Column(nullable=false)
	private String seat;
}
