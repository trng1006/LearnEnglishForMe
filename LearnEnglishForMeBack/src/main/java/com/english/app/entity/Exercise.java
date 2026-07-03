package com.english.app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long lessonId;
    private int difficultyLevel; // 1: Nhận diện, 2: Thực hành, 3: Thực chiến

    @Column(columnDefinition = "TEXT")
    private String question;

    // JSON array of options for multiple choice
    @Column(columnDefinition = "JSON")
    private String options;

    private String correctAnswer;
}
