package org.webber.apigateway;

import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Bean
    public WebProperties.Resources webProperties() {
        return new WebProperties.Resources();
    }
}
