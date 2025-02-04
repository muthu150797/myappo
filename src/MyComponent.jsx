import React, { useState } from 'react';
import { useToken } from './TokenContext.js';

const MyComponent = () => {
  const { token, setToken } = useToken();
  const [tableData, setTableData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Step 2: Fetch data function
  const fetchData = () => {
    // Replace this with your data fetching logic
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.mes = data;
        setTableData(data);
      });
    setIsLoaded(true);
  };

  // Step 3: Update state on button click
  const handleClick = () => {
    fetchData();
  };
  const logout = () => {
    setToken('');
  };
  return (
    <div>
      <button onClick={handleClick}>Load Table</button>
      <button onClick={logout}>logout</button>

      {/* Step 4: Render the table */}
      {isLoaded && (
        <table border="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>{row.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyComponent;
