import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Test from "./components/Test";
import StockAPI from "./components/StockAPI";
import PersonList from "./components/Test";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
        <Test />
        <PersonList />
        {/* <Api /> */}
      </Fragment>
    );
  }
}

export default App;