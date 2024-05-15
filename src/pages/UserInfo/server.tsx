import axios from "axios";
 
const getenduser = (params:any)=>{
    return axios.post('/api/getenduser',params);
}
// 生成订单 查询 
const getenduserorder = (params:any)=>{
    return axios.post('/api/getenduserorder',params);
}
// 生成订单 创建
const addenduserorder = (params:any)=>{
    return axios.post('/api/addenduserorder',params);
}
// 删除账号
const delenduser = (params:any)=>{
    return axios.post('/api/delenduser',params);
}
// 危险复用
const fyenduser = (params:any)=>{
    return axios.post('/api/Fyenduser',params);
}
// 停用启用
const istopenuser = (params:any)=>{
    return axios.post('/api/Istopenuser',params);
}

export {
    getenduser,
    getenduserorder,
    addenduserorder,
    delenduser,
    fyenduser,
    istopenuser
}