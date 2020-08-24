import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import BreadContent from '@/components/BreadContent';
import {
  Row,
  Col,
  Form,
  Select,
  Modal,
  Checkbox,
  Space,
  Input,
  Button,
  DatePicker,
} from 'antd';
import SelectBrandModal from './components/SelectBrandModal';
import SelectCategoryModal from './components/SelectCategoryModal';
import CategoryAttributes from './components/CategoryAttributes';

const AddCommodity = props => {
  // form 样式
  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 14 },
  };
  const {
    dispatch,
    selectBrandModalVisible,
    formBrandName,
    selectCategoryModalVisible,
    treeChildrenData,
    treeData,
    formCategoryId,
    formCategoryName,
    categoryAttrVisible,
    categoryAttrData,
  } = props;
  // 新增商品表单提交事件
  const searchCommodityRef = React.createRef();
  const searchCommoditySubmit = values => {
    console.log('提交', values);
  };
  // --------------------------------本页 函数 funtion-------------------------
  // 打开选择品牌弹出框
  const openSelectBrandModal = () => {
    dispatch({
      type: 'addcommodity/updateState',
      payload: { selectBrandModalVisible: true },
    });
  };

  // 打开选择工业分类弹出框
  const openSelectCategoryModal = () => {
    dispatch({
      type: 'addcommodity/initTree',
      payload: { id: 0, selectCategoryModalVisible: true },
    });
  };

  // ------------------------------selectBrandModal funtion-----------------------
  // 关闭选择品牌弹出框
  const closeSelectBrandModal = () => {
    dispatch({
      type: 'addcommodity/updateState',
      payload: { selectBrandModalVisible: false },
    });
  };
  // 改变品牌名称
  const changeFormBrandName = (id, brandName) => {
    dispatch({
      type: 'addcommodity/updateState',
      payload: { formBrandName: brandName },
    });
  };

  // 填充 brand 的Form.Item
  const changeBrandName = () => {
    searchCommodityRef.current.setFieldsValue({
      brandName: formBrandName,
      commodityName: formBrandName + ' ' + formCategoryName,
      description: formBrandName + ' ' + formCategoryName,
    });
  };
  // ------------------------------selectCategoryModal funtion-----------------------
  // 关闭选择工业分类弹出框
  const closeSelectCategoryModal = () => {
    dispatch({
      type: 'addcommodity/updateState',
      payload: { selectCategoryModalVisible: false },
    });
  };
  // 通过一级id 查询 二级信息
  const getChildrenData = (id, treeData) => {
    //通过id查询子节点信息，
    dispatch({
      type: 'addcommodity/getChildrenInfo',
      payload: { id, treeData },
    });
  };
  // 点击工业节点 改变工业id与name
  const onSelectTreeNode = (value, e) => {
    // console.log('e.node',value,e);
    dispatch({
      type: 'addcommodity/updateState',
      payload: {
        formCategoryId: e.node.key,
        formCategoryName: e.node.title,
      },
    });
  };

  // 填充 category 的Form.Item
  const changeCategoryName = () => {
    searchCommodityRef.current.setFieldsValue({
      // brandId: formBrandId,
      categoryName: formCategoryName,
      categoryLongName: formCategoryName,
      commodityName: formBrandName + ' ' + formCategoryName,
      description: formBrandName + ' ' + formCategoryName,
    });
    getCategoryAttrInfo();
  };

  // 获取属性组数据
  const getCategoryAttrInfo = () => {
    dispatch({
      type: 'addcommodity/getCategoryAttributesInfo',
      payload: { categoryId: formCategoryId, categoryAttrVisible: true },
    });
  };

  return (
    <BreadContent>
      <div>
        <SelectBrandModal
          selectBrandModalVisible={selectBrandModalVisible}
          closeSelectBrandModal={closeSelectBrandModal}
          changeBrandName={changeBrandName}
          changeFormBrandName={changeFormBrandName}
        />
        <SelectCategoryModal
          selectCategoryModalVisible={selectCategoryModalVisible}
          closeSelectCategoryModal={closeSelectCategoryModal}
          treeData={treeData}
          getChildrenData={getChildrenData}
          treeChildrenData={treeChildrenData}
          onSelectTreeNode={onSelectTreeNode}
          changeCategoryName={changeCategoryName}
        />
        <Form
          {...layout}
          ref={searchCommodityRef}
          onFinish={searchCommoditySubmit}
        >
          <Row>
            <Col className="preview" span={23}>
              <span className="previewSpan">&nbsp;</span>
              <h2>基本属性</h2>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <Form.Item
                    label="品牌"
                    name="brandName"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button shape="circle" onClick={openSelectBrandModal}>
                    ···
                  </Button>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="工业分类"
                    name="categoryName"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button shape="circle" onClick={openSelectCategoryModal}>
                    ···
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Col span={23}>
                <Form.Item
                  label="工业分类名称"
                  name="categoryLongName"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 19 }}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <Form.Item label="产地" name="origin">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                  <Form.Item label="毛重" name="weight">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Col span={23}>
                <Form.Item
                  label="商品型号"
                  name="model"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 19 }}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <Form.Item label="质量等级" name="qualityLevel">
                    <Input defaultValue="合格" />
                  </Form.Item>
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                  <Form.Item
                    label="单位"
                    name="unit"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Col span={23}>
                <Form.Item
                  label="经营部门"
                  name="operatingDepartment"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 19 }}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Col>
          </Row>

          <Row>
            <Col span={23}>
              <Form.Item
                label="商品名称"
                name="commodityName"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                rules={[{ required: true }]}
              >
                <Input readOnly disabled={true} />
              </Form.Item>
            </Col>
            <Col span={23}>
              <Form.Item
                label="描述"
                name="description"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                rules={[{ required: true }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                label="商品类型"
                name="conmmodityType"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                无
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="是否检查库存"
                name=""
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                否
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="是否单独销售"
                name=""
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                否
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="是否可维修"
                name=""
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                否
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="是否可退货"
                name=""
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                否
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="是否快递送货"
                name=""
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                否
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="是否需要安装"
                name=""
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                否
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="退货是否上门取件"
                name=""
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                否
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="是否独有品牌"
                name=""
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                否
              </Form.Item>
            </Col>
          </Row>
          {categoryAttrVisible && (
            // <div>{JSON.stringify(categoryAttrData)}</div>
            <CategoryAttributes categoryAttrData={categoryAttrData} />
          )}
          <Row justify="end">
            <Col className="goodsSubmitButton">
              <Button htmlType="button">
                {/* <Link to='addCommodity'>×&nbsp;取消并返回列表</Link> */}
              </Button>
              <Button type="primary" htmlType="submit">
                {/* <Link to='addCommodity'>保存并前往列表</Link> */}
                submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </BreadContent>
  );
};
export default connect(({ addcommodity }) => addcommodity)(AddCommodity);
