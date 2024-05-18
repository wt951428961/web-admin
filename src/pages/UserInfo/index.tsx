import React, { useRef, useState } from 'react';
// import { useSelector } from "react-redux";
// import { selectDeviceSid } from "../../store/slices/authSlice";
import { getenduser, getenduserorder, addenduserorder, delenduser, fyenduser, istopenuser } from './server';
import dayjs from 'dayjs';
import {
    DeleteOutlined, 
    EditOutlined, EyeOutlined,
    UploadOutlined
} from '@ant-design/icons';
import {
    // Alert,
    Button,
    Tag,
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
    DatePicker,
    message,
} from 'antd';
import {ColumnsType} from "antd/es/table";

const {Option} = Select;
const dateFormat = 'YYYY-MM-DD';

const AdvancedSearchForm = (props:{queryForm:any}) => {
    const startTime = dayjs().format(dateFormat);
    const {token} = theme.useToken();
    const [form] = Form.useForm();
    const { queryForm } = props;
    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 20,
        // marginBottom: '20px'
    } ;

    const onFinish = (values: any) => {
        values.Stime = values.Stime.format(dateFormat);
        values.Etime = values.Etime.format(dateFormat);
        queryForm(values);
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item
                        name={`State`}
                        label={`选择状态`}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Select>
                            <Option value="1">1</Option>
                            <Option value="2">
                                2
                            </Option>
                        </Select>
                    </Form.Item>    
                </Col>
                <Col span={6}>
                    <Form.Item
                        name={`Nones`}
                        label={`备注`}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input placeholder="placeholder"/>
                    </Form.Item>    
                </Col>
                <Col span={6}>
                    <Form.Item
                        name={`Stime`}
                        label={`开始时间`}
                        initialValue={dayjs(startTime,'YYYY-MM-DD')}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker style={{width:'100%'}} />
                    </Form.Item>    
                </Col>
                <Col span={6}>
                    <Form.Item
                        name={`Etime`}
                        label={`结束时间`}
                        initialValue={dayjs(startTime,'YYYY-MM-DD')}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker style={{width:'100%'}} />
                    </Form.Item>    
                </Col>
                <Col span={6}>
                    <Form.Item
                        name={`Tbsid`}
                        label={`淘宝订单号`}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input placeholder="placeholder"/>
                    </Form.Item>    
                </Col>
                <Col span={6}>
                    <Button type="primary" htmlType="submit">
                        查询信息
                    </Button>
                    <Button
                        style={{margin: '0 8px'}  }
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        重置
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

const UserInfo: React.FC = () => {
    // const getInfo = useSelector(selectDeviceSid);
    const [dataSource, setDataSource] = useState([]);
    const [notice, setNotice] = useState('');
    const [form] = Form.useForm();
    const param = useRef({});
    const columns = [
        {
            title: '订单编号',
            dataIndex: 'Device_Orderid',
            key: 'Device_Orderid',
            width:200
        },
        {
            title: '充值通道',
            dataIndex: 'Device_ChannelIdName',
            key: 'Device_ChannelIdName',
            width:100
        },
        {
            title: '账号',
            dataIndex: 'Device_User',
            key: 'Device_User',
            width:200
        },
        {
            title: '淘宝订单号',
            dataIndex: 'Device_tb',
            key: 'Device_tb',
            width:120
        },
        {
            title: '产码地区',
            dataIndex: 'Device_Area',
            key: 'Device_Area',
            width:100
        },
        {
            title: '附加信息',
            dataIndex: 'Device_FjNones',
            key: 'Device_FjNones',
            width:100
        },
        {
            title: '已充金额',
            dataIndex: 'Device_ReceiveMoney',
            key: 'Device_ReceiveMoney',
            width:100,
        },
        {
            title: '产码金额',
            dataIndex: 'Device_CmMoney',
            key: 'Device_CmMoney',
            width:100
        },
        {
            title: '产码可用金额',
            dataIndex: 'Device_CmKyMoney',
            key: 'Device_CmKyMoney',
            width:150
        },
        {
            title: '充值金额',
            dataIndex: 'Device_ReMoney',
            key: 'Device_ReMoney',
            width:100
        },
        {
            title: '状态',
            dataIndex: 'Device_State',
            key: 'Device_State',
            width:100
        },
        {
            title: '上传时间',
            dataIndex: 'Device_UpTime',
            key: 'Device_UpTime',
            width:200
        },
        {
            title: '备注',
            dataIndex: 'Device_Notes',
            key: 'Device_Notes',
            width:100
        },
        {
            title: '充值大区',
            dataIndex: 'Device_aname',
            key: 'Device_aname',
            width:100
        },
        {
            title: '充值角色',
            dataIndex: 'Device_rname',
            key: 'Device_rname',
            width:300
        },
        {
            title: '系统类型',
            dataIndex: 'Device_zftype',
            key: 'Device_zftype',
            width:100
        },
        {
            title: '最后时间',
            dataIndex: 'Device_Lasttime',
            key: 'Device_Lasttime',
            width:120
        },
        {
            title: '拉单链接（复制）',
            dataIndex: 'Device_CmUrl',
            key: 'Device_CmUrl',
            width:400
        },
        {
            title: '查询账单链接',
            dataIndex: 'Device_orderUrl',
            key: 'Device_orderUrl',
            width:350
        },
        {
            title: '操作',
            dataIndex: 'name',
            key: 'name',
            fixed: 'right',
            width: 450,
            render: (_: any, record: any) => {
                return (
                    <Space>
                        <a onClick={()=>createOrder(record)}><EditOutlined/>生成订单</a>
                        <a onClick={()=>copyOrder(record)}><EditOutlined/>复制链接</a>
                        <a style={{color: "#ed4014"}} onClick={()=>deleteOrder(record)}><DeleteOutlined/> 删除账号</a>
                        <a style={{color: "#ed4014"}} onClick={()=>dangerUseOrder(record)}><EyeOutlined/> 危险复用</a>
                        <a onClick={()=>usingOrder(record)}><UploadOutlined/> 停用启用</a>
                    </Space>
                )
            }
        },
    ];
    const {token} = theme.useToken();
    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 20,
        // marginBottom: '20px'
    } ;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const queryFormList = (params:any)=>{
        params.Sid = localStorage.getItem('device_sid');
        params.Dpage = '0';
        params.Dnum = '300';
        getenduser(params).then((data)=>{
            console.log(data);
            if(data.status === 200 && data.data.code === '1001'){
                console.log(data.data.data)
                setDataSource(data.data.data ? data.data.data : []);
                setNotice(data.data.noes ? data.data.noes : '');
            }
        })
    }
    // 创建订单
    const createOrder = (row:any)=>{
        // const Sid = localStorage.getItem('device_sid');
        param.current = {Orderid:row.Device_Orderid, Sid:row.Device_Sid};
        getenduserorder({Orderid:row.Device_Orderid, Sid:row.Device_Sid}).then((data:any)=>{
            if(data.status === 200 && data.data.code === '1001'){
                console.log(data.data.data[0]);
                form.setFieldsValue(data.data.data[0]?data.data.data[0]:{})
                setIsModalOpen(true);
            }
        })
    }
    // 创建订单
    const onFinish = (values: any)=>{
        addenduserorder({...param.current,...values}).then((data:any)=>{
            if(data.status === 200 && data.data.code === '1001'){
                message.success(`${data.data.msg}`)
                setIsModalOpen(false);
            }
        })
    }
    // 删除账号
    const deleteOrder = (rows:any)=>{
        delenduser({Orderid:rows.Device_Orderid}).then((data:any)=>{
            if(data.status === 200 && data.data.code === '1001'){
                message.success(`${data.data.msg}`)
            }
        })
    }
    // 危险复用
    const dangerUseOrder = (rows:any)=>{
        fyenduser({Orderid:rows.Device_Orderid}).then((data:any)=>{
            if(data.status === 200 && data.data.code === '1001'){
                message.success(`${data.data.msg}`);
            }
        })
    }
    // 停用启用
    const usingOrder = (rows:any)=>{
        istopenuser({Orderid:rows.Device_Orderid}).then((data:any)=>{
            if(data.status === 200 && data.data.code === '1001'){
                message.success(`${data.data.msg}`);
            }
        })
    }
    // 复制链接
    const copyOrder = (rows:any)=>{
        let copyResult = true
        const text = rows.Device_CmUrl || '让我们一起快乐的敲代码吧~';
        if (!!window.navigator.clipboard) {
            window.navigator.clipboard.writeText(text).then((res) => {
                message.success('复制成功！');
                return copyResult;
            }).catch((err) => {
                copyResult = false
                message.error('复制失败');
                return copyResult;
            })
          } else {
            let inputDom = document.createElement('textarea');
            inputDom.setAttribute('readonly', 'readonly');
            inputDom.value = text;
            document.body.appendChild(inputDom);
            inputDom.select();
            const result = document.execCommand('copy')
            if (result) {
                message.success('复制成功！');
              
            } else {
                message.error('复制失败');
                copyResult = false
            }
            document.body.removeChild(inputDom);
            return copyResult;
          }
    }

    return (
        <div>
            {notice && <Tag style={{padding:10,marginBottom:10}} color="processing" > 
                {notice}
            </Tag>}
            <AdvancedSearchForm queryForm={queryFormList} />
            <Modal title="生成订单"
                open={isModalOpen}
                closable={false}
                footer={false}
                width={"50%"}>
                <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
                    <Row gutter={24}>
                        <Col span={16}>
                            <Form.Item
                                name={`Device_Hmoney`}
                                label={`回调金额`}
                                rules={[{required: true}]}
                            >
                                <Input placeholder="placeholder"/>
                            </Form.Item>
                            <Form.Item
                                name={`Device_Smoney`}
                                label={`实付金额`}
                                rules={[{required: true}]}
                            >
                                <Input placeholder="placeholder"/>
                            </Form.Item>
                            <Form.Item
                                name={`Device_Time`}
                                label={`过期时间`}
                                rules={[{required: true}]}
                            >
                                <Input placeholder="placeholder"/>
                            </Form.Item>
                            <Form.Item
                                name={`Device_Num`}
                                label={`预期笔数`}
                                rules={[{required: true}]}
                            >
                                <Input placeholder="placeholder"/>
                            </Form.Item>
                            <Form.Item
                                name={`Device_Url`}
                                label={`返回链接`}
                                rules={[{required: true}]}
                            >
                                <Input placeholder="placeholder"/>
                            </Form.Item>    
                        </Col>
                        <Col span={24} style={{textAlign:'right'}}>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                            <Button
                                style={{margin: '0 8px'}  }
                                onClick={() => {
                                    form.resetFields();
                                    setIsModalOpen(false);
                                }}
                            >
                                取消
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Space style={{display: "flex", justifyContent: "space-between", padding: "10px 0"} }>
                {/* <Space align={"center"}>
                    <Button type="primary" onClick={() => {
                        setIsModalOpen(!isModalOpen)
                    }}>新增</Button>
                </Space> */}
                {/* <Space align={"center"} size={"middle"}>
                    <ReloadOutlined/>
                    <DownloadOutlined />
                    <ColumnHeightOutlined/>
                    <FormatPainterOutlined/>
                    <SwapOutlined />
                </Space> */}
            </Space>
            <div style={{marginTop:10}}>
                <Table dataSource={dataSource} rowKey='Device_Orderid' scroll={{ x: 2800 }} columns={columns as ColumnsType}/>
            </div>
        </div>
    )
}
export default UserInfo;