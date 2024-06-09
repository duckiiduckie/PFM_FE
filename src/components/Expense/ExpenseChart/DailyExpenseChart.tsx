import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import moment from "moment";
import { getDailyExpensesAPI } from "../../../services/ExpenseService";
import { ReadDailyExpense } from "../../../models/ExpenseDto";

const DailyExpenseLineChart: React.FC = () => {
  const [data, setData] = useState<{ date: string; totalExpense: number }[]>([]);

  useEffect(() => {
    fetchDailyExpenses();
  }, []);

  const fetchDailyExpenses = async () => {
    try {
      const userId = localStorage.getItem("user") as string;
      const response = await getDailyExpensesAPI(userId);
      if (response && response.data) {
        const expenses = response.data.result as ReadDailyExpense[];
        const expenseData = groupExpensesByDate(expenses);
        setData(expenseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const groupExpensesByDate = (expenses: ReadDailyExpense[]): { date: string; totalExpense: number }[] => {
    const groupedData: { [date: string]: number } = {};
    expenses.forEach((expense) => {
      const dateKey = moment(expense.date).format("YYYY-MM-DD");
      if (groupedData[dateKey]) {
        groupedData[dateKey] += expense.amount;
      } else {
        groupedData[dateKey] = expense.amount;
      }
    });
    return Object.keys(groupedData).map((date) => ({
      date,
      totalExpense: groupedData[date],
    }));
  };

  const config = {
    data: data,
    xField: "date",
    yField: "totalExpense",
    label: {
      style: {
        fill: "#4F46E5",
        fontSize: 12,
      },
    },
    point: {
      size: 4,
      shape: "circle",
      style: {
        fill: "#4F46E5",
        stroke: "#fff",
        lineWidth: 1,
      },
    },
    title: {
      visible: true,
      text: "Daily Expenses",
    },
    description: {
      visible: true,
      text: "This chart shows the total expenses per day.",
    },
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md" style={{ width: '1000px' }}>
      <Line {...config} />
    </div>
  );
};

export default DailyExpenseLineChart;
