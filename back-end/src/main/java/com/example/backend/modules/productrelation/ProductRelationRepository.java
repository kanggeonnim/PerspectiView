package com.example.backend.modules.productrelation;

import com.example.backend.modules.product.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRelationRepository extends JpaRepository<ProductRelation, Long> {

    @EntityGraph(attributePaths = {"product","fromCharacter","toCharacter"})
    List<ProductRelation> findAllByProduct(Product product);

    @EntityGraph(attributePaths = {"fromCharacter","toCharacter"})
    Optional<ProductRelation> findById(Long id);
}
