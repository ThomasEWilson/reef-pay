import React, { useMemo } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  PageHeader,
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Table,
  Space,
  Menu,
  Dropdown
} from "antd";

import { useDataChanger } from "../../lib/useDataChanger";

interface FormData {
  name: string;
  memo: string;
}

const dataSource = [
  {
    key: "1",
    memo: "Oakland Winery Distribution Biz",
    name: "Wine Dist LLC"
  },
  {
    key: "2",
    memo: "Donut Shop",
    name: "Sweet Treats for Feet like me! LLC"
  }
];

const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Memo",
    dataIndex: "memo"
  }
];

const MerchantManagementCard = (): JSX.Element => {
  const [form] = Form.useForm<FormData>();
  const initFormData: FormData = useMemo(() => {
    return {
      name: "",
      memo: ""
    };
  }, []);
  const { data, dataRef, update } = useDataChanger<FormData>(initFormData);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 0 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Memo"
            name="memo"
            rules={[{ required: true, message: "Please input your memo!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Card>
      <Card
        title="Merchants"
        headStyle={{ color: "purple", fontWeight: 600 }}
        bodyStyle={{}}
      >
        {/* <Dropdown overlay={menu} trigger={['click']}>
          <button>
          Merchant <DownOutlined />
          </button>
        </Dropdown> */}
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Card>
    </>
  );
};

export default MerchantManagementCard;
