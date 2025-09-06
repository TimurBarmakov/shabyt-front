import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Row, Col, Image, List, Divider, Skeleton } from "antd";
import Profile from "../assets/icons/account-outline.svg";
import AccountGroup from "../assets/icons/account-group-outline.svg";
import FormatList from "../assets/icons/format-list-bulleted.svg";
import Database from "../assets/icons/database-arrow-up-outline.svg";
import { fetchDashboardStats, fetchGetChecklist, fetchGetCompany, fetchGetCompanyTable } from "../api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { Text } = Typography;
const [stats, setStats] = useState({
  companyStats: { totalActive: 0, addedLastMonth: 0 },
  userStats: { totalActive: 0, addedLastMonth: 0 },
  taskStats: { totalCompleted: 0, completedLastWeek: 0 },
  bonusStats: { totalEarned: 0, earnedLastMonth: 0 },
});

const [dataCompanies, setDataCompanies] = useState<any[]>([]);
const navigate = useNavigate();


const data = [
  {
    key: 1,
    company: 'ООО "ТехноПрогресс"',
    user: "Иванов А.С.",
    type: "Начисление",
    amount: "+1,200",
    date: "15.06.2023",
  },
  {
    key: 2,
    company: 'АО "ИнноваСистемс"',
    user: "Петрова Е.В.",
    type: "Конвертация",
    amount: "-5,000",
    date: "14.06.2023",
  },
  {
    key: 3,
    company: 'ЗАО "МедиаГрупп"',
    user: "Сидоров И.П.",
    type: "Начисление",
    amount: "+850",
    date: "14.06.2023",
  },
  {
    key: 4,
    company: 'ООО "СтройХолдинг"',
    user: "Козлов Д.А.",
    type: "Списание",
    amount: "-300",
    date: "13.06.2023",
  },
  {
    key: 5,
    company: 'ИП "Логистик Про"',
    user: "Морозова А.В.",
    type: "Начисление",
    amount: "+720",
    date: "12.06.2023",
  },
];

const columnsCompanies = [
  { title: "Название", dataIndex: "name", key: "company", width: "25%" },
  { title: "Кол-во сотр.", dataIndex: "userCount", key: "employees", width: "15%" },
  { title: "Статус", dataIndex: "status", key: "status", width: "15%" },
  { title: "Подписка", dataIndex: "subscriptionName", key: "subscription", width: "20%" },
  { title: "Дата регистрации", dataIndex: "createdAt", key: "date", width: "25%" },
];

