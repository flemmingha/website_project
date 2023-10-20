import React, { Component } from "react";
import axios from 'axios';

class Stock extends Component { 
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
        <li>{this.state.stockprices.ticker}</li>     
      </ul>
    )
  }
}

export default Stock;