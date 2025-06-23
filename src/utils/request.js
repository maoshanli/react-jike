//1.根域名配置
//2.超时时间
//3.请求拦截器/响应拦截器
import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "../router";

const request=axios.create({
    baseURL:'http://geek.itheima.net/v1_0',
    timeout:5000
})
//添加请求拦截器
//在请求发送之前做拦截插入一些自定义的配置【参数的处理】
request.interceptors.request.use((config)=>{
    //操作这个config注入token数据
    //1.获取token
    const token=getToken()
    if(token)
    {
        config.headers.Authorization=`Bearer ${token}`   
    }
    //2.按照后端的格式要求做token拼接
    return config
},(error)=>{
    return Promise.reject(error)
})
//添加响应拦截器
//在响应返回到客户端之前做拦截重点处理返回的数据
//监控401
request.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    if(error.response.status===401)
    {
        removeToken()
        //并不会跳转
        router.navigate('/login')
        window.location.reload()
    }
    return Promise.reject(error)
})
export {request}