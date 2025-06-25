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
   message,
   
} from "antd"
import {PlusOutlined} from '@ant-design/icons'
import { Link } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './index.scss'
import { useEffect, useState } from "react";
import { createArticleAPI, getChannelAPI } from "../../apis/article";
import { useChannel } from "../../hooks/useChannel";
const Publish=()=>{
    //单选框
    const [value, setValue] = useState(0);
    const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

   const{channelList}=useChannel()
  //提交表单
  const onFinish=(formValue)=>{
    //校验封面类型type是否和实际的图片列表imageList数量是相等的
    if(imageList.length!==value)
      return message.warning('封面类型和图片数量不匹配')
    console.log(formValue)
   //1.按照接口文档的格式处理手机到的表单数据
   const{title,content,channel_id}=formValue
   const reqData={
      title:title,
      content:content,
      cover:{
         type:value,
         images:imageList.map(item=>item.response.data.url)
      },
      channel_id:channel_id
   }
   //2.调用接口提交
    createArticleAPI(reqData)
  }

  const [imageList,setImageList]=useState([])
  //上传回调
  const onUploadChange=(info)=>{
  let newFileList = [...info.fileList];

    // // 1. Limit the number of uploaded files
    // // Only to show two recent uploaded files, and old ones will be replaced by the new
    
    // newFileList = newFileList.slice(-value);

    // // 2. Read from response and show file link
    // newFileList = newFileList.map((file) => {
    //   if (file.response) {
    //     // Component will show file.url as link
    //     file.url = file.response.url;
    //   }
    //   return file;
    // });
    setImageList(newFileList);
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
          // 控制表单域的初始值，控制name为type的FormItem的初始值
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
              {/* <Radio.Group value={value} onChange={onChange}>  */}
                <Radio.Group  onChange={onChange}> 
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/*
              listType: 决定选择文件框的外观样式
              showUploadList: 控制显示上传列表
            */} 
           {(value>0)&&<Upload
              name='image'
              listType="picture-card"
              action={'http://geek.itheima.net/v1_0/upload'}
              onChange={onUploadChange}
              showUploadList
              fileList={imageList}
              maxCount={value}
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
