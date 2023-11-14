// Profile.js

import { Avatar, Button, Card, Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { primaryColor } from "../../utilities/colors";
import {
  CalendarOutlined,
  DashboardTwoTone,
  DownloadOutlined,
  Loading3QuartersOutlined,
  PushpinOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  StarOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined
} from "@ant-design/icons";
import { Image, Space } from "antd";
import * as CurrencyFormat from "react-currency-format";
import Clock from "react-live-clock";
import { EditButton } from "@refinedev/antd";

const { Text } = Typography;
// var CurrencyFormat = require('react-currency-format');

interface User {
  id: string;
  email: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateJoined: string;
  };
  userProfile: {
    id: string;
    location: {
      name: string;
      code: string;
    };
    phoneNumber: string;
    title: string;
    description: string;
    rate: string;
    hourRate: string;
  };
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userObj");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        // console.log("Parsed user data:", parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const src =
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

  const rating = 5;

  const onDownload = () => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  return (
    <div style={{ marginLeft: 200, marginRight: 200 }}>
      <div>
        <Card style={{ backgroundColor: primaryColor }}></Card>
      </div>

      <div style={{ marginTop: 20 }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={18}>
            <Card>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={7}>
                  <Image
                    width={300}
                    src={src}
                    preview={{
                      toolbarRender: (
                        _,
                        {
                          transform: { scale },
                          actions: {
                            onFlipY,
                            onFlipX,
                            onRotateLeft,
                            onRotateRight,
                            onZoomOut,
                            onZoomIn
                          }
                        }
                      ) => (
                        <Space size={12} className="toolbar-wrapper">
                          <DownloadOutlined onClick={onDownload} />
                          <SwapOutlined rotate={90} onClick={onFlipY} />
                          <SwapOutlined onClick={onFlipX} />
                          <RotateLeftOutlined onClick={onRotateLeft} />
                          <RotateRightOutlined onClick={onRotateRight} />
                          <ZoomOutOutlined
                            disabled={scale === 1}
                            onClick={onZoomOut}
                          />
                          <ZoomInOutlined
                            disabled={scale === 50}
                            onClick={onZoomIn}
                          />
                        </Space>
                      )
                    }}
                  />

                  <div style={{ marginTop: 20 }}>
                    <Text>
                      <CurrencyFormat
                        value={user?.userProfile?.hourRate}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Tzs "}
                      />{" "}
                      / Hour
                    </Text>
                    <div style={{ marginTop: 10 }}>
                      <Row gutter={24}>
                        <Col span={2}>
                          <Image
                            width={20}
                            src="/images/icons/download.png"
                            preview={false}
                            style={{ alignContent: "center" }}
                          />
                        </Col>
                        <Col span={22}>
                          <p style={{ marginLeft: 8 }}>
                            {user?.userProfile?.location?.name},{" "}
                            <span>Tanzania, United Republic of</span>
                          </p>
                        </Col>
                      </Row>
                    </div>

                    <div style={{ marginTop: 0 }}>
                      <Row>
                        <Col>
                          <DashboardTwoTone />
                        </Col>
                        <Col></Col>
                      </Row>
                    </div>

                    <div style={{ marginTop: 5 }}>
                      <Row>
                        <Col>
                          <CalendarOutlined />
                        </Col>
                        <Col style={{ marginLeft: 10 }}>
                          Joined <span>{user?.user?.dateJoined}</span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span={17}>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={20}>
                      <Row gutter={24}>
                        <Col span={23}>
                          <Text style={{ fontSize: 35, fontWeight: 500 }}>
                            {user?.user?.firstName}{" "}
                            <span>{user?.user?.lastName}</span>
                          </Text>
                        </Col>
                        <Col span={1}>
                          <Button type="primary">Edit Profile</Button>
                        </Col>
                      </Row>
                      <div>
                        <Text>
                          <span style={{ fontSize: "18px" }}>
                            {user?.userProfile?.title}
                          </span>{" "}
                        </Text>
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        {Array.from({ length: rating }, (_, index) => (
                          <StarOutlined
                            key={index}
                            style={{
                              color: "grey",
                              fontSize: 20,
                              marginRight: "10px"
                            }}
                          />
                        ))}
                      </div>

                      <div style={{ marginTop: "30px" }}>
                        <div>
                          <p style={{ fontWeight: 600 }}>Description</p>
                        </div>
                        <div>{user?.userProfile?.description}</div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                
              </Row>
            </Card>

            <Card
              title={
                <Row gutter={24} style={{ marginTop: "20px" }}>
                  <Col span={20}>
                    <p>Experience</p>
                  </Col>
                  <Col span={2}>
                    <p>
                      <Button>Add Experience</Button>
                    </p>
                  </Col>
                </Row>
              }
              style={{ marginTop: 30 }}
            ></Card>
          </Col>
          <Col span={6}>
            <Card title={<Row gutter={24}>
              <Col span={16}>
                Top Skills
              </Col>
              <Col span={5}>
                <EditButton/>
              </Col>
            </Row>}>

            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
