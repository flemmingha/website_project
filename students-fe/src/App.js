import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import StockAPI from "./components/StockAPI";
//import PersonList from "./components/Test";

class App extends Component {
  render() {
    return (
      <Fragment>
        {/* <Header /> */}
        {/* <Home /> */}
        <StockAPI />
      </Fragment>
    );
  }
}

export default App;