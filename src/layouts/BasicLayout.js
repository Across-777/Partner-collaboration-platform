import { Layout, Menu, Breadcrumb } from 'antd';
import MenuLayout from '../layouts/MenuLayout'
import HeaderLayout from '../layouts/HeaderLayout'
import BreadContext from '@/components/BreadContext';

const { Content, Sider } = Layout;
export default class BasicLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            breadName: '',
        };
    }
    // 更新state.breadName
    changeBreadName = value => {
        this.setState({
            breadName: value,
        });
    };
    render() {
        return (
            <Layout>
                <HeaderLayout />

                <Layout>
                    <Sider >
                        <MenuLayout click={this.changeBreadName.bind(this)}></MenuLayout>
                    </Sider>
                    <Layout style={{ padding: '0 16px 16px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <BreadContext.Provider value={this.state.breadName}>
                                {this.props.children}
                            </BreadContext.Provider>
                        </Content>
                    </Layout>
                </Layout>
            </Layout >
        )
    }


}