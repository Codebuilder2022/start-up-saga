import React, { useEffect, useState } from "react";
import CONSTANTS from "../../constants/constants";
// @ts-ignore
import Loading from "react-fullscreen-loading";
import { useHistory } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { AiFillStar } from "react-icons/ai";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
interface Order {
  adminId: { companyName: String; email: string };
  fromAddress: string;
  toAddress: string;
  price: Number;
  date: Date;
}

const Orders = () => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [Order, setOrder] = useState<Order[]>([]);
  const [rating, setRating] = useState<any>(null);
  useEffect(() => {
    let getData;
    const fetchMyOrders = async () => {
      getData = await axios.get(`${CONSTANTS.BASE_URL}/user/order`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      getData = getData.data;
      console.log(getData);

      setOrder(getData);
    };
    fetchMyOrders();

    setLoaded(true);
  }, []);

  type updateRatingType = { orderId: string; adminId: string };
  const updateRating = async (data: updateRatingType) => {
    try {
      const postData = {
        orderId: data.orderId,
        rating: rating,
        adminId: data.adminId,
      };
      console.log(postData);
      const postRating = await axios.post(
        `${CONSTANTS.BASE_URL}/userorder/rating`,
        postData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (postRating.status === 200) {
        toast.success("You rating has been recorded !");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      toast.warn("Oops something went wrong !");
    }
  };

  const getPdf = async (item: any) => {
    try {
      const id = {
        orderId: item._id,
      };
      console.log(id);
      const sendInvoice = await axios.post(
        `${CONSTANTS.BASE_URL}/get/invoice`,
        id,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (sendInvoice.status === 200) {
        toast.success(
          "Invoice Successfully Generated! Please check your inbox!"
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.warn("Oops something went wrong !");
    }
  };

  return (
    <div>
      {" "}
      <ToastContainer />
      <div className="navbar  shadow-lg bg-purple-700 text-neutral-content h-18">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Start.exe</span>
        </div>
      </div>
      {/*Main page */}
      <div className="w-100 min-h-screen text-black bg-gray-100 ">
        <div className="w-100 flex h-full min-h-screen flex-col items-center justify-center">
          {loaded === true ? (
            <div className="w-full min-h-screen m-5 ">
              {Order.length > 0 ? (
                Order?.map((item: any) => (
                  <>
                    <div className="jusitfy-between p-7 w-2/4 h-full">
                      <div className=" m-5 p-5 h-full rounded-md shadow-lg text-black font-light">
                        <div className="flex flex-row text-lg font-bold space-x-5">
                          <div className="text-xl w-48">{item.fromAddress}</div>
                          <div className="pt-3 pr-3">
                            <IconContext.Provider value={{ size: "24px" }}>
                              <BsFillArrowRightCircleFill />
                            </IconContext.Provider>
                          </div>
                          <div className="text-xl">{item.toAddress}</div>
                          <div className="flex flex-col pl-10 ">
                            <div className="">{item.weight} Kg(s)</div>
                          </div>
                        </div>
                        <div className="flex flex-row text-lg pb-1 pt-5 space-x-40">
                          <div className="flex flex-col space-y-1">
                            <div className="flex flex-row">
                              Date Ordered:{" "}
                              <p>
                                {moment(item.orderedOn).format("DD-MM-YYYY")}
                              </p>
                            </div>
                            <div>
                              Shipping on :{" "}
                              <b>{moment(item.date).format("DD-MM-YYYY")}</b>
                            </div>
                            <div>Order ID : {item._id}</div>
                          </div>

                          <div className="flex flex-col text-4xl pt-4">
                            <b>₹{item.price}/-</b>
                          </div>
                        </div>

                        <div className="flex flex-row text-lg space-x-10">
                          <div className="flex flex-col">
                            <div>
                              Expected Delivery:{" "}
                              <b>{item.expectedDelivery} hours from shipping</b>
                            </div>
                            <div>
                              {item.transactionOver === false ? (
                                <p className="pt-7 pl-5 text-3xl">
                                  <b>
                                    <b>IN TRANSIT</b>
                                  </b>
                                </p>
                              ) : (
                                <div>
                                  {item.gaveRating === false ? (
                                    <div>
                                      <p>Rate your experience with us</p>
                                      <input
                                        type="number"
                                        onChange={(e: any) =>
                                          setRating(e.target.value)
                                        }
                                      />
                                      <button
                                        onClick={() =>
                                          updateRating({
                                            adminId: item.adminId._id,
                                            orderId: item._id,
                                          })
                                        }
                                      >
                                        RATING: RATE
                                      </button>
                                    </div>
                                  ) : (
                                    <div>
                                      <div className="container w-24 mt-4 bg-green-500 text-white rounded">
                                        <div className="flex pt-1 p-2 justify-items-center">
                                          <div className="pt-1 flex flex-row">
                                            <IconContext.Provider
                                              value={{ size: "18px" }}
                                            >
                                              <AiFillStar />
                                            </IconContext.Provider>
                                          </div>
                                          <div>
                                            {0 == 0 ? (
                                              <p className="text-sm pt-1">
                                                Not Rated
                                              </p>
                                            ) : (
                                              <p>{item.adminRating}</p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <div></div>
                          </div>
                          <div className="flex flex-col">
                            <div>
                              Payment Method: <b>Net Banking</b>
                            </div>
                            <div className="pb-2">
                              Provider : <b>{item.adminId.companyName}</b>
                            </div>
                            <div className="flex flex-row">
                              <button className="btn btn-outline btn-accent m-4">
                                TRACK ORDER
                              </button>
                              <button
                                className="btn btn-outline btn-secondary m-4"
                                onClick={() => getPdf(item)}
                              >
                                Get Invoice
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <div className="flex items-center justify-self-center">
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
