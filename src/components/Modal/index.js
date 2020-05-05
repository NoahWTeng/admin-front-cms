import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type } from 'ramda';
import {
  Input,
  Modal,
  Form,
  Select,
  Switch,
  InputNumber,
  Upload,
  Button,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { closeModal } from '@actions';
import { services } from '@helpers';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
    offset: 2,
  },
  style: { marginBottom: '10px' },
};

export const CustomModal = ({
  item,
  onOk,
  title,
  i18n,
  modalFields,
  modalInitialValues,
  ...modalProps
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { modalType, isModal } = useSelector((state) => state.modal);
  console.log('entro');
  return (
    <Modal
      {...modalProps}
      visible={isModal}
      onCancel={() => dispatch(closeModal())}
      title={`${i18n._(modalType)}`}
      destroyOnClose={true}
      maskClosable={false}
      centered={true}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onOk(values);
          })
          .catch((info) => {
            console.error('Validate Failed:', info);
          });
      }}
    >
      <Form layout="horizontal" form={form} initialValues={modalInitialValues}>
        {modalFields.map((item) => {
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
                <Upload
                  fileList={false}
                  multiple={false}
                  action={services.api_upload}
                >
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
                  {item.options.map((option, i) => {
                    const isObj = type(option) === 'Object';
                    return (
                      <Option key={i} value={isObj ? option._id : option}>
                        {isObj ? option.title : option}
                      </Option>
                    );
                  })}
                </Select>
              ) : item.textArea ? (
                <Input.TextArea autoSize={true} />
              ) : item.inputNumber ? (
                <InputNumber disabled />
              ) : (
                <Input disabled={item.disable} placeholder={item.placeholder} />
              )}
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};
