var draggableTexts = document.getElementsByClassName("draggable-text");
var colorSelect = document.getElementById("color-select");
var fontSelect = document.getElementById("font-select");
var sizeInput = document.getElementById("size-input");

let isDragging = false;
let dragElement = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

let changeHistory = [];
let redoHistory = [];

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

  const previousPosition = {
    left: dragElement.style.left,
    top: dragElement.style.top,
  };
  changeHistory.push(() => {
    dragElement.style.left = previousPosition.left;
    dragElement.style.top = previousPosition.top;
  });
}

function drag(event) {
  event.preventDefault();

  if (isDragging && dragElement) {
    let clientX = event.clientX;
    let clientY = event.clientY;

    const x = clientX - dragOffsetX;
    const y = clientY - dragOffsetY;

    dragElement.style.left = `${x}px`;
    dragElement.style.top = `${y}px`;

    const mainScreen = document.getElementById("main-screen");
    const mainWidth = mainScreen.clientWidth;
    const mainHeight = mainScreen.clientHeight;

    const centerThreshold = 25;

    Array.from(draggableTexts).forEach((text) => {
      if (text !== dragElement) {
        var textRect = text.getBoundingClientRect();
        var dragRect = dragElement.getBoundingClientRect();

        if (Math.abs(dragRect.bottom - textRect.top) < 15) {
          dragElement.style.top = `${textRect.top - dragRect.height}px`;
        } else if (Math.abs(dragRect.top - textRect.bottom) < 10) {
          dragElement.style.top = `${textRect.bottom}px`;
        }

        if (Math.abs(dragRect.right - textRect.left) < 15) {
          dragElement.style.left = `${textRect.left - dragRect.width}px`;
        } else if (Math.abs(dragRect.left - textRect.right) < 15) {
          dragElement.style.left = `${textRect.right}px`;
        }
      }
    });

    if (
      Math.abs(x + dragElement.offsetWidth / 2 - mainWidth / 2) <=
      centerThreshold
    ) {
      dragElement.style.left = `${mainWidth / 2}px`;
    }

    if (
      Math.abs(y + dragElement.offsetHeight / 2 - mainHeight / 2) <=
      centerThreshold
    ) {
      dragElement.style.top = `${mainHeight / 2}px`;
    }
    const currentPosition = {
      left: dragElement.style.left,
      top: dragElement.style.top,
    };
    redoHistory.push(() => {
      dragElement.style.left = currentPosition.left;
      dragElement.style.top = currentPosition.top;
    });
  }
}

function stopDrag() {
  isDragging = false;
}

function color() {
  var selectedColor = colorSelect.value;
  if (dragElement) {
    const previousColor = dragElement.style.color;
    const currentColor = selectedColor;
    changeHistory.push(() => {
      dragElement.style.color = previousColor;
      redoHistory.push(() => {
        dragElement.style.color = currentColor;
      });
      if (changeHistory.length > 10) {
        changeHistory.shift();
      }
    });
    dragElement.style.color = selectedColor;
    redoHistory = [];
  }
}

function font() {
  var selectedFont = fontSelect.value;
  if (dragElement) {
    const previousFont = dragElement.style.fontFamily;
    const currentFont = selectedFont;
    changeHistory.push(() => {
      dragElement.style.fontFamily = previousFont;
      redoHistory.push(() => {
        dragElement.style.fontFamily = currentFont;
      });
      if (changeHistory.length > 10) {
        changeHistory.shift();
      }
    });
    dragElement.style.fontFamily = selectedFont;
    redoHistory = [];
  }
}

function changeSize() {
  var enteredSize = sizeInput.value;
  if (dragElement) {
    const previousSize = dragElement.style.fontSize;
    const currentSize = enteredSize + "px";
    changeHistory.push(() => {
      dragElement.style.fontSize = previousSize;
      redoHistory.push(() => {
        dragElement.style.fontSize = currentSize;
      });
      if (changeHistory.length > 10) {
        changeHistory.shift();
      }
    });
    dragElement.style.fontSize = currentSize;
    redoHistory = [];
  }
}

function undo() {
  if (changeHistory.length > 0) {
    const undoAction = changeHistory.pop();
    redoHistory.push(undoAction);
    undoAction();
  }
}

function redo() {
  if (redoHistory.length > 0) {
    const redoAction = redoHistory.pop();
    changeHistory.push(redoAction);
    redoAction();
  }
}

function addText() {
  const userInput = document.getElementById("text-input").value.trim();
  if (userInput !== "") {
    const textId = "text" + (draggableTexts.length + 1);
    const newElement = document.createElement("div");
    newElement.setAttribute("class", "draggable-text");
    newElement.setAttribute("id", textId);
    newElement.innerText = userInput;

    newElement.addEventListener("pointerdown", startDrag);

    const textContainer = document.getElementById("text-container");
    textContainer.appendChild(newElement);

    document.getElementById("text-input").value = "";

    const mainScreen = document.getElementById("main-screen");
    mainScreen.appendChild(newElement);
  }
}
