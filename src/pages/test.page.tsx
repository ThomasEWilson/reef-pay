import React from "react";
import { PageHeader } from "antd";
import EditableTable from "../components/editable-table";
// import Payments from "../components/payments/payments";

const TestPage = () => {
  const rows = [];

  for (let i = 0; i < 100; i++) {
    const row = {
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`
    };
    rows.push(row);
  }

  return (
    <>
      <PageHeader title="Payments" className="site-page-header"></PageHeader>

      <EditableTable originData={rows} />
    </>
  );
};

export default TestPage;
