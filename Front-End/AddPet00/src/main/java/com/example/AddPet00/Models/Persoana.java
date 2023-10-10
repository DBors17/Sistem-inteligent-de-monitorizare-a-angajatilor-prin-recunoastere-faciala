package com.example.AddPet00.Models;

import jakarta.persistence.*;
@Entity
//@Data(set,get)
@Table(name = "infoperson")
public class Persoana {

	@Id
	@Column(nullable=false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private String person_name;
	@Column
	private String person_position;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPerson_name() {
		return person_name;
	}
	public void setPerson_name(String person_name) {
		this.person_name = person_name;
	}
	public String getPerson_position() {
		return person_position;
	}
	public void setPerson_position(String person_position) {
		this.person_position = person_position;
	}
}
