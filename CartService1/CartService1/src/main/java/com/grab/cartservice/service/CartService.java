package com.grab.cartservice.service;

import java.io.Console;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.grab.cartservice.exception.ProductNotFoundException;
import com.grab.cartservice.exception.StoreNotFoundException;
import com.grab.cartservice.model.Cart;
import com.grab.cartservice.model.Product;
//import com.grab.cartservice.model.Product;
import com.grab.cartservice.repo.CartRepo;

@Service
public class CartService {
    
    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private RestTemplate restTemplate;

    private final String STORE_SERVICE_URL = "http://localhost:8092/api/store";
    
    public Cart getCartDetails(int cartId) throws ProductNotFoundException {
        return cartRepo.findByCartId(cartId);
    }

    // Method to get product details
    public Product getProductDetails(Long productId, int gstId) throws ProductNotFoundException {
        // Corrected URL for fetching product details
        String url = STORE_SERVICE_URL + "/getProductByGstAndProductId/" + gstId + "/" + productId;
        ResponseEntity<Product> response = restTemplate.getForEntity(url, Product.class);
        Product product = response.getBody();
        if (product == null) {
            throw new ProductNotFoundException("Product not found");
        }
        return product;
    }

    
   public void addProductToCart(int cartId, String productName, double quantity, Long productId, int gstId) throws ProductNotFoundException, StoreNotFoundException {
       // Corrected URL for fetching product details
       String url = STORE_SERVICE_URL + "/getProductByGstAndProductId/" + gstId + "/" + productId;
//        System.out.println(url);
        ResponseEntity<Product> response = restTemplate.getForEntity(url, Product.class);
        Product product = response.getBody();
        if (product == null) {
            throw new ProductNotFoundException("Product not found");
        }
//        // Check if the cart already exists
        Cart existingCart = cartRepo.findByCartId(cartId);                if (existingCart != null) {            // Update existing cart            existingCart.setProductName(productName);            existingCart.setQuantity(existingCart.getQuantity() + quantity); // Update quantity            existingCart.setTotalPrice(existingCart.getQuantity() * product.getPrice() * (100 - product.getDiscount()) * 0.01);                        cartRepo.save(existingCart);        } else {            // Create new cart entry            Cart newCart = new Cart();            newCart.setCartId(cartId);
            newCart.setProductName(productName);
            newCart.setQuantity(quantity);
            newCart.setTotalPrice(quantity * product.getPrice() * (100 - product.getDiscount()) * 0.01);
            newCart.setgstId(gstId);

            cartRepo.save(newCart);
        }
    }
    
//    public void addProductToCart(int cartId, String productName, double quantity, Long productId, int gstId)
//            throws ProductNotFoundException, StoreNotFoundException {
//
//        // Fetch product details
//        String url = STORE_SERVICE_URL + "/getProductByGstAndProductId/" + gstId + "/" + productId;
//        ResponseEntity<Product> response = restTemplate.getForEntity(url, Product.class);
//        Product product = response.getBody();
//
//        if (product == null) {
//            throw new ProductNotFoundException("Product not found");
//        }
//
//        // Check if the cart already exists
//        Cart cart = cartRepo.findByCartId(cartId);
//        if (cart == null) {
//            cart = new Cart();
//            cart.setCartId(cartId);
//            cart.setGstId(gstId);
//        }
//
//        // Check if the product already exists in the cart
//        boolean productExists = false;
//        for (Product p : cart.getProducts()) {
//            if (p.getId().equals(productId)) {
//                p.setQuantity(p.getQuantity() + quantity);
//                productExists = true;
//                break;
//            }
//        }
//
//        if (!productExists) {
//            // Add new product to the cart
//            Product newProduct = new Product(productName, product.getPrice(), product.getUnit(), product.getDiscount(), quantity);
//            cart.addProduct(newProduct);
//        }
//
//        // Save the cart with updated products
//        cartRepo.save(cart);
//    }





//    public void addProductToCart(int cartId, String productName, double quantity, Long productId, int gstId) throws ProductNotFoundException, StoreNotFoundException {
//        // Corrected URL for fetching product details
//        String url = STORE_SERVICE_URL + "/getProductByGstAndProductId/" + gstId + "/" + productId;
//        System.out.println(url);
//        ResponseEntity<Product> response = restTemplate.getForEntity(url, Product.class);
//        Product product = response.getBody();
//
//        if (product == null) {
//            throw new ProductNotFoundException("Product not found");
//        }
//
//        // Retrieve or create the cart
//        Cart cart = cartRepo.findByCartId(cartId);
//        if (cart == null) {
//            cart = new Cart();
//            cart.setCartId(cartId);
//            cart.setGstId(gstId); // Set gstId when creating a new cart
//            cartRepo.save(cart); // Save the cart if it's new
//        } else {
//            cart.setGstId(gstId); // Ensure gstId is updated if cart already exists
//        }
//
//        // Update or add the product in the cart
//        boolean productExists = false;
//        for (Product p : cart.getProducts()) {
//            if (p.getId().equals(productId)) {
//                productExists = true;
//                p.setQuantity(p.getQuantity() + quantity); // Update quantity
//                p.setTotalPrice(p.getQuantity() * product.getPrice() * (100 - product.getDiscount()) * 0.01);
//                break;
//            }
//        }
//
//        if (!productExists) {
//            Product newProduct = new Product();
//            newProduct.setId(productId);
//            newProduct.setPname(productName);
//            newProduct.setPrice(product.getPrice());
//            newProduct.setUnit(product.getUnit());
//            newProduct.setDiscount(product.getDiscount());
//            newProduct.setCart(cart);
//            newProduct.setQuantity(quantity); // Set quantity
//            newProduct.setTotalPrice(quantity * product.getPrice() * (100 - product.getDiscount()) * 0.01);
//            
//            cart.getProducts().add(newProduct);
//        }
//
//        cartRepo.save(cart); // Save cart with updated products
//    }
//
    
//    public void addProductToCart(int cartId, String productName, double quantity, Long productId, int gstId) throws ProductNotFoundException, StoreNotFoundException {
//        // Fetch product details from the store service
//        String url = STORE_SERVICE_URL + "/getProductByGstAndProductId/" + gstId + "/" + productId;
//        ResponseEntity<Product> response = restTemplate.getForEntity(url, Product.class);
//        Product product = response.getBody();
//
//        if (product == null) {
//            throw new ProductNotFoundException("Product not found");
//        }
//
//        // Retrieve or create the cart
//        Cart cart = cartRepo.findByCartId(cartId);
//        if (cart == null) {
//            cart = new Cart();
//            cart.setGstId(gstId);
//            cartRepo.save(cart);
//        }
//
//        // Populate all required fields for the Product entity
//        Product newProduct = new Product();
//        newProduct.setPname(productName);
//        newProduct.setPrice(product.getPrice());
//        newProduct.setUnit(product.getUnit());
//        newProduct.setDiscount(product.getDiscount());
//        newProduct.setQuantity(quantity);  // Ensure quantity is set
//        newProduct.setTotalPrice(quantity * product.getPrice() * (100 - product.getDiscount()) * 0.01);
//        newProduct.setCart(cart);
//
//        // Add product to cart
//        cart.addProduct(newProduct);
//
//        // Save the cart with the updated product list
//        cartRepo.save(cart);
//    }


   public void deleteProductFromCart(int cartId, String productName, double quantity) throws ProductNotFoundException {
	    // Find the cart by its ID
	    Cart cart = cartRepo.findById(cartId)
	        .orElseThrow(() -> new ProductNotFoundException("Cart not found"));

	    // Check if the product name matches
	    if (cart.getProductName().equalsIgnoreCase(productName)) {
	        // Reduce the quantity of the product in the cart
	        double newQuantity = cart.getQuantity() - quantity;

	        if (newQuantity <= 0) {
	            // If quantity is zero or less, remove the product from the cart
	            cartRepo.delete(cart);
	        } else {
	            // Otherwise, update the quantity and total price
	            cart.setQuantity(newQuantity);
	            cart.setTotalPrice(newQuantity * (cart.getTotalPrice() / cart.getQuantity())); // Adjust total price based on the remaining quantity
	            cartRepo.save(cart);
	        }
	    } else {
	        throw new ProductNotFoundException("Product not found in the cart");
	    }
	}


    // Other cart related methods
}