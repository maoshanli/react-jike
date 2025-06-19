//组合redux子模块+导出store实例
import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import userReducer from "./modules/user";

//直接export default？不需要声明变量
export default configureStore({
    reducer:{
        user:userReducer
    }
})
