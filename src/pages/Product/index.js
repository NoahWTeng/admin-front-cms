import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Row, Col, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { uploadProductImage } from '@actions';
import { Page } from '@components';
import { Header } from './components/Header';

import './index.scss';

function Product() {
  const dispatch = useDispatch();
  const { imageList } = useSelector((state) => state.products);

  console.log('imageList', imageList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <>
      <Page inner>
        <Header />
        <Row>
          <Col span={24}>
            <h3>Upload images</h3>
            <div className="clearfix">
              <Upload
                listType="picture-card"
                fileList={false}
                fileList={imageList}
                // onPreview={this.handlePreview}
                // onChange={this.handleChange}
                customRequest={(file) => dispatch(uploadProductImage(file))}
              >
                {uploadButton}
              </Upload>
              {/* <Modal
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
