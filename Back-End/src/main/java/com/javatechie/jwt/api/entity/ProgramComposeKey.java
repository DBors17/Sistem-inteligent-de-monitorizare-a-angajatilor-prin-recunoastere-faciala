package com.javatechie.jwt.api.entity;

import java.io.Serializable;

public class ProgramComposeKey implements Serializable{

	
    private Long id;
    private String zi;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getZi() {
		return zi;
	}
	public void setZi(String zi) {
		this.zi = zi;
	}
}
