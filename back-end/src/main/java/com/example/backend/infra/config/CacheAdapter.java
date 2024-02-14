//package com.example.backend.infra.config;
//
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.core.ValueOperations;
//import org.springframework.stereotype.Component;
//
//import java.time.Duration;
//
//@Component
//public class CacheAdapter {
//  private final RedisTemplate<String, Object> redisTemplate;
//  private final ValueOperations<String, Object> operations;
//
//  public CacheAdapter(RedisTemplate<String, Object> hotelCacheRedisTemplate) {
//    this.redisTemplate = hotelCacheRedisTemplate;
//    // CacheAdapter 클래스는 레디스의 key-value 자료 구조를 사용하므로 RedisTemplate 의 opsForValue() 를 사용하여 ValueOperations 객체 생성
//    // ValueOperations 객체는 key-value 자료 구조에서 사용할 수 있는 get(), set(), delete() 와 같은 메서드들을 제공함
//    this.operations = hotelCacheRedisTemplate.opsForValue();
//  }
//
//  public void put(String key, Object value) {
//    // 유효 기간은 15분으로 설정                       초  * 분  *  시
//    operations.set(key, value, Duration.ofSeconds(60 * 15 * 1));
//  }
//
//  public Object get(String key) {
//    return operations.get(key);
//  }
//
//  public void delete(String key) {
//    redisTemplate.delete(key);
//  }
//}