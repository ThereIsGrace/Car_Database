package com.packt.cardatabase.domain;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CarRepository extends CrudRepository<Car, Long>{

	// 브랜드로 자동차를 검색
	List<Car> findByBrand(@Param("brand") String brand);
	
	// 색상으로 자동차를 검색
	List<Car> findByColor(@Param("color") String color);
}
