import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import 'typeface-open-sans'
import Sidebar from './components/Sidebar';
import { PrivateRoute } from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import BookPage from './pages/BookPage';
import SettingPage from './pages/SettingPage';
import { history } from './helpers';


import './App.css';

const { Header, Content } = Layout;

let App = () => {
    return (
        <Router history={history} >
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <PrivateRoutes />
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </Router>
    )
}

let PrivateRoutes = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout className="site-layout">
                <Header className="ant-layout-sider-dark" style={{ padding: 0 }} >
                    <h1 style={{ textAlign: 'center', color: 'white', fontFamily: 'open sans', fontSize: '32px', fontWeight: 800 }}>BI Flow</h1>
                </Header>
                <Content>
                    <PrivateRoute exact path="/book" component={BookPage} />
                    <PrivateRoute exact path="/setting" component={SettingPage} />
                </Content>
            </Layout>
        </Layout>
    )
}

export default App
