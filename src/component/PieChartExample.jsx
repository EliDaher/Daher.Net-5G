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
          <Pie
            fill='#005EFF'
            dataKey="value"
            data={dataSet}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            label={({ speed, value }) => `${speed}: ${value / speed}`}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <h1 className='absolute bottom-4 w-full text-center font-bold text-secondary'>Total : <strong className='text-primary'>{getTotalSpeed()}</strong>M</h1>
    </div>
  );
};

export default PieChartExample;
