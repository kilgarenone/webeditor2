let canvas;
let container;
let startX = 0;
let startY = 0;
let dimensionIndicator;

export default function prepareContainerCreationProcess() {
  canvas = document.getElementById("canvas");
  dimensionIndicator = document.getElementsByClassName(
    "dimension-indicator"
  )[0];
  document.body.addEventListener("mousedown", handleContainerCreation, false);
  // document.body.addEventListener("click", handleTextCreation, false);
}

function handleContainerCreation(e) {
  console.log("handleContainerCreation", e);
  dimensionIndicator.style.opacity = 1;
  startX = e.pageX;
  startY = e.pageY;

  dimensionIndicator.style.transform = `translate(${startX}px, ${startY -
    25}px)`;
  container = document.createElement("div");
  container.className = "rectangle";
  container.style.position = "absolute";
  document.body.style.cursor = "crosshair";

  document.body.addEventListener(
    "mousemove",
    handleContainerShapeSizing,
    false
  );

  canvas.appendChild(container);
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

  dimensionIndicator.innerHTML = `${width}, ${height}`;
  requestAnimationFrame(() => {
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.style.left = `${e.pageX - startX < 0 ? e.pageX : startX}px`;
    container.style.top = `${e.pageY - startY < 0 ? e.pageY : startY}px`;
  });
}

function handleContainerOnMouseUp(e) {
  document.body.removeEventListener(
    "mousemove",
    handleContainerShapeSizing,
    false
  );
  dimensionIndicator.style.opacity = 0;
  document.body.removeEventListener("mouseup", handleContainerOnMouseUp, false);
  document.body.style.cursor = "default";
}
