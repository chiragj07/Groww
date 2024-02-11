import "./styles.css"
import Card from "../Card";
const index = ({data}) => {
  return (
    <div className='market-container'>
          {
            data?.map((item) => <Card stockDetails={item}/>)
          }
      </div>
  )
}

export default index