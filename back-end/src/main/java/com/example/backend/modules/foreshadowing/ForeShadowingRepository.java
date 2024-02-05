package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ForeShadowingRepository extends JpaRepository<ForeShadowing, Long> {
    List<ForeShadowing> findByProduct(Product product);
}

