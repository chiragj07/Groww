`use client`
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import "./styles.css"
const index = ({stockDetails}) => {
  const router = useRouter()
  const getRate = () => {
    let rate = stockDetails?.change_percentage;
    rate = rate?.split("%")[0];
    rate = rate.startsWith("-") ? rate.substr(1) : rate;
    return `${Number(rate).toFixed(2)}%`
  }
  return (
    <div className='card-container' onClick={() => router.push(`/product/${stockDetails.ticker}`)}>
      <div className='image-name-container'>
          <p>{stockDetails.ticker}</p>
          <Image 
            src={"/defaultStock.svg"}
            width={66}
            height={66}
          />
      </div>

      <h1>{"$"}{Number(stockDetails.price).toFixed(2)}</h1>
      <div
        style={{
          border: "1px solid",
          borderColor: !stockDetails?.change_percentage?.startsWith("-") ? "#00A389" : "#F46151",
          color: !stockDetails?.change_percentage?.startsWith("-") ? "#00A389" : "#F46151",
          fontSize: "16px",
          fontWeight: "700",
          marginTop: "4px",
          width: "90px",
          padding: "4px 8px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }} 
        className="percentage-change" >
        <Image 
          src={!stockDetails?.change_percentage?.startsWith("-") ?  "/increment.svg" : "/Decrement.svg"}
          width={15}
          height={7.5}
          style={{
            marginRight: "4px"
          }}
        />
        {getRate()}
      </div>
    

    </div>
  )
}

export default index