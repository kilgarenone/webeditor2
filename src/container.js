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
  document.body.addEventListener("mousedown", handleContainerCreation, false);
  // document.body.addEventListener("click", handleTextCreation, false);
}

function handleContainerCreation(e) {
  console.log("handleContainerCreation", e);
  dimensionIndicator.style.opacity = 1;
  shapeHandlers.style.opacity = 1;
  startX = e.pageX;
  startY = e.pageY;

  dimensionIndicator.style.transform = `translate(${startX}px, ${startY -
    25}px)`;
  shapeHandlers.style.transform = `translate(${startX}px, ${startY}px)`;
  document.body.style.cursor = "crosshair";

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
      e.pageX - startX < 0 ? e.pageX : startX
    }px, ${e.pageY - startY < 0 ? e.pageY : startY}px)`;
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
  document.body.style.cursor = "default";
  createRectangle();
  dimensionIndicator.style.opacity = 0;
}

function createRectangle() {
  const [x, y] = getXYFromTransform(shapeHandlers);
  container = document.createElement("div");
  container.className = "container";
  requestAnimationFrame(() => {
    container.style.position = "absolute";
    container.style.width = `${shapeHandlers.style.width}`;
    container.style.height = `${shapeHandlers.style.height}`;
    container.style.top = `${y}px`;
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
