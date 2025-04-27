package org.webber.apigateway;

import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.boot.autoconfigure.web.reactive.error.AbstractErrorWebExceptionHandler;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.reactive.error.ErrorAttributes;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;
import java.util.Map;

@Component
public class GlobalExceptionHandler extends AbstractErrorWebExceptionHandler {

    public GlobalExceptionHandler(ErrorAttributes errorAttributes,
                                  WebProperties.Resources resources,
                                  ApplicationContext applicationContext,
                                  ServerCodecConfigurer serverCodecConfigurer) {
        super(errorAttributes, resources, applicationContext);
        super.setMessageWriters(serverCodecConfigurer.getWriters());
        super.setMessageReaders(serverCodecConfigurer.getReaders());
    }

    @Override
    protected RouterFunction<ServerResponse> getRoutingFunction(ErrorAttributes errorAttributes) {
        return RouterFunctions.route(RequestPredicates.all(), this::renderErrorResponse);
    }

    private Mono<ServerResponse> renderErrorResponse(ServerRequest request) {
        ErrorAttributeOptions options = ErrorAttributeOptions.of(ErrorAttributeOptions.Include.MESSAGE);
        Map<String, Object> errorPropertiesMap = getErrorAttributes(request, options);
        Throwable throwable = getError(request);
        HttpStatusCode httpStatus = determineHttpStatus(throwable);

        errorPropertiesMap.put("status", httpStatus.value());
        errorPropertiesMap.remove("error");

        return ServerResponse.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
//                .body(BodyInserters.fromObject(errorPropertiesMap));
                .body(BodyInserters.fromObject("Internal server error"));
    }

    private HttpStatusCode determineHttpStatus(Throwable throwable) {
//        if (throwable instanceof ResponseStatusException) {
//            return ((ResponseStatusException) throwable).getStatusCode();
//        } else if (throwable instanceof CustomRequestAuthException) {
//            return HttpStatus.UNAUTHORIZED;
//        } else if (throwable instanceof RateLimitRequestException) {
//            return HttpStatus.TOO_MANY_REQUESTS;
//        } else {
//            return HttpStatus.INTERNAL_SERVER_ERROR;
//        }

        if (throwable instanceof ResponseStatusException) {
            return ((ResponseStatusException) throwable).getStatusCode();
        } else {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
