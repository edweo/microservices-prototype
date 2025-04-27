package org.webber.apigateway;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AddJWTFilter implements GlobalFilter, Ordered {

    @Value("${services.auth-service}")
    private String authService;

    private final RestTemplate restTemplate;

    public AddJWTFilter(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private String getJWT(String cookie) {
        // Create headers and add the session cookie
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cookie", cookie);
        // Create an HttpEntity with the headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        String url = authService + "/token";
        ResponseEntity<String> token = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return token.getBody();
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String bearer;
        try {
            String token = getJWT(exchange.getRequest().getHeaders().get("Cookie").getFirst());
            bearer = "Bearer " + token;
        } catch (Exception e) {
            return chain.filter(exchange);
        }

        ServerHttpRequest request = exchange.getRequest();

        ServerHttpRequest modifiedRequest = request.mutate()
                .header("Authorization", bearer)
                .build();

        ServerWebExchange modifiedExchange = exchange.mutate()
                .request(modifiedRequest)
                .build();

        return chain.filter(modifiedExchange);
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
