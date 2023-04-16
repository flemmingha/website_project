import React, { Component } from "react";

class Info extends Component {
    render() {
        return (
          <div className="text-center">
            <h3>
              <strong>Hvad kunne det være interessant at lave et website om?</strong>
            </h3>
            <h1>
                <li>medicin?</li>
                <li>rejser?</li>
                <li>finans?</li>
                <li>mig selv som konsulent?</li>
                <li>en opdatering af negovista?</li>
                <li>Et website hvor brugere kan indtaste data?</li>
            </h1>
            <br></br>
            <button><href url= "http://localhost:8000/api/students/">api overview</href></button>
            <br></br>
            <br></br>
            <textarea type="text" placeholder="skriv noget her"></textarea>
            <br></br>
            <br></br>
            <input type="text" placeholder="skriv noget her"></input>
          </div>
        );
      }
}
export default Info;

// Din egen test, kan udelades - Du skal lave et link til den nye app her - hvordan gør man`?
