package com.javatechie.jwt.api.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class StatisticComposeKey implements Serializable{
	
	    private int id;
	    private String reason;
	    private Timestamp time;
	    
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getReason() {
			return reason;
		}
		public void setReason(String reason) {
			this.reason = reason;
		}
		public Timestamp getTime() {
			return time;
		}
		public void setTime(Timestamp time) {
			this.time = time;
		}
	
}
