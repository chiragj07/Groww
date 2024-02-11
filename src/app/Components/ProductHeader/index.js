import Image from "next/image";
import "./styles.css"
const index = ({img, company, symbol, exchange, assetType}) => {

  

  return (
    <div className="product-header-container">
      <div className="product-details-header">
        <Image 
          src={"/defaultStock.svg"}
          width={80}
          height={80}
          
        />

       <div className="product-name-symbol">
         <h2>{company}</h2>
         <p>{symbol} &nbsp; {assetType} </p>
       </div>

      </div>
      <div className="product-exchange">
        <p>
          {exchange}
        </p>
      </div>

    </div>
  )
}

export default index