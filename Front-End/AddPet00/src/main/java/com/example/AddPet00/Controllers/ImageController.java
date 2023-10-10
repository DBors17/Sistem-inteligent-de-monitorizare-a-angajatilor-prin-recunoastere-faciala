package com.example.AddPet00.Controllers;

import java.io.ByteArrayOutputStream;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.AddPet00.Models.ImageModel;
import com.example.AddPet00.Repositories.ImageRepository;
@CrossOrigin
@RestController
public class  ImageController {
	  @Autowired
	  private ImageRepository imageRepository;
	  
	  @PostMapping("/image/upload")
      public boolean uploadImage(@RequestParam("imageFile") MultipartFile file) {
      try {
           String filename = file.getOriginalFilename();
           String strId = filename.substring(0, filename.indexOf('/'));
           int id = Integer.parseInt(strId);
          System.out.println(id);
          ImageModel img = new ImageModel(id, file.getContentType(),
                  compressBytes(file.getBytes()), filename);
          System.out.println(img.toString());
          imageRepository.save(img);
          return true;
      }
      catch(Exception E) {
    	  System.out.println(E);
          return false;
      }
//      return ResponseEntity.status(HttpStatus.OK);
  }
	  
	  @GetMapping(path = { "/image/get/{userId}" })
	    public ImageModel getImage(@PathVariable("userId") long userId)  {
		  Optional<ImageModel> retrievedImage;
		  int count = imageRepository.countImages(userId);
		  if(count == 1){
//	        throws IOException
	        retrievedImage = imageRepository.getImageByUserId(userId);
		  }else{
			 retrievedImage = imageRepository.getImageByUserId(0);
		  }
		  return (new ImageModel(retrievedImage.get().getId(), retrievedImage.get().getType(),
	                decompressBytes(retrievedImage.get().getImage()),retrievedImage.get().getImageName()));
	    }
	  
	  
	  
	  @GetMapping(value = "/getAllImages")
		public List<ImageModel> getAllImages() {
		  List<ImageModel> imagesList = imageRepository.getAllImages();
		  for (ImageModel image : imagesList) {
			  image.setImage(decompressBytes(image.getImage()));
		  }
		  return imagesList;
		}
	  
	  
// -------------------------------------------------------------------------------------	  
	  public static byte[] compressBytes(byte[] data) {
	        Deflater deflater = new Deflater();
	        deflater.setInput(data);
	        deflater.finish();

	        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
	        byte[] buffer = new byte[1024];
	        while (!deflater.finished()) {
	            int count = deflater.deflate(buffer);
	            outputStream.write(buffer, 0, count);
	        }
	        try {
	            outputStream.close();
	        } catch (IOException e) {
	        }
//	        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

	        return outputStream.toByteArray();
	    }

	    public static byte[] decompressBytes(byte[] data) {
	        Inflater inflater = new Inflater();
	        inflater.setInput(data);
	        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
	        byte[] buffer = new byte[1024];
	        try {
	            while (!inflater.finished()) {
	                int count = inflater.inflate(buffer);
	                outputStream.write(buffer, 0, count);
	            }
	            outputStream.close();
	        } catch (IOException ioe) {
	        } catch (DataFormatException e) {
	        }
	        return outputStream.toByteArray();
	    }
}