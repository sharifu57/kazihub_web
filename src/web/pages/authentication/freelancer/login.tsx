import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Input,
  Divider,
  Typography,
  Spin,
  notification
} from "antd";
import { useEffect, useState } from "react";
import { primaryColor, secondaryColor } from "../../../utilities/colors";
import { LockOutlined, MailFilled } from "@ant-design/icons";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../../providers/mutations";
import getUser from "../../../utilities/userUtils";

interface UserData {
  access_token: string;
}

export default function FrelancerLogin() {
  const navigate = useNavigate();
  const { Text } = Typography;
  const [user, setUser] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [systemUser, setSystemUser] = useState<any>(null);
  const storedUser = getUser();

  // const userToken = storedUser?.user?.access_token;
  const [loadingSpinner, setLoadingSpinner] = useState(false);
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

  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);

  const handleLoginUser = async (values: any) => {
    setLoadingSpinner(true);

    try {
      const { data } = await loginUser({
        variables: {
          email: values.email,
          password: values.password
        }
      });

      if (data?.loginUser?.status === true) {
        console.log(data);
        const userToken = data?.loginUser?.token;
        const userToStore = data?.loginUser?.user;
        const userObj = data?.loginUser;

        // localStorage.setItem("token", userToken);
        // localStorage.setItem("user", JSON.stringify(userToStore));
        localStorage.setItem("userObj", JSON.stringify(userObj));

        notification.success({
          message: "Login Success",
          description: `${data?.loginUser?.message}`,
          placement: "topRight"
        });

        setTimeout(() => {
          setLoadingSpinner(false);

          navigate("/profile");
        }, 2000);
      } else {
        notification.error({
          message: "Login Failed",
          description: `${data?.loginUser?.message}`,
          placement: "topRight"
        });
        setTimeout(() => {
          setLoadingSpinner(false);
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // getUSer();

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
            // localStorage.setItem("user", JSON.stringify(user));
            // localStorage.setItem("profile", JSON.stringify(res?.data));
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
                onFinish={(values) => {
                  handleLoginUser(values);
                }}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Username!" }
                  ]}
                >
                  <Input
                    type="email"
                    prefix={<MailFilled className="site-form-item-icon" />}
                    placeholder="email"
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
                    htmlType="submit"
                    block
                    style={{ backgroundColor: secondaryColor, height: "40px" }}
                    disabled={loadingSpinner}
                  >
                    {loadingSpinner ? (
                      <Spin style={{ color: primaryColor }} />
                    ) : (
                      <Text style={{ color: "white" }}>Sign In</Text>
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
              {/* {userToken ? (
                <Space>
                  <p>{profile?.name}</p>
                  <img src={profile?.picture} alt="user image" />
                  <button onClick={logout}>Log out</button>
                </Space>
              ) : (
                <div style={{ marginBottom: "20px" }}>
                  <Button onClick={() => login()} block>
                    Sign in with Google 🚀{" "}
                  </Button>
                </div>
              )} */}

              <Text style={{ marginTop: "100px" }}>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
