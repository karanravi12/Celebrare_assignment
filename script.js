const draggableText = document.getElementById("draggable-text");

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

draggableText.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDrag);

function startDrag(event) {
  isDragging = true;
  const textRect = draggableText.getBoundingClientRect();
  dragOffsetX = event.clientX - textRect.left;
  dragOffsetY = event.clientY - textRect.top;
}

function drag(event) {
  if (isDragging) {
    const parentRect = draggableText.parentNode.getBoundingClientRect();
    const x = event.clientX - parentRect.left - dragOffsetX;
    const y = event.clientY - parentRect.top - dragOffsetY;

    draggableText.style.left = `${x}px`;
    draggableText.style.top = `${y}px`;
  }
}

function stopDrag() {
  isDragging = false;
}
