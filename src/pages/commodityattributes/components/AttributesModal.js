import React from 'react';
import { Modal, Form, Input, Select, Radio, notification } from 'antd';
import InputButtonModal from './InputButtonModal';

export default props => {
  const {
    attributesModalVisible,
    closeAttributesModal,
    attributerecord,
    submitFormInfoHandler,
    attrValueMoadlVisible,
    openAttrValueMoadl,
    closeAttrValueMoadl,
    attrValuesSubmitHandler,
  } = props;
  // form 样式
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const submitFormRef = React.createRef();

  //modal 确认事件
  const handleOk = () => {
    // console.log('.........');
    // 关闭modal框
    closeAttributesModal();
    // 表单提交之后，自动调用表单的 onFinish ->fromFinishHandler函数
    submitFormRef.current.submit();
    // console.log('handleOk');
  };
  // modal 取消事件
  const handleCancel = () => {
    // 关闭modal框
    closeAttributesModal();
    // console.log('Clicked cancel button');
  };

  // 信息表单提交失败事件
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  // 表单提交成功信息
  const fromFinishHandler = values => {
    submitFormInfoHandler(values);
    // console.log('fromFinishHandler', values);
  };
  // select onchange 事件
  const selectChangeHandler = () => {
    let type = submitFormRef.current.getFieldValue('type');
    if (type == 3 || type == 0) {
      // console.log('??????????????????????');
      // attributerecord.values = []
      // submitFormRef.current.resetFields(attributerecord)
      submitFormRef.current.setFieldsValue({ values: [] });
    }
  };

  // ----------------------------------------AttrValueMoadl  方法-------------------------------
  // 属性可选值增加按钮点击事件
  const addAttrValue = () => {
    let type = submitFormRef.current.getFieldValue('type');
    if (type == '' || type == undefined) {
      notification['warning']({
        message: '错误',
        description: '请先选择编辑类型，再编辑可选值',
      });
    } else if (type == 2 || type == 1) {
      openAttrValueMoadl();
    } else if (type == 3 || type == 0) {
      notification['warning']({
        message: '错误',
        description: '此编辑类型不可以编辑可选值',
      });
    }
  };

  return (
    <div>
      <Modal
        title="新增或编辑属性"
        visible={attributesModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form
          {...layout}
          ref={submitFormRef}
          initialValues={attributerecord}
          onFinish={fromFinishHandler}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="属性编码" name="id">
            {attributerecord.id}
          </Form.Item>
          <Form.Item label="属性名称" name="name" rules={[{ required: true }]}>
            <Input style={{ width: '80%' }} />
          </Form.Item>
          <Form.Item label="单位" name="unit">
            <Input style={{ width: '80%' }} />
          </Form.Item>
          <Form.Item label="默认值" name="defaultValue">
            <Input style={{ width: '80%' }} />
          </Form.Item>
          <Form.Item
            label="是否销售属性"
            name="saleable"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={false}>否</Radio>
              <Radio value={true}>是</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="编辑类型" name="type" rules={[{ required: true }]}>
            <Select style={{ width: '80%' }} onChange={selectChangeHandler}>
              <Select.Option value={0}>文本输入框</Select.Option>
              <Select.Option value={1}>单选下拉</Select.Option>
              <Select.Option value={2}>复选框</Select.Option>
              <Select.Option value={3}>时间控件</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="是否可为空"
            name="nullable"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={false}>否</Radio>
              <Radio value={true}>是</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="可选值" name="values">
            {/* <InputButton onClick={addAttrValue}></InputButton> */}
            <InputButtonModal
              attrValueMoadlVisible={attrValueMoadlVisible}
              closeAttrValueMoadl={closeAttrValueMoadl}
              attributerecord={attributerecord}
              attrValuesSubmitHandler={attrValuesSubmitHandler}
              onClick={addAttrValue}
            ></InputButtonModal>
          </Form.Item>

          <Form.Item
            label="是否可被搜索"
            name="searchable"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={false}>否</Radio>
              <Radio value={true}>是</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input style={{ width: '80%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
