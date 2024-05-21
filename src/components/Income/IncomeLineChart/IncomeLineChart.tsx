import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { IncomeGet } from '../../../models/IncomeDto';
import { getIncomeListAPI } from '../../../services/IncomeService';
import moment from 'moment';

const IncomeLineChart: React.FC = () => {
  const [data, setData] = useState<IncomeGet[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getIncomeListAPI(localStorage.getItem('user') as string);
      if (response) {
        const incomes = response.data.result as IncomeGet[];
        setData(incomes);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const transformDataForChart = (incomes: IncomeGet[]) => {
    return incomes.map(income => ({
      date: moment(income.date).format('YYYY-MM-DD'),
      amount: income.amount
    }));
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Income Line Chart</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <Line
          data={transformDataForChart(data)}
          xField='date'
          yField='amount'
          height={400}
        />
      </div>
    </div>
  );
};

export default IncomeLineChart;
