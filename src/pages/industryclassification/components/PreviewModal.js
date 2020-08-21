import React from 'react';
import {
  Row,
  Col,
  Form,
  Select,
  Modal,
  Checkbox,
  Space,
  Input,
  DatePicker,
} from 'antd';
export default props => {
  const { previewModalVisible, closePreviewModal, previewAttrData } = props;
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };
  // Modal 取消事件
  const handleCancel = () => {
    closePreviewModal();
  };
  // 循环行，每个属性组2行，一行属性组名称，一行属性
  const PreviewRow = () => {
    let content = previewAttrData.content;
    let temp = content.map((item, index) => {
      return (
        <div key={index + 'div'}>
          <Form {...layout}>
            <Row>
              <Col className="preview" span={24}>
                <span className="previewSpan" id={item.name + '+space1'}>
                  &nbsp;
                </span>
                <h2>{item.name}</h2>
              </Col>
            </Row>
            <Row>{previewCol(item.attrArr)}</Row>
          </Form>
        </div>
      );
    });
    return temp;
  };
  // 循环列，每列占栅格长度的8格
  const previewCol = arr => {
    return arr.map((arrItem, index) => {
      return (
        <Col span={8} key={index + 'col'}>
          {' '}
          {previewFormItem(arrItem)}
        </Col>
      );
    });
  };
  // 循环 FromItem,通过 type 返回不同的控件
  const previewFormItem = attr => {
    if (attr.type == 0) {
      return (
        <Form.Item label={attr.name} name={attr.name}>
          <Input style={{ width: '70%' }} />
        </Form.Item>
      );
    } else if (attr.type == 1) {
      return (
        <Form.Item label={attr.name} name={attr.name}>
          <Select style={{ width: '70%' }}>{previewOption(attr.values)}</Select>
        </Form.Item>
      );
    } else if (attr.type == 2) {
      return (
        <Form.Item label={attr.name} name={attr.name}>
          {previewCheckBox(attr.values)}
        </Form.Item>
      );
    } else if (attr.type == 3) {
      return (
        <Form.Item label={attr.name} name={attr.name}>
          <DatePicker style={{ width: '70%' }} />
        </Form.Item>
      );
    } else {
      return null;
    }
  };
  // 循环<Select></Select> 中的<Option></Option>
  const previewOption = values => {
    return values.map((value, index) => {
      return (
        <Select.Option value={value.valueId} key={index + 'option'}>
          {value.valueName}
        </Select.Option>
      );
    });
  };
  // 处理 CheckBox 中的 values 数据使其符合 option结构，返回CheckBox
  const previewCheckBox = values => {
    let options = values.map(item => {
      return { label: item.valueName, value: item.valueId };
    });
    return <Checkbox.Group options={options} />;
  };

  return (
    <Modal
      title="预览属性组"
      width={1200}
      visible={previewModalVisible}
      onCancel={handleCancel}
      destroyOnClose={true}
      footer={null}
    >
      <PreviewRow />
    </Modal>
  );
};
