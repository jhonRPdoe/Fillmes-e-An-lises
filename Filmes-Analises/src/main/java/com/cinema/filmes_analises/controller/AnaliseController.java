
package com.cinema.filmes_analises.controller;

import com.cinema.filmes_analises.model.Analise;
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
public class AnaliseController {
    
    private List<Analise> analises = new ArrayList();
    private List<Filme> filmes;
    
    @GetMapping("/analise") 
    public String exibirFilme(HttpSession session, Model model) { 
        Analise analise = new Analise(); 
        model.addAttribute("analise", analise);
        model.addAttribute("analises", analises);
        
        filmes = (List<Filme>) session.getAttribute("filmes");
        model.addAttribute("filmes", filmes);
        
        return "analise"; 
    }
    
    @PostMapping("/analise") 
    public String processarFormulario(@ModelAttribute Analise analise, Model model) { 
        for (Filme filmeLista : filmes) {
            if (filmeLista.getId() == analise.getFilme().getId()) {
                analise.setFilme(filmeLista);
                break;
            }
        }
        analise.setId(analises.size() + 1);
        analises.add(analise); 
        model.addAttribute("analises", analises); 
        model.addAttribute("filmes", filmes);

        return "analise"; 
    } 
}
