import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined
} from "@ant-design/icons";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Divider,
  Checkbox,
  Typography,
  Select,
  notification,
  Spin
} from "antd";
import React, { useState } from "react";
import { secondaryColor } from "../../../utilities/colors";
import { Link } from "react-router-dom";

import { Image } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../../providers/mutations";
import { useGoogleLogin } from "@react-oauth/google";
import login from "./login";

export default function FreelancerRegister() {
  interface UserData {
    access_token: string;
    // Add other properties as needed
  }
  const { Text } = Typography;
  const [loadSpinner, setLoadingSpinner] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse as UserData),
    onError: (error) => console.log("Login Failed:", error)
  });

  const formStyles: React.CSSProperties = {
    height: "40px"
  };

  const [form] = Form.useForm();
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);

  const handleRegisterUser = async (values: any) => {
    setLoadingSpinner(true);
    try {
      const { data } = await createUser({
        variables: {
          firstname: values.first_name,
          lastname: values.last_name,
          email: values.email,
          password: values.password
        }
      });

      if (data?.createUser?.status === true) {
        setTimeout(() => {
          form.resetFields();
          setLoadingSpinner(false);
        }, 2000);
      } else {
        setTimeout(() => {
          setLoadingSpinner(false);
          notification.error({
            message: "Registration Failed",
            description: `${data?.createUser?.message}`,
            placement: "topRight"
          });
        }, 2000);
      }
    } catch (error) {
      setLoadingSpinner(false);
      console.log(error);
    }
  };

  const CustomSelectOption = ({ value, label, flag }: any) => (
    <Select.Option value={value}>
      <Row>
        <Col span={2}>
          <Image
            width={20}
            src={flag}
            preview={false}
            style={{ verticalAlign: "middle" }}
          />
        </Col>{" "}
        <Col span={22}>{label}</Col>
      </Row>
    </Select.Option>
  );

  return (
    <>
      <Row justify="center" align="middle" style={{ marginTop: "100px" }}>
        <Col>
          <Card
            bordered={true}
            style={{
              width: "600px",
              borderColor: "#C6C6C6",
              textAlign: "center"
            }}
          >
            <div>
              Logo
              <br />
              <h3 style={{ fontWeight: "bold" }}>Create New Account</h3>
            </div>

            <div
              style={{
                marginTop: "30px",
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingBottom: "10px"
              }}
            >
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={(values) => {
                  handleRegisterUser(values);
                }}
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="first_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Username!"
                        }
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="First Name"
                        style={formStyles}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="last_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Username!"
                        }
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Last Name"
                        style={formStyles}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <div>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!"
                      }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                      style={formStyles}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" }
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    style={formStyles}
                  />
                </Form.Item>

                <Form.Item
                  name="select"
                  hasFeedback
                  rules={[
                    { required: false, message: "Please select your country!" }
                  ]}
                >
                  <Select
                    placeholder="Please select a country"
                    defaultValue="Tanzania, United Republic of"
                    style={formStyles}
                  >
                    <CustomSelectOption
                      value="Tanzania, United Republic of"
                      label="Tanzania"
                      flag="/images/logos/logo1.png"
                    />
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{ alignItems: "left" }}
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(new Error("Should accept agreement"))
                    }
                  ]}
                >
                  <Checkbox>
                    I have read the <a href="">Privacy Policy</a> and{" "}
                    <a href="">agreement</a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    shape="round"
                    block
                    style={{ backgroundColor: secondaryColor, height: "40px" }}
                    disabled={loadSpinner}
                  >
                    {loadSpinner ? (
                      <Spin />
                    ) : (
                      <Text style={{ color: "white" }}>Sign Up</Text>
                    )}
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div
              style={{
                marginTop: "0px",
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingBottom: "10px"
              }}
            >
              <Divider />
              <div>
                <Button
                  onClick={() => login()}
                  block
                  style={{
                    height: "40px",
                    marginTop: "0px",
                    backgroundColor: "#4285F4",
                    color: "white",
                    border: "1px solid #4285F4",
                    borderRadius: "10px"
                  }}
                >
                  <GoogleOutlined style={{ marginRight: "8px" }} />
                  Continue with Google
                </Button>
              </div>

              <Text>
                already have an account?{" "}
                <span>
                  <Link to="/login">Sign In</Link>
                </span>
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
