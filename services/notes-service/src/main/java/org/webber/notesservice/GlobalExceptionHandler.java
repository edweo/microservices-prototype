package org.webber.notesservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({InternalError.class, Exception.class})
    public ResponseEntity<String> handleServerException(Exception ex) {
        return new ResponseEntity<>("Error on the server side", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
