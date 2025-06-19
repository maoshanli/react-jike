//和用户相关的状态管理
import {createSlice} from '@reduxjs/toolkit'
import { request } from '@/utils'
const userStore=createSlice({
    name:'user',
    //数据装填
    initialState:{
        token:localStorage.getItem('token_key')?localStorage.getItem('token_key'):''
    },
    //同步修改方法
    reducers:{
        setToken(state,action){
            state.token=action.payload
            //localstorage存一份
            localStorage.setItem('token_key',action.payload)
        }
    }
})

const userReducer=userStore.reducer
const {setToken}=userStore.actions

//异步方法 完成登录获取token
const fetchLogin=(loginform)=>{
    return async(dispatch)=>{
        //1.发送异步请求
       const res= await request.post('/authorizations',loginform)
       console.log(res.data) 
       //2.提交同步action进行token的存入
        dispatch(setToken(res.data.token))
    }
}
//命名导出  import {setToken}名称相同
export {setToken,fetchLogin}
//默认导出  import reducer,不用{},名称可以不同
export default userReducer