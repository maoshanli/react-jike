
import{
  
    createBrowserRouter,
    
} from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import { AuthRoute } from '@/components/AuthRoute'
import Home from '@/pages/Home'
import Publish from '@/pages/Publish'
import Article from '@/pages/Article'
//路由配置

const router=createBrowserRouter([
    { 
      path:"/",
      element:<AuthRoute><Layout/></AuthRoute>,
      children:[
        {
        index:true,
        element:<Home/>
        },
        
        {
            path:'article',
            element:<Article/>
        },
        {
            path:'publish',
            element:<Publish/>
        }
      ]
    },
    {
        path:'/login',
        element:<Login/>
    }

])

export default router