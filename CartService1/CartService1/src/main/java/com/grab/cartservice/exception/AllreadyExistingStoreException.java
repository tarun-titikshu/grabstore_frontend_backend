package com.grab.cartservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.CONFLICT,reason="Store Already exists")
public class AllreadyExistingStoreException extends Exception{
    public AllreadyExistingStoreException(String msg){
        super(msg);
    }
}
