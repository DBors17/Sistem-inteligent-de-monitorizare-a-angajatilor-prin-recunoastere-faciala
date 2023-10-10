package com.javatechie.jwt.api.controller;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.javatechie.jwt.api.repository.Repositories;
import com.javatechie.jwt.api.service.PythonService;

@CrossOrigin
@RestController
public class PythonController{
	
	@Autowired
	private Repositories repositories; 
	
	@Autowired
    private PythonService pythonService;

	@PostMapping(value = "/upload-imageToRecognize")
	public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
	    try {
	        byte[] bytes = file.getBytes();
	        Path path = Paths.get("C:/Users/Maria/Desktop/Sistem inteligent de monitorizare a angajatilor/Face_recognition/Foto_to_recognize/" + file.getOriginalFilename());
	        Files.write(path, bytes);
	        return ResponseEntity.ok().build();
	    } catch (IOException e) {
	        // Tratează excepția IOException
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    } catch (IllegalStateException e) {
	        // Tratează excepția IllegalStateException
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	    }
	}
	
    @GetMapping("/run-python/{param}/{reason}")
    public String runPython(@PathVariable String param, @PathVariable String reason) throws IOException, InterruptedException {
       return pythonService.runPython(param,reason);
    }
    
    
    @GetMapping("/getLastId/{id}")
    public int getLastId(){
    	return repositories.getLastId();    
    }
}
