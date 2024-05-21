import React, { useState, useEffect } from "react";
import { Table, Input, DatePicker, Button, Popconfirm, message } from "antd";
import { ReadExpenseDto } from "../../../models/ExpenseDto";
import { getExpenseListAPI, deleteExpenseAPI } from "../../../services/ExpenseService";
import moment from "moment";
import * as XLSX from "xlsx";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import ModalUpdate from "./ModalUpdate";

const ExpenseTable: React.FC = () => {
  const [data, setData] = useState<ReadExpenseDto[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("user") as string;
      const response = await getExpenseListAPI(userId);
      if (response) {
        const expenses = response.data.result as ReadExpenseDto[];
        setData(expenses);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date);
  };

  const handleExportToFile = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expense Data");
    XLSX.writeFile(workbook, "expense_data.xlsx");
  };

  const handleEditClick = (id: number) => {
    setSelectedExpenseId(id);
    setIsModalVisible(true);
    localStorage.setItem("isExpenseModal", "true");
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExpenseAPI(id);
      message.success("Record deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Error deleting record");
      console.error("Error deleting data:", error);
    }
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: Date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <div className="flex">
          <EditTwoTone
            className="text-blue-500 mr-2"
            twoToneColor="#5151e5"
            onClick={() => handleEditClick(record.id)}
          />
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone className="text-red-500" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const filteredData = data.filter((item) => {
    const descriptionMatch = item.description
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const dateMatch = selectedDate
      ? moment(item.date).isSame(selectedDate, "day")
      : true;
    return descriptionMatch && dateMatch;
  });

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <DatePicker
          placeholder="Select date"
          onChange={handleDateChange}
          className="mr-4"
        />
        <Input
          placeholder="Search description"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="mr-4 w-1/3"
        />
        <Button
          type="primary"
          onClick={handleExportToFile}
          className="mb-4"
        >
          Export to Excel
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={(record) => record.id.toString()}
      />
      {isModalVisible && selectedExpenseId !== null && (
        <ModalUpdate
          id={selectedExpenseId}
          isShow={isModalVisible.toString()}
          onClose={() => {
            setIsModalVisible(false);
            localStorage.setItem("isExpenseModal", "false");
          }}
        />
      )}
    </div>
  );
};

export default ExpenseTable;
