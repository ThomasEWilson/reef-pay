import React from "react";
import { PageHeader } from "antd";
import Payments from "../components/payments/payments";

const PaymentsPage = () => {
  return (
    <>
      <PageHeader title="Payments" className="site-page-header"></PageHeader>
      <Payments />
    </>
  );
};

export default PaymentsPage;
