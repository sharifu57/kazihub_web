import React from "react";
import Banners from "./banners";
import { Row, Col, Card } from "antd";
import Search from "antd/es/input/Search";

export default function BestMatch() {
  const onSearch = () => {};
  return (
    <div style={{ marginLeft: 200, marginRight: 200 }}>
      <Row gutter={24}>
        <Col span={18}>
          <div>
            <Banners />
          </div>

          <div style={{ marginTop: 15 }}>
            <Search placeholder="input search text" onSearch={onSearch} />
          </div>

          <div style={{marginTop: 10}}>
            <Card title="Job Matches you"></Card>
          </div>
        </Col>
        <Col span={6}>
          <Card>two</Card>
        </Col>
      </Row>
    </div>
  );
}
