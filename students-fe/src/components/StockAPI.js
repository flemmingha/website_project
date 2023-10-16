//import "./styles.css";
import { useState, useEffect, Component } from "react";

import axios from "axios";

//Rename this one to stock api?

export default function StockAPI() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_limit=10`
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

//Rename this one to stock api and use component?
class StockAPI extends Component {
  render() {
    return (
      <div className="StockAPI">
        <h1>API Posts</h1>
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <ul>
          {data &&
            data.map(({ id, title }) => (
              <li key={id}>
                <h3>{title}</h3>
              </li>
            ))}
        </ul>
      </div>
      );
    }
  }
}