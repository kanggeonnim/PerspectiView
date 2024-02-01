package com.example.backend.modules.product;

import com.example.backend.modules.genre.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductGenreRepository extends JpaRepository<ProductGenre,Long> {
    List<Genre> findByProduct(Product product);
}
