import React from "react";
import { Table, Tag, Space, Card, Button, Menu, Dropdown, Input } from "antd";

const PayNotifs = () => {
  return (
    <Card title="Instant Payment Notifications">
      {/* <span> Secret Key </span> */}
      <Input />
      <Button type="primary"> Generate </Button>
      {/* Recurring Notifications */}
    </Card>
  );
};

export default PayNotifs;
