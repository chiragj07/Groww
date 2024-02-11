"use client"
import React, {useCallback, useEffect, useState} from 'react'
import Header from './Components/Header'
import Tab from "./Components/Tabs"
import Cards from "./Components/Cards"
import Loader from "./Components/Loader"
import { isExpired } from './utils';
import "./styles.css"


const page = () => {
  const [selectedTab, setSelectedTab] = useState("gainers");
  
  const [gainers, setGainers] = useState([])
  const [losers, setLosers] = useState([]) 
  const [loading, setLoading] = useState(false);
  const fetcGainersAndLosers = useCallback(async () => {
    let cached = localStorage.getItem(`gainers_losers`);
    cached = JSON.parse(cached);
    if (cached) {
      const time1 = cached.time;
      const time2 = new Date().getTime();
      if (cached.data["Information"] === "Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits.") {
          localStorage.removeItem(`gainers_losers`)
      } else if (!isExpired(time1, time2)) {
        setGainers(cached.data["top_gainers"])
        setLosers(cached.data["top_losers"]);
        return;
      } else {
        localStorage.removeItem(`gainers_losers`)
      } }
      setLoading(true);
      const res = await fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
      const dataRes= await res.json();
      if (dataRes["Information"] === "Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits.") {
        setGainers([]);
        setLosers([])
        return;
      }
      if (!dataRes["top_gainers"] ) return;
      setGainers(dataRes["top_gainers"])
      setLosers(dataRes["top_losers"]);
      localStorage.setItem(`gainers_losers`, JSON.stringify({data: dataRes, time: new Date().getTime()}) )
      setLoading(false);
    }, []);

  useEffect(() => {
    fetcGainersAndLosers()
  }, [fetcGainersAndLosers])
  return (
   <>
    <Header />
     { loading && <Loader />}
    {!loading &&  (<div
     className="explore-complete-container"
    >

      <div className='tabs-container'>
          <Tab title={"Top Gainers"} isSelected={selectedTab==="gainers"} onClick={() => setSelectedTab("gainers")} />
          <Tab title={"Top Losers"} isSelected={selectedTab==="losers"} onClick={() => setSelectedTab("losers")} />
      </div>
      
      <Cards data={selectedTab === 'gainers' ? gainers : losers} />

  </div>)}
  </>
  )
}

export default page