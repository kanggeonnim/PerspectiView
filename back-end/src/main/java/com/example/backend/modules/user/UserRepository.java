package com.example.backend.modules.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * @author cos
 * JPA는 기본 CRUD를 JpaRepository가 상속하는 CrudRepository가 가지고 있음.
 * JPA는 method names 전략을 가짐. README.md 사진 참고
 */

// JpaRepository 를 상속하면 자동 컴포넌트 스캔됨.
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // SELECT * FROM user WHERE username = ?1
    @EntityGraph(attributePaths = "authorities")
    Optional<User> findWithAuthoritiesByUsername(String username);

    Optional<User> findByUsername(String username);

    // SELECT * FROM user WHERE provider = ?1 and providerId = ?2
    Optional<User> findByProviderAndProviderId(String provider, String providerId);
}