const columns = [
  {
    title: "Компания",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Пользователь",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Тип",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Количество",
    dataIndex: "amount",
    key: "amount",
    render: (text: string) => (
      <Text >
        {text}
      </Text>
    ),
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
  },
];

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchGetCompanyTable({        
      });
      setDataCompanies(data.content);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);

  return (
    <Row>

<Col span={24}>

    <Row justify="space-between" align="middle">
      <Col>
            <Text style={{fontSize: 36, fontWeight: 700}}>
        Дашборд супер-админа
      </Text>
            </Col>
    </Row>
</Col>

<Col span={24} style={{marginTop: 24}}>

    <Row gutter={14}>
      <Col span={6}>
      <Row style={{background: 'rgba(236, 236, 255, 1)', borderRadius: 20, padding: 24}}>
        <Col span={24}>
        <Row justify="space-between" align="middle">
          <Text style={{fontSize: 14, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
        Активные компании
        </Text>
        <Image src={AccountGroup} preview={false}/>
        </Row>
        </Col>
      <Col span={24}>
      <Text style={{fontSize: 32, fontWeight: 700, color: 'rgba(0, 35, 255, 1)'}}>
        {stats.companyStats.totalActive}
      </Text>
      </Col>
<Col span={24}>
      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)'}}>
        +{stats.companyStats.addedLastMonth} за последний месяц
      </Text>
      </Col>
      </Row>
      </Col>
<Col span={6}>
      <Row style={{background: 'rgba(236, 236, 255, 1)', borderRadius: 20, padding: 24}}>
        <Col span={24}>
        <Row justify="space-between" align="middle">
          <Text style={{fontSize: 14, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
        Активные пользователи
        </Text>
        <Image src={Profile} preview={false}/>
        </Row>
        </Col>
      <Col span={24}>
      <Text style={{fontSize: 32, fontWeight: 700, color: 'rgba(0, 35, 255, 1)'}}>
      {stats.userStats.totalActive}
      </Text>
      </Col>
<Col span={24}>
      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)'}}>
        +{stats.userStats.addedLastMonth} за последний месяц
      </Text>
      </Col>
      </Row>
      </Col>
      <Col span={6}>
      <Row style={{background: 'rgba(236, 236, 255, 1)', borderRadius: 20, padding: 24}}>
        <Col span={24}>
        <Row justify="space-between" align="middle">
          <Text style={{fontSize: 14, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
        Выполнено задач
        </Text>
        <Image src={FormatList} preview={false}/>
        </Row>
        </Col>
      <Col span={24}>
      <Text style={{fontSize: 32, fontWeight: 700, color: 'rgba(0, 35, 255, 1)'}}>
      {stats.taskStats.totalCompleted}
      </Text>
      </Col>
<Col span={24}>
      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)'}}>
        +{stats.taskStats.completedLastWeek} за последнюю неделю
      </Text>
      </Col>
      </Row>
      </Col>
      <Col span={6}>
      <Row style={{background: 'rgba(236, 236, 255, 1)', borderRadius: 20, padding: 24}}>
        <Col span={24}>
        <Row justify="space-between" align="middle">
          <Text style={{fontSize: 14, fontWeight: 700, color: 'rgba(0, 0, 0, 1)', lineHeight: '100%'}}>
        Начислено бонусов
        </Text>
        <Image src={Database} preview={false}/>
        </Row>
        </Col>
      <Col span={24}>
      <Text style={{fontSize: 32, fontWeight: 700, color: 'rgba(0, 35, 255, 1)'}}>
      {stats.bonusStats.totalEarned}
      </Text>
      </Col>
<Col span={24}>
      <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)'}}>
      +{stats.bonusStats.earnedLastMonth} за последний месяц
      </Text>
      </Col>
      </Row>
      </Col>
    </Row>
    </Col>

    <Col span={24} style={{marginTop: 24}}>
    <Row gutter={[32, 32]}>
      <Col span={24}>
      <Card
        style={{ borderRadius: 20 }}
        bodyStyle={{ padding: 16 }}
      >
      <Text style={{ fontSize: 20, fontWeight: 700 }}>
        Компании
      </Text>
     <List
  style={{ marginTop: 12 }}
  bordered={false}
  dataSource={[{ isHeader: true }, ...dataCompanies]}
  renderItem={(item, index) => {
    if (item.isHeader) {
      return (
        <List.Item style={{ borderBottom: "2px solid rgba(164, 169, 178, 1)" }}>
          {columnsCompanies.map((col) => (
            <div
              key={col.key}
              style={{ width: col.width, fontWeight: 600, fontSize: 16 }}
            >
              {col.title}
            </div>
          ))}
          <div style={{ width: "10%", fontWeight: 600, fontSize: 16 }}></div>
        </List.Item>
      );
    }

    return (
      <List.Item
        style={{
          borderBottom:
            index !== dataCompanies.length
              ? "2px solid rgba(164, 169, 178, 1)"
              : "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        {columnsCompanies.map((col) => {
          const value = item[col.dataIndex];

          if (col.dataIndex === "status") {
            const isActive = value === "ACTIVE";
            return (
              <div key={col.key} style={{ width: col.width, fontSize: 16 }}>
                <Text
                  style={{
                    color: isActive ? "rgba(0, 189, 9, 1)" : "rgba(255, 0, 0, 1)",
                    fontWeight: 500,
                  }}
                >
                  {isActive ? "Активна" : "Деактивирована"}
                </Text>
              </div>
            );
          }

          if (col.dataIndex === "subscriptionName") {
            return (
              <div key={col.key} style={{ width: col.width, fontSize: 16, fontWeight: 500 }}>
                {value || "-"}
              </div>
            );
          }

          if (col.dataIndex === "createdAt") {
            return (
              <div key={col.key} style={{ width: col.width, fontSize: 16 }}>
                {new Date(value).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            );
          }

          return (
            <div key={col.key} style={{ width: col.width, fontSize: 16 }}>
              {value}
            </div>
          );
        })}

        <div style={{ width: "10%" }}>
          <Button
            style={{
              borderRadius: 20,
              border: "none",
              height: 37,
              padding: "13px 35px",
              background: "rgba(234, 234, 234, 1)",
            }}
            onClick={() => navigate(`/company/${item.id}`)}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "rgba(102, 102, 102, 1)",
                lineHeight: "100%",
              }}
            >
              Edit
            </Text>
          </Button>
        </div>
      </List.Item>
    );
  }}
/>
      <Row justify="center" style={{ marginTop: 40, marginBottom: 24 }}>
        <Button onClick={() => navigate('/companies-list')} style={{borderRadius: 30, border: 'none',padding:'18px 50px', height: 60, background: 'rgba(229, 102, 47, 1)'}}>
        <Text style={{fontSize: 20, fontWeight: 700, color: 'rgba(255, 255, 255, 1)'}}>
        Все компании
      </Text>
      </Button>
        </Row>
    </Card>
      </Col>
      <Col span={24}>
       <Card style={{ borderRadius: 20 }} bodyStyle={{ padding: 16 }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>
            Недавние транзакции бонусов
          </Text>
        </Col>
        <Col>
          <Text style={{ color: "rgba(0, 35, 255, 1)", fontSize: 16 }}>
            Все транзакции
          </Text>
        </Col>
      </Row>

      {/* <List
  style={{ marginTop: 12 }}
  bordered={false}
  dataSource={[{ isHeader: true }, ...data]}
  renderItem={(item, index) => {
    if (item.isHeader) {
      return (
        <List.Item style={{ borderBottom: "2px solid rgba(164, 169, 178, 1)" }}>
          {columns.map((col) => (
            <div key={col.key} style={{ flex: 1, fontWeight: 600, fontSize: 16 }}>
              {col.title}
            </div>
          ))}
        </List.Item>
      );
    }
    return (
      <List.Item
        style={{
          borderBottom:
            index !== data.length 
              ? "2px solid rgba(164, 169, 178, 1)"
              : "none",
        }}
      >
        {columns.map((col) => (
          <div key={col.key} style={{ flex: 1, fontSize: 16 }}>
            {col.render
              ? col.render(item[col.dataIndex], item)
              : item[col.dataIndex]}
          </div>
        ))}
      </List.Item>
    );
  }}
/> */}

<List
  style={{ marginTop: 12 }}
  bordered={false}
  dataSource={[{ isHeader: true }, ...Array(5).fill({})]}
  renderItem={(item, index) => {
    if (item.isHeader) {
      return (
        <List.Item style={{ borderBottom: "2px solid rgba(164, 169, 178, 1)" }}>
          {columns.map((col) => (
            <div key={col.key} style={{ flex: 1, fontWeight: 600, fontSize: 16 }}>
              {col.title}
            </div>
          ))}
        </List.Item>
      );
    }
    return (
      <List.Item
        style={{
          borderBottom:
            index !== 5 
              ? "2px solid rgba(164, 169, 178, 1)"
              : "none",
        }}
      >
        {columns.map((col) => (
          <div key={col.key} style={{ flex: 1, fontSize: 16 }}>
            <Skeleton.Input style={{ width: '100%' }} active size="small" />
          </div>
        ))}
      </List.Item>
    );
  }}
/>
    </Card>
      </Col>
    </Row>
    </Col>
    </Row>

    
  );
}
