package com.example.backend.modules.genre;

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

    /**
     * 장르 생성
     *
     * @param genre
     * @return
     */
    public Genre createGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    /**
     * 전체 장르 조회
     *
     * @return
     */
    public List<Genre> getGenres() {
        return genreRepository.findAll();
    }

    /**
     * 단일 장르 조회
     *
     * @param id 조회할 장르의 아이디
     * @return
     */
    public Optional<Genre> getGenre(Long id) {
        return genreRepository.findById(id);
    }


    /**
     * 장르명 업데이트
     *
     * @param genreId
     * @param genre
     * @return
     */
    public Genre updateGenre(Long genreId, Genre genre) {
        Genre findGenre = genreRepository.findById(genreId).orElseThrow(() -> new RuntimeException());

        findGenre.changeGenreName(genre.getGenreName());
        return findGenre;
    }

    /**
     * 장르 삭제
     *
     * @param genreId 삭제할 장르의 아이디
     */
    public void deleteGenre(Long genreId) {
        Genre findGenre = genreRepository.findById(genreId).orElseThrow(() -> new RuntimeException());

        genreRepository.delete(findGenre);
    }

}