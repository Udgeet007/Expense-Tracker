

const Trial = () => {
  let arr = [{
    id:1,
    name:"one",
    price:34
  },
  {
    id:2,
    name:"two",
    price:34
  },
]
  return (
    <div>
      <h3>This is trail page</h3>
      {arr.map((ele) =>{
        return (
           <div key={}>
          <input value={ele.name} />
          <input value={ele.price}/>
          <button>Delete</button>
        </div>
        )
       
      })}
    </div> 
  )
}

export default Trial
