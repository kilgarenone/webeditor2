let topCache;
let heightCache;

class Resizer {
  element = null;

  target(element) {
    this.element = element;
  }

  init(handlers) {
    handlers.addEventListener("mousedown", this.handleMouseDown);
  }

  handleMouseDown = e => {
    const target = e.target.classList;

    if (target.contains("handler--top")) {
      this.handleTopMouseDown();
    } else if (target.contains("handler--right")) {
      this.handleRightMouseDown();
    } else if (target.contains("handler--bottom")) {
      this.handleBottomMouseDown();
    } else if (target.contains("handler--left")) {
      this.handleLeftMouseDown();
    } else if (target.contains("handler--top-left")) {
      this.handleTopLeftMouseDown();
    } else if (target.contains("handler--top-right")) {
      this.handleTopRightMouseDown();
    } else if (target.contains("handler--bottom-right")) {
      this.handleBottomRightMouseDown();
    } else if (target.contains("handler--bottom-left")) {
      this.handleBottomLeftMouseDown();
    }
  };

  handleTopMouseDown = e => {
    document.body.addEventListener("mouseup", this.handleTopMouseUp);
    document.body.addEventListener("mousemove", this.handleTopMouseMove);
    topCache = parseInt(this.element.style.top, 10);
    heightCache = parseInt(this.element.style.height, 10);
    this.element.classList.add("dragging-handler");
  };

  handleTopMouseMove = e => {
    // const height = parseInt(this.element.style.top, 10);
    this.element.style.top = `${e.pageY}px`;
    this.element.style.height = `${topCache + heightCache - e.pageY}px`;

    // console.log(top);
  };
  handleTopMouseUp = () => {
    document.body.removeEventListener("mousemove", this.handleTopMouseMove);
    document.body.removeEventListener("mouseup", this.handleTopMouseUp);
  };
  handleRightMouseDown = () => {};
  handleBottomMouseDown = () => {};
  handleLeftMouseDown = () => {};
  handleTopLeftMouseDown = () => {};
  handleTopRightMouseDown = () => {};
  handleBottomRightMouseDown = () => {};
  handleBottomLeftMouseDown = () => {};
}

export default Resizer;
