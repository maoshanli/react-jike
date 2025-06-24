import { request } from "@/utils";
//用户相关的所有请求
//1.登录请求
export function loginAPI(formData){
    //通用写法
   return request({
        url:'/authorizations',
        method:'POST',
        data:formData
    })
}

//2.获取用户信息
export function getProfileAPI(){
    //通用写法
   return request({
        url:'/user/profile',
        method:'GET',
        
    })
}
