import axios from "axios";
 
// 选择通道
const getChannel = (params:any)=>{
    return axios.post('/api/getChannel',params);
}
// 订单金额
const getMoney = (params:any)=>{
    return axios.post('/api/getMoney',params);
}
// 订单状态
const getState = (params:any)=>{
    return axios.post('/api/getState',params);
}
// 选择大区
const getArea = (params:any)=>{
    return axios.post('/api/getArea',params);
}
// 订单管理
const getordergoods = (params:any)=>{
    return axios.post('/api/getordergoods',params);
}
// 手动补单
const UpToOrder = (params:any)=>{
    return axios.post('/api/UpToOrder',params);
}
// 强制补单
const UpToOrderBy = (params:any)=>{
    return axios.post('/api/UpToOrderBy',params);
}
export {
    getArea,
    getChannel,
    getMoney,
    getState,
    getordergoods,
    UpToOrder,
    UpToOrderBy
}