package com.english.app.controller;

import com.english.app.entity.Exercise;
import com.english.app.entity.TenseLesson;
import com.english.app.entity.Vocabulary;
import com.english.app.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LessonController {

    private final LessonService lessonService;

    // Lấy toàn bộ lộ trình (Roadmap)
    @GetMapping("/roadmap")
    public ResponseEntity<List<TenseLesson>> getRoadmap() {
        return ResponseEntity.ok(lessonService.getAllLessons());
    }

    // Lấy danh sách từ vựng của 1 bài học
    @GetMapping("/{lessonId}/vocabulary")
    public ResponseEntity<List<Vocabulary>> getVocabulary(@PathVariable Long lessonId) {
        return ResponseEntity.ok(lessonService.getVocabulariesByLesson(lessonId));
    }

    // Lấy bài tập của 1 bài học
    @GetMapping("/{lessonId}/exercises")
    public ResponseEntity<List<Exercise>> getExercises(@PathVariable Long lessonId) {
        return ResponseEntity.ok(lessonService.getExercisesByLesson(lessonId));
    }

    // Lấy giải thích Quy tắc và Mẹo của bài học
    @GetMapping("/{lessonId}/tips")
    public ResponseEntity<TenseLesson> getLessonTips(@PathVariable Long lessonId) {
        return ResponseEntity.ok(lessonService.getLessonRuleAndTip(lessonId));
    }
}
