package com.javatechie.jwt.api.repository;

import java.sql.Time;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.javatechie.jwt.api.entity.Program;

@Repository
public interface ProgramRepository  extends JpaRepository<Program, Long>{
	
	@Query(value = "SELECT * FROM program", nativeQuery = true)
	List<Program> findAllProgram();
	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM program WHERE id=:userId", nativeQuery = true)
	int deleteProgram(@Param("userId") Long userId);
	
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO program VALUES (:id, :zi, :intrare, :intrare_masa, :iesire_masa, :iesire)", nativeQuery = true)
	int addProgram(@Param("id") Long id, @Param("zi") String zi ,@Param("intrare") Time intrare, @Param("intrare_masa") Time intrareMasa, @Param("iesire_masa") Time iesireMasa,@Param("iesire") Time iesire);
	
	@Query(value = "SELECT * FROM program WHERE id=:id", nativeQuery = true)
	List<Program> getProgramById(@Param("id") Long id);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE program SET intrare =:intrare, intrare_masa=:intrare_masa, iesire_masa=:iesire_masa, iesire=:iesire  WHERE id=:id AND zi=:zi", nativeQuery = true)
	int editProgram(@Param("id") Long id, @Param("zi") String zi,@Param("intrare") Time intrare,@Param("intrare_masa") Time intrareMasa, @Param("iesire_masa") Time iesireMasa,@Param("iesire") Time iesire);
}
