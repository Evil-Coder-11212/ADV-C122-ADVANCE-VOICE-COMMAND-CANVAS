x = 0;
y = 0;
const appleWidth = 50;
const appleHeight = 50;
let screenWidth = 0;
let screenHeight = 0;
let apple = "";
let speakData = "";
let to_number = "";
let draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML =
    "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {
  console.log(event);

  content = Number(event.results[0][0].transcript);
  if (Number.isInteger(content)) {
    to_number = Number(content);
    draw_apple = true;
  } else {
    alert("PLease only speak a number");
    draw_apple = false;
  }
  document.getElementById("status").innerHTML =
    "The speech has been recognized: " + content;
};

function preload() {
  apple = loadImage("./apple.png");
}

function setup() {
  screenWidth = window.innerWidth - 50;
  screenHeight = window.innerHeight - 250;
  const canvas = createCanvas(screenWidth, screenHeight);
  canvas.position(0, 150);
}

function draw() {
  if (draw_apple) {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    for (i = 0; i < to_number; i++) {
      draw_apple = false;
      x = Math.floor(Math.random() * screenWidth);
      y = Math.floor(Math.random() * screenHeight);
      image(apple, x, y, appleWidth, appleHeight);
    }
    document.querySelector(
      "#status"
    ).textContent = `${to_number} apple is drawn`;
    speak();
  }
}

function speak() {
  var synth = window.speechSynthesis;

  speak_data = `${to_number} apples are drawn`;
  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);
}
