import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Tag, Space } from 'antd'
// 引入汉化包 时间选择器显示中文
import locale from 'antd/es/date-picker/locale/zh_CN'
import { useEffect, useState } from 'react'
import { useChannel } from '../../hooks/useChannel'
import { getArticleAPI } from '../../apis/article'
const { RangePicker } = DatePicker
const Article=()=>{
  //筛选
  //准备state而不是放在提交中，因为有页面相关参数需要填充回去
  const [reqData,setReqData]=useState({
     status:'',
      channel_id:'',
      begin_pubdate:'',
      end_pubdate:'',
      page:1,
      per_page:4,
  })
  const OnSelectArticle=(data)=>{
   
    setReqData({
      ...reqData,
       status:data.status,
      channel_id:data.channel_id,
      begin_pubdate:data.date[0].format('YYYY-MM-DD'),
      end_pubdate:data.date[1].format('YYYY-MM-DD'),
    
    })

    //在effect函数中补充依赖项,reqData变化时更新
    // async function getAticleList(){
    // const res=await getArticleAPI(reqData)
    // console.log(res)
    // setArticleList(res.data.results)
    // setTotalCount(res.data.total_count)
    // }
    // getAticleList()

  }
  
  //分页
  const onPageChange=(page)=>{
    // console.log('分页参数',page)
      setReqData({
      ...reqData,
      page:page
    })
  }

  //定义状态枚举
  const status={
    1:<Tag color='warning'>待审核</Tag>,
    2:<Tag color='success'>审核通过</Tag>
  }
   //1.获取文章列表
   const[articleList,setArticleList]=useState([])
   const[totalCount,setTotalCount]=useState(0)
  useEffect(()=>{
    async function getAticleList(){
    const res=await getArticleAPI(reqData)
    console.log(res)
    setArticleList(res.data.results)
    setTotalCount(res.data.total_count)
    }
    getAticleList()
  },[reqData])
   const {channelList}=useChannel()
   const navigate=useNavigate()
   const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,

      render: cover => {
        return <img width={80} height={60} alt="" src={cover.images[0]}/>
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render:data=>status[data]
     
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
             
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

   return (<div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={OnSelectArticle}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到${totalCount}条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{
          total: totalCount,
          pageSize: reqData.per_page,
          onChange:onPageChange
        }} />
      </Card>
    </div>
  )
}

export default Article
