import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, message } from "antd";
import moment from "moment";
import { CreateMainIncome } from "../../../models/IncomeDto";
import { createMainIncomeAPI } from "../../../services/IncomeService";

const AddMainIncome: React.FC = () => {
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
      const newIncome: CreateMainIncome = {
        userId,
        amount: values.amount,
        description: values.description,
        date: values.date.format("YYYY-MM-DD"),
        name: values.name
      };
      const response = await createMainIncomeAPI(newIncome);
      if (response && response.data.isSuccess) {
        message.success("Main income added successfully");
        setIsModalVisible(false);
        form.resetFields();
      } else {
        message.error("Failed to add main income");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Main Income
      </Button>
      <Modal
        title="Add Main Income"
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
          >
            <DatePicker defaultValue={moment()} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddMainIncome;
