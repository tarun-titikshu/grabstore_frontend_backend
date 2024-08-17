package com.grab.storeservice.model;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class StoreDistance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String storeAddress;
    private double distance;

    public StoreDistance() {
    }

    public StoreDistance(String storeAddress, double distance) {
        this.storeAddress = storeAddress;
        this.distance = distance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStoreAddress() {
        return storeAddress;
    }

    public void setStoreAddress(String storeAddress) {
        this.storeAddress = storeAddress;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    @Override
    public String toString() {
        return "StoreDistance{" +
                "id=" + id +
                ", storeAddress='" + storeAddress + '\'' +
                ", distance=" + distance +
                '}';
    }
}

