package com.javatechie.jwt.api.controller;

import java.io.File;
import java.security.spec.KeySpec;

import java.util.Base64;
import java.util.List;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.javatechie.jwt.api.entity.User;
import com.javatechie.jwt.api.repository.ImageRepository;
import com.javatechie.jwt.api.repository.Repositories;
import com.javatechie.jwt.api.repository.UserRepository;

@CrossOrigin
@RestController
public class Controllers {
	  @Autowired
		private Repositories repositories;
	  @Autowired
	    private ImageRepository imageRepository;
	  @Autowired
	  private UserRepository userRepository;
		
	    @GetMapping(value = "/users")
		public List<User> lista(){
			return repositories.findAllUsers();
		}
	    
	    private static final String SECRET_KEY = "mySecretKey";
	    private static final String SALT = "mySalt";
	    
	    @DeleteMapping(value = "/deleteUser/{userId}")
	    public int deletePersoana(@PathVariable("userId") Long userId) {
	    int recordResult =  repositories.deletePersoana(userId);
	    int count = imageRepository.countImages(userId);
	    int imageResult = 1;
	    if(count == 1 && userId != 0){
	    imageResult = imageRepository.deleteImage(userId);
	    String filePath = "C:/Users/Maria/Desktop/Model/"+userId+".jpg";
	    File file = new File(filePath);
	    if (file.exists()) {
	    	  deletePhoto(filePath);
	    	} else {
	    	  deletePhoto("C:/Users/Maria/Desktop/Model/"+userId+".jpeg");
	    	}
	    
	    }  
		if(imageResult == 1 && recordResult == 1) {
			return 1;
		}else if(imageResult == 1 && recordResult == 0) {
			return 2;
		}else if(imageResult == 0 && recordResult == 1) {
			return 3;
		}else return 0;
		
		}
	  
	    @PostMapping(value = "/addUser")
	    public int adaugare(@RequestBody User p) {
	    	p.setPassword(encrypt(p.getPassword()));
	    	int result = repositories.addUser(p.getId(),p.getRole(),p.getPassword(),p.getEmail(),p.getUserName(),p.getUserPosition(),p.getUserPhone(),p.getUserLastname(),p.getName());
	    	if(result==0) {
	    		return 0;
	    	}else {
	    		return repositories.getLastId();
	    	}
	    }
	    
	    
	    @GetMapping(value = "/getUserById/{id}")
	    public User getUserById(@PathVariable("id") Long id) {
	        User user = repositories.getUserById(id);
	        user.setPassword(decrypt(user.getPassword()));
	        return user;
	    }
	    
	    
	    @PostMapping(value = "/editUser")
	    public int editare(@RequestBody User p) {
	        String password = p.getPassword();
	        if (password == null || password.trim().isEmpty()) {
	            // Dacă parola este null sau gol, preluăm parola existentă din baza de date
	            User existingUser = repositories.findById(p.getId()).orElse(null);
	            if (existingUser != null) {
	                password = existingUser.getPassword();
	            }
	        } else {
	            // Dacă parola este non-gol, criptăm parola nouă
	            password = encrypt(password);
	        }
	        return repositories.edit(p.getId(), p.getUserName(), p.getUserPosition(), p.getRole(),
	            password, p.getEmail(), p.getUserPhone(), p.getUserLastname(), p.getName());
	    }
	    
	    
	    public User findByUserName(String userName) {
	    return userRepository.findByUserName(userName);
	    }
	    
	    //-----------------------------------------------------------------------
	    
	    public static String encrypt(String password) {
	        try {
	            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
	            KeySpec spec = new PBEKeySpec(SECRET_KEY.toCharArray(), SALT.getBytes(), 65536, 256);
	            SecretKey secretKey = new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES");

	            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
	            cipher.init(Cipher.ENCRYPT_MODE, secretKey);

	            byte[] encryptedBytes = cipher.doFinal(password.getBytes());

	            return Base64.getEncoder().encodeToString(encryptedBytes);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }

	        return null;
	    }

	    public static String decrypt(String encryptedPassword) {
	        try {
	            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
	            KeySpec spec = new PBEKeySpec(SECRET_KEY.toCharArray(), SALT.getBytes(), 65536, 256);
	            SecretKey secretKey = new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES");

	            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
	            cipher.init(Cipher.DECRYPT_MODE, secretKey);

	            byte[] encryptedBytes = Base64.getDecoder().decode(encryptedPassword);
	            byte[] decryptedBytes = cipher.doFinal(encryptedBytes);

	            return new String(decryptedBytes);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }

	        return null;
	    }
	    
	    public boolean deletePhoto(String photoPath) {
	        File file = new File(photoPath);
	        
	        if (file.exists()) {
	            return file.delete();
	        }
	        return false;
	    }
}
