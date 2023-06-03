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

   
    Array.from(draggableTexts).forEach((text) => {
      if (text !== dragElement) {
        var textRect = text.getBoundingClientRect();
        var dragRect = dragElement.getBoundingClientRect();
    
        if (Math.abs(dragRect.bottom - textRect.top) < 10) {
        
          dragElement.style.top = `${textRect.top - dragRect.height}px`;
          text.classList.add("aligned-top");
          dragElement.classList.add("aligned-bottom");
        } else if (Math.abs(dragRect.top - textRect.bottom) < 10) {
       
          dragElement.style.top = `${textRect.bottom}px`;
          text.classList.add("aligned-bottom");
          dragElement.classList.add("aligned-top");
        } else {
         
          text.classList.remove("aligned-top");
          text.classList.remove("aligned-bottom");
          dragElement.classList.remove("aligned-top");
          dragElement.classList.remove("aligned-bottom");
        }
    
        if (Math.abs(dragRect.right - textRect.left) < 10) {
          
          dragElement.style.left = `${textRect.left - dragRect.width}px`;
          text.classList.add("aligned-left");
          dragElement.classList.add("aligned-right");
        } else if (Math.abs(dragRect.left - textRect.right) < 10) {
         
          dragElement.style.left = `${textRect.right}px`;
          text.classList.add("aligned-right");
          dragElement.classList.add("aligned-left");
        } else {
         
          text.classList.remove("aligned-left");
          text.classList.remove("aligned-right");
          dragElement.classList.remove("aligned-left");
          dragElement.classList.remove("aligned-right");
        }
      }
    });
    
  }
}

function stopDrag() {
  isDragging = false;

 
  Array.from(draggableTexts).forEach((text) => {
    text.classList.remove("aligned-top");
    text.classList.remove("aligned-bottom");
  });
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
