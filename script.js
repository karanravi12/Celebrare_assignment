var draggableTexts = document.getElementsByClassName("draggable-text");
var colorSelect = document.getElementById("color-select");
var fontSelect = document.getElementById("font-select");
var sizeInput = document.getElementById("size-input");

let isDragging = false;
let dragElement = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

Array.from(draggableTexts).forEach((text) => {
  text.addEventListener("pointerdown", startDrag);
});

document.addEventListener("pointermove", drag);
document.addEventListener("pointerup", stopDrag);

function startDrag(event) {
  isDragging = true;
  dragElement = event.currentTarget;

  if (event.type === "pointerdown") {
    dragOffsetX = event.clientX - dragElement.offsetLeft;
    dragOffsetY = event.clientY - dragElement.offsetTop;
  }
}

function drag(event) {
  event.preventDefault();

  if (isDragging && dragElement) {
    let clientX, clientY;

    if (event.type === "pointermove") {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const x = clientX - dragOffsetX;
    const y = clientY - dragOffsetY;

    dragElement.style.left = `${x}px`;
    dragElement.style.top = `${y}px`;

    const mainScreen = document.getElementById("main-screen");
    const mainWidth = mainScreen.clientWidth;
    const mainHeight = mainScreen.clientHeight;

    const centerThreshold = 50; 

    if (Math.abs(x + dragElement.offsetWidth / 2 - mainWidth / 2) <= centerThreshold) {
      dragElement.style.left = `${mainWidth / 2 - dragElement.offsetWidth / 2}px`;
    }

    if (Math.abs(y + dragElement.offsetHeight / 2 - mainHeight / 2) <= centerThreshold) {
      dragElement.style.top = `${mainHeight / 2 - dragElement.offsetHeight / 2}px`;
    }
  }
}

function stopDrag() {
  isDragging = false;
}

function color() {
  var selectedColor = colorSelect.value;
  if (dragElement) {
    dragElement.style.color = selectedColor;
  }
}

function font() {
  var selectedFont = fontSelect.value;
  if (dragElement) {
    dragElement.style.fontFamily = selectedFont;
  }
}

function changeSize() {
  var enteredSize = sizeInput.value;
  if (dragElement) {
    dragElement.style.fontSize = enteredSize + "px";
  }
}
