
package com.cinema.filmes_analises.controller;

import com.cinema.filmes_analises.model.Analise;
import com.cinema.filmes_analises.model.Filme;
import com.cinema.filmes_analises.service.AnaliseService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ruang
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("analises")
public class AnaliseControllerRest {
    
    @Autowired 
    AnaliseService analiseService;
    
    @GetMapping("/listar")
    public ResponseEntity<List> getAllAnalises() {
        List<Analise> analises = analiseService.listarTodasAnalises(); 
        return new ResponseEntity<>(analises, HttpStatus.OK); 
    }
    
    @GetMapping("/pesquisar/{id}") 
    public ResponseEntity<Analise> getAnaliseById(@PathVariable Integer id) { 
        Analise analise = analiseService.getAnaliseId(id); 
        return new ResponseEntity<>(analise, HttpStatus.OK); 
    }
    
    @PostMapping("/adicionar")
    public ResponseEntity<Analise> addAnalise(@RequestBody Analise analise) {
        var novaAnalise = analiseService.inserirAnalise(analise); 
        return new ResponseEntity<>(novaAnalise, HttpStatus.CREATED); 
    }
    
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Analise> atualizarAnalise(@PathVariable int id, @RequestBody Analise analise) {
        var analiseAtualizada = analiseService.atualizarAnalise(id, analise); 
        return new ResponseEntity<>(analiseAtualizada, HttpStatus.OK);  
    }
    
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity deletarAnalise(@PathVariable int id) {
        analiseService.deletarAnalise(id); 
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("/pesquisar-idFilme/{idFilme}") 
    public ResponseEntity<List> getAllAnalisesByFilme(@PathVariable int idFilme) { 
        Filme filme = new Filme();
        filme.setId(idFilme);
        List<Analise> analises = analiseService.getAnaliseByFilme(filme); 
        return new ResponseEntity<>(analises, HttpStatus.OK); 
    }
}
