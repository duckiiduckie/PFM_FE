import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import moment from "moment";
import { CreateDailyExpense, Category } from "../../../models/ExpenseDto";
import { createDailyExpenseAPI } from "../../../services/ExpenseService";

const { Option } = Select;

const AddDailyExpense: React.FC = () => {
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
      const date = moment().toDate(); // Include the current time

      console.log("Date to be submitted:", date); // Log the date

      const newExpense: CreateDailyExpense = {
        userId,
        amount: values.amount,
        description: values.description,
        date,
        category: values.category,
        type: values.type,
      };

      const response = await createDailyExpenseAPI(newExpense);
      if (response && response.data.isSuccess) {
        message.success("Expense added successfully");
        setIsModalVisible(false);
        form.resetFields();
      } else {
        message.error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add expense due to an unexpected error.");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Daily Expense
      </Button>
      <Modal
        title="Add Expense"
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
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select the category!" }]}
          >
            <Select>
              {Object.keys(Category).map((key) => (
                <Option
                  key={key}
                  value={Category[key as keyof typeof Category]}
                >
                  {key}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select the type!" }]}
          >
            <Select>
              <Option value="Essential">Essential</Option>
              <Option value="Want">Want</Option>
              <Option value="Saving and Investment">
                Saving and Investment
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddDailyExpense;
