import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const HeaderComponent = () => (
  <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ color: 'white', fontSize: '24px' }}>Sua Logo Aqui</h1>
    {/* Substitua pela sua logo <img src="/path/to/your-logo.png" alt="Logo" style={{ height: '50px' }} /> */}
  </Header>
);

export default HeaderComponent;
