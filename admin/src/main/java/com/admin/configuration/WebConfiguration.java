package com.admin.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer{

	// CORS(cross origin resource sharing)
		// 다른 도메인의 내용을 읽을 수 있게 한다.
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*");
        // addMapping("/**") : 동일 출처 정책의 전역 허용
        // allowedMethods("*") : 모든 DDL 메소드를 허용.
    }
}
