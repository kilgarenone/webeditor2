import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import prepareContainerCreationProcess from "./container";

class App extends Component {
  componentDidMount() {
    prepareContainerCreationProcess();
  }

  render() {
    return (
      <>
        <div id="canvas" />
        <div class="dimension-indicator" />
        <div class="shape-handlers" />
      </>
    );
  }
}

export default App;
