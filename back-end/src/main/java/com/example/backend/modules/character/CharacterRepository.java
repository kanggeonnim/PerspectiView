package com.example.backend.modules.character;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Long> {

    @EntityGraph(attributePaths = "productId")
    List<Character> findAllByProductId(Long productId);
}
