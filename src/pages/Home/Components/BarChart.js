import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
//柱状图组件
//1.把功能代码都放到这个组件中
//2.把可变的部分抽象成prop参数
const BarChart=({title,xData,sData})=>{
    const charRef=useRef(null)
   //保证Dom可用 
   useEffect(()=>{
//1.获取渲染图表的dom节点
const chartDom = charRef.current
//2.图表初始化生成图表实例对象
const myChart = echarts.init(chartDom);
//3.准备图表参数
const option = {
  title:{
   text:title
  },
  xAxis: {
    type: 'category',
    data: xData
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [10,40,70],
      type: 'bar'
    }
  ]
};
//4.使用图表参数完成图表修改
option && myChart.setOption(option);
   },[])
   return <div style={{width:'400px',height:'300px'}} ref={charRef}>  </div>
}
export default BarChart