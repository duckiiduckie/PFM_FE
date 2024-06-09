import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, message } from "antd";
import moment from "moment";
import { CreateAdditionalIncome } from "../../../models/IncomeDto";
import { createAdditionalIncomeAPI } from "../../../services/IncomeService";

const AddAdditionalIncome: React.FC = () => {
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
      const newIncome: CreateAdditionalIncome = {
        userId,
        amount: values.amount,
        description: values.description,
        date: values.date.format("YYYY-MM-DD"),
        category: values.category
      };
      const response = await createAdditionalIncomeAPI(newIncome);
      if (response && response.data.isSuccess) {
        message.success("Additional income added successfully");
        setIsModalVisible(false);
        form.resetFields();
      } else {
        message.error("Failed to add additional income");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Additional Income
      </Button>
      <Modal
        title="Add Additional Income"
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
            // rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker defaultValue={moment()} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAdditionalIncome;
