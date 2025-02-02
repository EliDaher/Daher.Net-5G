import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const PieChartExample = ({dataSet}) => {

  const getTotalSpeed = () =>{
    var total = 0;
    dataSet.map(datas => {
        total += datas.value;
    })
    return total;
  }  
   
  return (
    <div className="w-full h-80 relative">
      <ResponsiveContainer>
        <PieChart>
        <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#04625B" />
        </filter>
      </defs>
          <Pie
            filter="url(#shadow)"
            className='fill-primary-400'
            dataKey="value"
            data={dataSet}
            paddingAngle={10}
            cx="50%"
            cy="50%"
            stroke="#fff"
            cornerRadius={5}
            innerRadius={40}
            outerRadius={80}
            label={({ speed, value }) => `${speed}: ${value / speed}`}
          />
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
      <h1 className='absolute bottom-4 w-full text-center text-2xl font-bold text-secondary-400'>Total : <strong className='text-primary-400'>{getTotalSpeed()}</strong>M</h1>
    </div>
  );
};

export default PieChartExample;
