package com.example.AddPet00.Controllers;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.AddPet00.Models.Persoana;
import com.example.AddPet00.Repositories.ImageRepository;
import com.example.AddPet00.Repositories.Repositories;

@CrossOrigin
@RestController
public class Controllers {
	  @Autowired
		private Repositories repositories;
	  @Autowired
	    private ImageRepository imageRepository;
		
	    @GetMapping(value = "/users")
		public List<Persoana> lista() {
			return repositories.findAllUsers();
		}
	    
	    @DeleteMapping(value = "/deleteUser/{userId}")
	    public int deletePersoana(@PathVariable("userId") Long userId) {
	    int recordResult =  repositories.deletePersoana(userId);
	    int count = imageRepository.countImages(userId);
	    int imageResult = 1;
	    if(count == 1){
	    imageResult = imageRepository.deleteImage(userId);
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
	    public int adaugare(@RequestBody Persoana p) {
	    	int result = repositories.addUser(p.getId(),p.getPerson_name(),p.getPerson_position());
	    	if(result==0) {
	    		return 0;
	    	}else {
	    		System.out.println(repositories.getLastId());
	    		return repositories.getLastId();
	    	}
	    }
	    
	    @GetMapping(value = "/getUserById/{id}")
	    public Persoana getUserById(@PathVariable("id") Long id) {
	    return repositories.getUserById(id);
	    }
	    
	    @PostMapping(value = "/editUser")
	    public int editare(@RequestBody Persoana p) {
	    	return repositories.edit(p.getId(),p.getPerson_name(),p.getPerson_position());
	    }
}
