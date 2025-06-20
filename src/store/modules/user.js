//和用户相关的状态管理
import {createSlice} from '@reduxjs/toolkit'
import { request,setToken as _setToken ,getToken} from '@/utils'
const userStore=createSlice({
    name:'user',
    //数据装填
    initialState:{
        token:getToken()||'',
        userInfo:{}
    },
    //同步修改方法
    reducers:{
        setToken(state,action){
            state.token=action.payload
            //localstorage存一份
            _setToken(action.payload)
        },
        setUserInfo(state,action){
            state.userInfo=action.payload
        }
    }
})

const userReducer=userStore.reducer
const {setToken,setUserInfo}=userStore.actions

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
//异步方法
const fetchUserInfo=()=>{
    return async(dispatch)=>{
        const res=await request.get('/user/profile')
        console.log(res.data)
        dispatch(setUserInfo(res.data))
    }
}
//命名导出  import {setToken}名称相同
export {setToken,fetchLogin,fetchUserInfo}
//默认导出  import reducer,不用{},名称可以不同
export default userReducer