import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Info from "./components/Test";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
        <Info />
      </Fragment>
    );
  }
}

export default App;
