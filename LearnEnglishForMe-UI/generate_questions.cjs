const fs = require('fs');

const questions = [];
let idCounter = 1;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function addQ(tense, text, correct, bads) {
  const opts = [correct, ...bads].slice(0, 4);
  shuffle(opts);
  const letters = ['A', 'B', 'C', 'D'];
  const options = opts.map((o, i) => ({ id: letters[i], text: `${letters[i]}. ${o}`, isCorrect: o === correct }));
  
  questions.push({
    id: idCounter++,
    tense: tense,
    question: text,
    options: options
  });
}

// 1. Tobe
const sub1 = [{s:"I", c:"am", w:["is","are","be"]}, {s:"He", c:"is", w:["am","are","be"]}, {s:"We", c:"are", w:["is","am","be"]}];
const comp1 = ["happy", "tired", "at home", "students", "doctors"];
for(let i=0; i<50; i++) {
  let s = sub1[i%3]; let c = comp1[i%5];
  addQ("Hiện tại đơn (Tobe)", `${s.s} ____ ${c}.`, s.c, s.w);
}

// 2. V thường
const sub2 = [{s:"He", c:"plays", w:["play","playing","is play"]}, {s:"They", c:"play", w:["plays","playing","are play"]}];
const comp2 = ["football everyday", "tennis on Sundays", "chess", "video games", "the piano"];
for(let i=0; i<50; i++) {
  let s = sub2[i%2]; let c = comp2[i%5];
  addQ("Hiện tại đơn (V thường)", `${s.s} usually ____ ${c}.`, s.c, s.w);
}

// 3. HT Tiếp diễn
const sub3 = [{s:"I", c:"am working", w:["is working","are working","work"]}, {s:"She", c:"is reading", w:["are reading","reads","am reading"]}, {s:"They", c:"are running", w:["is running","run","running"]}];
const comp3 = ["now", "at the moment", "right now", "currently", "at present"];
for(let i=0; i<50; i++) {
  let s = sub3[i%3]; let c = comp3[i%5];
  addQ("Hiện tại tiếp diễn", `${s.s} ____ ${c}.`, s.c, s.w);
}

// 4. QKĐ
const sub4 = ["I", "She", "They"];
const comp4 = [{c:"went", w:["go","goes","going"], e:"to the park yesterday"}, {c:"played", w:["play","plays","playing"], e:"football last week"}, {c:"saw", w:["see","sees","seeing"], e:"a movie last night"}];
for(let i=0; i<50; i++) {
  let s = sub4[i%3]; let c = comp4[i%3];
  addQ("Quá khứ đơn", `${s} ____ ${c.e}.`, c.c, c.w);
}

// 5. TLĐ
for(let i=0; i<50; i++) {
  addQ("Tương lai đơn & Gần", `I think it ____ tomorrow.`, "will rain", ["rains","raining","is rain"]);
}

// 6. HT Hoàn thành
for(let i=0; i<50; i++) {
  addQ("Hiện tại hoàn thành", `I ____ to Paris three times.`, "have been", ["has been","was","am being"]);
}

// 7. QK Tiếp diễn
for(let i=0; i<50; i++) {
  addQ("Quá khứ tiếp diễn", `I ____ TV when she called.`, "was watching", ["were watching","watched","am watching"]);
}

// 8. QK Hoàn thành
for(let i=0; i<50; i++) {
  addQ("Quá khứ hoàn thành", `She ____ before I arrived.`, "had left", ["has left","left","was leaving"]);
}

// 9. TL Tiếp diễn
for(let i=0; i<50; i++) {
  addQ("Tương lai tiếp diễn", `At 8 PM tomorrow, I ____ dinner.`, "will be eating", ["will eat","am eating","eat"]);
}

// 10. HT Hoàn thành tiếp diễn
for(let i=0; i<50; i++) {
  addQ("Hiện tại HT Tiếp diễn", `I ____ for 3 hours.`, "have been studying", ["has been studying","studied","am studying"]);
}

// 11. QK Hoàn thành tiếp diễn
for(let i=0; i<50; i++) {
  addQ("Quá khứ HT Tiếp diễn", `They ____ for 2 hours before the boss arrived.`, "had been waiting", ["has been waiting","waited","were waiting"]);
}

// 12. TL Hoàn thành
for(let i=0; i<50; i++) {
  addQ("Tương lai hoàn thành", `By next year, I ____ my degree.`, "will have finished", ["will finish","have finished","finished"]);
}

fs.writeFileSync('questions_bank.json', JSON.stringify(questions, null, 2));
console.log(`Generated ${questions.length} questions successfully!`);
