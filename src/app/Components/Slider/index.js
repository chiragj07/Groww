"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import "./styles.css"
const index = ({ max, min, currentPrice = "190"}) => {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const gap = Number(max) - Number(min);
    const fromStart = Number(currentPrice) - Number(min);
    const perc = Number((fromStart / gap) * 100).toFixed(1);
    setPosition(perc);
  }, [max, min, currentPrice]);

  return (
    <div className="slider-container">
       
      <div className="slider-bar">
        <div
            style={{
              position: "absolute",
              top: "-20px",
              left: `${position}%`
            }}
          >
            <Image src={"/pricetick.svg"} width={14} height={8} />
          </div>
      </div>
    </div>
  )
}

export default index