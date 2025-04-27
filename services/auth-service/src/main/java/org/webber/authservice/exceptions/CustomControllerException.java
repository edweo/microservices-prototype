package org.webber.authservice.exceptions;

import org.springframework.http.HttpStatus;

public class CustomControllerException extends RuntimeException {

    private final String error;
    private final HttpStatus status;

    public CustomControllerException(HttpStatus status, String error) {
        this.error = error;
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
