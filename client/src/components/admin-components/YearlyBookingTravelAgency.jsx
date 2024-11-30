import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

const YearlyBookingsTravelAgency = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/yearly/bookings')
      .then((response) => {
        const yearlyData = response.data.map((year) => ({
          year: year.year.toString(),
          bookings: year.bookings,
        }));
        setData(yearlyData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="bookings" fill="#82ca9d" />
    </BarChart>
  );
};

export default YearlyBookingsTravelAgency;
