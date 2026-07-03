import { useState, useEffect } from 'react';
import './index.css';
import './flashcard.css';

const DOCS_DATA = [
  {
    name: "Hiện tại đơn (Tobe)",
    usage: "Diễn tả trạng thái, tính chất, nghề nghiệp ở hiện tại.",
    signals: "always, usually, often, everyday",
    formula: "Khẳng định: S + am/is/are + N/Adj\nPhủ định: S + am/is/are + not + N/Adj\nNghi vấn: Am/Is/Are + S + N/Adj?",
    example: "She is a good doctor. / Are you tired?"
  },
  {
    name: "Hiện tại đơn (V thường)",
    usage: "Thói quen, sự thật hiển nhiên, lịch trình cố định.",
    signals: "always, usually, often, everyday, once a week",
    formula: "Khẳng định: S + V(s/es)\nPhủ định: S + don't/doesn't + V\nNghi vấn: Do/Does + S + V?",
    example: "He plays football everyday. / I don't like fish."
  },
  {
    name: "Hiện tại tiếp diễn",
    usage: "Hành động đang xảy ra ngay tại thời điểm nói hoặc xung quanh thời điểm nói.",
    signals: "now, right now, at the moment, Look!, Listen!",
    formula: "Khẳng định: S + am/is/are + V-ing\nPhủ định: S + am/is/are + not + V-ing",
    example: "They are playing video games now."
  },
  {
    name: "Hiện tại hoàn thành",
    usage: "Hành động bắt đầu trong quá khứ kéo dài đến hiện tại (hoặc kết quả ở HT).",
    signals: "just, already, yet, since, for, recently",
    formula: "Khẳng định: S + have/has + V3/ed\nPhủ định: S + haven't/hasn't + V3/ed",
    example: "I have lived here for 5 years."
  },
  {
    name: "Hiện tại HT Tiếp diễn",
    usage: "Nhấn mạnh quá trình liên tục của hành động kéo dài từ QK đến HT.",
    signals: "all day, all week, since, for",
    formula: "S + have/has been + V-ing",
    example: "I have been studying for 3 hours."
  },
  {
    name: "Quá khứ đơn",
    usage: "Hành động đã xảy ra và kết thúc hoàn toàn trong quá khứ.",
    signals: "yesterday, last (week, month), ago, in 1990",
    formula: "Khẳng định: S + V-ed/V2\nPhủ định: S + didn't + V\nNghi vấn: Did + S + V?",
    example: "I went to the cinema last night."
  },
  {
    name: "Quá khứ tiếp diễn",
    usage: "Hành động đang xảy ra tại 1 thời điểm xác định trong quá khứ.",
    signals: "at 8 PM yesterday, when, while",
    formula: "S + was/were + V-ing",
    example: "I was watching TV when she called."
  },
  {
    name: "Quá khứ hoàn thành",
    usage: "Hành động xảy ra và hoàn thành trước 1 hành động khác trong quá khứ.",
    signals: "before, after, by the time",
    formula: "S + had + V3/ed",
    example: "She had left before I arrived."
  },
  {
    name: "Quá khứ HT Tiếp diễn",
    usage: "Nhấn mạnh tính liên tục của hành động trước 1 mốc QK khác.",
    signals: "for X hours before...",
    formula: "S + had been + V-ing",
    example: "They had been waiting for 2 hours before the boss arrived."
  },
  {
    name: "Tương lai đơn & Gần",
    usage: "TL Đơn: Quyết định tức thời. TL Gần: Kế hoạch có dự định từ trước.",
    signals: "tomorrow, next (week, month), in + thời gian",
    formula: "Khẳng định: S + will + V | S + am/is/are + going to + V\nPhủ định: S + won't + V",
    example: "I will call you later. / I am going to buy a car."
  },
  {
    name: "Tương lai tiếp diễn",
    usage: "Hành động sẽ đang diễn ra tại 1 thời điểm cụ thể trong tương lai.",
    signals: "at this time tomorrow, at 8 PM next week",
    formula: "S + will be + V-ing",
    example: "At 8 PM tomorrow, I will be eating dinner."
  },
  {
    name: "Tương lai hoàn thành",
    usage: "Hành động sẽ hoàn thành trước 1 thời điểm/hành động khác trong TL.",
    signals: "by next year, by the time",
    formula: "S + will have + V3/ed",
    example: "By next year, I will have finished my degree."
  }
];

