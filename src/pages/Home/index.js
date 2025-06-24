import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

import BarChart from './Components/BarChart';
const Home=()=>{
  
   
   
//必须是有宽高的
return(
<div>
   <BarChart title='三大框架满意度' xData={['Vue', 'React', 'Angular']} sData={[10,40,70]}/>
   {/* <BarChart title='三大框架使用度'/> */}
</div>
)}

export default Home
