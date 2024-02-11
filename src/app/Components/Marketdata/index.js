import "./styles.css"
const index = ({
  title, value
}) => {
  return (
    <div className="product-market-data">
       <p className="product-data-key">{title}</p> 
       <p className="product-data-value">{value}</p>
    </div>
  )
}

export default index