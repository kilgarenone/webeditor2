let topCache;
let widthCache;
let leftCache;
let heightCache;

class Resizer {
  element = null;
  handlersBox = null;

  target(element) {
    this.element = element;
  }

  init(handlers) {
    this.handlersBox = handlers;
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
    this.handlersBox.style.transform = `translate(${this.element.style.left}, ${
      e.pageY - topCache < 0
        ? e.pageY - window.pageYOffset
        : e.pageY - window.pageYOffset
    }px)`;
    this.element.style.top = `${e.pageY}px`;
    this.element.style.height = `${topCache + heightCache - e.pageY}px`;
    this.handlersBox.style.height = `${topCache + heightCache - e.pageY}px`;
  };

  handleTopMouseUp = () => {
    this.element.classList.remove("dragging-handler");
    document.body.removeEventListener("mousemove", this.handleTopMouseMove);
    document.body.removeEventListener("mouseup", this.handleTopMouseUp);
  };

  handleRightMouseDown = () => {
    document.body.addEventListener("mouseup", this.handleRightMouseUp);
    document.body.addEventListener("mousemove", this.handleRightMouseMove);
    // topCache = parseInt(this.element.style.top, 10);
    // heightCache = parseInt(this.element.style.height, 10);
    widthCache = parseInt(this.element.style.width, 10);
    leftCache = parseInt(this.element.style.left, 10);
    this.element.classList.add("dragging-handler");
  };

  handleRightMouseMove = e => {
    this.element.style.width = `${e.pageX - leftCache}px`;
    this.handlersBox.style.width = `${e.pageX - leftCache}px`;
  };

  handleRightMouseUp = () => {
    this.element.classList.remove("dragging-handler");
    document.body.removeEventListener("mousemove", this.handleRightMouseMove);
    document.body.removeEventListener("mouseup", this.handleRightMouseUp);
  };

  handleBottomMouseDown = () => {};
  handleLeftMouseDown = () => {};
  handleTopLeftMouseDown = () => {};
  handleTopRightMouseDown = () => {};
  handleBottomRightMouseDown = () => {};
  handleBottomLeftMouseDown = () => {};
}

export default Resizer;
