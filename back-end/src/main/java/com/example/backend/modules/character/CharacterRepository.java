package com.example.backend.modules.character;

import com.example.backend.modules.product.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Long> {

    @EntityGraph(attributePaths = "product")
    List<Character> findAllByProduct(Product product);
}
