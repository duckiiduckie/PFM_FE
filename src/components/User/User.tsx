import { Col, Input, Row, Form, DatePicker, notification, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { getUserAPI, updateUserAPI } from "../../services/UserService";
import { UserGet, UserPut } from "../../models/UserDto";
import { AxiosError } from "axios";
import dayjs from "dayjs";

type Props = {};

export interface IAccountUpdateForm {
  email: string;
  fullName: string;
  phoneNumber: string;
  birthDay: string;
}

const User = (props: Props) => {
  const [initAccount, setInitAccount] = useState<IAccountUpdateForm>();
  const [form] = useForm<IAccountUpdateForm>();

  const onFinish = async (values: IAccountUpdateForm) => {

    try {

        const updateAccountResponse = await updateUserAPI(
            localStorage.getItem("user") as string,
            {
                email: values.email,
                fullName: values.fullName,
                phoneNumber: values.phoneNumber,
                birthDay: dayjs(values.birthDay).format(
                  'YYYY-MM-DD',
              )
            } as UserPut
        )

        if (updateAccountResponse) {
            notification.success({
                message: ('UPDATED'),
                description: ('UPDATED_ACCOUNT_SUCCESSFULLY'),
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
    const fetchData = async () => {
      try {
        const res = await getUserAPI(localStorage.getItem("user") as string);
        console.log(localStorage.getItem("user") as string);
        if (res) {
          const tmp = res.data;
          console.log(res.data);
          setInitAccount({
            email: tmp.email,
            fullName: tmp.fullName,
            phoneNumber: tmp.phoneNumber,
            birthDay: tmp.birthDay as string,
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
  }, [localStorage.getItem("user") as string]);

  if (!initAccount) {
    return <h1>dang loading....</h1>;
  }
  return (
    <div>
      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical"
        initialValues={{
          ...initAccount,
          birthDay: dayjs(initAccount.birthDay),
        }}
      >
        <div className=" p-6 ">
          <div className="bg-white px-6 py-6 shadow-01">
            <Row gutter={[16, 24]}>
              <Col xs={24} lg={12}>
                <Form.Item name="fullName" label={"USERNAME"} className="mb-0">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  name="email"
                  label={"EMAIL"}
                  rules={[
                    {
                      required: true,
                      message: "REQUIRE_EMAIL",
                    },
                    {
                      type: "email",
                      message: "VALID_EMAIL",
                    },
                  ]}
                  className="mb-0"
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  name="phoneNumber"
                  label={"PHONE"}
                  rules={[
                    { required: false },
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                      message: "PLEASE_ENTER_ ONLY_NUMBER",
                    },
                  ]}
                  className="mb-0"
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  name="birthDay"
                  label={"BIRTHDAY"}
                  className="mb-0"
                  rules={[{ required: true, message: "REQUIRE_DATE" }]}
                >
                  <DatePicker
                    size="large"
                    placeholder={"SELECT_DATE"}
                    format="YYYY-MM-DD"
                    style={{ width: "100%" }}
                  />
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

export default User;
