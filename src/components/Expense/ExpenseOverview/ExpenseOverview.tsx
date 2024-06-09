import React, { useState, useEffect } from "react";
import { Statistic, Row, Col, Divider } from "antd";
import { getDailyExpensesAPI, getFuturePlannedExpensesAPI } from "../../../services/ExpenseService";
import { ReadDailyExpense, ReadFuturePlannedExpense } from "../../../models/ExpenseDto";

const ExpenseOverview: React.FC = () => {
  const [dailyExpenseTotal, setDailyExpenseTotal] = useState<number>(0);
  const [futurePlannedExpenseTotal, setFuturePlannedExpenseTotal] = useState<number>(0);
  const [dailyExpenseCount, setDailyExpenseCount] = useState<number>(0);
  const [futurePlannedExpenseCount, setFuturePlannedExpenseCount] = useState<number>(0);

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async () => {
    try {
      // Lấy dữ liệu chi phí hàng ngày
      const dailyExpenseResponse = await getDailyExpensesAPI(localStorage.getItem("user") as string);
      if (dailyExpenseResponse && dailyExpenseResponse.data) {
        const dailyExpenses: ReadDailyExpense[] = dailyExpenseResponse.data.result as ReadDailyExpense[];
        const dailyTotal: number = dailyExpenses.reduce((acc: number, expense: ReadDailyExpense) => acc + expense.amount, 0);
        setDailyExpenseTotal(dailyTotal);
        setDailyExpenseCount(dailyExpenses.length);
      }

      // Lấy dữ liệu chi phí dự định cho tương lai
      const futurePlannedExpenseResponse = await getFuturePlannedExpensesAPI(localStorage.getItem("user") as string);
      if (futurePlannedExpenseResponse && futurePlannedExpenseResponse.data) {
        const futurePlannedExpenses: ReadFuturePlannedExpense[] = futurePlannedExpenseResponse.data.result as ReadFuturePlannedExpense[];
        const futureTotal: number = futurePlannedExpenses.reduce((acc: number, expense: ReadFuturePlannedExpense) => acc + expense.amount, 0);
        setFuturePlannedExpenseTotal(futureTotal);
        setFuturePlannedExpenseCount(futurePlannedExpenses.length);
      }
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-4">Expense Overview</h1>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="Daily Expense Total" value={dailyExpenseTotal} precision={2} className="bg-gray-100 p-4 rounded-md" />
        </Col>
        <Col span={12}>
          <Statistic title="Future Planned Expense Total" value={futurePlannedExpenseTotal} precision={2} className="bg-gray-100 p-4 rounded-md" />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="Number of Daily Expenses" value={dailyExpenseCount} className="bg-gray-100 p-4 rounded-md" />
        </Col>
        <Col span={12}>
          <Statistic title="Number of Future Planned Expenses" value={futurePlannedExpenseCount} className="bg-gray-100 p-4 rounded-md" />
        </Col>
      </Row>
    </div>
  );
};

export default ExpenseOverview;
