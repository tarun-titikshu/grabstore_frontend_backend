package com.grab.storeservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.CONFLICT,reason="Product Already exists")
public class ProductAlreadyExists extends Exception{
    public ProductAlreadyExists(String msg){
        super(msg);
    }
}
