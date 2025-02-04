import React, { Component, useState } from 'react';

function loadData() {
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.setState({ data });
    });
}
class DataTable extends Component {
  //const [data, setData] = useState([]);

  constructor(props) {
    super(props);
    // Initialize state
    this.state = {};
    this.datu = [];
    this.mes = [];
  }
  // Simulate data fetching
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.mes = data;
      
      });
  }
  render() {
    const { data } = this.state;

    return (
      <div className="div">
        <button onClick={loadData}>Load</button>
        <br />
        <br />
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.title}</td>
                  <td>{row.body}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
