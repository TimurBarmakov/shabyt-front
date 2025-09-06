import React from "react";
import { useState, useEffect } from "react";
import { Form, Typography, Row, Col, Input, Radio, Divider, Button } from "antd";
import styled from "styled-components";
import { fetchGetPlans, fetchAddCompany } from "../api";
import { useNavigate } from "react-router-dom";
export default function CompanyRegister() {
  const { Text } = Typography;
  const [value, setValue] = useState("basic");
  const [plans, setPlans] = useState<any[]>([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const CustomRadio = styled(Radio)`
  .ant-radio-inner {
    border: 2px solid black !important;
    width: 18px;
    height: 18px;
  }

  .ant-radio-inner::after {
    display: none !important;
  }

  &.ant-radio-checked .ant-radio-inner {
    border-color: black !important;
    background-color: rgba(0, 35, 255, 1) !important;
  }
`;

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchGetPlans();
      setPlans(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);


 const handleFinish = async (values) => {
    try {
      const response = await fetchAddCompany({
        name: values.name,
        bin: values.bin,
        legalAddress: values.legalAddress,
        physicalAddress: values.physicalAddress,
        bic: values.bic,
        bankName: values.bankName,
        iban: values.iban,
        planId: values.planId,
      });

      navigate("/");
    } catch (error) {
      console.error("Ошибка при добавлении компании:", error);
    }
  };

  return (
    <Row>
        <Col span={24}>
        
            <Row justify="space-between" align="middle">
              <Col>
                    <Text style={{fontSize: 36, fontWeight: 700}}>
                      Регистрация новой компании
                    </Text>
                    <Col>
                    <Text style={{fontSize: 16, fontWeight: 400}}>
                     Заполните форму для регистрации новой компании в системе Shabyt
                    </Text>
                    </Col>
                    </Col>
        
            </Row>
        </Col>

        <Col span={24}>
        <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                style={{ marginTop: 16 }}
              >
        <Row style={{background: 'rgba(255, 255, 255, 1)', borderRadius: 20, padding: 24, marginTop: 16}} gutter={[20, 16]}>
             
            <Col span={10}>
                <Text style={{fontSize: 20, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                    Информация о компании
                </Text>
                <Row style={{marginTop: 16}} gutter={[0, 16]}>
                    <Col span={24}>
                                <Col>
                                 <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                                Название компании
                                </Text>
                                <Text style={{fontSize: 16, fontWeight: 500, color: 'red', lineHeight: '100%'}}>
                                *
                                </Text>
                                </Col>
                                <Form.Item
                                name="name"
                                rules={[{ required: true}]}
                                style={{margin: 0, marginTop: 4}}
                              >
                                <Input placeholder="ТОО Компания" style={{ height: 39 }} />
                              </Form.Item>
                                
                                </Col>
                    
                                <Col span={24}>
                                <Col>
                                 <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                                БИН
                                </Text>
                                <Text style={{fontSize: 16, fontWeight: 500, color: 'red', lineHeight: '100%'}}>
                                *
                                </Text>
                                </Col>
                                {/* <Col span={24} style={{marginTop: 4}}> */}
                                 <Form.Item
                                    name="bin"
                                    rules={[{ required: true }]}
                                    style={{margin: 0, marginTop: 4}}
                                  >
                                    <Input placeholder="1234567890" style={{ height: 39 }} />
                                  </Form.Item>
                                {/* </Col> */}
                                
                                </Col>
                    
                                <Col span={24}>
                                <Col>
                                 <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                                Юридический адрес
                                </Text>
                                <Text style={{fontSize: 16, fontWeight: 500, color: 'red', lineHeight: '100%'}}>
                                *
                                </Text>
                                </Col>
                                <Form.Item
                                  name="legalAddress"
                                  rules={[{ required: true, message: "Введите юридический адрес" }]}
                                  style={{margin: 0, marginTop: 4}}
                                >
                                  <Input
                                    placeholder="123456, г. Астана, ул. Примерная, д. 7, офис 303"
                                    style={{ height: 39 }}
                                  />
                                </Form.Item>
                                
                                </Col>

                                <Col span={24}>
                                <Col>
                                 <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                                Фактический адрес
                                </Text>
                                <Text style={{fontSize: 16, fontWeight: 500, color: 'red', lineHeight: '100%'}}>
                                *
                                </Text>
                                </Col>
                                 <Form.Item
                                  name="physicalAddress"
                                  rules={[{ required: true, message: "Введите фактический адрес" }]}
                                  style={{margin: 0, marginTop: 4}}
                                >
                                  <Input
                                    placeholder="123456, г. Астана, ул. Примерная, д. 7, офис 303"
                                    style={{ height: 39 }}
                                  />
                                </Form.Item>
                                
                                </Col>

                                <Col span={24}>
                                <Col>
                                 <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                                Наименование банка
                                </Text>
                                <Text style={{fontSize: 16, fontWeight: 500, color: 'red', lineHeight: '100%'}}>
                                *
                                </Text>
                                </Col>
                                <Form.Item
                                  name="bankName"
                                  rules={[{ required: true, message: "Введите название банка" }]}
                                  style={{margin: 0, marginTop: 4}}
                                >
                                  <Input placeholder="АО Kaspi Bank" style={{ height: 39 }} />
                                </Form.Item>
                                
                                </Col>

                                <Col span={24}>
                                <Col>
                                 <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                                БИК
                                </Text>
                                <Text style={{fontSize: 16, fontWeight: 500, color: 'red', lineHeight: '100%'}}>
                                *
                                </Text>
                                </Col>
                                <Form.Item
                                  name="bic"
                                  rules={[{ required: true, message: "Введите БИК" }]}
                                  style={{margin: 0, marginTop: 4}}
                                >
                                  <Input placeholder="CASPKZKA" style={{ height: 39 }} />
                                </Form.Item>
                                
                                </Col>
                                <Col span={24}>
                                <Col>
                                 <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                                Номер счета карты (IBAN)
                                </Text>
                                <Text style={{fontSize: 16, fontWeight: 500, color: 'red', lineHeight: '100%'}}>
                                *
                                </Text>
                                </Col>
                                <Form.Item
                                  name="iban"
                                  rules={[{ required: true, message: "Введите IBAN" }]}
                                  style={{margin: 0, marginTop: 4}}
                                >
                                  <Input placeholder="KZ12345678901234567890" style={{ height: 39 }} />
                                </Form.Item>
                                
                                </Col>
                </Row>
            </Col>
            <Col span={14}>
                <Text style={{fontSize: 20, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                    Настройки подписки
                </Text>
                <Col style={{marginTop: 16, padding: 0}}>
                                 <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '150%'}}>
                                Тип подписки
                                </Text>
                                <Text style={{fontSize: 16, fontWeight: 500, color: 'red', lineHeight: '150%'}}>
                                *
                                </Text>
                                </Col>
                                <Form.Item
                                name="planId"
                                rules={[{ required: true, message: "Выберите тарифный план" }]}
                              >
                                 <Radio.Group
        onChange={(e) => setValue(e.target.value)}
        value={value}
        style={{ width: "100%" }}
      >
        <Row gutter={[25, 25]} style={{ marginTop: 4 }}>
          {plans.map((plan) => (
            <Col span={8} key={plan.id}>
              <Row
                style={{
                  background: "rgba(236, 236, 255, 1)",
                  borderRadius: 20,
                  padding: 24,
                }}
                gutter={[0, 8]}
              >
                <Col span={24}>
                  <CustomRadio value={plan.id} style={{ fontWeight: 700 }} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "rgba(0, 0, 0, 1)",
                      lineHeight: "100%",
                    }}
                  >
                    {plan.name}
                  </Text>
                </Col>
                <Col span={24}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: "rgba(0, 0, 0, 1)",
                      lineHeight: "100%",
                    }}
                  >
                    {plan.maxUsers
                      ? `До ${plan.maxUsers} пользователей`
                      : "Неограниченно"}
                  </Text>
                </Col>
                <Col span={24}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "rgba(0, 35, 255, 1)",
                      lineHeight: "100%",
                    }}
                  >
                    {plan.price
                      ? `${plan.price.toLocaleString("ru-RU")} ₸/мес`
                      : "Индивидуально"}
                  </Text>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Radio.Group>
</Form.Item>

            </Col>
                              {/* <Divider style={{ margin: "24px 0", borderColor: "rgba(164, 169, 178, 1)", borderWidth: 1 }}/>
            <Col span={24}>
            <Text style={{fontSize: 20, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                Код для регистрации клиентов
                </Text>
                  <Row justify="space-between" align="middle"  style={{background: 'rgba(236, 236, 255, 1)', borderRadius: 20, padding: '24px 24px', marginTop: 16}} >
                    <Col>
                    <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                        После создания компании будет сгенерирована уникальный код для регистрации представителя компании
                    </Text>
                    <Col style={{marginTop: 4}} span={17}>
                    <Input style={{height: 39, background: 'rgba(236, 236, 255, 1)'}} placeholder="SHBT-dp2kp132d-smcld87fm-dm34tjfs92">
                                
                    </Input>
                    </Col>
                    </Col>

                    <Row gutter={12}>
  <Col>
    <Button style={{ borderRadius: 30, border: "none", height: 60, padding: '21px 43px', }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "rgba(102, 102, 102, 1)",
        }}
      >
        Копировать
      </Text>
    </Button>
  </Col>
  <Col>
    <Button
      style={{
        borderRadius: 30,
        border: "none",
        height: 60,
        padding: '21px 43px',
        background: "rgba(229, 102, 47, 1)",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "rgba(255, 255, 255, 1)",
        }}
      >
        Обновить
      </Text>
    </Button>
  </Col>
</Row>
                  </Row>
            </Col> */}

            <Col span={24} style={{marginTop: 8}}>
            <Row gutter={17} justify="end">
  <Col>
    <Button onClick={() => form.resetFields()} style={{ borderRadius: 30, border: "none", height: 60, padding: '18px 81px', background: 'rgba(245, 245, 245, 1)',}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "rgba(102, 102, 102, 1)",
        }}
      >
        Отменить
      </Text>
    </Button>
  </Col>
  <Col>
    <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  borderRadius: 30,
                  border: "none",
                  height: 60,
                  padding: "18px 32px",
                  background: "rgba(229, 102, 47, 1)",
                }}
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                <Text
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "rgba(255, 255, 255, 1)",
        }}
      >
        Сохранить компанию
      </Text>
              </Button>
            )}
          </Form.Item>
  </Col>
</Row>
            </Col>
        </Row>        
                    </Form>

        </Col>
    </Row>

    
  );
}
