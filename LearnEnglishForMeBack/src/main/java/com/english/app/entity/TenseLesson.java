package com.english.app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TenseLesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phase; // e.g., "GIAI ĐOẠN 1: NỀN TẢNG"
    private String name;
    private int levelOrder;
    private boolean isLocked;

    @Column(columnDefinition = "TEXT")
    private String ruleExplanation;

    @Column(columnDefinition = "TEXT")
    private String tip;
    
    private String nodeType; // "lesson" or "checkpoint"
}
