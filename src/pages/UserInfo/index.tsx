import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { selectDeviceSid } from "../../store/slices/authSlice";
import axios from 'axios';
import {
    // ColumnHeightOutlined, 
    DeleteOutlined, 
    // DownloadOutlined,
    DownOutlined, EditOutlined, EyeOutlined, 
    // FormatPainterOutlined, 
    // LineChartOutlined,
    // MenuOutlined, 
    // MoreOutlined,
    // ReloadOutlined,
    // SearchOutlined, 
    // SwapOutlined,
    // UploadOutlined,
    UpOutlined
} from '@ant-design/icons';
import {
    // Alert,
    Button,
    Col,
    Form,
    Input,
    Modal,
    // Pagination,
    // Popconfirm,
    Row,
    Select,
    Space,
    Table,
    theme,
    // Upload
} from 'antd';
import {ColumnsType} from "antd/es/table";

const {Option} = Select;

const AdvancedSearchForm = () => {
    const {token} = theme.useToken();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 20,
        // marginBottom: '20px'
    } ;

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item
                        name={`test`}
                        label={`test`}
                        rules={[
                            {
                                required: false,
                                message: 'Input something!',
                            },
                        ]}
                    >
                        <Input placeholder="placeholder"/>
                    </Form.Item>    
                </Col>
                <Col span={6}>
                    <Form.Item
                        name={`test`}
                        label={`test`}
                        rules={[
                            {
                                required: false,
                                message: 'Input something!',
                            },
                        ]}
                    >
                        <Input placeholder="placeholder"/>
                    </Form.Item>    
                </Col>
                <Col span={6}>
                    <Form.Item
                        name={`test`}
                        label={`test`}
                        rules={[
                            {
                                required: false,
                                message: 'Input something!',
                            },
                        ]}
                    >
                        <Input placeholder="placeholder"/>
                    </Form.Item>    
                </Col>
                <Col span={expand ? '12' : 6} style={{textAlign: 'right'} }>
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                    <Button
                        style={{margin: '0 8px'}  }
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        重置
                    </Button>
                    <a
                        style={{fontSize: 12}  }
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ?
                            <> <UpOutlined/> 折叠 </> : <><DownOutlined/> 更多</>}
                    </a>
                </Col>
            </Row>
        </Form>
    );
};

const UserInfo: React.FC = () => {
    const getInfo = useSelector(selectDeviceSid);
    console.log(getInfo);
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            dataIndex: 'name',
            key: 'name',
            fixed: 'right',
            width: 250,
            render: () => {
                return (
                    <Space>
                        <a><EyeOutlined/> 查看</a>
                        <a><EditOutlined/> 编辑</a>
                        <a style={{color: "#ed4014"} }><DeleteOutlined/> 删除</a>
                    </Space>
                )
            }
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{

    },[])

    return (
        <div>
            <AdvancedSearchForm/>
            <Modal title="Basic Modal"
                   open={isModalOpen}
                   onOk={() => setIsModalOpen(false)}
                   onCancel={() => setIsModalOpen(false)}
                   width={"60%"}>
            </Modal>
            <Space style={{display: "flex", justifyContent: "space-between", padding: "10px 0"} }>
                <Space align={"center"}>
                    <Button type="primary" onClick={() => {
                        setIsModalOpen(!isModalOpen)
                    }}>新增</Button>
                </Space>
                {/* <Space align={"center"} size={"middle"}>
                    <ReloadOutlined/>
                    <DownloadOutlined />
                    <ColumnHeightOutlined/>
                    <FormatPainterOutlined/>
                    <SwapOutlined />
                </Space> */}
            </Space>
            <Table dataSource={dataSource} columns={columns as ColumnsType}
                pagination={
                    {
                        showQuickJumper: true,
                        defaultCurrent: 2,
                        total: 500,
                        showTotal: (total) => `Total ${total} items`,
                        // onChange={onChange}
                    }
                }
            />
        </div>
    )
}
export default UserInfo;