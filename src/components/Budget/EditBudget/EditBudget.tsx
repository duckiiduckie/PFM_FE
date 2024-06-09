import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { CreateBudget, ReadBudget } from "../../../models/BudgetDto";
import { updateBudgetAPI, getBudgetNowAPI } from "../../../services/BudgetService";

const EditBudget: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentBudget, setCurrentBudget] = useState<ReadBudget | null>(null);

  const showModal = async () => {
    const userId = localStorage.getItem("user") as string;
    const response = await getBudgetNowAPI(userId);
    if (response && response.data.isSuccess) {
      const budget = response.data.result as ReadBudget;
      setCurrentBudget(budget);
      form.setFieldsValue({
        amount: budget.amount,
        essentialPercent: (budget.essential / budget.amount) * 100,
        wantPercent: (budget.want / budget.amount) * 100,
        savingAndInvestmentPercent: (budget.savingAndInvestment / budget.amount) * 100,
      });
      setIsModalVisible(true);
    } else {
      message.error("Failed to fetch current budget");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
    //   const totalPercent = values.essentialPercent + values.wantPercent + values.savingAndInvestmentPercent;

    //   // Allow a small tolerance for floating-point precision errors
    //   const tolerance = 0.01;
    //   if (Math.abs(totalPercent - 100) > tolerance) {
    //     message.error("The total percentage of essential, want, and saving & investment must equal 100%");
    //     return;
    //   }

      if (currentBudget) {
        const userId = localStorage.getItem("user") as string;
        const updatedBudget: CreateBudget = {
          userId,
          amount: values.amount,
          date: new Date(),
          userEmail: currentBudget.userEmail,
          type: currentBudget.type,
          isMailSent: currentBudget.isMailSent,
          essential: (values.amount * values.essentialPercent) / 100,
          want: (values.amount * values.wantPercent) / 100,
          savingAndInvestment: (values.amount * values.savingAndInvestmentPercent) / 100,
        };

        const response = await updateBudgetAPI(currentBudget.id, updatedBudget);
        if (response && response.data.isSuccess) {
          message.success("Budget updated successfully");
          setIsModalVisible(false);
          form.resetFields();
        } else {
          message.error("Failed to update budget");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit Budget
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

export default EditBudget;
