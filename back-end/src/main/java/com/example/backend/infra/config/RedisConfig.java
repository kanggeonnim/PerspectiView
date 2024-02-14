//package com.example.backend.infra.config;
//
//import jakarta.persistence.EntityManagerFactory;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.redis.connection.RedisConnectionFactory;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
//import org.springframework.data.redis.serializer.StringRedisSerializer;
//import org.springframework.orm.jpa.JpaTransactionManager;
//import org.springframework.transaction.PlatformTransactionManager;
//
//import java.sql.SQLException;
//
//@Configuration
//@RequiredArgsConstructor
//public class RedisConfig {
//
//  @Bean
//  public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory){
//    GenericJackson2JsonRedisSerializer genericJackson2JsonRedisSerializer = new GenericJackson2JsonRedisSerializer();
//    // Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(ItemDto.class);
//    RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
//    redisTemplate.setConnectionFactory(redisConnectionFactory);
//    redisTemplate.setKeySerializer(new StringRedisSerializer());
//    // redisTemplate.setValueSerializer(new StringRedisSerializer());
//    // redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
//    redisTemplate.setValueSerializer(genericJackson2JsonRedisSerializer);
//    return redisTemplate;
//  }
//
//  @Bean // 만약 PlatformTransactionManager 등록이 안되어 있다면 해야함, 되어있다면 할 필요 없음
//  public PlatformTransactionManager transactionManager() throws SQLException {
//    // JPA 사용하고 있다면 아래처럼 사용하고 있음
//    return new JpaTransactionManager();
//  }
//}