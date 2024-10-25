import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";

const HomeBetterCode = () => {
  const [selectedId, setselectedId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");

  let updatedNameRef = useRef();
  let updatedDateRef = useRef();
  let updatedPriceRef = useRef();

  const showModal = (ans) => {
    setUpdatedName(ans.expenseName);
    setUpdatedDate(ans.date);
    setUpdatedPrice(ans.price);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    let obj = {};
    if (updatedDate) {
      obj.date = updatedDate;
    }
    if (updatedName) {
      obj.expenseName = updatedName;
    }
    if (updatedPrice) {
      obj.price = updatedPrice;
    }

    try {
      let res = await axios.put(
        `http://localhost:5000/api/expense/update/${selectedId}`,
        obj
      );
      let data = res.data;
      console.log(data);
      getData();

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating the expense:", error);
    }
  };

  let user = JSON.parse(localStorage.getItem("expenseLogin"));

  let snoRef = useRef();
  let placeRef = useRef();
  let priceRef = useRef();
  let dateRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      expenseName: placeRef.current.value,
      price: priceRef.current.value,
      date: dateRef.current.value,
      userId: user._id,
    };
    console.log(obj);
    let res = await axios.post(`http://localhost:5000/api/expense/create`, obj);
    let data = res.data;
    console.log(data);
    getData();
  };

  const [arr, setArr] = useState([]);
  const getData = async () => {
    let res = await axios.get(
      `http://localhost:5000/api/expense/getexpense/${user._id}`
    );
    let data = res.data;
    setArr(data.expenses);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdate = (ans) => {
    setselectedId(ans._id);
    showModal(ans);
  };

  const handleDelete = async (ans) => {
    let id = ans._id;
    let res = await axios.delete(
      `http://localhost:5000/api/expense/delete/${id}`
    );
    let data = res.data;
    getData();
  };

  return (
    <div>
      <h1>Home</h1>
      <form
        action=""
        className="bg-black my-3 p-5 flex justify-center gap-2 w-max m-auto rounded-md"
      >
        <input
          ref={snoRef}
          className="py-1 px-7"
          type="number"
          placeholder="enter sno"
        />
        <input
          ref={placeRef}
          className="py-1 px-7"
          type="text"
          placeholder="enter a place"
        />
        <input
          ref={priceRef}
          className="py-1 px-7"
          type="number"
          placeholder="enter price"
        />
        <input
          ref={dateRef}
          className="py-1 px-7"
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
            {arr.map((ele, i) => {
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

      <Modal
        title="Update Expense Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col">
          <label htmlFor="">Expense Name</label>
          <input
            ref={updatedNameRef}
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="py-2 px-4 my-1 border outline-none border-blue-950 rounded-md"
            type="text"
            placeholder="Enter the expense name to update..."
          />
          <label htmlFor="">Price</label>
          <input
            ref={updatedPriceRef}
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            className="py-2 px-4 my-1 border outline-none border-blue-950 rounded-md"
            type="number"
            placeholder="Enter the price to update"
          />
          <label htmlFor="">Date</label>
          <input
            ref={updatedDateRef}
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            className="py-2 px-4 my-1 border outline-none border-blue-950 rounded-md"
            type="date"
          />
        </div>
      </Modal>
    </div>
  );
};

export default HomeBetterCode;
