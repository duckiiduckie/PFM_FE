import React, { useState, useEffect } from "react";
import { Table, DatePicker, Select } from "antd";
import { ReadBudget } from "../../../models/BudgetDto";
import { getBudgetsAPI } from "../../../services/BudgetService";
import moment from "moment";

const { Option } = Select;

const BudgetTable: React.FC = () => {
  const [data, setData] = useState<ReadBudget[]>([]);
  const [selectedType, setSelectedType] = useState<"month" | "year">("month");
  const [selectedValue, setSelectedValue] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("user") as string;
      const response = await getBudgetsAPI(userId);
      if (response) {
        const budgets = response.data.result as ReadBudget[];
        setData(budgets);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTypeChange = (type: "month" | "year") => {
    setSelectedType(type);
    setSelectedValue(undefined);
  };

  const handleValueChange = (value: moment.Moment | null) => {
    if (value) {
      const newValue = selectedType === "month" ? value.month() + 1 : value.year();
      setSelectedValue(newValue);
    } else {
      setSelectedValue(undefined);
    }
  };

  const filterDataByType = (item: ReadBudget) => {
    if (selectedValue === undefined) return true;
    const itemValue = moment(item.date)[selectedType === "month" ? "month" : "year"]();
    return itemValue + 1 === selectedValue;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Used Amount",
      dataIndex: "usedAmount",
      key: "usedAmount",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (time: Date) => moment(time).format("YYYY-MM-DD"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Used Essential",
      dataIndex: "usedEssential",
      key: "usedEssential",
    },
    {
      title: "Used Want",
      dataIndex: "usedWant",
      key: "usedWant",
    },
    {
      title: "Used Saving & Investment",
      dataIndex: "usedSavingAndInvestment",
      key: "usedSavingAndInvestment",
    },
  ];

  const filteredData = data.filter(filterDataByType);

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Select
          defaultValue="month"
          onChange={handleTypeChange}
          className="mr-4"
          style={{ width: 120 }}
        >
          <Option value="month">Month</Option>
          <Option value="year">Year</Option>
        </Select>
        <DatePicker.MonthPicker
          placeholder="Select month"
          onChange={handleValueChange}
          disabled={selectedType !== "month"}
          className="mr-4"
          style={{ width: 200 }}
        />
        <DatePicker
          picker="year"
          placeholder="Select year"
          onChange={handleValueChange}
          disabled={selectedType !== "year"}
          style={{ width: 120 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={(record) => record.id.toString()}
      />
    </div>
  );
};

export default BudgetTable;
