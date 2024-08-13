package com.grab.storeservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND,reason="Store Not found")
public class StoreNotFoundException extends Exception{
    public StoreNotFoundException(String msg){
        super(msg);
    }
}