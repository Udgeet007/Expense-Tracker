/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";

const Home = () => {
  const [selectedId, setselectedId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [arr, setArr] = useState([]);

  let updatedNameRef = useRef();
  let updatedDateRef = useRef();
  let updatedPriceRef = useRef();

  let snoRef = useRef(); //document.getElementbyId('input');
  let placeRef = useRef();
  let priceRef = useRef();
  let dateRef = useRef();
  let headingRef = useRef();

  let user = JSON.parse(localStorage.getItem("expenseLogin"));
  console.log(user);

  // console.log(selectedId);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    let obj = {};
    if (updatedDateRef.current.value) {
      obj.date = updatedDateRef.current.value;
    }
    if (updatedNameRef.current.value) {
      obj.expenseName = updatedNameRef.current.value;
    }
    if (updatedPriceRef.current.value) {
      obj.price = updatedPriceRef.current.value;
    }
    // console.log(obj);

    let res = await axios.put(
      `http://localhost:5000/api/expense/update/${selectedId}`,
      obj
    );
    let data = res.data;
    // console.log(data);
    getData();

    updatedDateRef.current.value = "";
    updatedPriceRef.current.value = "";
    updatedNameRef.current.value = "";
    setIsModalOpen(false);
  };

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

  const handleSubmit = async (e) => {
    //page reload krne se rokleta hae
    e.preventDefault();
    let obj = {
      expenseName: placeRef.current.value,
      price: priceRef.current.value,
      date: dateRef.current.value,
      userId: user._id,
    };
    // console.log(obj);
    let res = await axios.post(`http://localhost:5000/api/expense/create`, obj);
    let data = res.data;
    // console.log(data);
    getData();
    setclicked(!clicked);
    snoRef.current.value = "";
    placeRef.current.value = "";
    priceRef.current.value = "";
    dateRef.current.value = "";

    // console.log("running");
    // e.target.value is used for input button.
    //innerHtml is used to find data in tag element.
  };

  const getData = async () => {
    let res = await axios.get(
      `http://localhost:5000/api/expense/getexpense/${user._id}`
    );
    let data = res.data;
    // console.log(data.expenses);
    setArr(data.expenses);
  };

  const handleUpdate = (ans) => {
    // console.log(ans);
    setselectedId(ans._id);
    // console.log(i);
    showModal();
  };

  const handleDelete = async (ans) => {
    let id = ans._id;
    let res = await axios.delete(
      `http://localhost:5000/api/expense/delete/${id}`
    );
    let data = res.data;
    // console.log(data);
    getData();
  };

  const [searchvalue, setsearchvalue] = useState("");
  const handleSearchChanger = (e) => {
    // console.log(e.target.value);
    let value = e.target.value;
    setsearchvalue(value);
  };

  let filteredExpense;
  if (searchvalue) {
    filteredExpense = arr.filter((ele) =>
      ele.expenseName.toLowerCase().includes(searchvalue.toLocaleLowerCase())
    );
  } else {
    filteredExpense = arr;
  }
  console.log(filteredExpense);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="text-center text-blue-600 text-2xl font-bold">
        <h1 ref={headingRef}>Expense Tracker App</h1>
      </div>

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
      <div className="my-4 bg-red-400 w-max mx-auto">
        <input
          onChange={handleSearchChanger}
          type="text"
          className="border border-yellow-400 py-2 px-4 "
          placeholder="filter expense using place..."
        />
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-center rtl:text-right text-gray-500 dark:text-gray-400">
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
            {filteredExpense.map((ele, i) => {
              return (
                <tr
                  key={ele._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i + 1}
                  </th>
                  <td className=" py-4">{ele.expenseName}</td>
                  <td className=" py-4">{ele.price}</td>
                  <td className=" py-4">{ele.date}</td>
                  <td className=" py-4">
                    <button
                      type="button"
                      onClick={() => handleDelete(ele)}
                      className="bg-green-500 py-1 px-6 rounded-md text-black"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdate(ele, i)}
                      className="bg-red-500 py-1 px-6 mx-1 rounded-md text-black"
                    >
                      Update
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

      <Modal
        title="Update Expense Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col">
          <label htmlFor="">ExpenseName</label>
          <input
            ref={updatedNameRef}
            className="py-2 px-4 my-1 border outline-none border-blue-950 rounded-md"
            type="text"
            placeholder="enter the expense name to update..."
          />
          <label htmlFor="">Price</label>
          <input
            ref={updatedPriceRef}
            className="py-2 px-4 my-1 border outline-none border-blue-950 rounded-md"
            type="number"
            placeholder="enter the price to update"
          />
          <label htmlFor="">Date</label>
          <input
            ref={updatedDateRef}
            className="py-2 px-4 my-1 border outline-none border-blue-950 rounded-md"
            type="date"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
