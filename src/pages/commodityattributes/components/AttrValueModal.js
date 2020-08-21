import React from 'react';
import { Table, Input, Popconfirm, Form, Space, Button, Modal } from 'antd';

export default class AttrValueModal extends React.Component {
  constructor(props) {
    super(props);
    const { attributerecord } = props;
    console.log('attributerecord', attributerecord);
    this.state = {
      data: attributerecord.values,
      editingKey: '',
    };
  }

  render() {
    const EditableCell = ({
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }) => {
      const inputNode = <Input />;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };

    const ref = React.createRef();

    const isEditing = record => record.valueId === this.state.editingKey;
    // 编辑行事件
    const edit = record => {
      ref.current.setFieldsValue({
        valueId: '',
        valueName: '',
        valueSort: '',
        ...record,
      });
      this.setState({
        editingKey: record.valueId,
      });
    };
    // 删除行事件
    const deleteAttrValue = record => {
      let temp = this.state.data.filter(item => item.valueId != record.valueId);
      this.setState({
        data: temp,
      });
    };
    // 点击添加事件
    const addAttrValueHandler = () => {
      // console.log('this.state.data', this.state.data);
      let temp = [...this.state.data];
      if (temp[temp.length - 1] == undefined || temp[temp.length - 1] == '') {
        temp.push({
          valueId: 1,
          valueName: `Edrward 1`,
          valueSort: `no. 1`,
        });
      } else {
        let pushId = Number(temp[temp.length - 1].valueId) + 1;
        temp.push({
          valueId: pushId,
          valueName: `Edrward ${pushId}`,
          valueSort: `no. ${pushId}`,
        });
      }
      // console.log('pushId', pushId);
      // console.log('temp', temp);
      this.setState({
        data: [...temp],
      });
    };
    // 取消事件
    const cancel = () => {
      this.setState({
        editingKey: '',
      });
    };
    // 保存事件
    const save = async valueId => {
      try {
        const row = await ref.current.validateFields();
        const newData = [...this.state.data];
        const index = newData.findIndex(item => valueId === item.valueId);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          this.setState({
            data: newData,
          });
          this.setState({
            editingKey: '',
          });
        } else {
          newData.push(row);
          this.setState({
            data: newData,
          });
          this.setState({
            editingKey: '',
          });
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
    // table 列名
    const columns = [
      {
        title: '属性值编码',
        dataIndex: 'valueId',
        width: '22%',
        editable: false,
      },
      {
        title: '属性值名称',
        dataIndex: 'valueName',
        width: '33%',
        editable: true,
      },
      {
        title: '顺序',
        dataIndex: 'valueSort',
        width: '20%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span key={record.valueId}>
              <a
                onClick={() => save(record.valueId)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </a>
              <a onClick={cancel}>Cancel</a>
            </span>
          ) : (
            <Space key={record.valueId}>
              <a
                disabled={this.state.editingKey !== ''}
                onClick={() => edit(record)}
              >
                修改
              </a>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => deleteAttrValue(record)}
              >
                <a disabled={this.state.editingKey !== ''}>删除</a>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
    // 将table行改为input组件，进行修改删除
    const mergedColumns = columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

    const {
      attrValueMoadlVisible,
      closeAttrValueMoadl,
      attrValuesSubmitHandler,
      resetRecord,
    } = this.props;

    //modal 确认事件
    const handleOk = () => {
      // 关闭modal框
      closeAttrValueMoadl();
      // 表单提交之后，自动调用表单的 onFinish 函数
      let temp = this.state.data;
      attrValuesSubmitHandler(temp);
      // console.log('handleOk');
    };
    // modal 取消事件
    const handleCancel = () => {
      // 关闭modal框
      closeAttrValueMoadl();
      // console.log('Clicked cancel button');
    };
    // console.log('data===========', this.state.data)
    return (
      <Modal
        title="属性可选值"
        visible={attrValueMoadlVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <div>
          <Button type="primary" onClick={addAttrValueHandler}>
            新增
          </Button>
          <Form ref={ref} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={this.state.data}
              columns={mergedColumns}
              rowKey="valueId"
            />
          </Form>
        </div>
      </Modal>
    );
  }
}
