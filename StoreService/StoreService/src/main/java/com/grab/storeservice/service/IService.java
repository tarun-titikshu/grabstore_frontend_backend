package com.grab.storeservice.service;


import com.grab.storeservice.exception.AllreadyExistingStoreException;
import com.grab.storeservice.exception.ProductAlreadyExists;
import com.grab.storeservice.exception.ProductNotFound;
import com.grab.storeservice.exception.QuantityLessInStore;
import com.grab.storeservice.exception.StoreNotFoundException;
import com.grab.storeservice.model.Product;
import com.grab.storeservice.model.Store;
import com.grab.storeservice.exception.ProductNotFoundException;

import java.util.List;
import java.util.UUID;

public interface IService {
    //public Store addStore(Store s) throws AllreadyExistingStoreException;
    public Store addStore(Store s,int gstId) throws AllreadyExistingStoreException;
    public List<Store> getAllStores();
    //public Store updateStore(Store s,int gstId);

    public boolean deleteStore(int gstId) throws StoreNotFoundException;

    //done withn store

    public boolean addProductByGstId(Product p,int gstId) throws StoreNotFoundException, ProductAlreadyExists;

    public Store updateStore(int gstId, Store s) throws StoreNotFoundException;

    public boolean deleteProduct(int gstId, String pname) throws StoreNotFoundException, ProductNotFound;

    public Store updateProduct(int gstId, String pname, Product p ) throws ProductNotFound, StoreNotFoundException;
    public List<Product> showProducts(int gstId) throws StoreNotFoundException;
    //public void addProductToCart(Product product)

    public Store showBestDiscount(String pname) throws ProductNotFoundException;
//    public void addProductToCart(int cartId, String productName, double quantity,Long productId)throws ProductNotFound;
//    		throws StoreNotFoundException, ProductNotFound, QuantityLessInStore;

//    public void delProductToCart(int gstId, String pname, double qty) throws StoreNotFoundException, ProductNotFound ;
    
    Product getProductByGstAndProductId(int gstId, Long productId) throws StoreNotFoundException, ProductNotFoundException;
    public void updateProductQuantity(int gstId, Long productId, double quantity) throws StoreNotFoundException, ProductNotFoundException,QuantityLessInStore;

    }
