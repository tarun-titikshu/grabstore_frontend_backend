package com.grab.cartservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grab.cartservice.model.Cart;

public interface CartRepo extends JpaRepository<Cart, Integer> {
    // Additional query methods if needed
	Cart findByCartId(int cartId);
}