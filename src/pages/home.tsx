import { PageHeader, Menu, Dropdown, Card, Table } from "antd";
import React from "react";
import PaymentCard from "../components/dashboard/payment-card";

import Payments from "../components/payments/payments";
import PayStats from "../components/dashboard/pay-stats";

const currencies = ["USD", "EUR", "GBP", "NZD", "BRL"];
const menu = (
  <Menu>
    {currencies.map((currencyItem, indx) => (
      <Menu.Item key={indx}>
        <a>{currencyItem}</a>
      </Menu.Item>
    ))}
  </Menu>
);

const Home = () => {
  return (
    <>
      <PageHeader
        title="Dashboard"
        className="site-page-header"
        subTitle="Your personal Reef adobe"
      ></PageHeader>

      <PayStats />
      <Card
        title="Transactions
    "
        headStyle={{ color: "purple", fontWeight: 600 }}
        bodyStyle={{}}
      >
        <Payments />
        {/* <Dropdown overlay={menu} trigger={['click']}>
          <button>
          Merchant <DownOutlined />
          </button>
        </Dropdown> */}
      </Card>
    </>
  );
};

export default Home;
