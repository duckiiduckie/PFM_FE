import React, { useState, useEffect } from 'react';
import { getBudgetNowAPI } from '../../../services/BudgetService';
import { BudgetGet } from '../../../models/BudgetDto';

interface BudgetData {
  targetAmount: number;
  startDate: Date;
  endDate: Date;
  usedAmount: number;
}

const BudgetOverview: React.FC = () => {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBudgetNowAPI(localStorage.getItem('user') as string);
        if (response) {
          const result = response.data.result as BudgetGet;
          setBudgetData({
            targetAmount: result.targetAmount,
            startDate: new Date(result.startDate),
            endDate: new Date(result.endDate),
            usedAmount: result.usedAmount
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!budgetData) {
    return <div>No data.</div>;
  }

  const { targetAmount, startDate, endDate, usedAmount } = budgetData;

  const usedPercentage = (usedAmount / targetAmount) * 100;
  const progressBarColor = usedPercentage <= 100 ? 'bg-emerald-500' : 'bg-red-500';

  const formatDate = (date: Date) => date.toLocaleDateString();

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Current Budget Overview</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Target Amount: ${targetAmount.toFixed(2)}</h3>
        <p className="mt-2">Start Date: {formatDate(startDate)}</p>
        <p>End Date: {formatDate(endDate)}</p>
      </div>
      <div className="mb-4">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                Used: ${usedAmount.toFixed(2)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-emerald-600">
                {usedPercentage.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-200">
            <div
              style={{ width: `${usedPercentage}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${progressBarColor}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
