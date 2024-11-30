import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

const MonthlyBookingsTravelAgency = () => {
  const [data, setData] = useState([
    { month: 'Jan', bookings: 0 },
    { month: 'Feb', bookings: 0 },
    { month: 'Mar', bookings: 0 },
    { month: 'Apr', bookings: 0 },
    { month: 'May', bookings: 0 },
    { month: 'Jun', bookings: 0 },
    { month: 'Jul', bookings: 0 },
    { month: 'Aug', bookings: 0 },
    { month: 'Sep', bookings: 0 },
    { month: 'Oct', bookings: 0 },
    { month: 'Nov', bookings: 0 },
    { month: 'Dec', bookings: 0 },
  ]);

  useEffect(() => {
    axios.get('/api/monthly/bookings')
      .then((response) => {
        const bookingsData = response.data;
        const updatedData = data.map((month) => {
          const booking = bookingsData.find((booking) => booking.month === month.month);
          if (booking) {
            return { ...month, bookings: booking.bookings };
          }
          return month;
        });
        setData(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <BarChart
      width={700}
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
      <XAxis dataKey="month" interval={0}/>
      <YAxis />
      <Tooltip />
      <Bar dataKey="bookings" fill="#8884d8" />
    </BarChart>
  );
};

export default MonthlyBookingsTravelAgency;