const TENSE_GROUPS = [
  {
    title: "1. Nhóm Hiện Tại",
    tenses: ["Hiện tại đơn (Tobe)", "Hiện tại đơn (V thường)", "Hiện tại tiếp diễn", "Hiện tại hoàn thành", "Hiện tại HT Tiếp diễn"]
  },
  {
    title: "2. Nhóm Quá Khứ",
    tenses: ["Quá khứ đơn", "Quá khứ tiếp diễn", "Quá khứ hoàn thành", "Quá khứ HT Tiếp diễn"]
  },
  {
    title: "3. Nhóm Tương Lai",
    tenses: ["Tương lai đơn & Gần", "Tương lai tiếp diễn", "Tương lai hoàn thành"]
  }
];

const INITIAL_ROADMAP = [
  {
    phase: "Giai đoạn 1: Nền tảng (Sống sót cơ bản)",
    lessons: [
      { id: 1, name: "Hiện tại đơn (Tobe)", type: "lesson", state: "completed" },
      { id: 2, name: "Hiện tại đơn (V thường)", type: "lesson", state: "current" },
      { id: 3, name: "Hiện tại tiếp diễn", type: "lesson", state: "locked" },
      { id: 4, name: "Ôn tập 1: Đơn vs Tiếp Diễn", type: "checkpoint", state: "locked" },
      { id: 5, name: "Quá khứ đơn", type: "lesson", state: "locked" },
      { id: 6, name: "Tương lai đơn & Gần", type: "lesson", state: "locked" },
    ]
  },
  {
    phase: "Giai đoạn 2: Giao tiếp tự nhiên",
    lessons: [
      { id: 7, name: "Hiện tại hoàn thành", type: "lesson", state: "locked" },
      { id: 8, name: "Quá khứ tiếp diễn", type: "lesson", state: "locked" },
      { id: 9, name: "Ôn tập 2: Quá Khứ", type: "checkpoint", state: "locked" },
    ]
  },
  {
    phase: "Giai đoạn 3: Hoàn thiện",
    lessons: [
      { id: 10, name: "Quá khứ hoàn thành", type: "lesson", state: "locked" },
      { id: 11, name: "Tương lai tiếp diễn", type: "lesson", state: "locked" },
      { id: 12, name: "Ôn tập 3: Nâng cao", type: "checkpoint", state: "locked" },
    ]
  },
  {
    phase: "Giai đoạn 4: Chuyên sâu (Master)",
    lessons: [
      { id: 13, name: "Hiện tại HT Tiếp diễn", type: "lesson", state: "locked" },
      { id: 14, name: "Quá khứ HT Tiếp diễn", type: "lesson", state: "locked" },
      { id: 15, name: "Tương lai hoàn thành", type: "lesson", state: "locked" },
      { id: 16, name: "Tương lai HT Tiếp diễn", type: "lesson", state: "locked" },
      { id: 17, name: "🎓 Tốt nghiệp 12 Thì", type: "checkpoint", state: "locked" },
    ]
  }
];

