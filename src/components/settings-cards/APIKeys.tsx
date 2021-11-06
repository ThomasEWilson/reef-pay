import { Table, Space } from "antd";
import { Card } from "antd";
import { Button } from "antd";

enum Status {
  Active = "Active",
  Inactive = "Inactive"
}

const ApiKeys = () => {
  const dataSource = [
    {
      key: "1",
      status: Status.Active,
      created: "15-5-19"
    },
    {
      key: "2",
      status: Status.Inactive,
      created: "21-4-21"
    }
  ];

  const columns = [
    {
      title: "Key",
      dataIndex: "key"
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Created",
      dataIndex: "created"
    },
    {
      title: "Action",
      dataIndex: "action"
    }
  ];

  return (
    <Card
      title="API Keys"
      headStyle={{ color: "purple", fontWeight: 600 }}
      bodyStyle={{}}
    >
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Button type="primary">Add New Key</Button>
    </Card>
  );
};

export default ApiKeys;

