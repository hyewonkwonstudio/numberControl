const firebaseConfig = {
  apiKey: "AIzaSyCVPd41WBBzFqebcHiemQp1Txy0SQtYtDU",
  authDomain: "number01-2b635.firebaseapp.com",
  databaseURL: "https://number01-2b635-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "number01-2b635",
  storageBucket: "number01-2b635.firebasestorage.app",
  messagingSenderId: "312489368969",
  appId: "1:312489368969:web:c1f4f6b72e0547d9789558"
};  // 꽃 작업 때 쓴 것과 같은 내용
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let buttonX1;
let buttonX2;
let buttonY;
let buttonRadius;
let number;

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
  number = 0;

  // ↓ 추가: Firebase에 저장된 숫자를 받아 핸드폰 화면과 맞춤
  db.ref("number/value").on("value", (snap) => {
    if (snap.val() !== null) number = snap.val();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  init();
}

function init() {
  buttonX1 = width * 0.5 - 150;
  buttonX2 = width * 0.5 + 150;
  buttonY = height * 0.5;
  buttonRadius = 50;
}

function draw() {
  background(0);

  fill(255);
  textSize(150);
  textAlign(CENTER, CENTER);
  text(number, width * 0.5, height * 0.5);

  push();
  translate(buttonX1, buttonY);
  stroke(255);
  strokeWeight(2);
  noFill();
  ellipse(0, 0, buttonRadius * 2, buttonRadius * 2);
  triangle(-20, 0, 10, -20, 10, 20);
  pop();

  push();
  translate(buttonX2, buttonY);
  stroke(255);
  strokeWeight(2);
  noFill();
  ellipse(0, 0, buttonRadius * 2, buttonRadius * 2);
  triangle(20, 0, -10, -20, -10, 20);
  pop();
}
function mousePressed() {
  if (dist(mouseX, mouseY, buttonX1, buttonY) < buttonRadius) {
    number = number - 1;
    if (number < 0) {
      number = 0;
    }
    sendNumber();   // ← 추가
  }

  if (dist(mouseX, mouseY, buttonX2, buttonY) < buttonRadius) {
    number = number + 1;
    if (number > 9) {
      number = 9;
    }
    sendNumber();   // ← 추가
  }
}

function sendNumber() {
  db.ref("number/value").set(number);
}
