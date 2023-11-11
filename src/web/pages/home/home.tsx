import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import {
  Button,
  Card,
  Cascader,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Typography
} from "antd";
import { GET_CATEGORIES, get_skills } from "../../../providers/queries";
import {
  DownloadOutlined,
  FilterFilled,
  MediumWorkmarkOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  UserOutlined,
  UsergroupDeleteOutlined
} from "@ant-design/icons";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { primaryColor, secondaryColor } from "../../utilities/colors";
import { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

function Home() {
  const { Text } = Typography;
  const [size, setSize] = useState<SizeType>("large");
  const { loading, error, data } = useQuery(get_skills, {
    variables: {
      first: 5,
      after: "cursor123"
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const skills = data?.allSkills?.edges?.map((edge: any) => edge?.node);

  return (
    <div>
      <div
        style={{ marginRight: "200px", marginLeft: "200px", height: "90vh" }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <div style={{ marginTop: "0px" }}>
              <Text>
                <h1 style={{ marginTop: "130px", fontFamily: "revert-layer" }}>
                  Find the right{" "}
                  <span
                    style={{
                      fontFamily: "revert",
                      fontStyle: "italic",
                      fontWeight: "normal"
                    }}
                  >
                    Freelancer
                  </span>
                  <br />
                  for your project
                </h1>
              </Text>
            </div>

            <div>
              <Search
                placeholder="Search Skills"
                onSearch={onSearch}
                enterButton
                size="large"
              />
            </div>

            <div style={{ marginTop: "35px" }}>
              <Row gutter={24}>
                <Col span={2}>
                  <p>Recent: </p>
                </Col>
                <Col span={22}>
                  <div>
                    {skills ? (
                      skills.map((skill: any) => (
                        <p style={{ display: "inline" }} key={skill?.id}>
                          <Button
                            shape="round"
                            style={{ marginRight: "3px", marginBottom: "5px" }}
                          >
                            {skill?.name}
                          </Button>
                        </p>
                      ))
                    ) : (
                      <p>No skills available</p>
                    )}
                  </div>
                </Col>
              </Row>
            </div>

            <div style={{ marginTop: "70px" }}>
              <>
                <Flex gap="small" align="flex-start" vertical>
                  <Flex gap="small" wrap="wrap">
                    <Button
                      type="primary"
                      icon={<UsergroupDeleteOutlined />}
                      size={size}
                      style={{ backgroundColor: secondaryColor }}
                    >
                      Get Freelancer
                    </Button>
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      size={size}
                      style={{ backgroundColor: secondaryColor }}
                    >
                      Browse Jobs
                    </Button>
                  </Flex>
                </Flex>
              </>
            </div>
          </Col>
          <Col span={12}>right</Col>
        </Row>
      </div>

      <div>
        <Card></Card>
      </div>
    </div>
  );
}

export default Home;
