
package com.cinema.filmes_analises.model;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ruang
 */
@Repository
public interface AnalisePersistencia extends JpaRepository<Analise, Integer> {
    
    List<Analise> findByFilme(Filme filme);
}
