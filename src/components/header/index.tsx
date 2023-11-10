import { DownOutlined, DownloadOutlined } from "@ant-design/icons";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import {
  Avatar,
  Button,
  Layout as AntdLayout,
  Menu,
  Space,
  Switch,
  theme,
  Typography,
  Col,
  Dropdown,
  Row
} from "antd";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "../../contexts/color-mode";
import { Link } from "react-router-dom";
import { primaryColor, secondaryColor } from "../../web/utilities/colors";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky
}) => {
  const { token } = useToken();
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);

  // Ensure that currentLocale is never undefined by checking for a non-null value.
  const currentLocale = locale() || "en";

  const languageMenuItems = [...(i18n.languages || [])]
    .sort()
    .map((lang: string) => ({
      key: lang,
      onClick: () => changeLanguage(lang),
      label: lang === "en" ? "English" : "German"
    }));

  const menuItems = [
    { key: "1", label: "Home" },
    { key: "2", label: "Browse Works" },
    { key: "3", label: "Hire Talent" },
    ...languageMenuItems
  ];

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
              marginLeft: "100px"
            }}
          >
            Log In
          </Button>
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

          <Switch
            checkedChildren="🌛"
            unCheckedChildren="🔆"
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            defaultChecked={mode === "dark"}
            style={{marginTop: "20px"}}
          />
        </Space>
      </div>
    </AntdLayout.Header>
  );
};
