import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { CreateBudget, ReadBudget } from "../../../models/BudgetDto";
import {  createBudgetAPI, getBudgetNowAPI } from "../../../services/BudgetService";
import moment from "moment";
import { get } from "http";

const AddBudget: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = async () => {
      const res = await getBudgetNowAPI(localStorage.getItem("user") as string);
      const data = res?.data.result as ReadBudget;
      if(data != null) {
        return;
      }
      form.setFieldsValue({
        amount: 0,
        essentialPercent: 50,
        wantPercent: 20,
        savingAndInvestmentPercent: 20,
      });
      setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

        const userId = localStorage.getItem("user") as string;
        const updatedBudget: CreateBudget = {
          userId,
          amount: values.amount,
          date: moment().toDate(),
          userEmail: localStorage.getItem("email") as string,
          type: "monthly",
          isMailSent: false,
          essential: (values.amount * values.essentialPercent) / 100,
          want: (values.amount * values.wantPercent) / 100,
          savingAndInvestment: (values.amount * values.savingAndInvestmentPercent) / 100,
        };

        const response = await createBudgetAPI( updatedBudget);
        if (response && response.data.isSuccess) {
          message.success("Budget updated successfully");
          setIsModalVisible(false);
          form.resetFields();
        } else {
          message.error("Failed to update budget");
        }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Budget
      </Button>
      <Modal
        title="Edit Budget"
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
            name="essentialPercent"
            label="Essential (%)"
            rules={[{ required: true, message: "Please input the essential percentage!" }]}
          >
            <Input type="number" min={0} max={100} />
          </Form.Item>
          <Form.Item
            name="wantPercent"
            label="Want (%)"
            rules={[{ required: true, message: "Please input the want percentage!" }]}
          >
            <Input type="number" min={0} max={100} />
          </Form.Item>
          <Form.Item
            name="savingAndInvestmentPercent"
            label="Saving and Investment (%)"
            rules={[{ required: true, message: "Please input the saving and investment percentage!" }]}
          >
            <Input type="number" min={0} max={100} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddBudget;
