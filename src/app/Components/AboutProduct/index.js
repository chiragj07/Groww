import BorderLine from "../BorderLine";
import "./styles.css"

const index = ({sector, industry, desc, company}) => {
  return (
    <div className='about-container'>
      <h1>{`About ${company}`}</h1>
      <BorderLine />
      <p className="description">
        {desc}
      </p>
       <div className='sector-industy-container'>
        <p className='sector-industy-container-title'>{"Industry: "}</p>
        <p className='sector-industy-container-value'>{industry}</p>
       </div>
       <div className='sector-industy-container'>
        <p className='sector-industy-container-title'>{"Sector: "}</p>
        <p className='sector-industy-container-value'>{sector}</p>
       </div>

    </div>
  )
}

export default index