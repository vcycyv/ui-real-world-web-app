import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AiOutlineTable, AiOutlineLineChart, AiOutlineLogout } from "react-icons/ai";

import 'antd/dist/antd.css';
import './index.css';


const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };


    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultOpenKeys={['books']} mode="inline" defaultSelectedKeys={['book']} >
                <Menu.SubMenu key="books" icon={<AiOutlineTable />} title="Books">
                    <Menu.Item>
                        <Link to='/book'>
                            books
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="setting" icon={<AiOutlineLineChart />} title="Setting">
                    <Menu.Item key="/setting" >
                        <Link to='/setting'>
                            setting
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="login" icon={<AiOutlineLogout />} style={{ paddingTop: '30px', boxSizing: 'content-box', }}>
                    <Link to='/login'>
                        Logout
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;