"use client"
import ProductHeader from "../ProductHeader"
import Marketdata  from "../Marketdata";
import Slider from "../Slider"
import BorderLine from "../BorderLine"
import LineChart from "../LineChart";
import Image from "next/image";
import TimeFilterComponent from "../TimeFilter";
import "./styles.css"
import { useCallback, useEffect, useState } from "react";

const mapping = {
  "TIME_SERIES_DAILY": "Time Series (Daily)",
  "TIME_SERIES_MONTHLY":"Monthly Time Series",
  "TIME_SERIES_WEEKLY": "Weekly Time Series"
}

const compressTheAmount = (marketCap) => {
  marketCap = Number(marketCap);
  const oneMil = 1000000;
  marketCap = marketCap / oneMil;
  if ((marketCap / 1000) < 0) {
    return `${(marketCap/1000).toFixed(2)} Bn`
  }
  return `${marketCap.toFixed(2)} Mn`;
}

const filters = [{
  title: "1D",
  val: "TIME_SERIES_DAILY"
},
{
  title: "1W",
  val: "TIME_SERIES_WEEKLY"
},
{
  title: "1M",
  val: "TIME_SERIES_MONTHLY"
}
]

const index = ({data}) => {
  const [changeVal, setChangeVal] = useState(13);
  const [ltp, setLtp] = useState(0);
  const [timeFilter, setTimeFilter] = useState("TIME_SERIES_WEEKLY");
  const [chartData, setChartData] = useState({
    xAxes: [],
    yAxes: []
  });

  const fetchChartData=  useCallback(async() => {
  
    const res = await fetch(`https://www.alphavantage.co/query?function=${timeFilter}&symbol=${data.Symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
    const resData = await res.json();
    const dataPoints = resData[mapping[timeFilter]]  
    const x = [];
    const y = [];

    if(dataPoints) {
      const dates = Object.keys(dataPoints);
      dates.forEach((item) => {
        x.push(item);
        y.push(dataPoints[item][`4. close`])
    });
    setLtp(dataPoints[dates[0]][`4. close`])
    const priceCurrent = dataPoints[dates[0]][`4. close`];
    const pricePrev = dataPoints[dates[1]][`4. close`];
    const percentageChange = ((Number(priceCurrent) - Number(pricePrev))/Number(pricePrev)) * 100;
    setChangeVal(percentageChange.toFixed(2))
    
    
  }
    setChartData({
      xAxes: x.reverse(),
      yAxes: y.reverse()
    })
  }, [timeFilter, data.Symbol])

  useEffect(() => {
    fetchChartData();    

  }, [fetchChartData]);
  
  return (
    <div className="product-container">
       <ProductHeader exchange={data.Exchange} company={data.Name} symbol={data.Symbol} assetType={data.AssetType} />
       <BorderLine />
       <div className="ltp-time-container">
         <div className="ltp-container">
            <h1>{"$"}{Number(ltp).toFixed(2)}</h1>
            <div
              style={{
                border: "1px solid",
                borderColor: Number(changeVal) > 0 ? "#00A389" : "#F46151",
                color: Number(changeVal) > 0 ? "#00A389" : "#F46151",
                fontSize: "16px",
                fontWeight: "700",
                minWidth: "90px",
                padding: "4px 8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }} 
              className="percentage-change" >
              <Image 
                src={Number(changeVal) > 0 ?  "/increment.svg" : "/Decrement.svg"}
                width={15}
                height={7.5}
              />
              {changeVal}%
            </div>
         </div>
         <div className="time-filters-container">
            {
              filters.map((item, ind) => (<TimeFilterComponent key={ind} setTimeFilter={setTimeFilter} val={item.val} title={item.title} isSelected= {item.val=== timeFilter} />))
            }
         </div>
       </div>
       <LineChart xAxes={chartData.xAxes} yAxes={chartData.yAxes} />
       <div className="product-market-fir-container">
        <Marketdata title={"52-Week-Low"} value={data['52WeekLow']} />
          <Slider currentPrice={ltp} max={data['52WeekHigh']} min={data['52WeekLow']} />
        <Marketdata title={"52-Week-High"} value={data['52WeekHigh']} />
       </div>
       <div className="product-market-sec-container">
         <Marketdata title={"Market Cap"} value={compressTheAmount(data['MarketCapitalization'])} />
         <Marketdata title={"P/E Ratio"} value={data['PERatio']} />
         <Marketdata title={"Beta"} value={data['Beta']} />
         <Marketdata title={"Dividend Yield"} value={data['DividendYield']} />
         <Marketdata title={"Profit Margin"} value={data['ProfitMargin']} />
       </div>
    </div>
  )
}

export default index