import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://server-xwsx.onrender.com");

export default function FundChart() {
  const [chartData, setChartData] = useState([]);
 // Listen for updates
 socket.on("update-employee-totals", (totalsByEmployee) => {
  setChartData([...totalsByEmployee]);
});
  useEffect(() => {
    if(!chartData.length > 0){        
        const getChartData = async ()=>{

          const response = await axios.post("https://server-xwsx.onrender.com/getEmployeesFund");
          setChartData(response.data.TotalFund)
            
        }
        getChartData()
    }
  }, []);

  return (
    <div className="w-full h-96">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="employee" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#06A99D"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
    </div>
  );
}
