package com.javatechie.jwt.api.entity;

import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "program")
@IdClass(ProgramComposeKey.class)
public class Program {

	    @Id
	    @GeneratedValue(strategy=GenerationType.IDENTITY)
	    @Column(nullable= false)
	    private Long id;
	    
	    @Id
	    @Column(nullable= false)
	    private String zi;
	    
	    private Time intrare;
	    private Time intrareMasa;
	    private Time iesireMasa;
	    private Time iesire;

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

		public Time getIntrare() {
			return intrare;
		}

		public void setIntrare(Time intrare) {
			this.intrare = intrare;
		}

		public Time getIntrareMasa() {
			return intrareMasa;
		}

		public void setIntrareMasa(Time intrareMasa) {
			this.intrareMasa = intrareMasa;
		}

		public Time getIesireMasa() {
			return iesireMasa;
		}

		public void setIesireMasa(Time iesireMasa) {
			this.iesireMasa = iesireMasa;
		}

		public Time getIesire() {
			return iesire;
		}

		public void setIesire(Time iesire) {
			this.iesire = iesire;
		}
		


}
