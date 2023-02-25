/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import Loading from '../../components/Loading';
import { Card } from './Card'

interface Dashboard {
	online:number,
	offline: number,
	total: number
}

function Dashboard() {
  type Dashboard = {
    online:number,
    offline: number,
    total: number
  }
const [data, setData] = useState<Dashboard>({
	online: 0,
	offline:0 ,
	total: 0
})

const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
  setIsLoading(true);
  try{
  axios.get("https://nightmarelight.onrender.com/profile/statistics")
    .then(response => {
      console.log(response)
     setData(response.data)
     console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => setIsLoading(false));}
    catch(error:any) {
      console.log("Feito");
  } // complete loading success/fail
}, []);

return (   
   <div className="flex-1 p-6 font-bold    ">
      <div className={`py-2 mb-4 text-2xl   h-full font-semibold `}>
        <h2>Dashboard</h2>
    {isLoading ? <div className='flex  h-4/5   pl-2 '>
      <div className='m-auto'><Loading/></div></div>:
    <div className='flex   sm:h-4/5   pl-2'>
    <div className='m-auto'>
    <div className='grid   grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4  '>
    <Card key={1} Title={"Online"} Users={data.online}/>
    <Card key={2} Title={"Offline"} Users={data.offline }/>
    <Card key={3} Title={"Total"} Users={data.total}/>
    </div>
    </div>
    </div>
    }
    
      </div>
    </div>

  )
}


export default Dashboard