let canvas;
let container;
let startX = 0;
let startY = 0;
let dimensionIndicator;
let shapeHandlers;

export default function prepareContainerCreationProcess() {
  canvas = document.getElementById("canvas");
  dimensionIndicator = document.getElementsByClassName(
    "dimension-indicator"
  )[0];
  shapeHandlers = document.getElementsByClassName("shape-handlers")[0];
  canvas.addEventListener("mousedown", handleContainerCreation, false);

  // canvas.addEventListener("click", handleTextCreation, false);
}

function handleMouseoverContainer(e) {
  e.target.classList.add("hovered");
}
function handleMouseoutContainer(e) {
  e.target.classList.remove("hovered");
}

function handleContainerCreation(e) {
  console.log("handleContainerCreation", e, window);
  dimensionIndicator.style.opacity = 1;
  shapeHandlers.style.opacity = 1;
  startX = e.pageX;
  startY = e.pageY;

  dimensionIndicator.style.transform = `translate(${startX}px, ${startY -
    25 -
    window.pageYOffset}px)`;
  shapeHandlers.style.transform = `translate(${startX}px, ${startY -
    window.pageYOffset}px)`;
  canvas.style.cursor = "crosshair";

  document.body.addEventListener(
    "mousemove",
    handleContainerShapeSizing,
    false
  );

  document.body.addEventListener("mouseup", handleContainerOnMouseUp, false);
  // TODO: revisit this implementation
  // reallyCreateContainerTimeout = setTimeout(
  //   () => initContainerCreationProcess.call(null, e),
  //   200
  // );
}

function handleContainerShapeSizing(e) {
  // if cursor is still moving inside the start point region,
  // don't create the container yet
  // if (Math.abs(e.pageX - snapX) <= 10 || Math.abs(e.pageY - snapY) <= 10) {
  //   return;
  // }
  // if (!isAppended) {
  //   parent.appendChild(container);
  //   isAppended = true;
  // }
  const width = Math.abs(e.pageX - startX);
  const height = Math.abs(e.pageY - startY);

  requestAnimationFrame(() => {
    dimensionIndicator.innerHTML = `${width}, ${height}`;
    shapeHandlers.style.transform = `translate(${
      e.pageX - startX < 0
        ? e.pageX - window.pageXOffset
        : startX - window.pageYOffset
    }px, ${
      e.pageY - startY < 0
        ? e.pageY - window.pageYOffset
        : startY - window.pageYOffset
    }px)`;
    shapeHandlers.style.width = `${width}px`;
    shapeHandlers.style.height = `${height}px`;
  });
}

function handleContainerOnMouseUp(e) {
  document.body.removeEventListener(
    "mousemove",
    handleContainerShapeSizing,
    false
  );
  document.body.removeEventListener("mouseup", handleContainerOnMouseUp, false);
  canvas.style.cursor = "default";
  createRectangle();
  dimensionIndicator.style.opacity = 0;
}

function handleClickContainer(e) {
  e.stopPropagation();
  shapeHandlers.style.transform = `translate(${e.target.style.left}px ${
    e.target.style.top
  }px)`;
  shapeHandlers.style.width = `${e.target.style.width}px`;
  shapeHandlers.style.width = `${e.target.style.height}px`;
  shapeHandlers.style.opacity = 1;
}

function createRectangle() {
  const [x, y] = getXYFromTransform(shapeHandlers);
  container = document.createElement("div");
  container.className = "container";
  container.addEventListener("mouseover", handleMouseoverContainer, false);
  container.addEventListener("mouseout", handleMouseoutContainer, false);
  container.addEventListener("click", handleClickContainer, false);

  requestAnimationFrame(() => {
    container.style.position = "absolute";
    container.style.width = `${shapeHandlers.style.width}`;
    container.style.height = `${shapeHandlers.style.height}`;
    container.style.top = `${+y + window.pageYOffset}px`;
    container.style.left = `${+x + window.pageXOffset}px`;
    shapeHandlers.style.height = "";
    shapeHandlers.style.width = "";
    shapeHandlers.style.transform = "";
    shapeHandlers.style.opacity = 0;
    dimensionIndicator.innerHTML = "";

    canvas.appendChild(container);
  });
}

function getXYFromTransform(element) {
  return element.style.transform.match(/-?\d+/g);
}
