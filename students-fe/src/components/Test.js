import React, { Component } from "react";

class Info extends Component {
    render() {
        return (
          <div className="text-center">
            <h3>
              <strong>Hvad kunne det være interessant at lave et website om?</strong>
            </h3>
            <h1>
                <li>medicin?
                <li>rejser?</li>
                <li>finans?</li>
                <li>mig selv som konsulent?</li>
                <li>en opdatering af negovista?</li>
                </li>
            </h1>
            <href url= "http://localhost:8000/api/students/">api overview</href>
          </div>
        );
      }
}
export default Info;
