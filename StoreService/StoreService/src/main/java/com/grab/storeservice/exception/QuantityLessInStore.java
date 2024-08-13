package com.grab.storeservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.CONFLICT,reason="The quantity of product requested exceeds quantity available in store")
public class QuantityLessInStore extends Exception{
    public QuantityLessInStore(String msg){
        super(msg);
    }
}
