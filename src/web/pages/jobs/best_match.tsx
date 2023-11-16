import React, { useEffect, useState } from "react";
import Banners from "./banners";
import { Row, Col, Card, Space, Divider, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../../providers/queries";
import { Link } from "react-router-dom";

const { Text } = Typography;

export default function BestMatch() {
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
      category: {
        id: string;
        name: string;
      };
      badget: {
        id: string;
        title: string;
        priceFrom: string;
        priceTo: string;
      };
      phoneNumber: string;
      title: string;
      description: string;
      rate: string;
      hourRate: string;
    };
  }

  const [user, setUser] = useState<User | null>(null);

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
  const onSearch = () => {};

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: {
      categoryID: user?.userProfile?.category?.id
    }
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const projects = data?.projects;
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

          <div style={{ marginTop: 10 }}>
            <Card title="Job Matches you">
              {projects.map((project: any) => (
                <div>
                  <div key={project?.id}>
                    <Link to="">
                      <Row
                        gutter={24}
                        style={{ alignContent: "space-between" }}
                      >
                        <Col span={19}>
                          <h3 style={{ fontWeight: 540 }}>{project?.title}</h3>
                        </Col>
                        <Col span={5}>
                        <p> Tzs {`${project?.budget?.priceFrom} - ${project?.budget?.priceTo}`}</p>
                        </Col>
                      </Row>
                      <Text>{project?.description}</Text>
                    </Link>
                  </div>
                  <Divider />
                </div>
              ))}
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <Card>two</Card>
        </Col>
      </Row>
    </div>
  );
}
