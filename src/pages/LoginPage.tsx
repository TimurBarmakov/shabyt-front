import React from "react";
import { useEffect, useState } from "react";
import { Layout, Form, Input, Button, Checkbox, Typography, Col, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { fetchAuth , fetchRegister } from "../api"; 
import Logo from "../assets/icons/main-logo.svg";
import AuthLogo from "../assets/icons/auth-logo.svg";
import BgImage from "../assets/icons/login-bg.png";
import { Link } from "react-router-dom";
import { COOKIE_KEY } from "../utils/constants/cookie";
import {Cookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined, CloseCircleOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { Title, Text } = Typography;
const cookies = new Cookies()

let token = cookies.get(COOKIE_KEY.ACCESS_TOKEN);

const Wrapper = styled(Layout)`
  min-height: 100vh;
  display: flex;
  background: rgba(15, 28, 108, 1);
  flex-direction: row;
`;

const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border: 1px solid rgba(164, 169, 178, 1) !important;
  }
`;

const LeftPanel = styled.div`
  flex: 2;
  background: url(${BgImage}) no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightPanel = styled(Content)`
  flex: 3;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 0 40px 40px 0;
`;

const LoginCard = styled.div`
  text-align: center;

  .ant-typography {
    margin-bottom: 4px;
  }

  form {
    margin-top: 56px;
    text-align: left;
  }

  .ant-input-affix-wrapper {
    border-radius: 8px;
    padding: 8px 12px;
  }

  .ant-btn {
    height: 44px;
    font-size: 16px;
    font-weight: 500;
  }
`;



export default function LoginPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [token, setToken] = useState(cookies.get(COOKIE_KEY.ACCESS_TOKEN) || '');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const onFinish = async (values) => {
    const response = await fetchAuth({ email: values.email, password: values.password });
    if (response?.token) {
      cookies.set(COOKIE_KEY.ACCESS_TOKEN, response.token);
      setToken(response.token);
    }
  };

  const handleFieldsChange = () => {
    const values = form.getFieldsValue();
    setIsButtonDisabled(!(values.email && values.password));
  };

useEffect(() => {
  if (token) {
    navigate('/');
  }
}, [token]);

  return (
    <Wrapper>
      <LeftPanel>
        <img src={Logo} alt="logo" style={{ width: 380 }} />
      </LeftPanel>

      <RightPanel>
  <LoginCard>
    <img src={AuthLogo} alt="logo" style={{ width: 60, marginBottom: 10 }} />
    <Col>
    <Text style={{fontSize: 40, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '150%'}}>
      Shabyt Admin Login
    </Text>
    </Col>

    <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(164, 169, 178, 1)', lineHeight: '120%'}}>
      Панель управления для Админа Shabyt
    </Text>

    <Form
      form={form}
      name="login"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFieldsChange={handleFieldsChange}
    >
      <Text style={{fontSize: 14, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '150%'}}>
      Email
    </Text>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Введите Email" }]}
        style={{ marginBottom: 18 }}
      >
        <Input  allowClear={{ clearIcon: <CloseCircleOutlined style={{ fontSize: 18, color: 'rgba(164, 169, 178, 1)' }} /> }}
 style={{fontSize: 16,border: '1px solid rgba(164, 169, 178, 1)', borderRadius: 8, color: 'rgba(164, 169, 178, 1)', lineHeight: '120%', height: 44}} placeholder="debra.holt@example.com" />
      </Form.Item>
  <Text style={{fontSize: 14, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '150%'}}>
      Password
    </Text>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Введите пароль" }]}
        
      >
        <Input.Password
        iconRender={(visible) =>
          visible ? <EyeOutlined style={{ fontSize: 18, color: 'rgba(164, 169, 178, 1)' }} /> : <EyeInvisibleOutlined style={{ fontSize: 18, color: 'rgba(164, 169, 178, 1)' }} />
        }
        style={{fontSize: 16,border: '1px solid rgba(164, 169, 178, 1)', borderRadius: 8, color: 'rgba(164, 169, 178, 1)', lineHeight: '120%', height: 44}}
          placeholder="Введите пароль"
        />
      </Form.Item>

      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <CustomCheckbox><Text style={{fontSize: 14, fontWeight: 500, color: 'rgba(0, 0, 0, 1)', lineHeight: '150%'}}>
            Запомнить меня
          </Text></CustomCheckbox>
        </Form.Item>
        <Link to={'/'} style={{ color: "rgba(229, 102, 47, 1)", fontWeight: 500, fontSize: 14 }}>
        Забыли пароль?
        </Link>
      </div> */}

      <Form.Item style={{ marginTop: 32 }}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isButtonDisabled}
          block
          style={{
            background: "rgba(229, 102, 47, 1)",
            borderColor: "rgba(229, 102, 47, 1)",
            borderRadius: 8,
          }}
        >
          Войти в систему
        </Button>
      </Form.Item>
    </Form>
<Divider
                  style={{
                    marginTop: 40,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: "rgba(164, 169, 178, 1)",
                  }}
                />
    <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(164, 169, 178, 1)', lineHeight: '150%'}}>
      Система управления для администраторов Shabyt
    </Text>
  </LoginCard>
</RightPanel>
    </Wrapper>
  );
}