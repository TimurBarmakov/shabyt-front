import React from "react";
import { useState } from "react";
import { Layout as AntLayout, Menu, Typography, Button, Row, Col, Image, Divider, Grid} from "antd";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/icons/main-logo.svg";
import CollapsedLogo from "../assets/icons/collapsed-logo.svg";
import { PlusOutlined } from "@ant-design/icons";
import CompaniesLogo from "../assets/icons/companies-icon.svg";
import HomeLogo from "../assets/icons/home-icon.svg";
import Bell from "../assets/icons/bell.svg";
import Search from "../assets/icons/search.svg";
import Cross from "../assets/icons/cross.svg";
import { useNavigate } from "react-router-dom";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
const { Text } = Typography;
const { Sider, Content, Footer, Header } = AntLayout;

export const CustomMenu = styled(Menu)`
  background-color: transparent !important;
  color: white !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .ant-menu-item {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .ant-menu-item-selected {
    background-color: transparent !important;
    color: white !important;
  }

  .ant-menu-item:hover {
    background-color: transparent !important;
    color: white !important;
  }
`;

export const OrangeButton = styled(Button)`
  background-color: rgba(229, 102, 47, 1) !important;
  border-radius: 30px !important;
  border: none !important;
  color: #fff !important;
  font-weight: 500;
  font-size: 16px;
  width: 250px;
  height: 60px;
  margin-top: 20px;
  &:hover,
  &:focus {
    background-color: rgba(229, 102, 47, 0.9) !important;
    color: #fff !important;
  }

  &:active {
    background-color: rgba(229, 102, 47, 0.8) !important;
  }
`;

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
const { useBreakpoint } = Grid;
const screens = useBreakpoint();
  return (
    
    <Row style={{background: 'rgba(245, 245, 245, 1)', minHeight: '100vh'}}>
       <Col
       onClick={() => setCollapsed((prev) => !prev)}
  span={collapsed ? 2 : 5}
  style={{
    backgroundColor: "rgba(15, 28, 108, 1)",
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    display: "flex",
    cursor: 'pointer',
    flexDirection: "column",
    alignItems: "center",
    transition: "all 0.3s ease",
    paddingTop: 20,
    position: "relative",
    
  }}
>
<Row
justify="center"
align="middle"
    style={{
      position: "fixed",
    }}
  >

  {/* Логотип */}
  <img
    src={collapsed ? CollapsedLogo : Logo}
    alt="logo"
    style={{
      width: collapsed ? 60 : 200,
      margin: "40px 0",
      transition: "all 0.1s ease",
    }}
  />

{/* Навигация */}
<Col
  span={24}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: collapsed ? "center" : "center",
    gap: 24,
  }}
>
  <Link
    to="/"
    onClick={(e) => e.stopPropagation()}
    style={{
      color: "white",
      textDecoration: "none",
      ...(collapsed ? {} : { width: 200 }),
      display: "flex",
      alignItems: "center",
    }}
  >
    <img
      src={HomeLogo}
      alt="home"
      style={{ width: 40, height: 40, marginRight: collapsed ? 0 : 16 }}
    />
    {!collapsed && (
      <Text style={{ fontSize: 20, color: "white" }}>Главная</Text>
    )}
  </Link>

  <Link
    to="/companies-list"
    onClick={(e) => e.stopPropagation()}
    style={{
      color: "white",
      textDecoration: "none",
      ...(collapsed ? {} : { width: 200 }),
      display: "flex",
      alignItems: "center",
    }}
  >
    <img
      src={CompaniesLogo}
      alt="companies"
      style={{ width: 40, height: 40, marginRight: collapsed ? 0 : 16 }}
    />
    {!collapsed && (
      <Text style={{ fontSize: 20, color: "white" }}>Компании</Text>
    )}
  </Link>
  {collapsed ? (
    <Row
      justify="center"
      align="middle"
      onClick={(e) => {
        e.stopPropagation();
        navigate("/company/register");
      }}
      style={{
        background: "rgba(229, 102, 47, 1)",
        cursor: "pointer",
        width: 60,
        height: 60,
        borderRadius: 30,
      }}
    >
      <Image src={Cross} alt="logo" preview={false} />
    </Row>
  ) : (
    <Row justify="center" >
      <OrangeButton onClick={(e) => {
        e.stopPropagation();
        navigate("/company/register");
      }}>Добавить компанию</OrangeButton>
    </Row>
  )}
</Col>
</Row>

  {/* Кнопка снизу */}
  
</Col>

      {/* Контент */}
      <Col
        span={collapsed ? 22 : 19}
        style={{ padding: 24, transition: "all 0.3s ease" }}
      >
          <AntLayout style={{ minHeight: "100%" }}>
             <Header style={{ textAlign: "center", height: 110, background: 'transparent', marginTop: 40, padding: screens.xxl ? '0 50px' : '0 20px' }}>
              <Row justify="space-between">
                <Col span={8}>
                  {/* <Row
                    align="middle"
                    gutter={20}
                    style={{
                      background: "rgba(255, 255, 255, 1)",
                      borderRadius: 40,
                      height: "100%",
                      padding: "0 20px",
                    }}
                  >
                    <Col>
                      <Image src={Search} alt="logo" preview={false} />
                    </Col>
                    <Col>
                      <Text style={{ fontSize: 24, color: "rgba(102, 102, 102, 1)", fontWeight: 600 }}>
                        Поиск
                      </Text>
                    </Col>
                  </Row> */}
                </Col>
              <Col span={9}>
              <Row  style={{height: '100%'}}>
                <Col span={6}>
                  {/* <Row justify="center"
                  align="middle" style={{background: 'rgba(255, 255, 255, 1)', borderRadius: 50, height: '100%', width: 80}}>
                    <Image src={Bell} alt="logo" preview={false}/>
                  </Row> */}
                </Col>
                <Col span={18}>
                  <Row
                    style={{
                      background: "rgba(255, 255, 255, 1)",
                      borderRadius: 40,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-end", 
                      padding: "12px 40px",    
                    }}
                  >
                    <Text style={{ fontSize: 24, color: "rgba(102, 102, 102, 1)", fontWeight: 600, lineHeight: '28px' }}>
                      Болат А.
                    </Text>
                    <Text style={{ fontSize: 24, color: "rgba(102, 102, 102, 1)", fontWeight: 600, lineHeight: '28px' }}>Суперадмин</Text>
                  </Row>
                </Col>
              </Row>
                </Col>
                <Divider
                  style={{
                    marginTop: 36,
                    marginBottom: 28,
                    borderWidth: 1,
                    borderColor: "rgba(164, 169, 178, 1)",
                  }}
                />
              </Row>
              
            </Header>
            <Content style={{ margin: screens.xxl ? "28px 50px" : '28px 20px', flex: 1 }}>
              <Outlet />
            </Content>
            <Footer style={{ textAlign: "center" }}>
              © {new Date().getFullYear()} My App
            </Footer>
          </AntLayout>
        </Col>

        </Row>

  );
}
