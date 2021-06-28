package com.example.demo.controller;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.exception.ResourceNotFoundException;

import com.example.demo.model.Restaurant;
import com.example.demo.repository.RestaurantRepository;

@CrossOrigin(origins ="http://localhost:4200")  //connecting with angular
@RestController                                 //it provides two annotation responsebody and controller
@RequestMapping(path="/Api")
public class RestaurantController {
	
	
	
	@Autowired
	RestaurantRepository repo;                    //Repository which will do all data retrieval/manipulation work
	

	
	@GetMapping("/restaurants")
	public List<Restaurant> getAllRestaurant()         //Retrieve all restaurant
	{
		return repo.findAll();
	}
	
	@PostMapping("/restaurants")
	public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant)    //Add Restaurant
	{
		Date date=new Date();
		String date2=date.toString();
		restaurant.setLastupdatedtime(date2.substring(4));
		
		System.out.println(restaurant);
		Restaurant res=null;
		res=repo.save(restaurant);
		
		
		return new ResponseEntity<Restaurant>(res,HttpStatus.OK);
	}
	
	@GetMapping("/restaurants/{id}")
	public ResponseEntity<Restaurant> getRestaurantById(@PathVariable(value="id") long id) throws ResourceNotFoundException  //Retrieve
	{
		Restaurant rest=repo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Restaurant not found for this id" + id));
		return new ResponseEntity<>(rest, HttpStatus.OK);
	}
	
	@PutMapping("/restaurants/{id}")   
	public ResponseEntity<Restaurant> updateRestaurant(@PathVariable(value = "id") Long id,    
		 @RequestBody Restaurant restaurant) throws ResourceNotFoundException {
		Restaurant rest = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant not found for this id " + id));
		
		Date date=new Date();
		String date2=date.toString();
		restaurant.setLastupdatedtime(date2.substring(4));

		rest.setName(restaurant.getName());
		rest.setAddress(restaurant.getAddress());
		rest.setPhone(restaurant.getPhone());
		rest.setOpentime(rest.getOpentime());
		rest.setClosetime(restaurant.getClosetime());
	    Restaurant updatedRestaurant = repo.save(rest);
		return new ResponseEntity<Restaurant>(updatedRestaurant,HttpStatus.OK);
	}
	
	@DeleteMapping("/restaurants/{id}")
	public Map<String, Boolean> deleteRestaurant(@PathVariable(value = "id") Long id)    //delete by id
			throws ResourceNotFoundException {
		Restaurant rest = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant not found for this id :: " + id));

		repo.delete(rest);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
	@GetMapping("/restaurants/isActivated/{id}")
	public ResponseEntity<Restaurant> updateIsActivated(@PathVariable Long id) throws ResourceNotFoundException    //Updating the status
	{
		Optional<Restaurant> rest = repo.findById(id);
		
		if(rest.isPresent())
		{
			Restaurant updatedRestaurant=rest.get();
			if(updatedRestaurant.isIsactivated())
			{
				updatedRestaurant.setIsactivated(false);
			}
			else
			{
				updatedRestaurant.setIsactivated(true);
			}
			
			updatedRestaurant=repo.save(updatedRestaurant);
			return new ResponseEntity<Restaurant>(updatedRestaurant,HttpStatus.OK);
			
		}
		else {
			return new ResponseEntity<Restaurant>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	
	@PutMapping(value="/upload/{id}",consumes="multipart/form-data")     //Image Uploading
	public String uplaodImage(@RequestParam MultipartFile file,@PathVariable(value = "id")long id) throws Exception {
		System.out.println("Upload Rest id :"+id+"File name :"+file.getName()+"Original file name"+file.getOriginalFilename());
         
          
          System.out.println("Original Image Byte Size - " + file.getBytes().length);
          Restaurant restaurant=repo.findById(id).orElseThrow(()->new Exception("Restaurant not found for this id" + id));
           restaurant.setImagename(file.getOriginalFilename());
           restaurant.setType(file.getContentType());
           restaurant.setPicByte(compressBytes(file.getBytes()));
           System.out.println("Upload rest obj:"+restaurant.getImagename());
           
      	repo.save(restaurant);
      	return "Image Uploaded";
          
          
          
          
	}
	
	@GetMapping("/get/{id}/{imagename}")                 //retrieve image
	public ResponseEntity<byte[]> getFile(@PathVariable("id") long id,@PathVariable("imagename")String imagename) throws IOException {
		final Optional<Restaurant> retrievedImage = repo.findByImagenameAndId(imagename, id);
		System.out.println("retrievedname"+ retrievedImage);
		if(retrievedImage.isPresent())
		{
			Restaurant img=retrievedImage.get();
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "connected;filename=\""+img.getImagename()+"\"").body(decompressBytes(img.getPicByte()));
		}
		return ResponseEntity.status(404).body(null);
	}
	
	
	// Compressing the image byte
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
		System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

		return outputStream.toByteArray();
	}

	//uncompress the image bytes before returning it to the angular application
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
		} catch (IOException ioe) {		} catch (DataFormatException e) {
		}
		return outputStream.toByteArray();
	}
}


