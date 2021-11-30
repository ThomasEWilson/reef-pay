import { PageHeader, Menu, Dropdown, Card, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

import Payments from "../components/payments/payments";
import PayStats from "../components/dashboard/pay-stats";
import PaymentCard from "../components/dashboard/payment-card";

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

interface Data {
  healthStatus: string;
}

const Home = () => {
  useEffect(() => {
    // const axios = require('axios');
    const callWebApi = async () => {
      var requestOptions = {
        method: "GET"
        // redirect: "follow"
      };

      fetch(
        "https://bpnqxl35g7.execute-api.us-east-2.amazonaws.com/dev/health",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    };

    callWebApi();
  });

  return (
    <>
      <PageHeader
        title="Dashboard"
        className="site-page-header"
        subTitle="Your personal Reef adobe"
      ></PageHeader>

      {/* <PayStats /> */}
      <Card
        title="Transactions
    "
        headStyle={{ color: "purple", fontWeight: 600 }}
        bodyStyle={{}}
      >
        <Payments />
        <PaymentCard />
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
