import React, { useEffect, useState } from 'react';
import { Row, Col, Upload, Modal } from 'antd';
import { Page } from '@components';
import { Header } from './components/Header';

import './index.scss';

function Product() {
  return (
    <>
      <Page inner>
        <Header />
        <Row>
          <Col span={24}>
            <h3>Upload images</h3>
            <div className="clearfix">
              {/* <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal> */}
            </div>
          </Col>
        </Row>
      </Page>
    </>
  );
}

export default Product;
