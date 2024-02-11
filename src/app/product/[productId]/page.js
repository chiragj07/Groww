"use client"
import { useState,useEffect, useCallback } from "react"
import ProductDetails from "../../Components/Product"
import AboutComponent from "../../Components/AboutProduct"
import Header from "@/app/Components/Header"
import Loader from "../../Components/Loader"
import { isExpired } from "@/app/utils"
import "./styles.css"


const page = ({params}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const getData = useCallback(async () => {
   let cached = localStorage.getItem(`product_${params.productId}`);
   cached = JSON.parse(cached);
   if (cached) {
    const time1 = cached.time;
    const time2 = new Date().getTime();
    if (cached.data["Information"] === "Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits.") {
      localStorage.removeItem(`product_${params.productId}`)
    } else if (!isExpired(time1, time2)) {
      setData(cached.data);
      return;
    } else {
      localStorage.removeItem(`product_${params.productId}`)
    }
   }

    setLoading(true);
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${params.productId}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    const response = await fetch(url);
    const resData = await response.json();
    if (resData["Information"] === "Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits.") {
        setData({});
        return;
      }
    setData(resData);
    localStorage.setItem(`product_${params.productId}`, JSON.stringify({data: resData, time: new Date().getTime()}) )
    setLoading(false);
  }, [params.productId]);

  useEffect(() => {
    getData()
  }, [getData]);

  
  return (
     
      <div
        className="main-container"
      >
         <Header />
        
         { loading && <Loader /> } 
         { (!loading && (!data || Object.keys(data).length === 0 ))  && <div className="no-data-container"> 
            No Data Available
         </div>  }

         { !loading && (data && Object.keys(data).length > 0  ) && (<div
           className="product-complete-container"
          >
          <ProductDetails data={data} />
          <AboutComponent company={data.Name} sector={data.Sector} industry={data.Industry} desc={data.Description} />
        </div>)}
    </div>
  )
}

export default page