package com.javatechie.jwt.api.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.javatechie.jwt.api.entity.User;
@Repository
public interface Repositories extends JpaRepository<User, Long>{
	@Query(value = "SELECT * FROM user", nativeQuery = true)
	List<User> findAllUsers();
	
	@Query(value = "SELECT id FROM user ORDER BY id DESC LIMIT 1", nativeQuery = true)
	int getLastId();
	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM user WHERE id=:userId", nativeQuery = true)
	int deletePersoana(@Param("userId") Long userId);
	
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO user VALUES (:id, :user_name, :user_position, :role, :password, :email, :user_phone, :user_lastname, :name)", nativeQuery = true)
	int addUser(@Param("id") Long id,@Param("user_name") String user_name,@Param("user_position") String user_position, @Param("role") String role, @Param("password") String password, @Param("email") String email,@Param("user_phone") String user_phone,@Param("user_lastname") String user_lastname,@Param("name") String name);
	
	@Query(value = "SELECT * FROM user WHERE id=:id", nativeQuery = true)
	User getUserById(@Param("id") Long id);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE user SET user_name =:user_name, user_position=:user_position,role=:role,password=:password,email=:email,user_phone=:user_phone,user_lastname=:user_lastname, name=:name   WHERE id=:id", nativeQuery = true)
	int edit(@Param("id") Long id,@Param("user_name") String user_name,@Param("user_position") String user_position, @Param("role") String role, @Param("password") String password, @Param("email") String email,@Param("user_phone") String user_phone,@Param("user_lastname") String user_lastname,@Param("name") String name);
  
}
