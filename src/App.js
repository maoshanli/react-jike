
import {Button} from 'antd'
function App() {
  return (
   <div className='App'>
    <Button type="primary">Button</Button>
    </div>
  );
}

export default App;
//按照业务规范整理项目目录（重点src目录）
//  文件夹                      作用
//  apis                       接口
//  assets                    静态资源
//  Components                 通用组件
//  pages                      页面级组件
//  router                     路由Router
//  store                      Redux状态
//  utils                      工具函数

//安装scss
//scss是一种后缀名为.css的预编译css语言，支持一些原生css不支持的高级用法，比如变量使用，嵌套语法等，使用scss可以让样式代码更加高效灵活

//安装Ant Design组件库
//AntDesign是由蚂蚁金服出品的社区使用最广的React PC端组件库，内置了常用的现成组件，可以帮助我们快速开发PC管理后台项目

//配置基础路由Router
//配置步骤

//配置@别名路径
//通过@替代src路径，便于开发中的路径查找访问
//针对路径转换，修改webpack别名路径配置craco
//针对联想提示，修改VSCode配置jsconfig.json

//登录-准备基础静态结构
//使用AntD现成的组件创建登录页的内容结构
//主要组件:Card、Form、Input、Button
//表单校验
//表单校验可以在提交登录之前校验用户的输入是否符合预期，如果不符合就阻止提交，显示错误信息
//FormItem绑定name,rules
//a.失焦时校验（非提交）
//b.手机号格式校验
//登录-获取表单数据
//当用户输入了正确的表单内容，点击确认按钮时需要收集到用户当前输入的内容
//登录-封装request请求模块
//在整个项目中会发送很多网络请求，使用axios三方库做好统一封装，方便统一管理
//几乎所有的接口都是一样的接口域名/超时时间/Token权限处理
//登录-使用Redux管理token
//Token作为一个用户的标识数据，需要在很多模块中共享，Redux可以方便的解决状态共享问题。
//1.Redux中编写获取Token的异步获取和同步修改
//2.Login组件负责提交action并且吧表单数据传递过来
//登录-Token持久化
//现存问题
//Redux存入Token之后如果刷新浏览器，Token会丢失（持久化就是防止刷新时丢失Token）(清理缓存呢？)
//问题原因
//Redux是基于浏览器内存的存储方式，刷新时状态恢复为初始值
//获取并存Token Redux+LocalStorage
//初始化Token  LocalStorage?LocalStorage:''