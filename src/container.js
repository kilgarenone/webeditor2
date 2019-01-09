import Resizer from "./resizer";

let canvas;
let container;
let startX = 0;
let startY = 0;
let dimensionIndicator;
let shapeHandlers;
let handleClickSelectTool;
let resizer;

export default function prepareContainerCreationProcess(clickSelectTool) {
  handleClickSelectTool = clickSelectTool;
  canvas = document.getElementById("canvas");
  dimensionIndicator = document.getElementsByClassName(
    "dimension-indicator"
  )[0];

  shapeHandlers = document.getElementsByClassName("shape-handlers")[0];
  resizer = new Resizer();
  resizer.init(shapeHandlers);

  return {
    canvas: { element: canvas, mousedown: handleContainerCreation },
    container: { element: canvas, click: handleClickContainer }
  };
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
}

function handleContainerShapeSizing(e) {
  const width = Math.abs(e.pageX - startX);
  const height = Math.abs(e.pageY - startY);

  requestAnimationFrame(() => {
    dimensionIndicator.innerHTML = `${width}, ${height}`;
    shapeHandlers.style.transform = `translate(${
      e.pageX - startX < 0 ? e.pageX : startX
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
  handleClickSelectTool();
  dimensionIndicator.style.opacity = 0;
}

function handleClickContainer(e) {
  if (!e.target.classList.contains("container")) {
    return;
  }
  shapeHandlers.style.transform = `translate(${e.target.style.left}, ${
    e.target.style.top
  })`;
  shapeHandlers.style.width = `${e.target.style.width}`;
  shapeHandlers.style.height = `${e.target.style.height}`;
  shapeHandlers.style.opacity = 1;
  shapeHandlers.classList.remove("hide-handlers");
  resizer.target(e.target);
}

function createRectangle() {
  const [x, y] = getXYFromTransform(shapeHandlers);
  container = document.createElement("div");
  container.className = "container";
  container.addEventListener("mouseover", handleMouseoverContainer);
  container.addEventListener("mouseout", handleMouseoutContainer);

  requestAnimationFrame(() => {
    container.style.position = "absolute";
    container.style.width = `${shapeHandlers.style.width}`;
    container.style.height = `${shapeHandlers.style.height}`;
    container.style.top = `${+y + window.pageYOffset}px`;
    container.style.left = `${x}px`;
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
