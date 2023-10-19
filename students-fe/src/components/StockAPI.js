import React, { Component } from "react";

class Stock extends Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>{person.name}</li>
            )
        }
      </ul>
    )
  }
}

export default Stock;


//import React from 'react';
//import axios from 'axios';

/*
import React, { Component } from "react";

class Stock extends Component {
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
        <h1>Kombiner arbejde og ferie i de smukkeste omgivelser</h1>
      </div>
    );
  };
}

export default Stock;

*/

  /*
 
  state = {
    stockprices: []
  }

  componentDidMount() {
    axios.get(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=wS1qEJjs3M9UE6r8Ca1ovmJp50yt_nie`)
      .then(res => {
        const stockprices = res.data;
        this.setState({ stockprices });
        console.log(stockprices);
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.stockprices
            .map(stockprice =>
              <li key={stockprice.ticker}></li>
            )
        }
      </ul>
    )
  }
}
*/