package com.grab.cartservice.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.grab.cartservice.exception.ProductNotFoundException;
import com.grab.cartservice.exception.StoreNotFoundException;
import com.grab.cartservice.model.Cart;
import com.grab.cartservice.model.Product;
import com.grab.cartservice.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // New method to get cart details
    @GetMapping("/details/{cartId}")
    public ResponseEntity<Cart> getCartDetails(@PathVariable int cartId) {
        try {
            Cart cart = cartService.getCartDetails(cartId);
            return ResponseEntity.ok(cart);
        } catch (ProductNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // New method to get product details
    @GetMapping("/product/{productId}/{gstId}")
    public ResponseEntity<Product> getProductDetails(@PathVariable Long productId, @PathVariable int gstId) {
        try {
            Product product = cartService.getProductDetails(productId, gstId);
            return ResponseEntity.ok(product);
        } catch (ProductNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
//    @PostMapping("/add/{cartId}/{productId}/{productName}/{quantity}/{gstId}")
//    public ResponseEntity<?> addProductToCart(
//        @PathVariable int cartId, 
//        @PathVariable Long productId, 
//        @PathVariable String productName, 
//        @PathVariable double quantity,
//        @PathVariable int gstId) {
//
//        try {
//            cartService.addProductToCart(cartId, productName, quantity, productId, gstId);
//            return new ResponseEntity<>("Product added to cart", HttpStatus.OK);
//        } catch (ProductNotFoundException | StoreNotFoundException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//        } catch (Exception e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
    
    @PostMapping("/add/{cartId}/{productId}/{productName}/{quantity}/{gstId}")
    public ResponseEntity<?> addProductToCart(
        @PathVariable int cartId, 
        @PathVariable Long productId, 
        @PathVariable String productName, 
        @PathVariable double quantity,
        @PathVariable int gstId) {

        try {
            cartService.addProductToCart(cartId, productName, quantity, productId, gstId);
            return new ResponseEntity<>("Product added to cart", HttpStatus.OK);
        } catch (ProductNotFoundException | StoreNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/delete/{cartId}/{productName}/{quantity}")
    public ResponseEntity<String> deleteProductFromCart(
        @PathVariable int cartId, 
        @PathVariable String productName, 
        @PathVariable double quantity) {

        try {
            // Attempt to delete the product from the cart
            cartService.deleteProductFromCart(cartId, productName, quantity);
            // Return a success message if the product was removed
            return ResponseEntity.ok("Product removed from cart successfully");
        } catch (ProductNotFoundException e) {
            // If the product was not found in the cart, return a 404 error with a custom message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // For any other errors, return a 500 error with the exception message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while removing the product: " + e.getMessage());
        }
    }

}
