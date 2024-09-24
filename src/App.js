import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ExcelPage from './pages/ExcelPage';
import OtherFeature1 from './pages/OtherFeature1';
import OtherFeature2 from './pages/OtherFeature2';

const { Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Header />
        <Layout>
          <Sidebar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 24,
                margin: '16px 0',
                minHeight: 280,
                background: '#fff',
              }}
            >
              <Routes>
                <Route path="/" element={<ExcelPage />} />
                <Route path="/feature1" element={<OtherFeature1 />} />
                <Route path="/feature2" element={<OtherFeature2 />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
