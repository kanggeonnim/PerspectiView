//package com.example.backend.infra.config;
//
//import com.example.backend.infra.redis.RedisProperties;
//import com.example.backend.modules.product.Product;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import io.lettuce.core.ReadFrom;
//import lombok.RequiredArgsConstructor;
//import org.springframework.cache.CacheManager;
//import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.redis.cache.RedisCacheConfiguration;
//import org.springframework.data.redis.cache.RedisCacheManager;
//import org.springframework.data.redis.connection.RedisConnectionFactory;
//import org.springframework.data.redis.connection.RedisSentinelConfiguration;
//import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
//import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
//import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
//import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
//import org.springframework.data.redis.serializer.RedisSerializationContext;
//import org.springframework.data.redis.serializer.StringRedisSerializer;
//
//import java.time.Duration;
//
//@Configuration
//@EnableCaching
//@EnableRedisRepositories
//@RequiredArgsConstructor
//public class RedisConfiguration {
//
//    private final ObjectMapper objectMapper;
//    private final RedisProperties redisProperties;
//    private final SentinelProperties redisSentinelProperties; // 1
//
//    @Bean
//    public RedisConnectionFactory redisConnectionFactory(RedisSentinelConfiguration redisSentinelConfiguration, LettuceClientConfiguration lettuceClientConfiguration) {
//        return new LettuceConnectionFactory(redisSentinelConfiguration, lettuceClientConfiguration);
//    }
//
//    @Bean
//    public RedisSentinelConfiguration redisSentinelConfiguration() {
//        return new RedisSentinelConfiguration(redisSentinelProperties.getMaster(), redisSentinelProperties.getNodes());
//    }
//
//    @Bean
//    public LettuceClientConfiguration lettuceClientConfiguration() {
//        return LettuceClientConfiguration.builder()
//                .readFrom(ReadFrom.REPLICA_PREFERRED) // 2
//                .commandTimeout(Duration.ofSeconds(redisProperties.getTimeout()))
//                .build();
//    }
//
//    @Bean
//    public CacheManager cacheManager(RedisConnectionFactory cf) {
//
//        RedisCacheConfiguration productConfig = RedisCacheConfiguration.defaultCacheConfig()
//                .prefixCacheNameWith(RedisProperties.ENVIRONMENT + "_") // prefix
//                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
//                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new Jackson2JsonRedisSerializer<>(Product.class)));
//
//        RedisCacheConfiguration userConfig = RedisCacheConfiguration.defaultCacheConfig()
//                .prefixCacheNameWith(RedisProperties.ENVIRONMENT + "_") // prefix
//                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
//                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new Jackson2JsonRedisSerializer<>(User.class)));
//
//        return RedisCacheManager.RedisCacheManagerBuilder
//                .fromConnectionFactory(cf)
//                .withCacheConfiguration("Product", productConfig) // 3
//                .withCacheConfiguration("User", userConfig)
//                .build();
//    }
//
//    @Bean
//    public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
//        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
//        redisTemplate.setConnectionFactory(redisConnectionFactory);
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer(objectMapper));
//        return redisTemplate; // 4
//    }
//}