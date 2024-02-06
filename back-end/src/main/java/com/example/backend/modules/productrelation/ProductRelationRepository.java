package com.example.backend.modules.productrelation;

import com.example.backend.modules.product.Product;
import org.hibernate.boot.model.source.spi.AttributePath;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRelationRepository extends JpaRepository<ProductRelation, Long> {

    @EntityGraph(attributePaths = "product")
    List<ProductRelation> findAllByProduct(Product product);
}
