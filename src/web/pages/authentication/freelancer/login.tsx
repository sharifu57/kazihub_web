import {
  Row,
  Col,
  Card,
  Button,
  Checkbox,
  Form,
  Input,
  Divider,
  Space,
  Typography
} from "antd";
import React, { useEffect, useState } from "react";
import { primaryColor, secondaryColor } from "../../../utilities/colors";
import Logo from "../../../utilities/logo";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import getUSer from "../../../utilities/userUtils";
import FreelancerRegister from "./register";
import { Link } from "react-router-dom";

interface UserData {
  access_token: string;
  // Add other properties as needed
}

export default function FrelancerLogin() {
  const { Text } = Typography;
  const [user, setUser] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const storedUser = getUSer();
  const userToken = storedUser?.user?.access_token;
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse as UserData),
    onError: (error) => console.log("Login Failed:", error)
  });

  const logout = () => {
    googleLogout(), setProfile(null);
    setUser(null);
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    getUSer();

    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json"
            }
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setProfile(res?.data);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("profile", JSON.stringify(res?.data));
          } else {
            console.log(res?.status);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
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
              <h3 style={{ fontWeight: "bold" }}>Welcome Back</h3>
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
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your Username!" }
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    style={{ height: "40px" }}
                  />
                </Form.Item>
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
                    style={{ height: "40px" }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    shape="round"
                    block
                    style={{ backgroundColor: secondaryColor, height: "40px" }}
                  >
                    Sign In
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
              {userToken ? (
                <Space>
                  <p>{profile?.name}</p>
                  <img src={profile?.picture} alt="user image" />
                  <button onClick={logout}>Log out</button>
                </Space>
              ) : (
                <div style={{marginBottom: "20px"}}>
                  <Button onClick={() => login()} block>
                    Sign in with Google 🚀{" "}
                  </Button>
                </div>
              )}

              {/* <Link to="/register">
                <Button
                  shape="round"
                  block
                  style={{
                    height: "40px",
                    marginTop: "10px",
                    backgroundColor: primaryColor,
                    color: "white"
                  }}
                >
                  Sign Up
                </Button>
              </Link> */}
              <Text style={{marginTop: "100px"}}>
                  Don't have an account? <Link to="/register">Sign Up</Link>
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
