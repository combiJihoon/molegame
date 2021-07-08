const boxes = document.querySelectorAll(".parent div");
console.log(boxes);
const score_board = document.querySelector("#score_board");
const miss_board = document.querySelector("#miss_board");
const flags = Array(9); // 9개의 칸을 가진 배열
// 키를 눌렀을 때 몇 번째 맵에 다응하는 지를 전달한다. -> 텐키리스일 수도 있기 때문에 만드는 것!
// 각 키에 대응하는 숫자는 boxes의 배열이 0부터 시작할 것이기 때문에 0~8로 한다!
const correct = new Map([
  ["q", 0],
  ["w", 1],
  ["e", 2],
  ["a", 3],
  ["s", 4],
  ["d", 5],
  ["z", 6],
  ["x", 7],
  ["c", 8],
  ["ㅂ", 0],
  ["ㅈ", 1],
  ["ㄷ", 2],
  ["ㅁ", 3],
  ["ㄴ", 4],
  ["ㅇ", 5],
  ["ㅋ", 6],
  ["ㅌ", 7],
  ["ㅊ", 8],
]);

let score = 0; // 계속 값이 바뀌는 값이므로 "let"으로 한다.
let miss = 0;
let level = 0;
let interval = 1000 - level * 100;

// flags에 일단 0을 넣어준다.
flags.fill(0);

function init() {
  // 색칠하는 함수
  alert("1단계입니다.");
  function draw() {
    for (let i = 0; i < 9; i++) {
      // flag가 1이면 그리는 함수를 호출함-> 파란색 색칠
      if (flags[i] == 1) {
        boxes[i].style.backgroundColor = "blue";
      } else {
        boxes[i].style.backgroundColor = "white";
      }
    }
    // 자바스크립트에서 백틱 사용하면 변수를 쉽게 사용할 수 있다.
    score_board.innerText = `점수 : ${score}`;
    miss_board.innerText = `놓친 갯수 : ${miss}`;
  }

  // setTimeout : 어떤 함수를 일정시간 후에 실행하도록 하는 것(두 번째 인자는 시간)
  // 위 함수는 한 번 실행하고 말기 때문에 setInterval로 바꾼다.
  setInterval(function () {
    if (interval < 0) {
      alert("게임 정복했다! 대단해!!!");
      level = 2000000; // 임시
    }
    if (score === 10 * (level + 1)) {
      level += 1;
      alert(`${level + 1} 단계입니다.`);
    }
    // 일단 flags는 모두 0으로 해놓고 시작한다. 그래야 계속 값이 바뀐다.
    for (let i = 0; i < 9; i++) {
      if (flags[i] === 1) {
        miss += 1;
      }
      flags[i] = 0;
    }
    // random : 0~1 사이의 값 -> 여기에 9를 곱하면 0 < x < 9가 된다. -> 그리고 반올림 한다.
    const rand1 = Math.floor(Math.random() * 9);
    // 아래와 같이 하면 상자 여러개가 칠해짐
    flags[rand1] = 1;
    flags[rand1] = 1;
    flags[rand1] = 1;

    draw();
  }, interval);

  // 키보드 입력을 인식하도록 이벤트를 "keydown"으로 한다.
  window.addEventListener("keydown", function (e) {
    const keytype = e.key;
    console.log(keytype);
    const idx = correct.get(keytype); // 있으면 값이 나오고, 없으면 undefined
    if (idx === undefined) return;
    if (flags[idx] === 1) {
      score += 1;
      flags[idx] = 0; // 원상복귀
      // draw 다시 호출
      draw();
    } // 색칠된 상태를 누른 경우
  });
}

function stop() {
  const start_btn = document.querySelector("#start_btn");
  start_btn.preventDefault();
}
