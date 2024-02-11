`use client`
import React, { useState } from 'react'
import BorderLine from "../BorderLine"
import { useRouter } from 'next/navigation';

import Image from 'next/image'

const SearchBox = () => {
  const router = useRouter()


  const [searchedData, setSearchedData] = useState([]);

  function debounce(func, timeout = 500){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const fetchData  = debounce(async(e) => {
    const searchVal = e.target.value;
    console.log(process.env.NEXT_PUBLIC_API_KEY);
    if (searchVal.length <= 1) return;
    const res = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchVal}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
    const dataRes = await res.json();
    setSearchedData(dataRes.bestMatches || [])
  })

  const handleClick = (to) => {
      setSearchedData([]);
      router.push(`/product/${to}`)
  };


  return (
    <>
      <div className="search-box">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => fetchData(e)}
          />
          <Image 
            className='search-box-image'
            src={"/searchIcon.svg"}
            width={20}
            height={20}
          />
          <div
            style={{
              display: searchedData?.length > 0 ? "flex" : "none" ,
              flexDirection: "column",
              position: "absolute",
              top: "100%",
              width: "100%",
              maxHeight: "300px",
              zIndex: 1,
              borderRadius: "8px",
              border: "1px solid #025BAE",
              backgroundColor: "white",
              overflow: "hidden",
              overflowY: "scroll",
              scrollbarWidth: "thin",
              scrollbarColor: "#025BAE white",
              paddingTop: "24px",
              marginTop: "2px"
            }}
          >
           {
            searchedData.map((item) => {
              return (<div
              key={item["1. symbol"]}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  padding: "12px 4px",
                  fontWeight: "500",
                  fontSize: "12px",
                  color: "#AFAEAE",
                
                }}

                onClick={() => handleClick(item["1. symbol"])}
              > 
               
                <h3 style={{marginBottom: "12px"}}>{item["2. name"]}</h3>
                <BorderLine />
              </div>)
            })
           }

          </div>
      </div>
    </>
  )
}

export default SearchBox