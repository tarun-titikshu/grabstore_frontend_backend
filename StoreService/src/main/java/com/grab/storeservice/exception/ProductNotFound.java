package com.grab.storeservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND,reason="Product does not exist")
public class ProductNotFound extends Exception{
    public ProductNotFound(String msg){
        super(msg);
    }
}
