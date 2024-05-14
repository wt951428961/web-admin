import React from "react";
import {App as AntdApp, Button, Form, Input} from "antd";
import styles from "./login.module.scss";
import {useDispatch} from "react-redux";
import {login} from "../../store/slices/authSlice";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../apis/accountApi";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
// import { esbuildVersion } from "vite";

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [loginFn, {isLoading}] = useLoginMutation();
    const {message, notification, modal} = AntdApp.useApp();
    const handlerSubmit = async (values: any) => {
        axios.post('/api/goto',{Suser:values.username, Spass:values.password}).then((res:any)=>{
            if (res.status === 200 && res.data.code === '1001'){
                dispatch(login({
                    jwt: res.data.data[0].Device_Key,
                    device_sid: res.data.data[0].Device_Sid
                }))
                message.success("登录成功");
                navigate("/system/manager/users");
            }else{
                notification.error({
                    description: '请重新输入账号密码！',
                    message: '出错了'
                });
                form.resetFields();
            }
        })
    };

    return (
        <div className={styles.container}>

            <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={handlerSubmit}
                style={{
                    width: "400px",
                    height: "400px",
                    marginTop: "15%",
                    background: "#fff",
                    padding: 50,
                    borderRadius: "6px"
                }}
            >

                <h1 style={{marginBottom: '30px'}}>管理系统</h1>

                <Form.Item
                    name="username"
                    rules={[{required: true, message: '账户不能为空'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="账户"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{required: true, message: '密码不能为空'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item> */}

                    {/* <Button type={"link"} className="login-form-forgot" style={{float: "right"}}
                            onClick={showModal}>
                        忘记密码
                    </Button> */}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block loading={isLoading}>
                        登 录
                    </Button>
                    {/* 或者 <Button type={"link"} onClick={showModal}>注册</Button> */}
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login;