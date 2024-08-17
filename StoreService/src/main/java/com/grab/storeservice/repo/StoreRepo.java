package com.grab.storeservice.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Repository;

import com.grab.storeservice.model.Store;

import jakarta.transaction.Transactional;

import java.util.Optional;

@Repository
public interface StoreRepo extends JpaRepository<Store,Integer> {
    public Optional<Store> findByGstId(int gstId);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Store s WHERE s.gstId = :gstId")
    public void deleteByGstId(int gstId);
    
    Store findByStorename(String storename);

	public Store findByStorenameAndGstId(String storeName, int gstId);
}
