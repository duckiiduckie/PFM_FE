import React, { useState } from 'react';
import { Button, Modal, Form, Input, notification, DatePicker } from 'antd';
import { createBudgetAPI } from '../../../services/BudgetService';
import { AxiosError } from 'axios';

const BudgetModal: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleFinish = async (values: any) => {
        try {
            await createBudgetAPI({
                targetAmount: values.targetAmount,
                startDate: values.startDate,
                endDate: values.endDate,
                userId: localStorage.getItem('user') as string,
                userEmail: localStorage.getItem('email') as string,
                isMailSent: false,
            });
            notification.success({
                message: 'Success',
                description: 'Budget created successfully',
            });
            handleCloseModal();
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: 'Error',
                    description: error.response?.data.info.message,
                });
            }
        }
    };

    return (
        <>
            <Button type="primary" onClick={handleOpenModal}>
                Create Budget
            </Button>
            <Modal
                title="Create Budget"
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        name="targetAmount"
                        label="Target Amount"
                        rules={[{ required: true, message: 'Please enter the target amount' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="startDate"
                        label="Start Date"
                        rules={[{ required: true, message: 'Please select the start date' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="endDate"
                        label="End Date"
                        rules={[{ required: true, message: 'Please select the end date' }]}
                    >
                        <DatePicker />
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

export default BudgetModal;
