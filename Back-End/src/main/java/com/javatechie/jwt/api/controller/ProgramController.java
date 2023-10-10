package com.javatechie.jwt.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.javatechie.jwt.api.entity.Program;
import com.javatechie.jwt.api.repository.ProgramRepository;

@CrossOrigin
@RestController
public class ProgramController  {
	
	  @Autowired
	  private ProgramRepository programRepository;
	  
	  @GetMapping(value = "/programs")
		public List<Program> lista(){
			return programRepository.findAllProgram();
		}
	  
	  @DeleteMapping(value = "/deleteProgram/{userId}")
	    public int deletePersoana(@PathVariable("userId") Long userId) {
	    return programRepository.deleteProgram(userId);
	  }
	    
	  @GetMapping(value = "/getProgramById/{id}")
	  public List<Program> getStatisticById(@PathVariable("id") Long id) {
	  return programRepository.getProgramById(id);
	  }
	  
	  @PostMapping(value = "/addProgram")
	    public int adaugare(@RequestBody Program p) {
		return programRepository.addProgram(p.getId(),p.getZi(),p.getIntrare(),p.getIntrareMasa(),p.getIesireMasa(),p.getIesire());
	    }
	  
	  @PostMapping(value = "/editProgram")
	    public int editare(@RequestBody Program p) {
	        return programRepository.editProgram(p.getId(),p.getZi(),p.getIntrare(),p.getIntrareMasa(),p.getIesireMasa(),p.getIesire());
	    }

}
