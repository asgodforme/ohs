import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function MainLayout() {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">公共参数配置</Menu.Item>
                    <Menu.Item key="2">数据定制化配置</Menu.Item>
                    <Menu.Item key="3">自动化测试配置</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="user" />查询配置</span>}>
                            <Menu.Item key="1">环境配置</Menu.Item>
                            <Menu.Item key="2">表配置</Menu.Item>
                            <Menu.Item key="3">字段配置</Menu.Item>
                            <Menu.Item key="4">常量配置</Menu.Item>
                            <Menu.Item key="5">系统配置</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="laptop" />数据查询</span>}>
                            <Menu.Item key="5">代收付</Menu.Item>
                            <Menu.Item key="6">工程管家</Menu.Item>
                            <Menu.Item key="7">代收付集成系统</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>)
}