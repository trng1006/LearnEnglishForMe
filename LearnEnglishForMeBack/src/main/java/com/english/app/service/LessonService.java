package com.english.app.service;

import com.english.app.entity.Exercise;
import com.english.app.entity.TenseLesson;
import com.english.app.entity.Vocabulary;
import com.english.app.repository.ExerciseRepository;
import com.english.app.repository.TenseLessonRepository;
import com.english.app.repository.VocabularyRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final TenseLessonRepository lessonRepository;
    private final VocabularyRepository vocabularyRepository;
    private final ExerciseRepository exerciseRepository;

    @PostConstruct
    public void initData() {
        if (lessonRepository.count() == 0) {
            String phase1 = "GIAI ĐOẠN 1: NỀN TẢNG (Sống sót cơ bản)";
            
            createLesson(phase1, "1. Hiện tại đơn (Tobe) - Định vị bản thân", 1, false, "lesson",
                    "Giới thiệu tên, tuổi, nghề nghiệp, cảm xúc. S + am/is/are",
                    "Cứ thấy 'I' thì dùng 'am'. He/She/It dùng 'is'.");
                    
            createLesson(phase1, "2. Hiện tại đơn (V thường) - Thói quen hàng ngày", 2, true, "lesson",
                    "Việc lặp đi lặp lại, lịch trình. S + V(s/es)",
                    "Ngôi thứ 3 số ít (He, She, It) thì động từ phải thêm s/es nhé.");
                    
            createLesson(phase1, "3. Hiện tại tiếp diễn - Ngay lúc này", 3, true, "lesson",
                    "Chuyện đang diễn ra ngay trước mắt. S + am/is/are + V-ing",
                    "Có chữ 'now', 'Look!' thì auto V-ing.");
                    
            createLesson(phase1, "⚔️ ÔN TẬP 1: Hiện tại Đơn vs Tiếp Diễn", 4, true, "checkpoint",
                    "Phân biệt thói quen và sự việc đang diễn ra.",
                    "Chú ý các từ chỉ thời gian: always (đơn) vs now (tiếp diễn).");
            
            createLesson(phase1, "4. Quá khứ đơn (Quy tắc) - Chuyện hôm qua", 5, true, "lesson",
                    "Kể chuyện đã qua, đã xong hẳn. S + V-ed",
                    "Thấy yesterday, last week thì auto thêm -ed.");
                    
            createLesson(phase1, "5. Quá khứ đơn (Bất quy tắc) - Nỗi ám ảnh V2", 6, true, "lesson",
                    "Động từ không theo quy tắc thêm -ed.",
                    "Học thuộc bảng động từ bất quy tắc thôi fen ơi!");
                    
            createLesson(phase1, "6. Tương lai đơn & Tương lai gần", 7, true, "lesson",
                    "Phân biệt Will (Bộc phát) vs Going to (Có kế hoạch).",
                    "Đã lên lịch trình sẵn thì dùng going to.");
                    
            String phase2 = "GIAI ĐOẠN 2: GIAO TIẾP TỰ NHIÊN (Nâng trình chém gió)";
            createLesson(phase2, "7. Hiện tại hoàn thành - Trải nghiệm đời tôi", 8, true, "lesson",
                    "Kể về trải nghiệm hoặc việc kéo dài đến nay. S + have/has + V3/ed",
                    "Dấu hiệu: just, already, ever, never, since, for.");
                    
            createLesson(phase2, "⚔️ ÔN TẬP 2: Quá khứ Đơn vs Hiện tại Hoàn Thành", 9, true, "checkpoint",
                    "Phân biệt hành động đã kết thúc (QKĐ) và còn liên quan tới hiện tại (HTHT).",
                    "Có thời gian cụ thể (in 1990) -> QKĐ. Không rõ thời gian -> HTHT.");

            // Add sample vocab and exercises for Lesson 1 (ID 1)
            Vocabulary vocab = new Vocabulary();
            vocab.setLessonId(1L);
            vocab.setWord("Doctor");
            vocab.setWordType("Noun");
            vocab.setPhonetic("/ˈdɒk.tər/");
            vocab.setMeaning("Bác sĩ");
            vocab.setExample("I am a doctor.");
            vocabularyRepository.save(vocab);

            Exercise ex1 = new Exercise();
            ex1.setLessonId(1L);
            ex1.setDifficultyLevel(1);
            ex1.setQuestion("I ____ a doctor.");
            ex1.setOptions("[\"am\", \"is\", \"are\", \"be\"]");
            ex1.setCorrectAnswer("am");
            exerciseRepository.save(ex1);
        }
    }
    
    private void createLesson(String phase, String name, int order, boolean locked, String type, String rule, String tip) {
        TenseLesson lesson = new TenseLesson();
        lesson.setPhase(phase);
        lesson.setName(name);
        lesson.setLevelOrder(order);
        lesson.setLocked(locked);
        lesson.setNodeType(type);
        lesson.setRuleExplanation(rule);
        lesson.setTip(tip);
        lessonRepository.save(lesson);
    }

    public List<TenseLesson> getAllLessons() {
        return lessonRepository.findAllByOrderByLevelOrderAsc();
    }

    public List<Vocabulary> getVocabulariesByLesson(Long lessonId) {
        return vocabularyRepository.findByLessonId(lessonId);
    }

    public List<Exercise> getExercisesByLesson(Long lessonId) {
        return exerciseRepository.findByLessonId(lessonId);
    }

    public TenseLesson getLessonRuleAndTip(Long lessonId) {
        return lessonRepository.findById(lessonId).orElse(null);
    }
}
