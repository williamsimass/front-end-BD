import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Button, Upload, Table, message, Row, Col } from 'antd';
import { UploadOutlined, FileExcelOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import BasicSearch from './pages/BasicSearch';
import FullSearch from './pages/FullSearch';

const { Header, Content, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [processNumber, setProcessNumber] = useState('');
  const [filtered, setFiltered] = useState(false);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Função que trata o upload e leitura do arquivo Excel
  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      // Pegue a primeira planilha
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Converte para JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (jsonData.length) {
        // A primeira linha será tratada como cabeçalho para as colunas
        const headers = jsonData[0].map((header) => ({
          title: header,
          dataIndex: header,
          key: header,
        }));

        // O restante são os dados
        const tableData = jsonData.slice(1).map((row, index) => {
          const rowData = {};
          headers.forEach((header, i) => {
            rowData[header.dataIndex] = row[i] || '';
          });
          return { key: index, ...rowData };
        });

        setColumns(headers);
        setData(tableData);
        setFilteredData(tableData); // Inicializa o dado filtrado com os dados originais
      }
    };

    reader.readAsBinaryString(file);
    return false; // Previne o comportamento padrão de upload
  };

  // Função de busca por palavra-chave nos dados da planilha
  const handleSearchKeyword = (keyword) => {
    const filtered = data.filter((row) =>
      Object.values(row).some((cell) =>
        String(cell).toLowerCase().includes(keyword.toLowerCase())
      )
    );

    if (filtered.length) {
      setFilteredData(filtered);
      message.success(`Foram encontradas ${filtered.length} correspondências!`);
    } else {
      setFilteredData([]);
      message.warning('Nenhuma correspondência encontrada.');
    }
  };

  // Função para gerar o relatório Excel com os dados filtrados
  const handleExportExcel = () => {
    if (filteredData.length === 0) {
      message.warning('Nenhum dado para exportar.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados Filtrados');
    XLSX.writeFile(workbook, 'RelatorioFiltrado.xlsx');
    message.success('Relatório exportado com sucesso!');
  };

  return (
    <Router>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ flex: 1, minWidth: 0 }}
          >
            <Menu.Item key="1">
              <Link to="/">Consulta Básica</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/full">Consulta Completa</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }} disabled={true}>
            <div style={{ padding: '16px' }}>
              <Input 
                placeholder="Número do processo"
                value={processNumber}
                onChange={(e) => setProcessNumber(e.target.value)}
                disabled={true}/>
              <Button
                type="primary"
                onClick={() => setFiltered(true)}
                style={{ marginTop: '8px', width: '100%' }}
                disabled={true}>
                Consultar
              </Button>
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="sub1" icon={<UserOutlined />} disabled={true}>
                Indisponivel
              </Menu.Item>
              <Menu.Item key="sub2" icon={<LaptopOutlined />} disabled={true}>
                Indisponivel
              </Menu.Item>+
              <Menu.Item key="sub3" icon={<NotificationOutlined />} disabled={true}>
                Indisponivel
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>

            <Content
              style={{
                padding: 24,
                margin: '16px 0',
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {/* Upload, Campo de busca e Botão de Exportação */}
              <Row gutter={[16, 16]} justify="center" align="middle">
  <Col xs={24} sm={16} md={12} lg={8}>
    <Upload
      beforeUpload={handleFileUpload}
      accept=".xlsx, .xls"
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>Upload Excel</Button>
    </Upload>
  </Col>
  <Col xs={24} sm={16} md={12} lg={10}>
  <Input.Search
  placeholder="Buscar palavra-chave"
  enterButton="Buscar"
  onSearch={handleSearchKeyword}
  allowClear
  style={{ borderRadius: '8px' }}
/>

  </Col>
  <Col xs={24} sm={16} md={12} lg={6}>
    <Button
      icon={<FileExcelOutlined />}
      type="primary"
      onClick={handleExportExcel}
      block
    >
      Gerar Relatório
    </Button>
  </Col>
</Row>


              {/* Exibição dos dados da planilha em uma tabela com Paginação */}
              <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100'] }}
                style={{ marginTop: '16px' }}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Routes>
        <Route path="/" element={<BasicSearch processNumber={processNumber} filtered={filtered} />} />
        <Route path="/full" element={<FullSearch processNumber={processNumber} filtered={filtered} />} />
      </Routes>
    </Router>
  );
};

export default App;
