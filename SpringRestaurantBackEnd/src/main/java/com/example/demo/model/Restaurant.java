package com.example.demo.model;



import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
@Table(name="Restaurant")
public class Restaurant {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable=false)
	private String name;
	@Column(nullable=false)
	private String address;
	@Column(nullable=false)
	private String phone;
	@Column
	private String opentime;
	@Column
	private String closetime;
	
	
	private boolean isactivated;
	
	private String lastupdatedtime;
	
	//For image Uploading
	
	@Column
	@JsonView(View.FileInfo.class)
	private String imagename;
	@Column
	private String type;
	@Lob
	@Column
	private byte[] picByte;
	
	
	
	public Restaurant() {
		super();
	}



	public Restaurant(Long id, String name, String address, String phone, String opentime, String closetime,
			boolean isactivated, String lastupdatedtime, String imagename, String type, byte[] picByte) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.opentime = opentime;
		this.closetime = closetime;
		this.isactivated = isactivated;
		this.lastupdatedtime = lastupdatedtime;
		this.imagename = imagename;
		this.type = type;
		this.picByte = picByte;
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getAddress() {
		return address;
	}



	public void setAddress(String address) {
		this.address = address;
	}



	public String getPhone() {
		return phone;
	}



	public void setPhone(String phone) {
		this.phone = phone;
	}



	public String getOpentime() {
		return opentime;
	}



	public void setOpentime(String opentime) {
		this.opentime = opentime;
	}



	public String getClosetime() {
		return closetime;
	}



	public void setClosetime(String closetime) {
		this.closetime = closetime;
	}



	public boolean isIsactivated() {
		return isactivated;
	}



	public void setIsactivated(boolean isactivated) {
		this.isactivated = isactivated;
	}



	public String getLastupdatedtime() {
		return lastupdatedtime;
	}



	public void setLastupdatedtime(String lastupdatedtime) {
		this.lastupdatedtime = lastupdatedtime;
	}



	public String getImagename() {
		return imagename;
	}



	public void setImagename(String imagename) {
		this.imagename = imagename;
	}



	public String getType() {
		return type;
	}



	public void setType(String type) {
		this.type = type;
	}



	public byte[] getPicByte() {
		return picByte;
	}



	public void setPicByte(byte[] picByte) {
		this.picByte = picByte;
	}



	@Override
	public String toString() {
		return "Restaurant [id=" + id + ", name=" + name + ", address=" + address + ", phone=" + phone + ", opentime="
				+ opentime + ", closetime=" + closetime + ", isactivated=" + isactivated + ", lastupdatedtime="
				+ lastupdatedtime + ", imagename=" + imagename + ", type=" + type + ", picByte="
				+ Arrays.toString(picByte) + "]";
	}
	
	
	
	



	

}


