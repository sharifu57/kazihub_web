import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import {
  Button,
  Layout as AntdLayout,
  Menu,
  Space,
  Switch,
  theme,
  Typography,
  Modal,
  Avatar,
  Col,
  Dropdown,
  Row
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "../../contexts/color-mode";
import { Link } from "react-router-dom";
import { primaryColor, secondaryColor } from "../../web/utilities/colors";
import getUSer from "../../web/utilities/userUtils";
import {
  DownOutlined,
  LoginOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import MenuItem from "antd/es/menu/MenuItem";
import UserLogout from "../../web/utilities/logout";
import { googleLogout } from "@react-oauth/google";

const { Text } = Typography;
const { useToken } = theme;

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky
}) => {
  const { token } = useToken();
  const { mode, setMode } = useContext(ColorModeContext);

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 24px",
    height: "75px"
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const storedUser = getUSer();

  

  interface MenuItem {
    key: string;
    icon: React.ReactElement;
    label: React.ReactElement;
    danger?: boolean;
  }

  const menuItems: MenuItem[] = [
    {
      key: "1",
      icon: <LoginOutlined />,
      danger: true,
      label: (
        <Button danger onClick={() => {}}>
          Log out
        </Button>
      )
    }
  ].filter(Boolean) as MenuItem[];

  useEffect(() => {
    getUSer();
  });

  return (
    <AntdLayout.Header style={headerStyles}>
      <div className="left-container" style={{ marginLeft: "170px" }}>
        <Space>
          <Link to="/home">
            <img
              width={180}
              src="/images/logos/logo1.png"
              alt="Logo"
              style={{ alignContent: "" }}
            />
          </Link>
        </Space>
      </div>

      <div className="right-container" style={{ marginRight: "200px" }}>
        <Space>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            defaultOpenKeys={["assessment"]}
            style={{ marginTop: "35px" }}
          >
            <Menu.Item>
              <Link to="">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/jobs">browse Jobs</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/hore">Hire Talent</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/hore">About</Link>
            </Menu.Item>
          </Menu>

          <Button
            style={{
              borderColor: primaryColor,
              marginTop: "45px",
              marginLeft: "10px",
              backgroundColor: secondaryColor,
              color: "white"
            }}
          >
            POST A JOB
          </Button>

          {storedUser?.profile?.name ? (
            <Space style={{ marginLeft: "8px" }} size="middle">
              <Dropdown
                menu={{
                  items: menuItems
                }}
              >
                <Button type="text">
                  <Space>
                    {storedUser?.profile?.name ? (
                      <Text>{storedUser?.profile?.name}</Text>
                    ) : (
                      <Text strong>storedUser?.profile?.email</Text>
                    )}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>

              {storedUser?.profile?.picture && (
                <Avatar
                  src={storedUser?.profile?.picture}
                  alt={storedUser?.profile?.name}
                />
              )}
            </Space>
          ) : (
            <Button
              style={{
                borderColor: primaryColor,
                marginTop: "45px",
                marginLeft: "100px"
              }}
            >
              <Link to="login">Sign In</Link>
            </Button>
          )}

          <Switch
            checkedChildren="🌛"
            unCheckedChildren="🔆"
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            defaultChecked={mode === "dark"}
            style={{ marginTop: "20px" }}
          />
        </Space>
      </div>
    </AntdLayout.Header>
  );
};