function App() {
  const [currentTab, setCurrentTab] = useState('tailieu');
  const [currentScreen, setCurrentScreen] = useState('home');
  
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [roadmap, setRoadmap] = useState(INITIAL_ROADMAP);
  const [glassGlow, setGlassGlow] = useState(false);

  const [streakDays, setStreakDays] = useState(3);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [exerciseList, setExerciseList] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const TARGET_CONSECUTIVE = 10;
  
  const [isEndlessMode, setIsEndlessMode] = useState(false);

  // State cho Master-Detail Layout (Tài liệu)
  const [selectedDocName, setSelectedDocName] = useState("Hiện tại đơn (V thường)");

  const totalLessons = roadmap.reduce((acc, phase) => acc + phase.lessons.length, 0);
  const completedLessons = roadmap.reduce((acc, phase) => acc + phase.lessons.filter(l => l.state === 'completed').length, 0);
  const waterPercent = Math.min(100, Math.round((completedLessons / totalLessons) * 100));

  const startLesson = async (lessonName, endless = false) => {
    try {
      let lessonId = 1;
      for (let p of roadmap) {
        for (let l of p.lessons) {
          if (l.name === lessonName) {
            lessonId = l.id; break;
          }
        }
      }

      // Đã ghép Backend thật: Gọi qua Spring Boot Port 15234
      const res = await fetch(`http://localhost:15234/api/lessons/${lessonId}/exercises`);
      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      
      let formattedData = data.map(q => ({
        ...q,
        options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
      }));
      
      // Nếu API trả về ít quá (do chưa đủ 600 câu), lấy tạm ngẫu nhiên
      if (formattedData.length === 0) {
        console.warn("Chưa có data trong MySQL cho bài này.");
        // Fallback or empty state
      }

      formattedData = formattedData.sort(() => Math.random() - 0.5);
      
      setExerciseList(formattedData);
      setConsecutiveCorrect(0);
      setCurrentQIndex(0);
      setSelectedAnswer(null);
      setIsEndlessMode(endless);
      setCurrentScreen('exercise');
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
      alert("Chưa thể kết nối tới Backend Spring Boot. Đảm bảo server đang chạy ở port 15234!");
    }
  };

  const handleAnswer = (opt) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(opt);
    
    if (opt.isCorrect) {
      setScore(prev => prev + 10);
      setConsecutiveCorrect(prev => prev + 1);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 1500);
    } else {
      setConsecutiveCorrect(0);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQIndex(prev => (prev + 1) % exerciseList.length);
  };

  const handleFinishLesson = () => {
    if (isEndlessMode) {
      setCurrentTab('baitap');
      setCurrentScreen('home');
      return;
    }

    const newRoadmap = JSON.parse(JSON.stringify(roadmap)); 
    let foundCurrent = false;
    for (let i = 0; i < newRoadmap.length; i++) {
      for (let j = 0; j < newRoadmap[i].lessons.length; j++) {
        const lesson = newRoadmap[i].lessons[j];
        if (lesson.state === 'current') {
          lesson.state = 'completed';
          foundCurrent = true;
          if (j + 1 < newRoadmap[i].lessons.length) {
            newRoadmap[i].lessons[j + 1].state = 'current';
          } else if (i + 1 < newRoadmap.length) {
            newRoadmap[i + 1].lessons[0].state = 'current';
          }
          break;
        }
      }
      if (foundCurrent) break;
    }
    setRoadmap(newRoadmap);
    setCurrentScreen('home');
    setGlassGlow(true);
    setTimeout(() => setGlassGlow(false), 2000);
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setStreakDays(prev => prev + 1);
    setTimeout(() => setShowCheckInModal(false), 1500);
  };

  const renderNavbar = () => (
    <div className="navbar">
      <div style={{ fontWeight: 'bold', fontSize: '1.4rem', color: 'var(--primary)' }}>TenseMaster</div>
      <div className="nav-links">
        <div className={`nav-item ${currentTab === 'tailieu' ? 'active' : ''}`} onClick={() => setCurrentTab('tailieu')}>
          Tài Liệu
        </div>
        <div className={`nav-item ${currentTab === 'hocthi' ? 'active' : ''}`} onClick={() => { setCurrentTab('hocthi'); setCurrentScreen('home'); }}>
          Học Thi
        </div>
        <div className={`nav-item ${currentTab === 'baitap' ? 'active' : ''}`} onClick={() => setCurrentTab('baitap')}>
          Bài Tập
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className={`streak-badge ${isCheckedIn ? 'active' : 'inactive'}`} onClick={() => setShowCheckInModal(true)}>
          <span>🔥</span><span>{streakDays}</span>
        </div>
        <div className={`water-glass-container ${glassGlow ? 'water-glow' : ''}`} title={`Tiến độ khóa học: ${waterPercent}%`}>
          <div className="water-glass">
            <div className="water-fill" style={{ height: `${waterPercent}%` }}></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tiến độ</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{waterPercent}%</span>
          </div>
        </div>
        <div className="score-badge">🏆 {score}</div>
      </div>
    </div>
  );

  // TAB 1: TÀI LIỆU (Grouped Master-Detail)
  const renderDocs = () => {
    const selectedDoc = DOCS_DATA.find(d => d.name === selectedDocName) || DOCS_DATA[0];

    return (
      <div className="main-content">
        <h1 style={{ color: 'var(--text-main)', textAlign: 'center', marginBottom: '10px' }}>🗂️ Sổ Tay Ngữ Pháp</h1>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '40px' }}>Toàn bộ 12 Thì Tiếng Anh được chia theo 3 Giai đoạn.</p>
        
        <div className="docs-layout">
          
          {/* Main Detail Paper */}
          <div className="doc-detail-paper">
            <h1 style={{ color: 'var(--primary)', borderBottom: '2px dashed var(--border)', paddingBottom: '20px', marginBottom: '30px' }}>
              {selectedDoc.name}
            </h1>
            
            <div style={{ fontSize: '1.2rem', lineHeight: '2' }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>CÁCH DÙNG</div> 
                <div style={{ color: 'var(--text-main)' }}>{selectedDoc.usage}</div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: '800', color: '#f59e0b', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>DẤU HIỆU NHẬN BIẾT</div> 
                <div style={{ color: 'var(--text-main)' }}>{selectedDoc.signals}</div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: '800', color: '#10b981', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>CÔNG THỨC</div> 
                <div style={{ color: 'var(--text-main)', whiteSpace: 'pre-line', background: 'var(--surface-highlight)', padding: '16px', borderRadius: '8px', marginTop: '8px', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                  {selectedDoc.formula}
                </div>
              </div>

              <div>
                <div style={{ fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>VÍ DỤ</div> 
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', background: 'rgba(59, 130, 246, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '8px' }}>
                  "{selectedDoc.example}"
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Grouped) */}
          <div className="doc-sidebar">
            {TENSE_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="sidebar-group">
                <div className="sidebar-group-title">{group.title}</div>
                {group.tenses.map((tenseName, tIdx) => (
                  <div 
                    key={tIdx} 
                    className={`sidebar-item ${selectedDocName === tenseName ? 'active' : ''}`}
                    onClick={() => setSelectedDocName(tenseName)}
                  >
                    {tenseName}
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  };

  // TAB 3: BÀI TẬP (ÔN LUYỆN)
  const renderPractice = () => (
    <div className="main-content">
      <div style={{ alignSelf: 'flex-start', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--text-main)' }}>⚔️ Lò Luyện Tập (Endless Mode)</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Vào đây để cày điểm và ôn lại kiến thức. Không bị áp lực rớt chuỗi!</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '40px' }}>
           {[
             { name: 'Hiện tại đơn (Tobe)', icon: '📘' },
             { name: 'Hiện tại đơn (V thường)', icon: '📗' },
             { name: 'Tổng hợp (Random)', icon: '🎲' }
           ].map(topic => (
             <div 
               key={topic.name}
               className="option-btn" 
               style={{ padding: '32px 20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
               onClick={() => {
                 setCurrentTab('hocthi'); 
                 startLesson(topic.name === 'Tổng hợp (Random)' ? '' : topic.name, true);
               }}
             >
               <span style={{ fontSize: '3rem' }}>{topic.icon}</span>
               <span style={{ fontSize: '1.2rem' }}>{topic.name}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  // TAB 2: HỌC THI (Roadmap)
  const renderRoadmap = () => (
    <div className="main-content">
      <div style={{ alignSelf: 'flex-start', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--text-main)' }}>Lộ Trình Học</h1>
        <p style={{ color: 'var(--text-muted)' }}>Chinh phục 12 Thì qua từng cửa ải.</p>
      </div>
      <div className="roadmap-sections">
        {roadmap.map((phase, pIdx) => {
          const completedCount = phase.lessons.filter(l => l.state === 'completed').length;
          let progressPercent = 0;
          if (phase.lessons.length > 1) {
            progressPercent = (completedCount / (phase.lessons.length - 1)) * 100;
          }
          return (
            <div key={pIdx} style={{ width: '100%' }}>
              <h3 className="phase-title">{phase.phase}</h3>
              <div className="roadmap-scroll">
                <div className="roadmap-line-bg" style={{ width: `${(phase.lessons.length - 1) * 185}px` }}></div>
                <div className="roadmap-line-progress" style={{ width: `${(phase.lessons.length - 1) * 185 * (progressPercent / 100)}px` }}></div>
                {phase.lessons.map((lesson) => {
                  let icon = "🔒";
                  if (lesson.state === "completed") icon = "✓";
                  else if (lesson.state === "current") icon = "⭐";
                  else if (lesson.type === "checkpoint" && lesson.state === "locked") icon = "⚔️";
                  return (
                    <div key={lesson.id} className={`roadmap-node-wrapper ${lesson.state}`}>
                      <div 
                        className={`roadmap-node ${lesson.state} ${lesson.type}`}
                        onClick={() => {
                          if (lesson.state === 'current') setCurrentScreen('goal');
                        }}
                      >
                        <span>{icon}</span>
                      </div>
                      <div className="node-label">{lesson.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderGoal = () => {
    let currentLessonName = "Hiện tại đơn (V thường)";
    for (let p of roadmap) {
      for (let l of p.lessons) {
        if (l.state === 'current') {
          currentLessonName = l.name;
          break;
        }
      }
    }

    const docInfo = DOCS_DATA.find(d => d.name === currentLessonName);

    return (
      <div className="main-content">
        <h1 style={{ marginBottom: '40px' }}>Chặng: {currentLessonName}</h1>
        
        {docInfo && (
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', borderRadius: 'var(--rounded-md)', padding: '24px', width: '100%', maxWidth: '600px', marginBottom: '24px', textAlign: 'left' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💡</span> Bí kíp qua ải
            </h3>
            <p style={{ color: 'var(--text-main)', marginBottom: '8px', fontSize: '1.05rem' }}><b>Cách dùng:</b> <span style={{ color: 'var(--text-muted)' }}>{docInfo.usage}</span></p>
            <p style={{ color: 'var(--text-main)', fontSize: '1.05rem' }}><b>Dấu hiệu:</b> <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{docInfo.signals}</span></p>
          </div>
        )}

        <div className="goal-card" style={{ padding: '30px' }}>
          <h2 style={{ color: 'var(--secondary)', fontSize: '1.3rem' }}>Luật chơi Khắc Nghiệt ☠️</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.6' }}>
            Bạn phải trả lời đúng <b>10 câu liên tiếp</b> mới được qua bàn. <br/>
            Nếu trả lời sai, chuỗi liên tiếp sẽ bị reset về 0. Cẩn thận nhé!
          </p>
        </div>
        <button className="btn-primary" onClick={() => startLesson(currentLessonName, false)}>
          Bắt đầu thử thách ⚔️
        </button>
      </div>
    );
  };

  const renderExercise = () => {
    if (exerciseList.length === 0) return <div>Loading...</div>;
    const currentQ = exerciseList[currentQIndex];

    return (
      <div className="main-content">
        {showReward && <div className="reward-popup">+10 ĐIỂM! 🎉</div>}
        
        {!isEndlessMode ? (
          <div style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Chuỗi đúng liên tiếp (Để qua bài)</span>
              <span style={{ fontWeight: 'bold', color: consecutiveCorrect >= TARGET_CONSECUTIVE ? 'var(--success)' : 'var(--primary)' }}>
                {consecutiveCorrect} / {TARGET_CONSECUTIVE}
              </span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--surface)', borderRadius: '5px', marginTop: '8px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${Math.min(100, (consecutiveCorrect / TARGET_CONSECUTIVE) * 100)}%`, 
                height: '100%', 
                backgroundColor: consecutiveCorrect >= TARGET_CONSECUTIVE ? 'var(--success)' : 'var(--primary)',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '800px', marginBottom: '20px', textAlign: 'center', color: 'var(--secondary)', fontWeight: 'bold' }}>
            Chế độ Ôn Luyện (Endless) ⚔️
          </div>
        )}

        <div className="question-box">
          {currentQ.question}
        </div>
        
        <div className="options-grid">
          {currentQ.options.map((opt) => {
            let btnClass = "option-btn";
            if (selectedAnswer) {
              btnClass += " disabled";
              if (selectedAnswer.id === opt.id) {
                btnClass += opt.isCorrect ? " correct" : " incorrect";
              } else if (opt.isCorrect) {
                btnClass += " correct";
              }
            }
            return (
              <button 
                key={opt.id}
                className={btnClass}
                onClick={() => handleAnswer(opt)}
                disabled={selectedAnswer !== null}
              >
                {opt.text}
              </button>
            );
          })}
        </div>
        
        {selectedAnswer && (
          <div style={{ marginTop: '40px' }}>
            {(!isEndlessMode && consecutiveCorrect >= TARGET_CONSECUTIVE) ? (
              <button className="btn-primary" style={{ backgroundColor: 'var(--success)', padding: '20px 40px', fontSize: '1.2rem' }} onClick={handleFinishLesson}>
                🏆 VƯỢT ẢI THÀNH CÔNG! QUAY LẠI LỘ TRÌNH
              </button>
            ) : (
              <button className="btn-primary" onClick={isEndlessMode && consecutiveCorrect > 0 && selectedAnswer.isCorrect ? handleNextQuestion : handleNextQuestion}>
                {isEndlessMode && selectedAnswer.isCorrect ? "Câu tiếp theo (Cày điểm) →" : "Câu tiếp theo →"}
              </button>
            )}
            {isEndlessMode && selectedAnswer && (
              <button className="btn-primary" style={{ marginLeft: '16px', backgroundColor: 'var(--surface-highlight)', color: 'var(--text-main)' }} onClick={() => setCurrentTab('baitap')}>
                Thoát ôn luyện
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {showCheckInModal && (
        <div className="modal-overlay" onClick={() => setShowCheckInModal(false)}>
          <div className="checkin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>🔥 Chuỗi Học Tập 🔥</h2>
            <div className="days-grid">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                let statusClass = "day-circle";
                if (day <= streakDays && day !== 4) statusClass += " checked";
                if (day === 4 && isCheckedIn) statusClass += " checked";
                if (day === 4 && !isCheckedIn) statusClass += " today";
                return <div key={day} className={statusClass}>{statusClass.includes("checked") ? "✓" : `T${day + 1}`}</div>;
              })}
            </div>
            {!isCheckedIn ? (
              <button className="btn-primary btn-orange" onClick={handleCheckIn}>Điểm danh hôm nay</button>
            ) : (
              <div style={{ color: '#10b981', fontWeight: 'bold' }}>Tuyệt vời! Bạn đang có chuỗi {streakDays} ngày 🔥</div>
            )}
          </div>
        </div>
      )}
      
      {renderNavbar()}

      {currentTab === 'tailieu' && renderDocs()}
      {currentTab === 'baitap' && renderPractice()}
      
      {currentTab === 'hocthi' && currentScreen === 'home' && renderRoadmap()}
      {currentTab === 'hocthi' && currentScreen === 'goal' && renderGoal()}
      {currentTab === 'hocthi' && currentScreen === 'exercise' && renderExercise()}
    </>
  );
}

export default App;
