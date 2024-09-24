import React, { useState } from 'react';
import { Upload, Button, Input, Table, Row, Col, message } from 'antd';
import { UploadOutlined, FileExcelOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const ExcelPage = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (jsonData.length) {
        const headers = jsonData[0].map((header) => ({
          title: header,
          dataIndex: header,
          key: header,
        }));

        const tableData = jsonData.slice(1).map((row, index) => {
          const rowData = {};
          headers.forEach((header, i) => {
            rowData[header.dataIndex] = row[i] || '';
          });
          return { key: index, ...rowData };
        });

        setColumns(headers);
        setData(tableData);
        setFilteredData(tableData);
      }
    };

    reader.readAsBinaryString(file);
    return false;
  };

  const handleSearchKeyword = (keyword) => {
    const filtered = data.filter((row) =>
      Object.values(row).some((cell) =>
        String(cell).toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados Filtrados');
    XLSX.writeFile(workbook, 'RelatorioFiltrado.xlsx');
    message.success('Relatório exportado com sucesso!');
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col xs={24} sm={16} md={12} lg={8}>
          <Upload beforeUpload={handleFileUpload} accept=".xlsx, .xls" showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload Excel</Button>
          </Upload>
        </Col>
        <Col xs={24} sm={16} md={12} lg={10}>
          <Input.Search
            placeholder="Buscar palavra-chave"
            enterButton="Buscar"
            onSearch={handleSearchKeyword}
            allowClear
          />
        </Col>
        <Col xs={24} sm={16} md={12} lg={6}>
          <Button icon={<FileExcelOutlined />} type="primary" onClick={handleExportExcel} block>
            Gerar Relatório
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100'] }}
        style={{ marginTop: '16px' }}
      />
    </>
  );
};

export default ExcelPage;
