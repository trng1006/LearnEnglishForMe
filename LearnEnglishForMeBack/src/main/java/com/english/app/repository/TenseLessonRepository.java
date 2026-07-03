package com.english.app.repository;

import com.english.app.entity.TenseLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TenseLessonRepository extends JpaRepository<TenseLesson, Long> {
    List<TenseLesson> findAllByOrderByLevelOrderAsc();
}
