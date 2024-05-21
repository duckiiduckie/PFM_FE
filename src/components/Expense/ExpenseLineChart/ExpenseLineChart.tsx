import { useEffect, useState } from "react";
import { ReadExpenseDto } from "../../../models/ExpenseDto";
import { getExpenseListAPI } from "../../../services/ExpenseService";
import moment from "moment";
import { Line } from "@ant-design/charts";

const ExpenseLineChart: React.FC = () => {
  const [data, setData] = useState<ReadExpenseDto[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getExpenseListAPI(localStorage.getItem('user') as string);
      if (response) {
        const expenses = response.data.result as ReadExpenseDto[];
        setData(expenses);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const transformDataForChart = (expenses: ReadExpenseDto[]) => {
    return expenses.map(expense => ({
      date: moment(expense.date).format('YYYY-MM-DD'),
      amount: expense.amount
    }));
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Expense Line Chart</h2>
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

export default ExpenseLineChart;