import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { getBudgetListAPI } from '../../../services/BudgetService';
import { BudgetGet } from '../../../models/BudgetDto';

interface Props {}

const BudgetLineChart: React.FC<Props> = () => {
  const [data, setData] = useState<BudgetGet[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getBudgetListAPI(localStorage.getItem('user') as string);
      if (response) {
        const budgets = response.data.result as BudgetGet[];
        setData(budgets);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const transformDataForChart = (budgets: BudgetGet[]) => {
    return budgets.map(budgets => ({
      id: budgets.id,
      amount: budgets.targetAmount - budgets.usedAmount,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">History Budget</h2>
      <div>
        <Line
          data={transformDataForChart(data)}
          xField='id'
          yField='amount'
          height={400}
        />
      </div>
    </div>
  );
};

export default BudgetLineChart;
