const fs = require('fs');
const mysql = require('mysql2/promise');

async function seed() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'learn_english'
  });

  const rawData = fs.readFileSync('questions_bank.json');
  const questions = JSON.parse(rawData);

  console.log(`Found ${questions.length} questions. Inserting into DB...`);
  
  // Xóa dữ liệu cũ (tuỳ chọn)
  // await connection.execute('DELETE FROM exercise');

  let count = 0;
  for (const q of questions) {
    let lessonId = 1;
    if (q.tense.includes("Tobe")) lessonId = 1;
    else if (q.tense.includes("V thường")) lessonId = 2;
    else if (q.tense.includes("Hiện tại tiếp diễn")) lessonId = 3;
    else if (q.tense.includes("Quá khứ đơn")) lessonId = 5;
    else if (q.tense.includes("Tương lai đơn")) lessonId = 7;
    else if (q.tense.includes("Hiện tại hoàn thành")) lessonId = 8;
    else if (q.tense.includes("Quá khứ tiếp diễn")) lessonId = 9;
    else if (q.tense.includes("Quá khứ hoàn thành")) lessonId = 11;
    else if (q.tense.includes("Tương lai tiếp diễn")) lessonId = 12;
    else if (q.tense.includes("Hiện tại HT Tiếp diễn")) lessonId = 14;
    else if (q.tense.includes("Quá khứ HT Tiếp diễn")) lessonId = 15;
    else if (q.tense.includes("Tương lai hoàn thành")) lessonId = 16;
    
    let correct = "";
    for(let opt of q.options) {
      if(opt.isCorrect) {
        correct = opt.text;
        break;
      }
    }

    const [rows] = await connection.execute(
      'INSERT INTO exercise (difficulty_level, lesson_id, question, options, correct_answer) VALUES (?, ?, ?, ?, ?)',
      [1, lessonId, q.question, JSON.stringify(q.options), correct]
    );
    count++;
  }

  console.log(`Successfully inserted ${count} questions into MySQL!`);
  await connection.end();
}

seed().catch(console.error);
