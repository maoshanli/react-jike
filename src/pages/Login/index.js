import './index.scss'
import { Button, Card, Form, Input, message } from "antd"
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '../../store/modules/user'
import { useNavigate } from 'react-router'
const Login=()=>{
  const dispatch=useDispatch()
  const navigator=useNavigate()
  const onFinish=async(values)=>{
    console.log('success:',values)
    //触发异步action fetchLogin
    await dispatch(fetchLogin(values))
    //1.跳转到首页
    navigator('/')
    //2.提示一下用户
    message.success('登录成功')
  }
  const onFinishFailed=errorInfo=>{
    console.log('Failed',errorInfo)
  }
  return (
    <div className="login">
      <Card className="login-container">
          <img className="login-logo" src={logo} alt="" />
          <Form 
          validateTrigger="onBlur"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          >
            {/* 后端接口一致name  */}
            {/* 多条校验逻辑，先校验第一条，再校验第二条 */}
            <Form.Item name='mobile' rules={[
              {
                required:true,
                message:'请输入手机号'
              },
              {
                pattern:/^1[3-9]\d{9}$/,
                message:'请输入正确的手机号'
              }
            ]}>
              <Input size="large" placeholder="请输入手机号"/>
            </Form.Item>
            <Form.Item name='code' rules={[
              {
                required:true,
                message:'请输入验证码'
              },
              {
                pattern:/\d{6}/,
                message:'请输入6位数字'
              }
              ]}>
              <Input size="large" placeholder="请输入验证码"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                登录
              </Button>
            </Form.Item>
          </Form>
      </Card>
    </div>
  )
}
export default Login