import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const {
  Content, //Sider
} = Layout;
const { SubMenu } = Menu;

class CustomLayout extends React.Component {
    state = {
        coins: 0,
        level: 0,
    }

    render() {
        console.log(window.innerWidth)
        return (
            <Layout>

                {
                    this.props.isAuthenticated ?
                        <Menu
                          theme="dark"
                          mode="horizontal"
                          defaultSelectedKeys={['2']}
                          style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">
                                <Link to="/">Home</Link>
                            </Menu.Item>

                            <Menu.Item key="2" onClick={this.props.logout}>
                                <Link to="/">Logout</Link>
                            </Menu.Item>

                            <SubMenu key="sub1" title={<span><Icon type="user" />User</span>}>
                                <Menu.Item key="10"><Link to="/myprofile/">Your Profile</Link></Menu.Item>
                                <Menu.Item key="20"><Link to="/myprofile/myjavagochis">Your Javagochis</Link></Menu.Item>
                                <Menu.Item key="30"><Link to="/myprofile/myitems">Your Items</Link></Menu.Item>
                                <Menu.Item key="40"><Link to="/myprofile/mytrades">Your Trades</Link></Menu.Item>
                            </SubMenu>

                            <SubMenu key="sub2" title={<span><Icon type="laptop" />Market</span>}>
                                <Menu.Item key="12"><Link to="/market">Javagochis</Link></Menu.Item>
                                <Menu.Item key="22"><Link to="/itemsmarket">Items</Link></Menu.Item>
                            </SubMenu>

                            <SubMenu key="sub3" title={<span><Icon type="user" />Social</span>}>
                                <Menu.Item key="8"><Link to="/users">Find new friends</Link></Menu.Item>
                                <Menu.Item key="9"><Link to="/trades">Trades</Link></Menu.Item>
                            </SubMenu>

                        </Menu>
                    :
                        <Menu
                          theme="dark"
                          mode="horizontal"
                          defaultSelectedKeys={['2']}
                          style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">
                                <Link to="/">Home</Link>
                            </Menu.Item>

                            <Menu.Item key="2">
                                <Link to="/login">Login</Link>
                            </Menu.Item>

                            <Menu.Item key="3">
                                <Link to="/signup">Signup</Link>
                            </Menu.Item>

                        </Menu>
                }

                <Layout>

                    <Content style={{
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

// <SubMenu key="sub2" title={<span><Icon type="laptop" />Market</span>}>
//     <Menu.Item key="12"><Link to="/market">Javagochis</Link></Menu.Item>
//     <Menu.Item key="22"><Link to="/itemsmarket">Items</Link></Menu.Item>
// </SubMenu>

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
