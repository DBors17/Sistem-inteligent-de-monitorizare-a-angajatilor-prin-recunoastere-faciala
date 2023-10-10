package com.javatechie.jwt.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.javatechie.jwt.api.entity.StatisticModel;
import com.javatechie.jwt.api.repository.StatisticRepository;

@CrossOrigin
@RestController
public class StatisticController {
	
	  @Autowired
	  private StatisticRepository statisticRepository;
	  
	  @GetMapping(value = "/getStatisticById/{id}")
	  public List<StatisticModel> getStatisticById(@PathVariable("id") int id) {
	  return statisticRepository.getStatisticsById(id);
	  }
	  
	  @DeleteMapping(value = "/deleteStatistic/{id}")
	    public int deleteStatistic(@PathVariable("id") int id) {
	    return statisticRepository.deleteStatistic(id);
	  }
}
