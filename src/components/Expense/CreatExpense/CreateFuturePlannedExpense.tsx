import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Select, message } from "antd";
import moment from "moment";
import { CreateFuturePlannedExpense } from "../../../models/ExpenseDto";
import { createFuturePlannedExpenseAPI } from "../../../services/ExpenseService";

const { Option } = Select;

const AddFuturePlannedExpense: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const userId = localStorage.getItem("user") as string;
      const newExpense: CreateFuturePlannedExpense = {
        userId,
        amount: values.amount,
        description: values.description,
        date: values.date.toDate(),
        status: "pending" // Default status
      };
      const response = await createFuturePlannedExpenseAPI(newExpense);
      if (response && response.data.isSuccess) {
        message.success("Future planned expense added successfully");
        setIsModalVisible(false);
        form.resetFields();
      } else {
        message.error("Failed to add future planned expense");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Future Planned Expense
      </Button>
      <Modal
        title="Add Future Planned Expense"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please input the amount!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the description!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker defaultValue={moment()} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddFuturePlannedExpense;
