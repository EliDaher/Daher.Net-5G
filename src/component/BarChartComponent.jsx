import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Component المخطط
const BarChartComponent = ({data}) => {

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={30}
        >
          <XAxis dataKey="sender" scale="point" padding={{ left: 20, right: 20 }} />
          <YAxis/>
          <Tooltip />
          <CartesianGrid strokeDasharray="4 4" />
          <Bar dataKey="congestion" className='fill-primary-400 stroke-primary-400' background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
