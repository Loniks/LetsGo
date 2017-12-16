package com.loniks.letsgo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

@SpringBootApplication
public class LetsGoApplication {

	public static void main(String[] args) {
		SpringApplication.run(LetsGoApplication.class, args);
	}

	@Bean
	public MappingJackson2HttpMessageConverter primaryMessageConverter(){

		MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
		converter.setObjectMapper(getObjectMapper());
		return converter;
	}

	@Bean
	public ObjectMapper getObjectMapper(){
		ObjectMapper objectMapper = new ObjectMapper();
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		objectMapper.setDateFormat(df);
		return objectMapper;
	}


}
