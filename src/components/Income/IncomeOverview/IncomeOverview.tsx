import React, { useState, useEffect } from "react";
import { Statistic, Row, Col, Divider } from "antd";
import { getMainIncomesAPI, getAdditionalIncomesAPI } from "../../../services/IncomeService";
import { ReadAdditionalIncome, ReadMainIncome } from "../../../models/IncomeDto";

const IncomeOverview: React.FC = () => {
  const [mainIncomeTotal, setMainIncomeTotal] = useState<number>(0);
  const [additionalIncomeTotal, setAdditionalIncomeTotal] = useState<number>(0);
  const [mainIncomeCount, setMainIncomeCount] = useState<number>(0);
  const [additionalIncomeCount, setAdditionalIncomeCount] = useState<number>(0);

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const fetchIncomeData = async () => {
    try {
      // Lấy dữ liệu thu nhập chính
      const mainIncomeResponse = await getMainIncomesAPI(localStorage.getItem("user") as string);
      if (mainIncomeResponse && mainIncomeResponse.data) {
        const mainIncomes: ReadMainIncome[] = mainIncomeResponse.data.result as ReadMainIncome[];
        const mainTotal: number = mainIncomes.reduce((acc: number, income: ReadMainIncome) => acc + income.amount, 0);
        setMainIncomeTotal(mainTotal);
        setMainIncomeCount(mainIncomes.length);
      }

      // Lấy dữ liệu thu nhập bổ sung
      const additionalIncomeResponse = await getAdditionalIncomesAPI(localStorage.getItem("user") as string);
      if (additionalIncomeResponse && additionalIncomeResponse.data) {
        const additionalIncomes: ReadAdditionalIncome[] = additionalIncomeResponse.data.result as ReadAdditionalIncome[];
        const additionalTotal: number = additionalIncomes.reduce((acc: number, income: ReadAdditionalIncome) => acc + income.amount, 0);
        setAdditionalIncomeTotal(additionalTotal);
        setAdditionalIncomeCount(additionalIncomes.length);
      }
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-4">Income Overview</h1>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="Main Income Total" value={mainIncomeTotal} precision={2} className="bg-gray-100 p-4 rounded-md" />
        </Col>
        <Col span={12}>
          <Statistic title="Additional Income Total" value={additionalIncomeTotal} precision={2} className="bg-gray-100 p-4 rounded-md" />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="Number of Main Incomes" value={mainIncomeCount} className="bg-gray-100 p-4 rounded-md" />
        </Col>
        <Col span={12}>
          <Statistic title="Number of Additional Incomes" value={additionalIncomeCount} className="bg-gray-100 p-4 rounded-md" />
        </Col>
      </Row>
    </div>
  );
};

export default IncomeOverview;
