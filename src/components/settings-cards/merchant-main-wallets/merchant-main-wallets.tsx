import { Table, Space } from "antd";
import { Card } from "antd";
import { Button } from "antd";
import "./merchant-main-wallets.scss";

const MerchantMainWallets = () => {
  //if (noWalletsConnected)
  //display (You must add a wallet to receive payments!)
  const dataSource = [
    {
      key: "1",
      currency: "ETH",
      address: "0x375425j2tswsurt4"
    },
    {
      key: "2",
      currency: "REEF",
      address: "0xboogedyboo"
    }
  ];

  const columns = [
    {
      title: "Currency",
      dataIndex: "currency"
    },
    {
      title: "Address",
      dataIndex: "address"
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="small">
          <a>Add</a>
          <a>Delete</a>
        </Space>
      )
    }
  ];

  return (
    <Card
      title="Outcome Wallet"
      headStyle={{ color: "purple", fontWeight: 600 }}
      bodyStyle={{}}
    >
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Button type="primary">Add New Wallet</Button>
    </Card>
  );
};

export default MerchantMainWallets;
