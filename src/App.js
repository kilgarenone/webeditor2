import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import prepareContainerCreationProcess from "./container";

class App extends Component {
  state = { activeRectangle: false, activeSelect: true };
  componentDidMount() {
    this.handlers = prepareContainerCreationProcess(this.handleClickSelectTool);
  }

  handleClickSelectTool = () => {
    const canvas = this.handlers.canvas;
    const select = this.handlers.container;
    this.setState({ activeRectangle: false, activeSelect: true });
    canvas.element.removeEventListener("mousedown", canvas.mousedown);
    select.element.addEventListener("click", select.click);
  };

  handleClickRectangleTool = () => {
    const select = this.handlers.container;
    const canvas = this.handlers.canvas;
    this.setState({ activeRectangle: true, activeSelect: false });
    select.element.removeEventListener("click", select.click);
    canvas.element.addEventListener("mousedown", canvas.mousedown);
  };

  render() {
    return (
      <>
        <header className="header">
          <div
            className={`tool${this.state.activeSelect ? " tool-isActive" : ""}`}
          >
            <svg width="24" height="24" viewBox="0 0 50 50">
              <path d="M14.8 5a.9.9 0 0 0-.2 0l-.1.1-.2.2-.2.2v.2l-.1.1V39a1 1 0 0 0 1.7.7l7.2-6.8 5.9 13.5a1 1 0 0 0 1.3.5l4.4-2c.5-.2.7-.8.5-1.3l-6-13.3 10-.9c.5 0 .8-.3 1-.7a1 1 0 0 0-.3-1L15.8 5.4l-.1-.1-.1-.1-.1-.1h-.2l-.1-.1H15 15h-.1-.1zM16 8.3l20.7 19.3-9.4.8a1 1 0 0 0-.8.5 1 1 0 0 0 0 1l6.3 13.6-2.6 1.2-6-13.9a1 1 0 0 0-1.6-.3L16 36.7z" />
            </svg>
            <label>Select</label>
          </div>
          <div
            className={`tool${
              this.state.activeRectangle ? " tool-isActive" : ""
            }`}
            onClick={this.handleClickRectangleTool}
          >
            <svg width="24" height="24" viewBox="0 0 16 16">
              <path d="M1.5 2c-.3 0-.5.2-.5.5v10c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5v-10c0-.3-.2-.5-.5-.5zM2 3h12v9H2z" />
            </svg>
            <label>Container</label>
          </div>
        </header>
        <div id="canvas" />
        <div className="dimension-indicator" />
        <div className="shape-handlers hide-handlers">
          <div className="handler--top" />
          <div className="handler--right" />
          <div className="handler--bottom" />
          <div className="handler--left" />
          <div className="handler-box handler--top-left" />
          <div className="handler-box handler--top-right" />
          <div className="handler-box handler--bottom-right" />
          <div className="handler-box handler--bottom-left" />
        </div>
      </>
    );
  }
}

export default App;
