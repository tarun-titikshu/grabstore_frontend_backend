package com.grab.cartservice.service;

import com.grab.cartservice.exception.ProductNotFoundException;
import com.grab.cartservice.exception.StoreNotFoundException;

public interface IService {
	public void addProductToCart(int cartId, String productName, double quantity, Long productId, int gstId) throws ProductNotFoundException, StoreNotFoundException ;
}
