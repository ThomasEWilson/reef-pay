import { Table, Space } from "antd";
import { Card } from "antd";
import { Button } from "antd";

const Payments = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street"
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street"
    }
  ];

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "paymentID",
      key: "paymentID"
    },
    {
      title: "Order ID",
      dataIndex: "orderID",
      key: "orderID"
    },
    {
      title: "Original Price",
      dataIndex: "originalPrice",
      key: "originalPrice"
    },
    {
      title: "Amount Sent",
      dataIndex: "amountSent",
      key: "amountSent"
    },
    {
      title: "Amount Received",
      dataIndex: "amountReceived",
      key: "amountReceived"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created"
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action"
    }
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default Payments;
