import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src="C:\Users\flemm\Desktop\New Website\web_env\django_react_proj\students-fe\public\IMG_2400.JPG"
          width="300"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
        />
        <hr />
        <h5>
          <i>Workation</i>
        </h5>
        <h1>Kombiner arbejde og ferie</h1>
      </div>
    );
  }
}

export default Header;