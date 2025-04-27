package org.webber.authservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.webber.authservice.exceptions.CustomControllerException;
import org.webber.authservice.exceptions.GeneralServerException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({GeneralServerException.class})
    public ResponseEntity<String> handleServerException(GeneralServerException ex, WebRequest request) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
    }

    @ExceptionHandler({CustomControllerException.class})
    public ResponseEntity<String> handleServerException(CustomControllerException ex, WebRequest request) {
        return ResponseEntity.status(ex.getStatus()).body(ex.getError());
    }
}
