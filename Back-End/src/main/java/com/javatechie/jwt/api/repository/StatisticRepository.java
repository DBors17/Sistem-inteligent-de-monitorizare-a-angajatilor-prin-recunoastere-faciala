package com.javatechie.jwt.api.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.javatechie.jwt.api.entity.StatisticModel;

@Repository
public interface StatisticRepository extends JpaRepository<StatisticModel, Long>{

	@Modifying
	@Transactional
	@Query(value = "INSERT INTO statistics VALUES (:id, :reason, :time)", nativeQuery = true)
	int addData(@Param("id") int id,@Param("reason") String reason, @Param("time") Date time);
	
	@Query(value = "SELECT * FROM statistics WHERE id=:id", nativeQuery = true)
	List<StatisticModel> getStatisticsById(@Param("id") int id);
	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM statistics WHERE id=:id", nativeQuery = true)
	int deleteStatistic(@Param("id") int id);
}
