import { Layout } from 'antd';
import { Link } from 'umi';
export default ()=>{
    const { Header} = Layout;
    return(
        <Header className="header">
                <h1 className="head_txt"><Link to="/">五星电器</Link></h1>
                {/* <div className="logo" /> */}
                {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu> */}
            </Header>
    )
}