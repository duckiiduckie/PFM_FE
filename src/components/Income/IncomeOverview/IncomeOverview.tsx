import React, { useState, useEffect } from 'react';
import { Statistic, Row, Col } from 'antd';
import { IncomeGet } from '../../../models/IncomeDto';
import { getIncomeListAPI } from '../../../services/IncomeService';

const IncomeOverview: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getIncomeListAPI(localStorage.getItem('user') as string);
      if (response) {
        const incomes = response.data.result as IncomeGet[];
        const total = calculateTotalAmount(incomes);
        const min = calculateMinAmount(incomes);
        const max = calculateMaxAmount(incomes);
        setTotalAmount(total);
        setTotalEntries(incomes.length);
        setMinAmount(min);
        setMaxAmount(max);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotalAmount = (incomes: IncomeGet[]) => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  const calculateMinAmount = (incomes: IncomeGet[]) => {
    if (incomes.length === 0) return 0;
    return Math.min(...incomes.map(income => income.amount));
  };

  const calculateMaxAmount = (incomes: IncomeGet[]) => {
    if (incomes.length === 0) return 0;
    return Math.max(...incomes.map(income => income.amount));
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Income Overview</h2>
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

export default IncomeOverview;
