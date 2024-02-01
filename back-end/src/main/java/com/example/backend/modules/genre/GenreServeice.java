package com.example.backend.modules.genre;

import com.example.backend.modules.account.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class GenreServeice {
    private final GenreRepository genreRepository;

    public Genre createGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public List<Genre> getGenres() {
        return genreRepository.findAll();
    }

    public Optional<Genre> getGenre(Long id) {
        return genreRepository.findById(id);
    }

    public Genre updateGenre(Long genreId, Genre genre) {
        Genre findGenre = genreRepository.findById(genreId).orElseThrow(() -> new RuntimeException());

        findGenre.changeGenreName(genre.getGenreName());
        return findGenre;
    }

    public void deleteGenre(Long genreId) {
        Genre findGenre = genreRepository.findById(genreId).orElseThrow(() -> new RuntimeException());

        genreRepository.delete(findGenre);
    }

}