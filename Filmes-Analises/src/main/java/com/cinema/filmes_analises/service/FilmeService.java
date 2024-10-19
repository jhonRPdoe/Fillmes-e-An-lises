
package com.cinema.filmes_analises.service;

import com.cinema.filmes_analises.model.Filme;
import com.cinema.filmes_analises.model.FilmePersistencia;
import java.util.List; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

@Service 
public class FilmeService { 

    @Autowired 
    FilmePersistencia filmePersistencia; 

    public Filme inserirFilme(Filme filme) { 
        filme.setId(null); 
        filmePersistencia.save(filme); 
        return filme; 

    } 

    public Filme atualizarFilme(Integer filmeId, Filme filmeRequest) { 
        Filme filme = getFilmeId(filmeId); 
        filme.setTitulo(filmeRequest.getTitulo()); 
        filme.setGenero(filmeRequest.getGenero()); 
        filme.setAnoLancamento(filmeRequest.getAnoLancamento()); 
        filme.setSinopse(filmeRequest.getSinopse());  

        filmePersistencia.save(filme); 
        return filme;
    } 

    public Filme getFilmeId(Integer filmeId) { 
        return filmePersistencia.findById(filmeId).orElse(null); 
    } 

    public List<Filme> listarTodosFilmes() { 
        return filmePersistencia.findAll(); 
    } 

    public void deletarFilme(Integer filmeId) { 
        Filme filme = getFilmeId(filmeId); 
        filmePersistencia.deleteById(filme.getId()); 
    } 
} 
