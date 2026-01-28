package com.quiz.app.service;

import com.quiz.app.model.Question;
import com.quiz.app.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    private final QuestionRepository repo;

    public QuizService(QuestionRepository repo) {
        this.repo = repo;
    }

    public Question addQuestion(Question q) {
        return repo.save(q);
    }

    public List<Question> getAllQuestions() {
        return repo.findAll();
    }
}
