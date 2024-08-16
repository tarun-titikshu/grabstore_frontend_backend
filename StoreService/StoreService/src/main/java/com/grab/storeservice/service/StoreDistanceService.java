package com.grab.storeservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grab.storeservice.model.StoreDistance;
import com.grab.storeservice.repo.StoreDistanceRepository;

@Service
public class StoreDistanceService implements IStoreDist {

	@Autowired
    private StoreDistanceRepository storeDistanceRepository;

    public Integer getDistByStoreAddress(String storeAddress) {
        StoreDistance storeDistance = storeDistanceRepository.findByStoreAddress(storeAddress);
        if (storeDistance != null) {
            return (int) storeDistance.getDistance();
        } else {
            // Handle the case where the store address is not found
            return null; // or throw an exception if preferred
        }
    }
}
