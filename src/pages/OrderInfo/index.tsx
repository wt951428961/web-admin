import React, { useRef, useState, useEffect } from 'react';
// import { useSelector } from "react-redux";
// import { selectDeviceSid } from "../../store/slices/authSlice";
import { getArea, getChannel, getMoney, getState, getordergoods,UpToOrder } from './server';
import dayjs from 'dayjs';
import { Loading3QuartersOutlined, } from '@ant-design/icons';
import {
    Card,
    // Alert,
    Button,
    Tag,
    Col,
    Form,
    Input,
    // Modal,
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

const AdvancedSearchForm = (props:{queryForm:any, area:any, channel:any, money:any, status:any}) => {
    const startTime = dayjs().format(dateFormat);
    const {token} = theme.useToken();
    const [form] = Form.useForm();
    const { queryForm, area, channel, money, status } = props;
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
                        name={`Orderid`}
                        label={`订单号`}
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
                        name={`Usersid`}
                        label={`附加信息`}
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
                    <Form.Item
                        name={`Mbuser`}
                        label={`用户账号`}
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
                        name={`Channel`}
                        label={`选择通道`}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Select>
                            {channel && channel.length>0 && channel.map((item:any)=>{
                                return <Option value={item.Device_Sid} key={item.Device_Sid}>{item.Device_Name}</Option>
                            })}
                        </Select>
                    </Form.Item>    
                </Col>
                <Col span={6}>
                    <Form.Item
                        name={`Sstate`}
                        label={`订单状态`}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Select>
                            {status && status.length>0 && status.map((item:any)=>{
                                return <Option value={item.Device_Sid} key={item.Device_Sid}>{item.Device_Name}</Option>
                            })}
                        </Select>
                    </Form.Item>    
                </Col>
                <Col span={6}>
                    <Form.Item
                        name={`Moneys`}
                        label={`订单金额`}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Select>
                            {money && money.length>0 && money.map((item:any)=>{
                                return <Option value={item.Device_Sid} key={item.Device_Sid}>{item.Device_Name}</Option>
                            })}
                        </Select>
                    </Form.Item>    
                </Col>
                <Col span={6}>
                    <Form.Item
                        name={`Add`}
                        label={`选择地区`}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Select>
                            {area && area.length>0 && area.map((item:any)=>{
                                return <Option value={item.Device_Sid} key={item.Device_Sid}>{item.Device_Name}</Option>
                            })}
                        </Select>
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

const OrderInfo: React.FC = () => {
    // const getInfo = useSelector(selectDeviceSid);
    const [dataSource, setDataSource] = useState([]);
    const [area, setArea] = useState([]);
    const [channel, setChannel] = useState([]);
    const [money, setMoney] = useState([]);
    const [status, setStatus] = useState([]);
    const [dataList, setDataList] = useState<any>({});
    const param = useRef({});
    const columns = [
        {
            title: '目标账号',
            dataIndex: 'Device_MbUser',
            key: 'Device_MbUser',
            width:150
        },
        {
            title: '所属通道',
            dataIndex: 'Device_ChannelIdName',
            key: 'Device_ChannelIdName',
            width:100
        },
        {
            title: '账号',
            dataIndex: 'Device_User',
            key: 'Device_User',
            width:150
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
            width:160
        },
        {
            title: '任务唯一标识',
            dataIndex: 'Device_Sid',
            key: 'Device_Sid',
            width:280,
        },
        {
            title: '四方订单号',
            dataIndex: 'Device_Orderid',
            key: 'Device_Orderid',
            width:230
        },
        {
            title: '商户订单号',
            dataIndex: 'Device_Bussid',
            key: 'Device_Bussid',
            width:150
        },
        {
            title: '淘宝订单号',
            dataIndex: 'Device_tb',
            key: 'Device_tb',
            width:150
        },
        {
            title: '充值金额',
            dataIndex: 'Device_ReMoney',
            key: 'Device_ReMoney',
            width:100
        },
        {
            title: '创建时间',
            dataIndex: 'Device_UpTime',
            key: 'Device_UpTime',
            width:150
        },
        {
            title: '处理状态',
            dataIndex: 'Device_State',
            key: 'Device_State',
            width:100,
            render: (_: any) => {
                switch(_){
                    case '处理中':
                        return <Tag color="blue">{_}</Tag>;
                    case '已失效':
                        return <Tag color="red">{_}</Tag>;
                    case '已处理':
                        return <Tag color="green">{_}</Tag>;
                    case '未处理':
                        return <Tag color="yellow">{_}</Tag>;
                    default:
                        return '--';
                }
            }
        },
        {
            title: '处理时间',
            dataIndex: 'Device_StateTime',
            key: 'Device_StateTime',
            width:150
        },
        {
            title: '回调状态',
            dataIndex: 'Device_hdstate',
            key: 'Device_hdstate',
            width:100,
            render: (_: any) => {
                switch(_){
                    case '未通知':
                        return <Tag color="red">{_}</Tag>;
                    case '已回调':
                        return <Tag color="green">{_}</Tag>;
                    case '未处理':
                        return <Tag color="yellow">{_}</Tag>;
                    default:
                        return '--';
                }
            }
        },
        {
            title: '回调时间',
            dataIndex: 'Device_hdstatetime',
            key: 'Device_hdstatetime',
            width:150
        },
        {
            title: '支付地区',
            dataIndex: 'Device_Area',
            key: 'Device_Area',
            width:100
        },
        {
            title: '支付IP',
            dataIndex: 'Device_CookieIp',
            key: 'Device_CookieIp',
            width:160
        },
        {
            title: '支付链接',
            dataIndex: 'Device_Url',
            key: 'Device_Url',
            width:350
        },
        {
            title: '操作',
            dataIndex: 'name',
            key: 'name',
            fixed: 'right',
            width: 120,
            render: (_: any, record: any) => {
                return (
                    <Space>
                        <Button type="primary" onClick={()=>handleClick(record)}>手动补单</Button>
                    </Space>
                )
            }
        },
    ];
    const {token} = theme.useToken();
    
    useEffect(()=>{
        const usersid = localStorage.getItem('device_sid');
        Promise.all([getArea({Usersid:usersid}), getChannel({Usersid:usersid}), getMoney({Usersid:usersid}), 
        getState({Usersid:usersid})]).then((data:any)=>{
            if(data[0].status === 200 && data[0].data.code === '1001'){
                setArea(data[0].data.dataList?data[0].data.dataList:[]);
            }
            if(data[1].status === 200 && data[1].data.code === '1001'){
                setChannel(data[1].data.dataList?data[1].data.dataList:[]);
            }
            if(data[2].status === 200 && data[2].data.code === '1001'){
                setMoney(data[2].data.dataList?data[2].data.dataList:[2]);
            }
            if(data[3].status === 200 && data[3].data.code === '1001'){
                setStatus(data[3].data.dataList?data[3].data.dataList:[3]);
            }
        })
    },[])

    const queryFormList = (params:any)=>{
        params.Dpage = '0';
        params.Dnum = '30000';
        params.Usersid = localStorage.getItem('device_sid');
        getordergoods(params).then((data:any)=>{
            if(data.status === 200 && data.data.code === '1001'){
                setDataSource(data.data.data?data.data.data:[]);
                setDataList(data.data.dataList.length > 0 ? data.data.dataList[0]:{});
            }
            if(data.data.code === '1002'){
                setDataSource(data.data.data?data.data.data:[]);
            }
            if(data.data.code === '-1000'){
                message.error('数据异常！');
                setDataSource(data.data.data?data.data.data:[]);
            }
        })
    }
    
    // 手动补单
    const handleClick = (row:any)=>{
        const usersid = localStorage.getItem('device_sid');
        UpToOrder({Usersid:usersid}).then((data:any)=>{
            if(data.data.code === '1001'){
                message.success('手动补单成功！');
            }
            if(data.data.code === '1002'){
                message.error('手动补单失败！');
            }
            if(data.data.code === '-1000'){
                message.error('手动补单异常！');
            }
        })
    }

    return (
        <div>
            {dataList && dataSource.length > 0 && <Row gutter={24} style={{margin:'20px 0px'}}>
                <Col span={6}>
                    <Card bordered={true}>
                        <Row gutter={24} style={{padding:'10'}}>
                            <Col span={12}>
                                <h3>今日收入（金额）</h3>
                                <div style={{marginTop:'20'}}>{dataList.Device_Day}</div>
                            </Col>
                            <Col span={12} style={{display:'flex'}}>
                                <Loading3QuartersOutlined style={{margin:'auto', fontSize:'xxx-large', color:'red'}}/>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={true}>
                        <Row gutter={24} style={{padding:'10'}}>
                            <Col span={12}>
                                <h3>昨日收入（金额）</h3>
                                <div style={{marginTop:'20'}}>{dataList.Device_Yday}</div>
                            </Col>
                            <Col span={12} style={{display:'flex'}}>
                                <Loading3QuartersOutlined style={{margin:'auto', fontSize:'xxx-large', color:'rebeccapurple'}}/>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={true}>
                        <Row gutter={24} style={{padding:'10'}}>
                            <Col span={12}>
                                <h3>本周收入（金额）</h3>
                                <div style={{marginTop:'20'}}>{dataList.Device_Week}</div>
                            </Col>
                            <Col span={12} style={{display:'flex'}}>
                                <Loading3QuartersOutlined style={{margin:'auto', fontSize:'xxx-large', color:"yellowgreen"}}/>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={true}>
                        <Row gutter={24} style={{padding:'10'}}>
                            <Col span={12}>
                                <h3>本月收入（金额）</h3>
                                <div style={{marginTop:'20'}}>{dataList.Device_Month}</div>
                            </Col>
                            <Col span={12} style={{display:'flex'}}>
                                <Loading3QuartersOutlined style={{margin:'auto', fontSize:'xxx-large', color:'orange'}}/>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>}
            <AdvancedSearchForm queryForm={queryFormList} area={area} channel={channel} money={money} status={status}  />
            <Space style={{display: "flex", justifyContent: "space-between", padding: "10px 0"} } />
            <div style={{marginTop:10}}>
                <Table dataSource={dataSource} rowKey='Device_Orderid' scroll={{ x: 2800 }} columns={columns as ColumnsType}/>
            </div>
        </div>
    )
}
export default OrderInfo;