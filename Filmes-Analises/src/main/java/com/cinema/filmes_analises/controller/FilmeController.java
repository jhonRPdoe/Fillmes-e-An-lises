
package com.cinema.filmes_analises.controller;

import com.cinema.filmes_analises.model.Filme;
import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

/**
 *
 * @author ruang
 */
@Controller
public class FilmeController {
    
    private List<Filme> filmes = new ArrayList(); 
    
    @GetMapping("/filme") 
    public String exibirFilme(Model model) { 
        Filme filme = new Filme(); 
        model.addAttribute("filme", filme);
        model.addAttribute("filmes", filmes);

        return "filme"; 
    }
    
    @PostMapping("/filme") 
    public String processarFormulario(@ModelAttribute Filme filme, Model model) {
        filme.setId(filmes.size() + 1);
        filmes.add(filme);
        model.addAttribute("filmes", filmes);

        return "filme"; 
    }
    
    @GetMapping("/saveAndRedirect")
    public String saveAndRedirect(HttpSession session) {
        session.setAttribute("filmes", filmes);
        return "redirect:/analise";
    }
}
