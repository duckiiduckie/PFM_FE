import React, { useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { AxiosError } from "axios";
import { createCategoryAPI } from "../../../services/IncomeService";

const IncomeAddCategoryButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleFinish = async (values: { categoryName: string }) => {
    try {
      await createCategoryAPI({
        name: values.categoryName,
        userId: localStorage.getItem("user") as string,
      });
      notification.success({
        message: "Success",
        description: "Category created successfully",
      });
      handleCloseModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        notification.error({
          message: "Error",
          description: error.response?.data.message,
        });
      }
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Add Category
      </Button>
      <Modal
        title="Add Category"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[{ required: true, message: "Please enter a category name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default IncomeAddCategoryButton;
