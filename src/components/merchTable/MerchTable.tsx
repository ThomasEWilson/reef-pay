import { Table, Tag, Space } from 'antd';

import "./merchTable.scss";

export default function MerchTable ()
{
    const dataSource = [
        {
          key: '1',
          currency: 'ETH',
          address: '0x375425j2tswsurt4',
        },
        {
          key: '2',
          currency: 'REEF',
          address: '0xboogedyboo',
        },
      ];
      
      const columns = [
        {
          title: 'Currency',
          dataIndex: 'currency',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: (text, record) => (
            <Space size="small">
              <a>Invite {record.name}</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];

    return (
        <Table dataSource={dataSource} columns={columns}
        pagination={false} />
    );
}
