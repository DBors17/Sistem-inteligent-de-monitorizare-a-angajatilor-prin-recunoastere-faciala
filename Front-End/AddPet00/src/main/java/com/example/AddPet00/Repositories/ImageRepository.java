package com.example.AddPet00.Repositories;

import java.util.List;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.AddPet00.Models.ImageModel;
@Repository
public interface ImageRepository extends JpaRepository<ImageModel, Long>{
	@Query(value = "SELECT * FROM images WHERE id = :id", nativeQuery = true)
    Optional<ImageModel> getImageByUserId(@Param("id") long id);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM images WHERE id = :userId", nativeQuery = true)
	int deleteImage(@Param("userId") long userId);
	
	@Query(value = "SELECT * FROM images", nativeQuery = true)
	List<ImageModel> getAllImages();
	
	@Query(value = "SELECT COUNT(*) FROM images WHERE id =:userId", nativeQuery = true)
	int countImages(@Param("userId") long userId);
}