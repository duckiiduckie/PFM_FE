import React, { useState, useEffect } from 'react';
import { Statistic, Row, Col } from 'antd';
import { Line } from '@ant-design/charts';
import moment from 'moment';
import { ReadExpenseDto } from '../../../models/ExpenseDto';
import { getExpenseListAPI } from '../../../services/ExpenseService';

const ExpenseOverview: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getExpenseListAPI(localStorage.getItem('user') as string);
      if (response) {
        const expenses = response.data.result as ReadExpenseDto[];
        const total = calculateTotalAmount(expenses);
        const min = calculateMinAmount(expenses);
        const max = calculateMaxAmount(expenses);
        setTotalAmount(total);
        setTotalEntries(expenses.length);
        setMinAmount(min);
        setMaxAmount(max);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotalAmount = (expenses: ReadExpenseDto[]) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateMinAmount = (expenses: ReadExpenseDto[]) => {
    if (expenses.length === 0) return 0;
    return Math.min(...expenses.map(expense => expense.amount));
  };

  const calculateMaxAmount = (expenses: ReadExpenseDto[]) => {
    if (expenses.length === 0) return 0;
    return Math.max(...expenses.map(expense => expense.amount));
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Expense Overview</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Total Amount" value={totalAmount} precision={2} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Entries" value={totalEntries} />
        </Col>
        <Col span={12}>
          <Statistic title="Min Amount" value={minAmount} precision={2} />
        </Col>
        <Col span={12}>
          <Statistic title="Max Amount" value={maxAmount} precision={2} />
        </Col>
      </Row>
    </div>
  );
};

export default ExpenseOverview;