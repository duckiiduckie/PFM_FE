import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  DatePicker,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Select,
} from "antd";
import moment from "moment";
import * as XLSX from "xlsx";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import {
  getFuturePlannedExpensesAPI,
  deleteFuturePlannedExpenseAPI,
  updateFuturePlannedExpenseAPI,
  createFuturePlannedExpenseAPI,
} from "../../../services/ExpenseService";
import { CreateFuturePlannedExpense, ReadFuturePlannedExpense } from "../../../models/ExpenseDto";

const { TextArea } = Input;
const { Option } = Select;

const expenseTypes = ["Essentials", "Wants", "Savings and Investments"];

const FuturePlannedExpenseTable: React.FC = () => {
  const [data, setData] = useState<ReadFuturePlannedExpense[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("user") as string;
      const response = await getFuturePlannedExpensesAPI(userId);
      if (response) {
        const expenses = response.data.result as ReadFuturePlannedExpense[];
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Future Planned Expenses");
    XLSX.writeFile(workbook, "future_planned_expenses.xlsx");
  };

  const handleEditClick = (id: number) => {
    setSelectedExpenseId(id);
    setIsModalVisible(true);
    const selectedRecord = data.find((record) => record.id === id);
    if (selectedRecord) {
      form.setFieldsValue({
        amount: selectedRecord.amount,
        description: selectedRecord.description,
        date: moment(selectedRecord.date),
        status: selectedRecord.status,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFuturePlannedExpenseAPI(id);
      message.success("Record deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Error deleting record");
      console.error("Error deleting data:", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedExpenseId(null);
    form.resetFields();
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedExpense: CreateFuturePlannedExpense = {
        ...values,
        userId: localStorage.getItem("user") as string,
      };
      const response = await updateFuturePlannedExpenseAPI(
        selectedExpenseId as number,
        updatedExpense
      );
      if (response && response.data.isSuccess) {
        message.success("Record updated successfully");
        setIsModalVisible(false);
        fetchData();
      } else {
        message.error("Error updating record");
      }
    } catch (error) {
      console.error("Error updating record:", error);
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
      render: (date: Date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
        <Button type="primary" onClick={handleExportToFile} className="mb-4">
          Export to Excel
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={(record) => record.id.toString()}
      />
      <Modal
        title="Edit Future Planned Expense"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical" initialValues={{ remember: true }}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please input the amount!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input the status!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FuturePlannedExpenseTable;
