import React, { memo } from 'react';
import { Input, Modal, Form, Select } from 'antd';
import { withI18n } from '@lingui/react';

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
