import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src=".\django_react_proj\students-fe\public\logo192.png"
          width="300"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
          alt="what?"
        />
        <hr />
        <h5>
          <i>Workation</i>
        </h5>
        <h1>Kombiner arbejde og ferie i de smukkeste omgivelser</h1>
      </div>
    );
  }
}

export default Header;

// Du kan kopiere det hele her og genbruge det i den nye app
