package com.example.AddPet00.Models;

import java.util.Arrays;



import jakarta.persistence.*;
@Entity
//@Data(set,get)
@Table(name = "images")
public class ImageModel {

	@Id
	@Column(nullable=false)
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private String type;
	@Column(length = 5000)
	private byte[] image;
	@Column(name="image_name")
	private String imageName;
	
	public String getImageName() {
		return imageName;
	}
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	public Long getId() {
		return id;
	}
	public void setUserId(Long id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	
	public ImageModel(long id, String type, byte[] image, String imageName) {
        this.id = id;
        this.type = type;
        this.image = image;
        this.imageName = imageName;
    }
	public ImageModel() {
        super();
    }
	@Override
	public String toString() {
		return "ImageModel [id=" + id + ", type=" + type + ", image=" + Arrays.toString(image) + ", imageName="
				+ imageName + "]";
	}
}