import React from 'react';
import { Line } from '@ant-design/charts';

const ChartLine: React.FC = () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
  };
  return (
    <div className="w-9/12 px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
            <Line {...config} />
      </div>
    </div>
  );
 
};
export default ChartLine;