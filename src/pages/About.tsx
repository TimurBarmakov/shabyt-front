import React from "react";
import { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Button, Image, Tabs, Divider, List, Input, message } from "antd";
import Information from "../assets/icons/information.svg";
import Analytics from "../assets/icons/google-analytics.svg";
import LinkVariant from "../assets/icons/link-variant.svg";
import ContentCopy from "../assets/icons/content-copy.svg";
import Cached from "../assets/icons/cached.svg";
import styled from "styled-components";
import {CustomInput} from './style'
import { useParams } from "react-router-dom";
import { fetchGetCompanyDashboard, fetchGetCompanyId, fetchLinkCreate } from "../api";

export default function About() {
  const { Text } = Typography;
  const { id } = useParams();
  const [companyDashboardData, setСompanyDashboardData] = useState({});
  const [companyData, setСompanyData] = useState({});
  const [email, setEmail] = useState("");
  const [canSend, setCanSend] = useState(false);
  const [link, setLink] = useState("");

  useEffect(() => {
    setCanSend(email.includes("@") && email.includes("."));
  }, [email]);

  const items = [
    { key: "1", label: "Общая информация" },
    { key: "2", label: "О подписке" },
    { key: "3", label: "Сотрудники" },
    { key: "4", label: "Чек-листы" },
    { key: "5", label: "История бонусов" },
  ];

  const data = [
  {
    action: 'Создание нового чек-листа "Квартальный отчет"',
    user: "Иванов Сергей",
    date: "21.06.2023 14:32",
    type: "Выполнено",
  },
  {
    action: "Начисление бонусов команде разработки",
    user: "Петров Алексей",
    date: "20.06.2023 11:15",
    type: "Выполнено",
  },
  {
    action: "Конвертация бонусов в денежные средства",
    user: "Смирнова Елена",
    date: "19.06.2023 16:45",
    type: "В обработке",
  },
  {
    action: "Добавление нового сотрудника",
    user: "Иванов Сергей",
    date: "18.06.2023 10:20",
    type: "Выполнено",
  },
  {
    action: "Изменение настроек бонусной программы",
    user: "Петров Алексей",
    date: "17.06.2023 15:10",
    type: "Выполнено",
  },
];

  const [activeKey, setActiveKey] = useState("1");

  const StyledTabs = styled(Tabs)`
    .ant-tabs-ink-bar {
      display: none !important; 
    }
    .ant-tabs-nav::before {
      border-bottom: none !important;
    }
  `;

// const CustomInput = styled(Input)`
//   height: 37px;
//   font-size: 17px !important;

//   &::placeholder {
//     color: rgba(164, 169, 178, 1) !important;
//     opacity: 1;
//   }
// `;

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchGetCompanyDashboard(id);
      setСompanyDashboardData(data);

    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchGetCompanyId(id);
      setСompanyData(data);

    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);

const handleSend = async () => {
    try {
      const response = await fetchLinkCreate({
        companyId: id,
        targetEmail: email,
        role: "SUPER_ADMIN",
        inviteType: 'SINGLE',
        validHours: 24,
      });

      if (response?.link) {
        setLink(response.link);
      }
    } catch (error) {
      console.error("Ошибка при создании ссылки", error);
    }
  };

    const handleCopy = async () => {
    if (link) {
      try {
        await navigator.clipboard.writeText(link);
        message.success("Ссылка скопирована в буфер обмена!");
      } catch (err) {
        message.error("Не удалось скопировать ссылку");
      }
    }
  };


  return (
    <Row>
      <Col span={24}>

    <Row justify="space-between" align="middle">
      <Col>
            <Text style={{fontSize: 36, fontWeight: 700}}>
              {companyData?.name ?? '-'}
            </Text>
             <Text
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: companyData?.status === "ACTIVE" ? "rgba(0, 189, 9, 1)" : "rgba(255, 0, 0, 1)",
                  marginLeft: 12,
                }}
              >
                {companyData?.status === "ACTIVE" ? "Активна" : "Деактивирована"}
              </Text>
            <Col>
            <Text style={{ fontSize: 16, fontWeight: 400 }}>
              ID: {companyData?.id ?? "-"} • Дата регистрации:{" "}
              {companyData?.createdAt
                ? new Date(companyData.createdAt).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "-"}
            </Text>
            </Col>
            </Col>

