import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
// import moment from 'moment'

export default props => {
  const { modalVisible, record, closeModal, fromFinishHandler } = props;
  const [form] = Form.useForm();
  // modal 样式
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  //modal 确认事件
  const handleOk = () => {
    // 关闭modal框
    closeModal();
    // 表单提交之后，自动调用表单的 onFinish 函数
    form.submit();
    console.log('handleOk');
  };
  // modal 取消事件
  const handleCancel = () => {
    // 关闭modal框
    closeModal();
    console.log('Clicked cancel button');
  };

  // 信息表单提交失败事件
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  /*  
    相当于react中的 componentDidMount() 
    当modalVisible值改变时，执行匿名函数
    */
  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        ...record,
        // operate_time: moment(record.operate_time)
      });
    }
  }, [modalVisible]);
  return (
    <Modal
      title="信息"
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender
    >
      <Form
        {...layout}
        initialValues={record}
        onFinish={fromFinishHandler}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item label="品牌名称" name="name">
          <Input style={{ width: '80%' }} />
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Select placeholder="请选择" allowClear style={{ width: '80%' }}>
            <Select.Option value="1">待确认</Select.Option>
            <Select.Option value="2">成功</Select.Option>
            <Select.Option value="3">失败</Select.Option>
            <Select.Option value="4">取消</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="操作者" name="operator_name">
          <Input style={{ width: '80%' }} />
        </Form.Item>
        <Form.Item label="操作时间" name="operate_time">
          {/* <DatePicker showTime style={{ width: '80%' }}/>  */}
          <Input style={{ width: '80%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
