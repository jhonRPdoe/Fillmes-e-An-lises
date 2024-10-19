
package com.cinema.filmes_analises.service;

import com.cinema.filmes_analises.model.Analise;
import com.cinema.filmes_analises.model.AnalisePersistencia;
import com.cinema.filmes_analises.model.Filme;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ruang
 */
@Service 
public class AnaliseService {
    
    @Autowired 
    AnalisePersistencia analisePersistencia; 

    public Analise inserirAnalise(Analise analise) { 
        analise.setId(null); 
        analisePersistencia.save(analise); 
        return analise; 

    } 

    public Analise atualizarAnalise(Integer analiseId, Analise analiseRequest) { 
        Analise analise = getAnaliseId(analiseId); 
        analise.setFilme(analiseRequest.getFilme()); 
        analise.setAnalise(analiseRequest.getAnalise()); 
        analise.setNota(analiseRequest.getNota()); 

        analisePersistencia.save(analise); 
        return analise; 
    } 

    public Analise getAnaliseId(Integer analiseId) { 
        return analisePersistencia.findById(analiseId).orElse(null); 
    } 

    public List<Analise> listarTodasAnalises() { 
        return analisePersistencia.findAll(); 
    } 

    public void deletarAnalise(Integer analiseId) { 
        Analise analise = getAnaliseId(analiseId); 
        analisePersistencia.deleteById(analise.getId()); 
    }
    
    public List<Analise> getAnaliseByFilme(Filme filme) { 
        return analisePersistencia.findByFilme(filme);  
    } 
}
