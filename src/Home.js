import React, { useState, useEffect } from 'react';

const Home = () => {
  function loadData() {
    fetch('https://newapi-5y5y.onrender.com')
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        this.setState({ data });
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  }
  loadData();
  return <div>Welcome to home</div>;
};
export default Home;
