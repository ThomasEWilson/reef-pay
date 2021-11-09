import { PageHeader, Menu, Dropdown, Card, Table } from "antd";
import React from "react";
import { DownOutlined } from "@ant-design/icons";

import Payments from "../components/payments/payments";
import PayStats from "../components/dashboard/pay-stats";

// import { Components } from "@reef-defi/react-lib";
// import "@reef-defi/react-lib/dist/index.css";
// const { Card, Button } = Components;
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
