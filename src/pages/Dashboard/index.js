import React from 'react';
import { Layout, Row, Col } from 'antd';

const Dashboard = () => {
  return (
    <Layout.Content>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          hello
        </Col>
        <Col className="gutter-row" span={6}>
          from
        </Col>
        <Col className="gutter-row" span={6}>
          Dashboard
        </Col>
        <Col className="gutter-row" span={6}>
          Go
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: '30px' }}>
        <Col span={12} style={{ bakcground: '#fff' }}>
          Prettier
        </Col>
        <Col span={12}>Good</Col>
      </Row>
    </Layout.Content>
  );
};
export default Dashboard;
