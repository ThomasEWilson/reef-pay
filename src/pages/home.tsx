import { PageHeader } from "antd";
import React from "react";
import PaymentCard from "../components/dashboard/payment-card";

// import { Components } from "@reef-defi/react-lib";
// import "@reef-defi/react-lib/dist/index.css";
// const { Card, Button } = Components;

const Home = () => {
  return (
    <>
    <PageHeader
      title="Home"
      className="site-page-header"
      subTitle="Your personal Reef adobe"
    ></PageHeader>
      <PaymentCard/>
    </>
    // TODO: Add Graph of Sales over Period
    // TODO: Add Recent Transactions Table
  );
};

export default Home;
