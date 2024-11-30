import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

const DailyBookingsTravelAgency = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/daily/bookings') // Update with your daily bookings endpoint
      .then((response) => {
        const bookingsData = response.data.map((item) => ({
          day: new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
          bookings: item.bookings,
        }));
        setData(bookingsData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <BarChart
      width={400}
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
      <XAxis dataKey="day" interval={0} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="bookings" fill="#82ca9d" />
    </BarChart>
  );
};

export default DailyBookingsTravelAgency;