<Col>

      <Row gutter={17} style={{height: '100%'}}>
        <Col>
        <Button style={{borderRadius: 30, border: 'none', height: 60, background: 'rgba(229, 102, 47, 1)'}}>
        <Text style={{fontSize: 20, fontWeight: 700, color: 'rgba(255, 255, 255, 1)'}}>
        К списку компаний
      </Text>
      </Button>
        </Col>
            </Row>

      </Col>

    </Row>
</Col>

    <Col span={24} style={{marginTop: 24}}>
      <Row gutter={20}>
        <Col span={14}>
        <Row style={{background: 'rgba(255, 255, 255, 1)', borderRadius: 20, padding: 24}}>
            <Col span={24}>
            <Row justify="space-between" align="middle">
              <Text style={{fontSize: 16, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            Статистика
            </Text>
            <Image src={Analytics} preview={false}/>
            </Row>
            </Col>
            <Col span={24} style={{marginTop: 8}}>
            <Row gutter={[20, 20]}>
              <Col span={6}>
                <Row style={{background: 'rgba(249, 249, 255, 1)', borderRadius: 20, padding: 12}}>
                  <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                    Сотрудников
                    </Text>
                    <Col span={24} style={{marginTop: 4}}>
                    <Text style={{fontSize: 24, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                    {companyDashboardData?.employees ?? '-'}
                    </Text>
                    </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row style={{background: 'rgba(249, 249, 255, 1)', borderRadius: 20, padding: 12}}>
                  <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                    Чек-листов
                    </Text>
                    <Col span={24} style={{marginTop: 4}}>
                    <Text style={{fontSize: 24, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                    {companyDashboardData.checklists ?? '-'}
                    </Text>
                    </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row style={{background: 'rgba(249, 249, 255, 1)', borderRadius: 20, padding: 12}}>
                  <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                    Задач
                    </Text>
                    <Col span={24} style={{marginTop: 4}}>
                    <Text style={{fontSize: 24, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                    {companyDashboardData.tasks ?? '-'}
                    </Text>
                    </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row style={{background: 'rgba(249, 249, 255, 1)', borderRadius: 20, padding: 12}}>
                  <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                    Бонусов
                    </Text>
                    <Col span={24} style={{marginTop: 4}}>
                    <Text style={{fontSize: 24, fontWeight: 700, color: 'rgba(0, 35, 255, 1)', lineHeight: '100%'}}>
                    {companyDashboardData.bonuses ?? '-'}
                    </Text>
                    </Col>
                </Row>
              </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col span={10}>
        <Row style={{background: 'rgba(255, 255, 255, 1)', borderRadius: 20, padding: 24}}>
          <Col span={24}>
          <Row justify="space-between" align="middle">
              <Text style={{fontSize: 16, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            Инвайт-линк для регистрации Орг. Админа
            </Text>
            <Image src={LinkVariant} preview={false}/>
            </Row>
          </Col>
          <Col span={24} style={{marginTop: 8}}>
          <Row gutter={10}>

            <Col span={18}>
             <CustomInput
                style={{ height: 37 }}
                placeholder="organization_admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </Col>
            <Col span={4}>
             <Button
                style={{
                  background: "rgba(229, 102, 47, 1)",
                  height: 37,
                  width: "100%",
                  borderRadius: 8,
                  padding: 7,
                }}
                disabled={!canSend}
                onClick={handleSend}
              >
                <Text style={{fontSize: 16, fontWeight: 700, color: 'rgba(255, 255, 255, 1)', lineHeight: '100%'}}>
                  Send
                  </Text>
              </Button>
            </Col>
          </Row>
          </Col>

          <Col span={24} style={{marginTop: 8}}>
          <Row gutter={10}>

            <Col span={18}>
              <CustomInput style={{height: 37}} value={link} readOnly placeholder="app.shabyt.com/invite/SHBT-dp2kp132d-smcld87-f7j...">
              
              </CustomInput>
            </Col>
            <Col span={2}>
              <Button onClick={handleCopy} style={{background: 'rgba(164, 169, 178, 1)',height: 37, width: 37, borderRadius: 8, padding: 7}}>
                <Image src={ContentCopy} preview={false}/>
              </Button>
            </Col>
          </Row>
          </Col>
        </Row>
        </Col>
      </Row>
    </Col>

    <Col span={24} style={{marginTop: 24}}>
      <Row style={{background: 'rgba(255, 255, 255, 1)', borderRadius: 20, padding: '20px 32px'}} gutter={[0, 16]}>

<StyledTabs
      style={{ margin: 0, height: 46 }}
      activeKey={activeKey}
      onChange={setActiveKey}
      items={items.map((item) => ({
        key: item.key,
        label: (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              color:
                activeKey === item.key
                  ? "rgba(0, 35, 255, 1)"
                  : "rgba(102, 102, 102, 1)",
            }}
          >
            {item.label}
          </Text>
        ),
      }))}
      tabBarStyle={{
        borderBottom: "none",
      }}
    />
  <Divider style={{ margin: "0", borderColor: "rgba(164, 169, 178, 1)", borderWidth: 1 }}>

  </Divider>
      <Col span={24}>
        <Row gutter={20}>
          <Col span={12}>
          <Text style={{fontSize: 20, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            Детали компании
          </Text>

          <Row style={{background: 'rgba(236, 236, 255, 1)', borderRadius: 20, padding: 24, marginTop: 16}} gutter={[0, 8]}>
<Col span={24}>
            <Col>
             <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
            Юридическое название
            </Text>
            </Col>
            <Col span={24} style={{marginTop: 4}}>
            <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            {companyData?.name}
            </Text>
            </Col>
            
            </Col>

            <Col span={24}>
            <Col>
             <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
            БИН
            </Text>
            </Col>
            <Col span={24} style={{marginTop: 4}}>
            <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            {companyData?.bin}
            </Text>
            </Col>
            
            </Col>

            <Col span={24}>
            <Col>
             <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
            Юридический адрес
            </Text>
            </Col>
            <Col span={24} style={{marginTop: 4}}>
            <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            {companyData?.legalAddress}
            </Text>
            </Col>
            
            </Col>

            <Col span={24}>
                        <Col>
                        <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
              Фактический адрес
            </Text>
            </Col>
            <Col span={24} style={{marginTop: 4}}>
            <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            {companyData?.physicalAddress}
            </Text>
            </Col>
            
            </Col>
          </Row>
          </Col>
          <Col span={12}>
          <Text style={{fontSize: 20, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            Контактная информация
          </Text>
          <Row style={{background: 'rgba(236, 236, 255, 1)', borderRadius: 20, padding: 24, marginTop: 16}} gutter={[0, 8]}>
            <Col span={24}>
            <Col>
             <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
            Администратор Организации
            </Text>
            </Col>
            <Col span={24} style={{marginTop: 4}}>
            <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            —
            </Text>
            </Col>
            
            </Col>

            <Col span={24}>
            <Col>
             <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
            Email Орг. Администратора
            </Text>
            </Col>
            <Col span={24} style={{marginTop: 4}}>
            <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            —
            </Text>
            </Col>
            
            </Col>

            <Col span={24}>
            <Col>
             <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
            Телефон Орг. Администратора
            </Text>
            </Col>
            <Col span={24} style={{marginTop: 4}}>
            <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            —
            </Text>
            </Col>
            
            </Col>

          </Row>
          </Col>
        </Row>
      </Col>

      {/* <Col span={24}>
        <Text style={{fontSize: 20, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
            Информация о подписке
          </Text>
          <Col span={24}>
            <Row style={{background: 'rgba(236, 236, 255, 1)', borderRadius: 20, padding: 24, marginTop: 16}} gutter={[0, 16]}>
              <Col span={24}>
                <Row>
                  <Col span={4}>
                    <Col>
                      <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                      Текущий тариф
                      </Text>
                      </Col>
                      <Col span={24} style={{marginTop: 4}}>
                      <Text style={{fontSize: 16, fontWeight: 600, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                      Бизнес
                      </Text>
                      </Col>
                  </Col>
                  <Col span={4}>
                    <Col>
                      <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                      Статус
                      </Text>
                      </Col>
                      <Col span={24} style={{marginTop: 4}}>
                      <Text style={{fontSize: 16, fontWeight: 600, color: 'rgba(0, 189, 9, 1)', lineHeight: '100%'}}>
                      Активен
                      </Text>
                      </Col>
                  </Col>
                  <Col span={4}>
                    <Col>
                      <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                      Дата начала
                      </Text>
                      </Col>
                      <Col span={24} style={{marginTop: 4}}>
                      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                      15.03.2023
                      </Text>
                      </Col>
                  </Col>
                  <Col span={4}>
                    <Col>
                      <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                      Дата окончания
                      </Text>
                      </Col>
                      <Col span={24} style={{marginTop: 4}}>
                      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                      15.03.2023
                      </Text>
                      </Col>
                  </Col>

                  <Col span={4}>
                    <Col>
                      <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                      Осталось дней
                      </Text>
                      </Col>
                      <Col span={24} style={{marginTop: 4}}>
                      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                      124
                      </Text>
                      </Col>
                  </Col>

                  <Col span={4}>
                  <Button style={{borderRadius: 30, border: 'none', height: '100%', width: '100%', background: 'rgba(229, 102, 47, 1)'}}>
                          <Text style={{fontSize: 16, fontWeight: 700, color: 'rgba(255, 255, 255, 1)'}}>
                          Детали компании
                        </Text>
                        </Button>

                  </Col>
                </Row>
              </Col>

              <Col span={24}>
              <Col>
                      <Text style={{fontSize: 12, fontWeight: 400, color: 'rgba(102, 102, 102, 1)', lineHeight: '100%'}}>
                      Доступные функции:
                      </Text>
                      </Col>

                      <Col span={24}>
                        <Row gutter={[0, 8]}>
                      <Col span={8} style={{marginTop: 4}}>
                      <CheckOutlined style={{ color: 'rgba(0, 189, 9, 1)', marginRight: 10 }} />

                      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                      Неограниченные чек-листы
                      </Text>
                      </Col>
                      <Col span={8} style={{marginTop: 4}}>
                      <CheckOutlined style={{ color: 'rgba(0, 189, 9, 1)', marginRight: 10 }} />
                      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                      До 50 сотрудников
                      </Text>
                      </Col>

                      <Col span={8} style={{marginTop: 4}}>
                      <CheckOutlined style={{ color: 'rgba(0, 189, 9, 1)', marginRight: 10 }} />
                      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                      Расширенная аналитика
                      </Text>
                      </Col>
                      <Col span={8} style={{marginTop: 4}}>
                      <CheckOutlined style={{ color: 'rgba(0, 189, 9, 1)', marginRight: 10 }} />
                      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                      Бонусная система
                      </Text>
                      </Col>
                      <Col span={8} style={{marginTop: 4}}>
                      <CheckOutlined style={{ color: 'rgba(0, 189, 9, 1)', marginRight: 10 }} />
                      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                      Приоритетная поддержка
                      </Text>
                      </Col>

                      <Col span={8} style={{marginTop: 4}}>
                      <CheckOutlined style={{ color: 'rgba(0, 189, 9, 1)', marginRight: 10 }} />
                      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
                      Расширенная аналитика
                      </Text>
                      </Col>
                      </Row>
                      
                      </Col>
              </Col>
            </Row>
          </Col>
      </Col>
      
      <Col span={24}>
      <Text style={{fontSize: 20, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
        Последние действия
          </Text>
      </Col>
      <Col span={24}>
            <Row
  style={{
    background: "rgba(236, 236, 255, 1)",
    borderRadius: 20,
    padding: 24,
    marginTop: 16,
    width: "100%",
  }}
>
  <StyledList
    bordered={false}
    dataSource={data}
    header={
      <Row
      style={{
        padding: "8px 0",
        borderBottom: "2px solid rgba(164, 169, 178, 1)", 
      }}
    >
        <Col span={10}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Действие</Text>
        </Col>
        <Col span={5}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Пользователь</Text>
        </Col>
        <Col span={5}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Дата и время</Text>
        </Col>
        <Col span={4}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Тип</Text>
        </Col>
      </Row>
    }
    renderItem={(item, index) => (
      <List.Item
        style={{
          borderBottom:
            index !== data.length - 1
              ? "2px solid rgba(164, 169, 178, 1)"
              : "none",
        }}
      >
        <Row style={{ width: "100%"}}>
          <Col span={10}>
            <Text style={{ fontSize: 16, fontWeight: 400 }}>{item.action}</Text>
          </Col>
          <Col span={5}>
            <Text style={{ fontSize: 16, fontWeight: 400 }}>{item.user}</Text>
          </Col>
          <Col span={5}>
            <Text style={{ fontSize: 16, fontWeight: 400 }}>{item.date}</Text>
          </Col>
          <Col span={4}>
            <Text style={{ fontSize: 16, fontWeight: 400 }}>{item.type}</Text>
          </Col>
        </Row>
      </List.Item>
    )}
    style={{
      width: "100%",
      background: "transparent",
    }}
  />
</Row>
      </Col> */}
      </Row>
    </Col>
    </Row>
  );
}
