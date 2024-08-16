package com.grab.storeservice.repo;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.grab.storeservice.model.StoreDistance;

@Repository
public interface StoreDistanceRepository extends JpaRepository<StoreDistance, Long> {
    StoreDistance findByStoreAddress(String storeAddress);
}

