import React from "react";
import { Bar } from "react-chartjs-2";
 import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
 import Button from 'react-bootstrap/Button';
 import Form from 'react-bootstrap/Form';
 import InputGroup from 'react-bootstrap/InputGroup';
// // Register chart components
 ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TwitterChart = () => {
  const data = {
    labels: ["8205", "3240", "3234", "3282", "3361", "3987", "5773", "1864", "5549", "9264"],
    datasets: [
      { label: "Retweets", data: [58, 0, 0, 1195, 9, 0, 0, 0, 8, 0], backgroundColor: "blue" },
      { label: "Likes", data: [0, 1, 7, 0, 93, 4, 5, 6, 116, 2], backgroundColor: "green" },
      { label: "Impressions", data: [2, 454, 1846, 0, 7466, 373, 983, 1157, 20082, 4390], backgroundColor: "red" },
    ],
  };
  const options = {
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tweet ID  (Last 4 digit)📌", // X-axis label
          font: { size: 16, weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Engagement Count 🔢", // Y-axis label
          font: { size: 16, weight: "bold" },
        },
        beginAtZero: true,
      },
    },
  };
  return (
<div class="row pt-4"><div class="col-12 d-flex justify-content-between align-items-center"><h2>Twitter</h2>
<div class="row pr-4"><InputGroup className="mb-3">
        <Form.Control
          placeholder="Search # tag"
          aria-label="Search # tag"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup> </div>

</div>
<Bar data={data} options={options} />
    </div>
    // <div style={{ width: "80%", margin: "auto" }}>
    //   <h2>Twitter Engagement Chart 📊</h2>
    //   <Bar data={data} />
    // </div>
  );
};

export default TwitterChart;
