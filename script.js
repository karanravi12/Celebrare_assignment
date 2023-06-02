const draggableText = document.getElementById("draggable-text");

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
