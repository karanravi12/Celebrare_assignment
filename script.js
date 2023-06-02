var draggableText = document.getElementById("draggable-text");
var colorSelect = document.getElementById("color-select");
var fontSelect = document.getElementById("font-select");
var sizeInput = document.getElementById("size-input");


let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

draggableText.addEventListener("pointerdown", startDrag);
document.addEventListener("pointermove", drag);
document.addEventListener("pointerup", stopDrag);

function startDrag(event) {
  isDragging = true;

  if (event.type === "pointerdown") {
    dragOffsetX = event.clientX - draggableText.offsetLeft;
    dragOffsetY = event.clientY - draggableText.offsetTop;
  }
}

  function drag(event) {
    event.preventDefault();

    if (isDragging) {
      let clientX, clientY;

      if (event.type === "pointermove") {
        clientX = event.clientX;
        clientY = event.clientY;
      

      const x = clientX - dragOffsetX;
      const y = clientY - dragOffsetY;

      draggableText.style.left = `${x}px`;
      draggableText.style.top = `${y}px`;
    }
  }
}

function stopDrag() {
  isDragging = false;
}

function color() {
  var selectedColor = colorSelect.value;
  draggableText.style.color = selectedColor;
}

function font() {
  var selectedFont = fontSelect.value;
  draggableText.style.fontFamily = selectedFont;
}

function changeSize() {
  var enteredSize = sizeInput.value;
  draggableText.style.fontSize = enteredSize + "px";
}
