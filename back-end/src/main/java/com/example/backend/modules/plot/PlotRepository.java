package com.example.backend.modules.plot;

import com.example.backend.modules.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlotRepository extends JpaRepository<Plot, Long> {
    Plot findByProduct(Product product);
}
