import { Row, Col, Card, Space } from "antd";
import React from "react";
import { primaryColor } from "../../utilities/colors";
import { Avatar, Image } from "antd";

export default function Division() {
  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Card
            style={{
              padding: 0,
              borderColor: "#EFEFEF",
              borderRadius: "40px"
            }}
          >
            <Space direction="vertical">
              <Image
                width={100}
                src="/images/icons/t.svg"
                preview={false}
                // style={{ alignContent: "center", marginLeft: 15 }}
              />
              <p>I want to hire</p>
              <h2 style={{ color: primaryColor, letterSpacing: 2 }}>
                FREELANCERS
              </h2>
              <p>
                Hire Talent from various sills to work on projects, receive
                multiple proposals with different prices and agree on one suits
                your requirements.
              </p>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            style={{
              padding: 0,
              borderColor: "#EFEFEF",
              borderRadius: "40px"
            }}
          >
            <Space direction="vertical">
              <Image
                width={100}
                src="/images/icons/t.svg"
                preview={false}
                // style={{ alignContent: "center", marginLeft: 15 }}
              />
              <p>I want to hire</p>
              <h2 style={{ color: primaryColor, letterSpacing: 2 }}>
                FREELANCERS
              </h2>
              <p>
                Hire Talent from various sills to work on projects, receive
                multiple proposals with different prices and agree on one suits
                your requirements.
              </p>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
}
