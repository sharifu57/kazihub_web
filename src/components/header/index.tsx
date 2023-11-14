// ... (existing imports)

import { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeContext } from "../../contexts/color-mode";

import {
  Button,
  Layout as AntdLayout,
  Menu,
  Space,
  Switch,
  theme,
  Typography,
  Avatar,
  Dropdown,
  Row,
  Col
} from "antd";
import { primaryColor, secondaryColor } from "../../web/utilities/colors";
import { LogoutOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { useToken } = theme;

interface User {
  id: string;
  email: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}


// const navigate = useNavigate()
// ... (existing interfaces and context)

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky
}) => {
  const navigate = useNavigate();
  const { token } = useToken();
  const { mode, setMode } = useContext(ColorModeContext);
  const [user, setUser] = useState<User | null>(null);

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 24px",
    height: "75px",
    boxShadow: sticky ? "0px 1px 1px rgba(0, 0, 0, 0.1)" : "none"
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const handlelogout = () => {
    localStorage.removeItem("userObj");
    localStorage.removeItem("user");
    setUser(null);
    navigate("")
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userObj");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <AntdLayout.Header style={headerStyles}>
      <div className="left-container" style={{ marginLeft: "170px" }}>
        <Space>
          <Link to="">
            <img
              width={180}
              src="/images/logos/logo1.png"
              alt="Logo"
              style={{ alignContent: "" }}
            />
          </Link>
        </Space>
      </div>

      {/* Center Section */}
      <div className="center-container">
        <Space size="large">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            defaultOpenKeys={["assessment"]}
            style={{ marginTop: "36px" }}
          >
            <Menu.Item>
              <Link to="">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/jobs">Browse Jobs</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/hire">Hire Talent</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about">About</Link>
            </Menu.Item>
          </Menu>
        </Space>
      </div>

      {/* Right Section */}
      <div className="right-container" style={{ marginRight: "170px" }}>
        <Space>
          {user?.token ? (
            <div>
              <Dropdown
                overlay={
                  <Menu style={{ width: 250 }}>
                    <Menu.Item>
                      <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item style={{ marginTop: "5px" }}>
                      <Link to="#" onClick={handlelogout}>
                        <Row gutter={24}>
                          {" "}
                          <Col span={3}>
                            {" "}
                            <LogoutOutlined />
                          </Col>
                          <Col>Logout</Col>
                        </Row>
                      </Link>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomLeft"
              >
                <Avatar src={user?.user?.id} alt="User Avatar" />
              </Dropdown>
            </div>
          ) : (
            <div>
              <Button shape="round">
                <Link to="login">Sign In</Link>
              </Button>
              <Button
                shape="round"
                style={{
                  marginLeft: "10px",
                  backgroundColor: secondaryColor,
                  color: "white"
                }}
              >
                <Link to="register">Sign Up</Link>
              </Button>
            </div>
          )}

          <Switch
            checkedChildren="🌛"
            unCheckedChildren="🔆"
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            defaultChecked={mode === "light"}
          />
        </Space>
      </div>
    </AntdLayout.Header>
  );
};
