import React from 'react';
import { Input, Icon, Form, Button } from 'antd';

export default class InputButtonClass extends React.Component {
  constructor(props) {
    super(props);
    this.onPressEnterChange = this.onPressEnterChange.bind(this);
    this.state = {
      value: '',
    };
  }
  // 接收到value，需要受控的情况下
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      if (!nextProps.value) {
        this.setState({
          value: '',
        });
      } else {
        this.setState({
          value: nextProps.value,
        });
      }
    }
  }
  onPressEnterChange(ee) {
    this.setState({
      value: ee.target.value,
    });
    this.props.onChange(ee);
  }

  onChange(ee) {
    this.setState({
      value: ee.target.value,
    });
  }

  render() {
    return (
      <Input
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onPressEnter={this.onPressEnterChange}
        suffix={<Icon type="enter" style={{ color: 'rgba(0,0,0,.45)' }} />}
      />

      // <Row>
      //   <Col span={20}>
      //     <Form.Item label='品牌' name='brand' labelCol={{ span: 9 }} wrapperCol={{ span: 14 }}>
      //       <Input value={props.value} />
      //     </Form.Item>
      //   </Col>
      //   <Col span={4}>
      //     <Button shape="circle" onClick={openModal}>
      //       ···
      //   </Button>
      //   </Col>
      // </Row>
    );
  }
}
