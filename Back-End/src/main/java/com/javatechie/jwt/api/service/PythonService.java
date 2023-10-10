package com.javatechie.jwt.api.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javatechie.jwt.api.repository.StatisticRepository;
    
@Service     
public class PythonService {
	
	@Autowired
	  private StatisticRepository statisticRepository;
	
	String id;
	public String runPython(String param, String reason) throws IOException, InterruptedException {
	    String line;
	    String pythonInterpreter = "C:/Users/Maria/anaconda3/python.exe";
	    String pythonScript = "C:/Users/Maria/Desktop/Sistem inteligent de monitorizare a angajatilor/Face_recognition/Image Face Recognition/image_face_recognition.py";
	    ProcessBuilder pb = new ProcessBuilder(pythonInterpreter, pythonScript, param);
	    Process process = pb.start();
    
	    // Wait for the process to finish and get the exit code
	    int exitCode = process.waitFor();

	    // Read the output and error streams of the Python program
	    InputStream inputStream = process.getInputStream();
	    BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
	    InputStream errorStream = process.getErrorStream();
	    BufferedReader errorReader = new BufferedReader(new InputStreamReader(errorStream));
	    StringBuilder output = new StringBuilder();  
	    
	    while ((line = reader.readLine()) != null) {
	        output.append(line);
	        id = output.toString();
	        System.out.println(id);
	        try {
	            int idInt = Integer.parseInt(id);
	            statisticRepository.addData(idInt, reason, new Date());
	        } catch (NumberFormatException e) {
	            id = "-1";
	        }
	    }

	    // Read the error output of the Python program
	    StringBuilder errorOutput = new StringBuilder();
	    while ((line = errorReader.readLine()) != null) {
	        // Append the error output to the buffer
	        errorOutput.append(line);
	        errorOutput.append(System.lineSeparator());
	    }

	    // Check if the process had a successful exit code
	    if (exitCode == 0) {
	        deletePhoto("C:/Users/Maria/Desktop/Sistem inteligent de monitorizare a angajatilor/Face_recognition/Foto_to_recognize/image.jpeg");
	        
	    } else {
	        System.out.println("Error: Python script exited with code " + exitCode);
	        System.out.println("Error output: " + errorOutput.toString());
	    }
	    return id;
	}  
	  public boolean deletePhoto(String photoPath) {
	        File file = new File(photoPath);
	        
	        if (file.exists()) {
	            return file.delete();
	        }
	        return false;
	    }
}
