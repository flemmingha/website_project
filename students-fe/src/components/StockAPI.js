import React from 'react';
import axios from 'axios';

export default class StockQuote extends React.Component {
  state = {
    stockprices: []
  }

  componentDidMount() {
    axios.get(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=wS1qEJjs3M9UE6r8Ca1ovmJp50yt_nie`)
      .then(res => {
        const stockprices = res.data;
        this.setState({ stockprices });
        console.log(stockprices)
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