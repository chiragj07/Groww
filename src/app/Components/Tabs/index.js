import React from 'react'

const index = ({title, isSelected, onClick}) => {
  return (
    <div
      style={{
        borderBottom: "1px solid",
        borderBottomColor: isSelected ? "#262626" : "#AFAEAE",
        color: isSelected ? "#262626" : "#AFAEAE",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "20px"
      }}
      onClick={onClick}
    >
      {
        title
      }

    </div>
  )
}

export default index