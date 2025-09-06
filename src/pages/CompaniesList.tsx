import React from "react";
import { useState, useEffect } from "react";
import { Typography, Row, Col, Input, Select, List, Button, Pagination } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { fetchGetCompanyTable } from "../api";
import { useNavigate } from "react-router-dom";
export default function CompaniesList() {
  const { Text } = Typography;
const [dataCompanies, setDataCompanies] = useState<any[]>([]);
const [companiesInformation, setCompaniesInformation] = useState<any[]>([]);
const [sortValue, setSortValue] = useState("name,asc");

const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const navigate = useNavigate();

const columnsCompanies = [
  { title: "Название", dataIndex: "name", key: "company", width: "25%" },
  { title: "Кол-во сотр.", dataIndex: "userCount", key: "employees", width: "15%" },
  { title: "Статус", dataIndex: "status", key: "status", width: "15%" },
  { title: "Подписка", dataIndex: "subscriptionName", key: "subscription", width: "20%" },
  { title: "Дата регистрации", dataIndex: "createdAt", key: "date", width: "25%" },
];

const sortOptions = [
  { value: "name,asc", label: "По названию (А-Я)" },
  { value: "name,desc", label: "По названию (Я-А)" },
  { value: "id,asc", label: "ID (по возрастанию)" },
  { value: "id,desc", label: "ID (по убыванию)" },
  { value: "userCount,asc", label: "Пользователи (меньше-больше)" },
  { value: "userCount,desc", label: "Пользователи (больше-меньше)" },
  { value: "status,asc", label: "Статус (A-Z)" },
  { value: "status,desc", label: "Статус (Z-A)" },
  { value: "subscriptionName,asc", label: "Подписка (A-Z)" },
  { value: "subscriptionName,desc", label: "Подписка (Z-A)" },
  { value: "createdAt,asc", label: "Дата (старые сверху)" },
  { value: "createdAt,desc", label: "Дата (новые сверху)" },
];
 
const CustomInput = styled(Input)`
  height: 39px;
  margin-top: 4px;

  .ant-input {
    &::placeholder {
      color: rgba(102, 102, 102, 1) !important;
      opacity: 1;
    }
  }
`;

const CustomSelect = styled(Select)`
  width: 100%;
  margin-top: 4px;
  height: 39px;

  .ant-select-selection-placeholder {
    color: rgba(102, 102, 102, 1) !important;
    opacity: 1;
  }
    .ant-select-arrow {
    font-size: 16px;
    font-weight: 500;
    color: rgba(102, 102, 102, 1); 
  }

  .ant-select-arrow svg {
    width: 16px;
     transform: scaleX(1.3);
    height: 16px;
    stroke-width: 1.5; 
  }
`;

const CustomPagination = styled(Pagination)`
  .ant-pagination-item {
    width: 60px;
    height: 60px;
    border-radius: 50% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(102, 102, 102, 0.4);
    border: none;
    margin: 0 4px;
  }

  .ant-pagination-item a {
    font-size: 24px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }

  .ant-pagination-item-active {
    background: rgba(229, 102, 47, 1) !important;
  }

  .ant-pagination-item-active a {
    color: #fff !important;
  }

  .ant-pagination-item:hover {
    background: rgba(229, 102, 47, 0.8) !important;
  }

  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    width: 60px;
    height: 60px;
    border-radius: 50% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent !important;
  }

  .ant-pagination-prev .ant-pagination-item-link:hover,
  .ant-pagination-next .ant-pagination-item-link:hover {
    background: transparent !important;
  }

  .ant-pagination-prev .ant-pagination-item-link svg,
  .ant-pagination-next .ant-pagination-item-link svg {
    fill: rgba(229, 102, 47, 1);
    font-weight: 700;
    font-size: 24px;
  }
`;

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchGetCompanyTable({
        pageable: {
          page: page - 1, 
          size: pageSize,
          sort: sortValue,
        },
      });
      setDataCompanies(data.content);
      setCompaniesInformation(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [page, pageSize, sortValue]);

  return (
    <Row>
        <Col span={24}>
                
                    <Row justify="space-between" align="middle">
                      <Col>
                            <Text style={{fontSize: 36, fontWeight: 700}}>
                              Список компаний
                            </Text>
                            <Col>
                            <Text style={{fontSize: 16, fontWeight: 400}}>
                             Управление и мониторинг компаний в системе
                            </Text>
                            </Col>
                            </Col>
                
                    </Row>
                </Col>

        <Col span={24}>
        <Row style={{background: 'rgba(255, 255, 255, 1)', borderRadius: 20, padding: 24, marginTop: 16}} gutter={[20, 16]}>

            <Col span={24}>
                <Row gutter={[60,0]}>
                    <Col span={8}>
                        <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '150%'}}>
                        Поиск по названию
                        </Text>
                        <CustomInput
                            placeholder="Введите название компании"
                            prefix={<SearchOutlined style={{ color: "rgba(102, 102, 102, 1)" }} />}
                        />
                    </Col>
                     <Col span={5}>
                     
                        <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '150%'}}>
                        Статус
                        </Text>

                        <CustomSelect placeholder="Все статусы" />
                    </Col>
                     <Col span={5}>
                        <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '150%'}}>
                        Тип подписки
                        </Text>
                        <CustomSelect placeholder="Все типы" />
                    </Col>
                     <Col span={6}>
                        <Text style={{fontSize: 16, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '150%'}}>
                        Дата регистрации
                        </Text>
                        <CustomSelect placeholder="За все время" />
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
             <Row justify="space-between" align="middle" gutter={[60,0]}>
                <Col span={6}>
                <Row align="middle">
                        <Text style={{fontSize: 14, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '150%', marginRight: 6}}>
                        Показывать по:
                        </Text>
                        <Col span={6}>
                          <CustomSelect
                            placeholder="15"
                            value={pageSize}
                            onChange={(value) => {
                              setPageSize(value);
                              setPage(1); 
                            }}
                            options={[
                              { value: 5, label: "5" },
                              { value: 10, label: "10" },
                              { value: 15, label: "15" },
                              { value: 20, label: "20" },
                            ]}
                          />
                        </Col>
                      </Row>

                    </Col>

                    <Col span={8}>
                <Row align="middle" justify="end">
                        <Text style={{fontSize: 14, fontWeight: 500, color: 'rgba(102, 102, 102, 1)', lineHeight: '150%', marginRight: 6}}>
                        Сортировать по:
                        </Text>
                        <Col span={10}>
                         <CustomSelect
                            value={sortValue}
                            onChange={(val) => {
                              setSortValue(val);
                              setPage(1);
                            }}
                            options={sortOptions}
                          />
                        </Col>
                                        </Row>

                    </Col>

             </Row>
            </Col>

            <Col span={24} style={{marginTop: 16}}>
              <List
  style={{ marginTop: 12 }}
  bordered={false}
  dataSource={[{ isHeader: true }, ...dataCompanies]}
  renderItem={(item, index) => {
    if (item.isHeader) {
      return (
        <List.Item
          style={{
            borderBottom: "none",
            background: "rgba(236, 236, 255, 1)",
            padding: "15px 26px",
            borderRadius: 23,
          }}
        >
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
            index !== dataCompanies.length ? "2px solid rgba(164, 169, 178, 1)" : "none",
          display: "flex",
          padding: "15px 26px",
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
              background: "rgba(236, 236, 255, 1)",
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
            </Col>

            <Col span={24} style={{marginTop: 16}}>
            <Row justify="space-between" align="middle">
              <Text style={{fontSize: 16, fontWeight: 400, color: 'rgba(0, 0, 0, 1)', lineHeight: '140%'}}>
                Показано {companiesInformation?.numberOfElements} из {companiesInformation?.totalElements} компаний
              </Text>

               <CustomPagination
                  current={page}
                  total={companiesInformation?.totalElements}
                  pageSize={pageSize}
                  onChange={(p, size) => {
                    setPage(p);
                    setPageSize(size);
                  }}
                />
            </Row>
            </Col>
        </Row>
        </Col>
    </Row> 
  );
}
