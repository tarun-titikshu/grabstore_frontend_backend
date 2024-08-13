package com.grab.storeservice.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.grab.storeservice.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
	 @Query("SELECT p FROM Product p WHERE p.pname = :pname AND p.id = :id")
	    Optional<Product> findByPnameAndId(String pname, Long id);
}



