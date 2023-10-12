package com.example.filedrop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class FiledropApplication {

	public static void main(String[] args) {
		SpringApplication.run(FiledropApplication.class, args);
	}

}
