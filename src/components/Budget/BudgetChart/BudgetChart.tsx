import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { ReadBudget } from "../../../models/BudgetDto";
import { getBudgetNowAPI } from "../../../services/BudgetService";
import { Pie, PieConfig } from "@ant-design/charts";

const BudgetChart: React.FC = () => {
  const [budgetData, setBudgetData] = useState<ReadBudget | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getBudgetNowAPI(localStorage.getItem("user") as string);
      if (response) {
        const budget = response.data.result as ReadBudget;
        setBudgetData(budget);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const data = [
    {
      type: "Essential",
      value: budgetData?.usedEssential || 0,
    },
    {
      type: "Want",
      value: budgetData?.usedWant || 0,
    },
    {
      type: "Saving & Investment",
      value: budgetData?.usedSavingAndInvestment || 0,
    },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const config: PieConfig = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      text: 'value',
      position: 'outside',
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
    // interactions: [{ type: "element-active" }],
  };

  return (
    <Card title="Budget Chart">
      {budgetData && <Pie {...config} />}
    </Card>
  );
};

export default BudgetChart;
