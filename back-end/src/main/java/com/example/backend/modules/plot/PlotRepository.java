package com.example.backend.modules.plot;

import com.example.backend.modules.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlotRepository extends JpaRepository<Plot, Long> {
    List<Plot> findByProduct(Product product);
}
