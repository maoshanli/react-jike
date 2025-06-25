//封装和文章相关的接口函数
import { request } from "@/utils";
//用户相关的所有请求
//1.获取频道列表
export function getChannelAPI(){
    //通用写法
   return request({
        url:'/channels',
        method:'GET',
    })
}

//2.提交文章表单
export function createArticleAPI(formData){
    return request({
        url:'/mp/articles?draft=false',
        method:'POST',
        data:formData
    })
}

//3.获取文章列表
export function getArticleAPI(params)
{
  return request({
        url:'/mp/articles',
        method:'GET',
        params
    })
}

//4.删除文章
export function delArticleAPI(id)
{
    return request({
        url:`/mp/articles/${id}`,
        method:'DELETE'
       
    })
}

//5.获取文章详情
export function getArticleDetailAPI(id)
{
    return request({
        url:`/mp/articles/${id}`,
        method:'GET'
    })
}