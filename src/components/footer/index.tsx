import { Card, Form, Row, Col, Input, Button, Typography, Space } from "antd";
import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;

export default function FooterPage() {
  const [loading, setLoading] = useState(false);
  return (
    <Footer style={{ textAlign: "center" }}>
      SAMPLE©2023
    </Footer>
  );
}
