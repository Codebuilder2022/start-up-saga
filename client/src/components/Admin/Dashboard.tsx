import React, { useState, useRef } from "react";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import constants from "../../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import Select from "react-select";
import { cityData } from "../../constants/cities";
type FormData = {
  toAddress: string;
  fromAddress: string;
  date: any;
  price: number;
};
const Dashboard = () => {
  const myOptions = cityData;
  const [value, setValue] = useState<string | null>("");
  const [calendarView, setCalendarView] = useState(false);
  const { register, handleSubmit } = useForm();
  const [fromLocation, setFromLocation] = useState<any>({
    label: "",
    value: "",
  });
  const [toLocation, setToLocation] = useState<any>({ label: "", value: "" });
  const onSubmit = async (data: FormData) => {
    const userOrder: FormData = {
      fromAddress: fromLocation.value,
      toAddress: toLocation.value,
      price: data.price,
      date: value?.split(",").map((item) => item.replace(" ", "")),
    };
    console.log(userOrder);
    const postData: AxiosResponse = await axios.post(
      `${constants.BASE_URL}/admin/company`,
      userOrder,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (postData.status === 200) {
      toast.success("Data added successfully");
    }
  };
  return (
    <div className="w-100 min-h-screen bg-gray-100 ">
      <ToastContainer />
      {/* Navigation Bar */}
      <div className="navbar  shadow-lg bg-purple-700 text-neutral-content h-18">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Start.exe</span>
        </div>
      </div>

      {/* Main Page */}
      <div className="w-100 flex  h-full min-h-screen flex-col items-center  m-2 p-10 ">
        <div className="shadow-lg justify-around w-100 bg-white h-2/3 mt-5 rounded-xl p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-purple-800 flex flex-col justify-start"
          >
            {/* <label className="label">
              <span className="label-text-black">Company Name</span>
            </label>
            <input
              type="text"
              className="input rounded-sm"
              {...register("companyName", { required: true })}
            /> */}
            <div className="flex-row py-3">
              <p className="">From </p>
              <p className="">To Address</p>
            </div>
            <div className="flex-row space-x-24" />
            <Select
              value={fromLocation}
              options={myOptions}
              onChange={(fromLocation) => {
                setFromLocation(fromLocation);
              }}
              openMenuOnClick={false}
              placeholder="From"
              className="w-56 py-2 h-12"
            />

            <Select
              value={toLocation}
              options={myOptions}
              onChange={(toLocation) => {
                setToLocation(toLocation);
              }}
              openMenuOnClick={false}
              className="w-56 py-2 h-12"
            />

            <label className="label">
              <span className="label-text-black">Price</span>
            </label>
            <input
              type="text"
              className="input rounded-sm"
              {...register("price", { required: true })}
            />
            <br />
            <div className="flex-row pl-12 space-x-20">
              {calendarView === false ? (
                <button
                  onClick={() => setCalendarView(true)}
                  className="btn btn-outline btn-primary w-44 h-12"
                >
                  Select Dates
                </button>
              ) : (
                <DatePicker
                  value={value}
                  multiple={true}
                  placeholder="Select Dates"
                  id="date-picker"
                  format="YYYY-MM-DD"
                  className="rmdp-input"
                />
              )}
              <button
                className="btn btn-outline btn-primary w-44 h-12 "
                type="button"
                onClick={() =>
                  setValue(
                    document
                      .getElementsByClassName("rmdp-input")[0]
                      .getAttribute("value")
                  )
                }
              >
                SAVE DATES
              </button>
              <br /> <br />
              <div className="pl-20">
                <button
                  className="btn btn-outline btn-primary w-28 h-14"
                  type="submit"
                >
                  Post
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 ml-2 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
