import React, { useState, useEffect } from 'react';
import { PageHeader, Table, Modal, Form, Input, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import _ from 'underscore';

import { bookService } from '../services';

const { confirm } = Modal;

function BooksPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([])
    const [formAction, setFormAction] = useState("add"); //"add" or "update"
    const [book, setBook] = useState({ 'id': '', 'name': '' })
    const [form] = Form.useForm();

    useEffect(() => {
        bookService.getBooks()
            .then(
                response => {
                    if (response.status < 300) {
                        setData(response.data)
                    } else {
                        Modal.error({
                            title: 'Error',
                            content: (
                                <>
                                    It failed to get books:
                                    <br />
                                    &nbsp;&nbsp;{response.data.message}
                                </>
                            )
                        })
                    }
                }
            )
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            book
        });
        form.resetFields();
    }, [form, book]);

    const onAddBookClick = () => {
        setFormAction("add");
        setBook({});
        setModalVisible(true);
    };

    const onEditBookButtonClick = (id) => {
        setFormAction("update");
        setModalVisible(true);
        form.resetFields();
        bookService.getBook(id)
            .then(
                response => {
                    let book = _.pick(response.data, ['id', 'name'])
                    setBook(book);
                }
            )
    }

    const deleteBook = (id) => {
        confirm({
            title: 'Do you want to delete this book?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                bookService.deleteBook(id)
                    .then(
                        () => {
                            return bookService.getBooks();
                        }
                    ).then(
                        response => {
                            setData(response.data)
                        }
                    ).catch(
                        (error) => {
                            console.log(error)
                        }
                    )
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const onFinish = () => {
        let actionPromise;
        if (formAction === "add") {
            actionPromise = bookService.createBook(form.getFieldValue("name"))

        } else if (formAction === "update") {
            actionPromise = bookService.updateBook(form.getFieldsValue())
        }

        actionPromise.then(
            () => {
                return bookService.getBooks();
            }
        ).then(
            response => {
                setData(response.data)
                setModalVisible(false);
            }
        ).catch(
            (error) => {
                console.log(error)
                setModalVisible(false);
            }
        )
    }

    const onCancel = () => {
        setModalVisible(false);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Creation Time',
            dataIndex: 'createdAt',
        },
        {
            title: 'Created By',
            dataIndex: 'user',
        },
        {
            title: 'Action',
            render: (record) =>
                <Space size="middle">
                    <Button type="link" block key={record.id + "_edit"} onClick={() => onEditBookButtonClick(record.id)}>edit</Button>
                    <Button type="link" block key={record.id + "_delete"} onClick={() => deleteBook(record.id)}>delete</Button>
                </Space>
        },
    ]

    return (
        <div>
            <PageHeader title="Books" extra={[
                <Button key="add" onClick={onAddBookClick}>Add Book</Button>,
            ]} />
            <Table rowSelection={{ type: "checkbox" }} columns={columns} dataSource={data} rowKey="id" />
            <Modal
                title={formAction === "add" ? "Add Book" : "Update Book"}
                visible={modalVisible} //to handle warning
                getContainer={false}
                forceRender //to handle warning
                okText="Add"
                footer={[
                    <Button form="bookForm" key="cancel" htmlType="reset">
                        Cancel
                    </Button>,
                    <Button form="bookForm" key="submit" htmlType="submit">
                        Submit
                    </Button>
                ]}
            >
                <Form
                    name="bookForm"
                    form={form}
                    initialValues={book}
                    onFinish={onFinish}
                    onReset={onCancel}
                    autoComplete="off"
                >
                    <Form.Item name="id" label="id" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input book name' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default BooksPage