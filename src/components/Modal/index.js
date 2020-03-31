import React, { memo } from 'react';
import {
  Input,
  Modal,
  Form,
  Select,
  Switch,
  InputNumber,
  Upload,
  Button
} from 'antd';
import { withI18n } from '@lingui/react';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 12,
    offset: 2
  },
  style: { marginBottom: '10px' }
};

export const CustomModal = withI18n()(
  memo(
    ({
      item,
      onOk,
      title,
      i18n,
      modalFields,
      modalInitialValues,
      ...modalProps
    }) => {
      const [form] = Form.useForm();

      return (
        <Modal
          {...modalProps}
          title={title}
          destroyOnClose={true}
          maskClosable={false}
          centered={true}
          onOk={() => {
            form
              .validateFields()
              .then(values => {
                form.resetFields();
                onOk(values);
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          <Form
            layout="horizontal"
            form={form}
            initialValues={modalInitialValues}
          >
            {modalFields.map(item => {
              if (item.switch) {
                return (
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    {...formItemLayout}
                    key={item.id}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                );
              }
              if (item.upload) {
                return (
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    {...formItemLayout}
                    key={item.id}
                  >
                    <Upload fileList={[]}>
                      <Button>
                        <UploadOutlined /> Upload
                      </Button>
                    </Upload>
                  </Form.Item>
                );
              }
              return (
                <Form.Item
                  name={item.name}
                  label={item.label}
                  {...formItemLayout}
                  key={item.id}
                  rules={item.rules}
                >
                  {item.options ? (
                    <Select placeholder={i18n.t`Select a option`}>
                      {item.options.map((option, i) => (
                        <Option key={i} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  ) : item.textArea ? (
                    <Input.TextArea autoSize={true} />
                  ) : item.inputNumber ? (
                    <InputNumber disabled />
                  ) : (
                    <Input
                      disabled={item.disable}
                      placeholder={item.placeholder}
                    />
                  )}
                </Form.Item>
              );
            })}
          </Form>
        </Modal>
      );
    }
  )
);
