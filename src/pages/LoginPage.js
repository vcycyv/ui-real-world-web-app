//got the idea from https://github.com/cornflourblue/react-hooks-redux-registration-login-example/blob/master/src/LoginPage/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { authActions } from '../actions';
import authService from "../services/authService";

export default function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const { username, password } = inputs;
    const message = useSelector(state => state.auth.message);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => {
        authService.logout()
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit() {
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(authActions.login(username, password, from));
        }
    }

    return (
        <div style={{ textAlign: 'center', paddingTop: '200px' }}>
            <h2>Login</h2>
            <Form name="form"
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 6 }}
                onFinish={handleSubmit}
                autoComplete="off"
                >
                <Form.Item
                    label="Username"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input name="username" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password name="password" onChange={handleChange} />
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}