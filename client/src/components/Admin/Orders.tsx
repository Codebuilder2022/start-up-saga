import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CONSTANTS from "../../constants/constants";
// @ts-ignore
import Loading from "react-fullscreen-loading";
import { IconContext } from "react-icons";
import { BiMessageAdd } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { isTemplateSpan } from "typescript";
interface companyOrder {
  userId: { username: String; email: string; phone: Number };
  toAddress: string;
  fromAddress: string;
  date: Date;
  weight: Number;
  price: Number;
}

const Orders = () => {
  const [loaded, setLoaded] = useState(false);
  const [Order, setOrder] = useState<companyOrder[]>([]);
  useEffect(() => {
    let getData;
    const fetchCompanyOrders = async () => {
      getData = await axios.get(`${CONSTANTS.BASE_URL}/admin/order`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      getData = getData.data;
      console.log(getData);
      setOrder(getData);
    };
    fetchCompanyOrders();

    setLoaded(true);
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.warn("Logging out !");
    setTimeout(() => {
      history.push("login");
    }, 2000);
  };
  const history = useHistory();
  return (
    <div>
      {/* Navigation Bar */}
      <ToastContainer />
      <div className="navbar  shadow-lg bg-purple-700 text-neutral-content h-18">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Start.exe</span>
          </div>
          <div
          className="btn btn-ghost btn-md rounded-btn flex  content-center "
          onClick={() => history.push("dashboard")}
        >
          <div className="mt-1">
          <IconContext.Provider value={{ size: "27px" }}>
            <BiMessageAdd />
          </IconContext.Provider>            
          </div>

          <pre> </pre>
          ADD LISTING
        </div>
        <a
          className="btn btn-ghost btn-md rounded-btn flex  content-center"
          onClick={logoutHandler}
        >
          <IconContext.Provider value={{ size: "26px" }}>
            <BiLogOut />
          </IconContext.Provider>
          <pre> </pre>
          SIGN OUT
        </a>

          </div>

      {/*Main page */}
      <div className="w-100 min-h-screen text-black bg-gray-100">
        <div className="w-100 flex h-full min-h-screen flex-col items-center p-10 ">
          {loaded === true ? (
            <div className="w-full min-h-screen m-5">
              {Order.length > 0 ? (
                Order?.map((item: companyOrder) => (
                  
                  <div className="jusitfy-between p-7 w-3/6 h-full">
                  <div className="m-5 p-5 h-full rounded-md shadow-lg text-black font-light">
                    <div className="flex flex-row space-x-4 text-lg font-bold">
                    <div className="text-xl">
                      {item.fromAddress}
                    </div> 
                    <div className="pt-1">
                      <IconContext.Provider value={{ size: "24px" }}>
                      <BsFillArrowRightCircleFill />
                      </IconContext.Provider>
                    </div>
                    <div>
                      {item.toAddress}
                    </div>
                    <div className="flex flex-col pl-10 ">
                      <div className="">
                        {item.weight} Kg(s)
                      </div>

                    </div> 
                    </div>
                    <div className="flex flex-row text-lg pt-3">
                    <div>
                          Date Ordered: <b>{}</b> 
                    </div>
                      <div className="pl-80 ml-11">
                       <b>₹{item.price}/-</b>
                      </div>                          
                    </div>

                    <div className="flex flex-row text-lg space-x-28 pt-2">
                      <div className="flex flex-col justify-between">
                        <div>
                          Expected Delivery: <b>21/11</b> 
                        </div>
                        <div>
                          Order ID: <b>A92Z58T</b>
                        </div>
                        <div className="btn btn-outline btn-secondary ">
                          Close Transaction
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div>
                          Ordered By : <b>{item.userId.username}</b>
                        </div>
                        <div className="">
                          Email : <b>{item.userId.email}</b>
                        </div>
                        <div className="pb-4">
                          Payment Method : <b>Net Banking</b> 
                        </div>
                        <div className="btn btn-outline btn-accent">
                          Add Updates
                        </div>
                      </div>
                  </div>

                </div>
              </div>
                ))
              ) : (
                <div className="flex items-center text-red-900 justify-self-center">
                  NO ORDERS PLACED
                </div>
              )}
            </div>
          ) : (
            <Loading loading background="#D3D3D3" loaderColor="#f2ff00" />
          )}
        </div>
      </div>
    </div>
  );
};
export default Orders;

{/* <div className="jusitfy-between p-7 w-1/1 h-full">
<div className="bg-gray-100 m-5 p-5 h-full rounded-md shadow-lg text-purple-800 w-1/1">
  <div className="flex flex-row text-xl">
    <span className="mt-5 font-main text-2xl">
      {item.userId.username}
    </span>
  </div>
  <div className="flex flex-row space-x-10">
  <span className="mt-5 font-main">
    <b>Contact:</b> {item.userId.email}
  </span>
  <span className="mt-5 font-main">
    <b>Phone:</b> {item.userId.phone}
  </span>
  </div>


  <div className="flex flex-row py-3">
    <p className="text-2xl font-bold font-main">
      {item.fromAddress}
    </p>
    <div className="px-8">
      <IconContext.Provider value={{ size: "35px" }}>
        <BsFillArrowRightCircleFill />
      </IconContext.Provider>
    </div>
    <p className="text-2xl font-bold font-main">
      {item.toAddress}
    </p>
  </div>
  <div className="contents flex-row space-between w-16 pt-5">
    <p className="text-2xl font-bold font-main">
      ₹{item.price}/Kg
    </p>
  </div>
</div>
</div> */}