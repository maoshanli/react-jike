import { useState,useEffect } from "react"
import { getChannelAPI } from "../apis/article"
//封装获取频道列表的逻辑
function useChannel(){
 const [channelList,setChannelList]=useState([])
   useEffect(()=>{
      const getChanneList=async()=>{
         const res=await getChannelAPI()
         console.log(res)
         setChannelList(res.data.channels)
      }
      getChanneList()
   },
  [])
  return {
    channelList
  }
}

export {useChannel}