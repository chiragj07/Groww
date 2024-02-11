const index = ({val, title, isSelected, setTimeFilter}) => {
  return (
    <div
     style={{
       backgroundColor: isSelected && "rgba(2, 91, 174, 0.08)",
       border: isSelected && "1px solid",
       padding: "10px",
       borderColor: isSelected && "rgba(2, 91, 174, 0.5)",
       borderRadius: "8px",
       color: !isSelected && "#AFAEAE",
       fontSize: "20px",
       fontWeight: "700",
       cursor: "pointer"
     }}
     onClick={() => setTimeFilter(val)}
    >
      {title}
    </div>
  )
}

export default index;