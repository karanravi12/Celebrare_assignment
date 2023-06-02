const draggableText = document.getElementById("draggable-text");

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

draggableText.addEventListener("mousedown", startDrag);
draggableText.addEventListener("touchstart", startDrag);

document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDrag);

document.addEventListener("touchmove", drag);
document.addEventListener("touchend", stopDrag);

function startDrag(event) {
  isDragging = true;
  
  if (event.type === "mousedown") {
    dragOffsetX = event.clientX - draggableText.offsetLeft;
    dragOffsetY = event.clientY - draggableText.offsetTop;
  } else if (event.type === "touchstart") {
    const touch = event.touches[0];
    dragOffsetX = touch.clientX - draggableText.offsetLeft;
    dragOffsetY = touch.clientY - draggableText.offsetTop;
  }
}

function drag(event) {
  event.preventDefault(); // Prevent scrolling on touch devices
  
  if (isDragging) {
    let clientX, clientY;
    
    if (event.type === "mousemove") {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event.type === "touchmove") {
      const touch = event.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    }
    
    const parentRect = draggableText.parentNode.getBoundingClientRect();
    const x = clientX - parentRect.left - dragOffsetX;
    const y = clientY - parentRect.top - dragOffsetY;

    draggableText.style.left = `${x}px`;
    draggableText.style.top = `${y}px`;
  }
}

function stopDrag() {
  isDragging = false;
}
