package com.example.AddPet00.Repositories;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.AddPet00.Models.Persoana;
@Repository
public interface Repositories extends JpaRepository<Persoana, Long>{
	@Query(value = "SELECT * FROM infoperson", nativeQuery = true)
	List<Persoana> findAllUsers();
	
	@Query(value = "SELECT id FROM infoperson ORDER BY id DESC LIMIT 1", nativeQuery = true)
	int getLastId();
	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM infoperson WHERE id=:userId", nativeQuery = true)
	int deletePersoana(@Param("userId") Long userId);
	
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO infoperson VALUES (:id, :person_name, :person_position)", nativeQuery = true)
	int addUser(@Param("id") Long id,@Param("person_name") String person_name,@Param("person_position") String person_position);
	
	@Query(value = "SELECT * FROM infoperson WHERE id=:id", nativeQuery = true)
	Persoana getUserById(@Param("id") Long id);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE infoperson SET person_name =:person_name, person_position=:person_position WHERE id=:id", nativeQuery = true)
	int edit(@Param("id") Long id,@Param("person_name") String person_name,@Param("person_position") String person_position);

}
