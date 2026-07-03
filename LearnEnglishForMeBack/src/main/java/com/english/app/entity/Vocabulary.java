package com.english.app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Vocabulary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long lessonId;
    private String word;
    private String wordType; // Noun, Verb, Adj
    private String phonetic;
    private String meaning;

    @Column(columnDefinition = "TEXT")
    private String example;
}
