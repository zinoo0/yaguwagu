package com.admin.entity;

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
@Table(name="partners")
@NoArgsConstructor
@Data
public class AdminPartnerEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable=false)
	private String name;

	@Column(nullable=false)
	private String phone;
	
	@Column(nullable=false)
	private String time;

	@OneToMany(mappedBy = "partnerId", cascade=CascadeType.ALL, orphanRemoval = true)
	private List<AdminPartnerMainImageEntity> mainImages;
	
	@OneToMany(mappedBy = "partnerId", cascade=CascadeType.ALL, orphanRemoval = true)
	private List<AdminPartnerMenuImageEntity> menuImages;
	
	@OneToMany(mappedBy = "partnerId", cascade=CascadeType.ALL, orphanRemoval = true)
	private List<AdminPartnerMenuEntity> menus;
}
