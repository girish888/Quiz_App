package com.quiz.app.controller;

import com.quiz.app.model.Question;
import com.quiz.app.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin("*")
public class QuizController {

    private final QuizService service;

    public QuizController(QuizService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question q) {
        return service.addQuestion(q);
    }

    @GetMapping("/all")
    public List<Question> getQuestions() {
        return service.getAllQuestions();
    }
}
