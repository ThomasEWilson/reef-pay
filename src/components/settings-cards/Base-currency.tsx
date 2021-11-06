import { 
  Space, Card, Button, Menu, Dropdown, 
} from 'antd';
import { DownOutlined } from '@ant-design/icons';

const BaseCurrency = () => {
  const currencies = ['USD', 'EUR', 'GBP', 'NZD', 'BRL'];

  const menu = (
    <Menu>
      {currencies.map((currencyItem, indx) => (
        <Menu.Item key={indx}>
          <a>{currencyItem}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Card
      title="Currency"
      headStyle={{ color: 'purple', fontWeight: 600 }}
      bodyStyle={{}}>
      <Space direction="vertical">
        <Dropdown overlay={menu} trigger={['click']}>
          <button>
            Currency <DownOutlined />
          </button>
        </Dropdown>
        <br />
        <Button type="primary">Save Changes</Button>
      </Space>
    </Card>
  );
};

export default BaseCurrency;
