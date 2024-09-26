import React from 'react';
import { Layout, Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => (
  <Sider width={200} className="site-layout-background">
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item key="1" icon={<UploadOutlined />}>
        <Link to="/">Upload Excel</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<LaptopOutlined />}>
        <Link to="/feature1">Feature 1</Link> {/* Adicionando link para Feature 1 */}
      </Menu.Item>
      <Menu.Item key="3" icon={<NotificationOutlined />}>
      <Link to="/feature2">Feature 2</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default Sidebar;
