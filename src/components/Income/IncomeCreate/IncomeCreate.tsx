import { Col, Input, Row, Form, DatePicker, notification, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { createIncomeAPI } from "../../../services/IncomeService";
import { IncomePost } from "../../../models/IncomeDto";

type Props = {};

export interface IncomeCreate {
  amount: number;
  description: string;
  categoryName: string;
}

const IncomeCreate = (props: Props) => {
  const [initIncome, setinitIncome] = useState<IncomeCreate>();
  const [form] = useForm<IncomeCreate>();

  const onFinish = async (values: IncomeCreate) => {

    try {

        const updateAccountResponse = await createIncomeAPI(
            {
              userId: localStorage.getItem("user") as string,
              amount: values.amount,
              description: values.description,
              categoryName: values.categoryName,
              date: dayjs().format("YYYY-MM-DD"),
            } as unknown as IncomePost
        )

        if (updateAccountResponse) {
            notification.success({
                message: ('CREATE'),
                description: ('CREATE_INCOME_SUCCESSFULLY'),
            })
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            notification.error({
                message: ('ERROR'),
                description: (error.response?.data.info.message),
            })
        }
      
    }
}


  useEffect(() => {
    setinitIncome({
      description: "",
      amount: 0,
      categoryName: ""
    });
  }, [localStorage.getItem("user") as string]);

  if (!initIncome) {
    return <h1>dang loading....</h1>;
  }
  return (
    <div>
      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical"
        initialValues={{
          ...initIncome,
        }}
      >
        <div className=" p-6 ">
          <div className="bg-white px-6 py-6 shadow-01">
            <Row gutter={[16, 24]}>
              <Col xs={24} lg={12}>
                <Form.Item name="amount" label={"AMOUNT"} className="mb-0">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="description" label={"DESCRIPTION"} className="mb-0">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="categoryName" label={"CATEGORYNAME"} className="mb-0">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                  >
                    {("SAVE")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default IncomeCreate;
