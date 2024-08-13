package com.grab.storeservice.model;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gstId;
    private String storename;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Product> products;

    public Store() {
    }

    public Store(int gstId, String storename, List<Product> products) {
        this.gstId = gstId;
        this.storename = storename;
        this.products = products;
    }

    public int getGstId() {
        return gstId;
    }

    public void setGstId(int gstId) {
        this.gstId = gstId;
    }

    public String getStorename() {
        return storename;
    }

    public void setStorename(String storename) {
        this.storename = storename;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "Store{" +
                "gstId=" + gstId +
                ", storename='" + storename + '\'' +
                ", products=" + products +
                '}';
    }
}
