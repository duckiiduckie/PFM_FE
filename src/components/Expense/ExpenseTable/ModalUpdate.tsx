import { useEffect, useState } from "react";
import { getExpenseAPI, updateExpenseAPI } from "../../../services/ExpenseService";
import dayjs from "dayjs";
import { ReadExpenseDto, ExpensePost } from "../../../models/ExpenseDto";
import { Button, Col, Form, Input, Modal, notification, Row } from "antd";
import { AxiosError } from "axios";
import { getBudgetNowAPI } from "../../../services/BudgetService";

type Props = {
  id: number;
  isShow: string;
  onClose: () => void;
};

export interface ExpenseCreate {
  amount: number;
  description: string;
  categoryName: string;
}

const ModalUpdate: React.FC<Props> = ({ id, isShow, onClose }) => {
  const [initExpense, setInitExpense] = useState<ExpenseCreate | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExpenseAPI(id);
        if (res) {
          const tmp = res.data.result as ReadExpenseDto;
          setInitExpense({
            description: tmp.description,
            amount: tmp.amount,
            categoryName: tmp.categoryName,
          });
          form.setFieldsValue({
            description: tmp.description,
            amount: tmp.amount,
            categoryName: tmp.categoryName,
          });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          notification.error({
            message: "ERROR",
            description: error.response?.data.info.message,
          });
        }
      }
    };

    if (localStorage.getItem("user")) {
      fetchData();
    }
  }, [id, form]);

  const onFinish = async (values: ExpenseCreate) => {
    try {
      const updateAccountResponse = await updateExpenseAPI(id, {
          userId: localStorage.getItem("user") as string,
          amount: values.amount,
          description: values.description,
          categoryName: values.categoryName,
          date: dayjs().format("YYYY-MM-DDTHH:mm:ss"), // Include time in the date format
      } as unknown as ExpensePost);
      await getBudgetNowAPI(localStorage.getItem('user') as string);
      if (updateAccountResponse) {
        notification.success({
          message: "SUCCESS",
          description: "Expense updated successfully",
        });
        onClose();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        notification.error({
          message: "ERROR",
          description: error.response?.data.info.message,
        });
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="UPDATE EXPENSE"
      open={isShow === "true"}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initExpense || {}}
        onFinish={onFinish}
      >
        <div className="p-6">
          <div className="bg-white px-6 py-6 shadow-01">
            <Row gutter={[16, 24]}>
              <Col xs={24} lg={12}>
                <Form.Item name="amount" label="AMOUNT">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="description" label="DESCRIPTION">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="categoryName" label="CATEGORY NAME">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600"
                  >
                    SAVE
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalUpdate;
