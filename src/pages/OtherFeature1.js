import React from 'react';
import { Table, Button, Space, notification, Input } from 'antd';

const { Search } = Input;

const reportData = [
  { key: '1', reportName: 'Relatório de Processos Abertos', createdDate: '2024-01-01', status: 'Gerado' },
  { key: '2', reportName: 'Relatório de Processos Fechados', createdDate: '2024-01-02', status: 'Gerado' },
  { key: '3', reportName: 'Relatório de Autores', createdDate: '2024-01-05', status: 'Disponível' },
];

const OtherFeature1 = () => (
  <div>
    <h1>Visualização de Relatórios</h1>
    <Search
      placeholder="Buscar relatórios"
      onSearch={value => console.log(value)}
      style={{ marginBottom: 16 }}
    />
    <Table dataSource={reportData}>
      <Table.Column title="Nome do Relatório" dataIndex="reportName" key="reportName" />
      <Table.Column title="Data de Criação" dataIndex="createdDate" key="createdDate" />
      <Table.Column title="Status" dataIndex="status" key="status" />
      <Table.Column
        title="Ações"
        key="actions"
        render={(text, record) => (
          <Space size="middle">
            <Button type="primary" onClick={() => handleDownload(record.reportName)}>Baixar</Button>
            {record.status === 'Disponível' && (
              <Button type="default" onClick={() => handleGenerate(record.reportName)}>Gerar</Button>
            )}
          </Space>
        )}
      />
    </Table>
  </div>
);

// Função para baixar relatório
const handleDownload = (reportName) => {
  console.log(`Baixando ${reportName}`);
  notification.success({
    message: 'Sucesso',
    description: `Relatório ${reportName} baixado com sucesso!`,
  });
};

// Função para gerar relatório
const handleGenerate = (reportName) => {
  console.log(`Gerando ${reportName}`);
  notification.success({
    message: 'Sucesso',
    description: `Relatório ${reportName} gerado com sucesso!`,
  });
};

export default OtherFeature1;
