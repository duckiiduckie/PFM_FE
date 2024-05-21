import React, { useState, useEffect } from "react";
import { Button, List, Modal, Form, Input, notification } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import { CategoryDto } from "../../../models/ExpenseDto";
import { getCategoryListAPI, updateCategoryAPI } from "../../../services/ExpenseService";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editedCategory, setEditedCategory] = useState<CategoryDto | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategoryListAPI(localStorage.getItem("user") as string);
      if (response) {
        setCategories(response.data.result as CategoryDto[]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEditCategory = (category: CategoryDto) => {
    setEditedCategory(category);
    form.setFieldsValue({ categoryName: category.name });
    setIsModalVisible(true);
  };

  const handleUpdateCategory = async () => {
    try {
      const values = await form.validateFields();
      if (editedCategory) {
        const updatedCategory: CategoryDto = {
          ...editedCategory,
          name: values.categoryName,
        };
        await updateCategoryAPI(updatedCategory.id, updatedCategory);
        notification.success({
          message: "Success",
          description: "Category updated successfully",
        });
        fetchCategories();
        setIsModalVisible(false);
      }
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
    <div className="border border-gray-200 rounded-md p-4">
      <List
        dataSource={categories}
        renderItem={(category) => (
          <List.Item className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>{category.name}</span>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEditCategory(category)}
            >
              Edit
            </Button>
          </List.Item>
        )}
      />
      <Modal
        title="Edit Category"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleUpdateCategory}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[
              { required: true, message: "Please enter a category name" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryList;
