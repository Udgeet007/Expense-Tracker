import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Home = () => {

  let user = JSON.parse(localStorage.getItem("expenseLogin"))
  console.log(user);

  let snoRef = useRef(); //document.getElementbyId('input');
  let placeRef = useRef();
  let priceRef = useRef();
  let dateRef = useRef();

  //useRef pura pura tag lake dedeta hae.
  // let arr = [
  //   {
  //     id: 1,
  //     place: "Shimla",
  //     price: 500,
  //     date: 12 - 10 - 2024,
  //   },
  //   {
  //     id: 2,
  //     place: "Uttrakhand",
  //     price: 500,
  //     date: 22 - 10 - 2024,
  //   },
  //   {
  //     id: 3,
  //     place: "Grossary",
  //     price: 700,
  //     date: 23 - 10 - 2024,
  //   },
  // ];

  const handleSubmit = async(e) => {
    //page reload krne se rokleta hae
    e.preventDefault();
    let obj = {
      
      expenseName:placeRef.current.value,
      price:priceRef.current.value,
      date:dateRef.current.value,
      userId:user._id, 
    }
    console.log(obj);
    let res = await axios.post(`http://localhost:5000/api/expense/create`,obj)
    let data = res.data;
    console.log(data);
    getData();
    // console.log("running");
    // e.target.value is used for input button.
    //innerHtml is used to find data in tag element.
  };
const [arr,setArr] = useState([]);
 const getData = async() =>{
  let res = await axios.get(`http://localhost:5000/api/expense/getexpense/${user._id}`);
  let data = res.data;
  console.log(data.expenses);
  setArr(data.expenses);
 }
  useEffect(() =>{
    getData();
  },[])
  return (
    <div>
      <h1>Home</h1>
      <form
        action=""
        className="bg-black my-3 p-5 flex justify-center gap-2 w-max m-auto rounded-md"
      >
        <input
          ref={snoRef}
          className="py-1 px-7 "
          type="number"
          placeholder="enter sno"
        />
        <input
          ref={placeRef}
          className="py-1 px-7 "
          type="text"
          placeholder="enter a place"
        />
        <input
          ref={priceRef}
          className="py-1 px-7 "
          type="number"
          placeholder="enter price"
        />
        <input
          ref={dateRef}
          className="py-1 px-7 "
          type="date"
          placeholder="enter a date"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 py-1 px-7 rounded-md"
        >
          Add Item
        </button>
      </form>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sno
              </th>
              <th scope="col" className="px-6 py-3">
                Place
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {arr.map((ele, i) => {
              return (
                <tr
                  key={ele._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i + 1}
                  </th>
                  <td className="px-6 py-4">{ele.expenseName}</td>
                  <td className="px-6 py-4">{ele.price}</td>
                  <td className="px-6 py-4">{ele.date}</td>
                  <td className="px-6 py-4">
                    <button type="button" className="bg-green-500 py-2 px-4 rounded-lg font-bold">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* 
      {arr.map((ele, i) => {
        return;
      })} */}
    </div>
  );
};

export default Home;
