import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Test from "./components/Test";
import StockAPI from "./components/StockAPI";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
        <Test />
        <StockAPI />
      </Fragment>
    );
  }
}

export default App;