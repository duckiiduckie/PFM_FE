import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic } from "antd";
import { ReadBudget } from "../../../models/BudgetDto";
import { getBudgetNowAPI } from "../../../services/BudgetService";

const BudgetSummary: React.FC = () => {
  const [budgetData, setBudgetData] = useState<ReadBudget>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("user") as string;
      const response = await getBudgetNowAPI(userId);
      if (response) {
        const budget = response.data.result as ReadBudget;
        setBudgetData(budget);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTotalTargetAmount = (): number => {
    return budgetData?.amount || 0;
  };

  const getTotalUsedAmount = (): number => {
    return budgetData?.usedAmount || 0;
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getTotalRemainingAmount = (category: keyof ReadBudget): number => {
    const capitalizedCategory = capitalizeFirstLetter(category as string);
    const totalTarget = budgetData?.[category] || 0;
    const totalUsed = budgetData?.[`used${capitalizedCategory}` as keyof ReadBudget] || 0;
    return Number(totalTarget) - Number(totalUsed);
  };

  const getPercentageUsed = (): number | undefined => {
    if (budgetData) {
      const percentage = (budgetData.usedAmount / budgetData.amount) * 100;
      return Math.round(percentage);
    }
    return undefined;
  };

  return (
    <Card title="Budget Summary">
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="Total Target Amount" value={getTotalTargetAmount()} />
        </Col>
        <Col span={8}>
          <Statistic title="Total Used Amount" value={getTotalUsedAmount()} />
        </Col>
        <Col span={8}>
          <Statistic
            title="Percentage Used"
            value={getPercentageUsed()}
            suffix="%"
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Statistic title="Essential Remaining" value={getTotalRemainingAmount("essential")} />
        </Col>
        <Col span={8}>
          <Statistic title="Saving and Investment Remaining" value={getTotalRemainingAmount("savingAndInvestment")} />
        </Col>
        <Col span={8}>
          <Statistic title="Want Remaining" value={getTotalRemainingAmount("want")} />
        </Col>
      </Row>
    </Card>
  );
};

export default BudgetSummary;
