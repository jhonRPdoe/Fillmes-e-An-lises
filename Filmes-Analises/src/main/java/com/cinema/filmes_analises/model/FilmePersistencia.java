
package com.cinema.filmes_analises.model;

import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.stereotype.Repository;

/**
 *
 * @author ruang
 */
@Repository
public interface FilmePersistencia extends JpaRepository<Filme, Integer> {
    
}
