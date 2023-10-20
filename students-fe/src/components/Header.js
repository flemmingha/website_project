import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src="/1393720.jpg" 
          alt="stock" 
          width="500"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
        />
        <hr />
        <h1>Portfolio tracker</h1>
        <h5>
          <i>Portfolio Overview</i>
        </h5>
      </div>
    );
  }
}

export default Header;
