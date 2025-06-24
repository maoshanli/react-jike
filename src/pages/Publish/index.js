import { 
   Button,
   Breadcrumb,
   Form,
   Card,
   Radio,
   Input,
   Upload,
   Space,
   Select,
   
} from "antd"
import {PlusOutlined} from '@ant-design/icons'
import { Link } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './index.scss'
import { useEffect, useState } from "react";
import { createArticleAPI, getChannelAPI } from "../../apis/article";
const Publish=()=>{
    //单选框
    const [value, setValue] = useState(0);
    const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

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

  //提交表单
  const onFinish=(formValue)=>{
   console.log(formValue)
   //1.按照接口文档的格式处理手机到的表单数据
   const{title,content,channel_id}=formValue
   const reqData={
      title:title,
      content:content,
      cover:{
         type:0,
         images:[]
      },
      channel_id:channel_id
   }
   //2.调用接口提交
    createArticleAPI()
  }

  const [imageList,setImageList]=useState([])
  //上传回调
  const onUploadChange=(value)=>{
    console.log(value)
    setImageList(value.fileList)
  }
   return (
    <div className="publish">
      {/* 实现圆角区域 */}
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `发布文章` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
            {channelList.map(item=> <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
             
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group value={value} onChange={onChange}> 
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/*
              listType: 决定选择文件框的外观样式
              showUploadList: 控制显示上传列表
            */} 
           {(value!==0)&&<Upload
              name='image'
              listType="picture-card"
              action={'http://geek.itheima.net/v1_0/upload'}
              onChange={onUploadChange}
              showUploadList
              
             
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>

            }
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
