package com.grab.storeservice.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.grab.storeservice.exception.AllreadyExistingStoreException;
import com.grab.storeservice.exception.ProductAlreadyExists;
import com.grab.storeservice.exception.ProductNotFound;
import com.grab.storeservice.exception.ProductNotFoundException;
import com.grab.storeservice.exception.QuantityLessInStore;
import com.grab.storeservice.exception.StoreNotFoundException;

import com.grab.storeservice.model.Product;
import com.grab.storeservice.model.Store;
import com.grab.storeservice.model.StoreDistance;
import com.grab.storeservice.repo.ProductRepo;
import com.grab.storeservice.repo.StoreDistanceRepository;
import com.grab.storeservice.repo.StoreRepo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StoreService implements IService {
    
    @Autowired
    private StoreRepo srepo;
    
    
    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Store addStore(Store s, int gstId) throws AllreadyExistingStoreException {
        Optional<Store> opt = srepo.findByGstId(gstId);
        if (opt.isPresent()) {
            throw new AllreadyExistingStoreException("Store already present");
        }
        return srepo.save(s);
    }

    @Autowired
    private StoreDistanceRepository storeDistanceRepository;

//    public void addStore1(Store store) {
//        // Retrieve the distance for the given address
//        StoreDistance storeDistance = storeDistanceRepository.findByStoreAddress(store.getStoreAddress());
//        
//        if (storeDistance != null) {
//            double distance = storeDistance.getDistance();
//            System.out.println("Distance from Baner: " + distance);
//            // Optionally, you can add this distance to the Store entity if required
//        } else {
//            System.out.println("Address not found in distance table.");
//        }
//
//        // Save the store
//        srepo.save(store);
//    }
    
    public void addStore1(Store store, int gstId) throws AllreadyExistingStoreException {
        // Check if a store with the given gstId already exists
        Optional<Store> existingStore = srepo.findByGstId(gstId);
        if (existingStore.isPresent()) {
            throw new AllreadyExistingStoreException("Store already present with GST ID: " + gstId);
        }

        // Retrieve the distance for the given address
        StoreDistance storeDistance = storeDistanceRepository.findByStoreAddress(store.getStoreAddress());

        if (storeDistance != null) {
            double distance = storeDistance.getDistance();
            System.out.println("Distance from Baner: " + distance);
            // Optionally, handle the distance as needed, but do not set it on the Store entity
        } else {
            System.out.println("Address not found in distance table.");
            // Optionally handle the case where the address is not found
        }

        // Save the store
        srepo.save(store);
    }
    
    
//    public double getDistanceByStoreName(String storeName) {
//        // Find the store by name
//        Store store = srepo.findByStorename(storeName);
//
//        if (store != null) {
//            // Retrieve the distance for the store's address
//            StoreDistance storeDistance = storeDistanceRepository.findByStoreAddress(store.getStoreAddress());
//
//            if (storeDistance != null) {
//                return storeDistance.getDistance();
//            } else {
//                throw new RuntimeException("Address not found in distance table.");
//            }
//        } else {
//            throw new RuntimeException("Store not found.");
//        }
//    }
    
    public double getDistanceByStoreName1(String storeName, int gstId) {
        // Find the store by name and GST ID
        Store store = srepo.findByStorenameAndGstId(storeName, gstId);

        if (store != null) {
            // Retrieve the distance for the store's address
            StoreDistance storeDistance = storeDistanceRepository.findByStoreAddress(store.getStoreAddress());

            if (storeDistance != null) {
                return storeDistance.getDistance();
            } else {
                throw new RuntimeException("Address not found in distance table.");
            }
        } else {
            throw new RuntimeException("Store not found with the provided GST ID.");
        }
    }


    @Override
    public List<Store> getAllStores() {
        return srepo.findAll();
    }

    @Override
    public boolean deleteStore(int gstId) throws StoreNotFoundException {
        Optional<Store> opt = srepo.findByGstId(gstId);
        if (opt.isPresent()) {
            srepo.deleteByGstId(gstId);
            return true;
        } else {
            throw new StoreNotFoundException("No store found");
        }
    }

    @Override
    public boolean addProductByGstId(Product p, int gstId) throws StoreNotFoundException, ProductAlreadyExists {
        Store store = srepo.findByGstId(gstId).orElseThrow(() -> new StoreNotFoundException("No store found"));

        List<Product> products = store.getProducts();
        boolean productExists = products.stream().anyMatch(prod -> prod.getPname().equals(p.getPname()));

        if (productExists) {
            throw new ProductAlreadyExists("Same product already exists, you can't add");
        } else {
            products.add(p);
            store.setProducts(products);
            srepo.save(store);
            return true;
        }
    }

    @Override
    public Store updateStore(int gstId, Store s) throws StoreNotFoundException {
        Store existingStore = srepo.findByGstId(gstId).orElseThrow(() -> new StoreNotFoundException("The store does not exist"));
        existingStore.setStorename(s.getStorename());
        existingStore.setProducts(s.getProducts());
        return srepo.save(existingStore);
    }
    
    @Override
    public boolean deleteProduct(int gstId, String pname) throws StoreNotFoundException, ProductNotFound {
        Store store = srepo.findByGstId(gstId).orElseThrow(() -> new StoreNotFoundException("No store found"));
        List<Product> products = store.getProducts();
        
        boolean productRemoved = products.removeIf(p -> p.getPname().equals(pname));
        
        if (productRemoved) {
            store.setProducts(products);
            srepo.save(store);
            return true;
        } else {
            throw new ProductNotFound("No product found");
        }
    }

    @Override
    public Store updateProduct(int gstId, String pname, Product p) throws ProductNotFound, StoreNotFoundException {
        Store store = srepo.findByGstId(gstId).orElseThrow(() -> new StoreNotFoundException("Store not found"));
        List<Product> products = store.getProducts();
        
        boolean productExists = products.removeIf(prod -> pname.equalsIgnoreCase(prod.getPname()));
        
        if (productExists) {
            products.add(p);
            store.setProducts(products);
            return srepo.save(store);
        } else {
            throw new ProductNotFound("No such product found");
        }
    }

    @Override
    public List<Product> showProducts(int gstId) throws StoreNotFoundException {
        Store store = srepo.findByGstId(gstId).orElseThrow(() -> new StoreNotFoundException("The store gstId does not exist"));
        return store.getProducts();
    }

    @Override
    public List<Store> showBestDiscount(String pname) throws ProductNotFoundException {
        double bestDiscount = 0.0;
        List<Store> returnStores = new ArrayList<>();
        boolean productFound = false;

        List<Store> existingStores = srepo.findAll();

        for (Store store : existingStores) {
            List<Product> products = store.getProducts();
            for (Product product : products) {
                if (product.getPname() != null && product.getPname().toLowerCase().contains(pname.toLowerCase())) {
                    productFound = true;
                    if (product.getDiscount() > bestDiscount) {
                        bestDiscount = product.getDiscount();
                        returnStores.clear();
                        Store storeWithBestDiscount = new Store();
                        storeWithBestDiscount.setGstId(store.getGstId());
                        storeWithBestDiscount.setStorename(store.getStorename());
                        storeWithBestDiscount.setProducts(Collections.singletonList(product));
                        returnStores.add(storeWithBestDiscount);
                    } else if (product.getDiscount() == bestDiscount) {
                        boolean storeAlreadyAdded = returnStores.stream()
                            .anyMatch(s -> s.getGstId() == store.getGstId());
                        if (!storeAlreadyAdded) {
                            Store storeWithBestDiscount = new Store();
                            storeWithBestDiscount.setGstId(store.getGstId());
                            storeWithBestDiscount.setStorename(store.getStorename());
                            storeWithBestDiscount.setProducts(Collections.singletonList(product));
                            returnStores.add(storeWithBestDiscount);
                        }
                    }
                }
            }
        }

        if (!productFound) {
            throw new ProductNotFoundException("Product with name '" + pname + "' not found");
        }

        return returnStores;
    }

    
    
    public List<Store> showBestDiscountDist(String pname) throws ProductNotFoundException {
        double bestDiscount = 0.0;
        List<Store> returnStores = new ArrayList<>();
        boolean productFound = false;

        List<Store> existingStores = srepo.findAll();

        for (Store store : existingStores) {
            List<Product> products = store.getProducts();
            for (Product product : products) {
                if (product.getPname() != null && product.getPname().toLowerCase().contains(pname.toLowerCase())) {
                    productFound = true;
                    if (product.getDiscount() > bestDiscount) {
                        bestDiscount = product.getDiscount();
                        returnStores.clear();
                        Store storeWithBestDiscount = new Store();
                        storeWithBestDiscount.setGstId(store.getGstId());
                        storeWithBestDiscount.setStorename(store.getStorename());
                        storeWithBestDiscount.setProducts(Collections.singletonList(product));
                        storeWithBestDiscount.setStoreAddress(store.getStoreAddress()); // Set store address
                        returnStores.add(storeWithBestDiscount);
                    } else if (product.getDiscount() == bestDiscount) {
                        boolean storeAlreadyAdded = returnStores.stream()
                                .anyMatch(s -> s.getGstId() == store.getGstId());
                        if (!storeAlreadyAdded) {
                            Store storeWithBestDiscount = new Store();
                            storeWithBestDiscount.setGstId(store.getGstId());
                            storeWithBestDiscount.setStorename(store.getStorename());
                            storeWithBestDiscount.setProducts(Collections.singletonList(product));
                            storeWithBestDiscount.setStoreAddress(store.getStoreAddress()); // Set store address
                            returnStores.add(storeWithBestDiscount);
                        }
                    }
                }
            }
        }

        if (!productFound) {
            throw new ProductNotFoundException("Product with name '" + pname + "' not found");
        }

        // Sort the returnStores list by distance
        returnStores.sort(Comparator.comparingDouble(store -> {
            StoreDistance storeDistance = storeDistanceRepository.findByStoreAddress(store.getStoreAddress());
            return storeDistance != null ? storeDistance.getDistance() : Double.MAX_VALUE;
        }));

        return returnStores;
    }

    public List<String> getProductSuggestions(String query) {
        List<String> suggestions = new ArrayList<>();
        List<Store> existingStores = srepo.findAll();

        for (Store store : existingStores) {
            List<Product> products = store.getProducts();
            for (Product product : products) {
                if (product.getPname() != null && product.getPname().toLowerCase().contains(query.toLowerCase())) {
                    if (!suggestions.contains(product.getPname())) {
                        suggestions.add(product.getPname());
                    }
                }
            }
        }

        return suggestions;
    }

    public Product getProductByGstAndProductId(int gstId, Long productId) throws StoreNotFoundException, ProductNotFoundException {
        Store store = srepo.findByGstId(gstId).orElseThrow(() -> new StoreNotFoundException("Store not found"));
        return store.getProducts().stream()
            .filter(product -> product.getId().equals(productId))
            .findFirst()
            .orElseThrow(() -> new ProductNotFoundException("Product not found in the store"));
    }

    public void updateProductQuantity(int gstId, Long productId, double quantity) throws StoreNotFoundException, ProductNotFoundException, QuantityLessInStore {
        Store store = srepo.findByGstId(gstId).orElseThrow(() -> new StoreNotFoundException("Store not found"));
        Product product = store.getProducts().stream()
            .filter(p -> p.getId().equals(productId))
            .findFirst()
            .orElseThrow(() -> new ProductNotFoundException("Product not found in the store"));

        if (product.getUnit() < quantity) {
            throw new QuantityLessInStore("Insufficient quantity in store");
        }

        product.setUnit(product.getUnit() - quantity);
        store.setProducts(store.getProducts());
        srepo.save(store);
    }


    
//    public double getDistanceForAddress(String address) {
//        StoreDistance storeDistance = storeDistanceRepository.findByStoreAddress(address);
//        return storeDistance != null ? storeDistance.getDistance() : -1; // Return -1 if not found
//    }
    
//    public List<Store> getStoresByDistanceAndDiscount(String address, String productName) throws ProductNotFoundException {
//        // Retrieve the target distance for the given address
//        double targetDistance = getDistanceForAddress(address);
//        if (targetDistance == -1) {
//            return Collections.emptyList(); // No matching address found
//        }
//
//        // Fetch the list of stores with the best discount for the given product
//        List<Store> bestDiscountStores = showBestDiscount(productName);
//        
//        // Filter and sort the stores based on distance
//        return bestDiscountStores.stream()
//                .filter(store -> store.getStoreDistance() != null 
//                        && getDistanceFromStoreDistance(store.getStoreDistance()) <= targetDistance)
//                .sorted(Comparator.comparingDouble(store -> getDistanceFromStoreDistance(store.getStoreDistance())))
//                .collect(Collectors.toList());
//    }


}
