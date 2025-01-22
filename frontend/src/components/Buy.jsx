
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Buy() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;


  const handelPurchase = async () => {
    if (!token) {
      setError("Please Login to purchase the course");
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/course/buy/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Course Purchased succesfully")
      navigate("/purchases");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.status===400) {
        toast.error("You have already purchased this course"); // This should display "You have already purchased this course"
        navigate("/purchases");
      }
      else {
        toast.error(error?.response?.data?.errors || "An error occurred during purchase");
      }
    }
  };
  

  return (
    <div className="flex h-screen items-center justify-center">
      <button
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 duration-300"
      onClick={handelPurchase}
      disabled={loading}
      >
        {loading? "Processing..." : "Buy Now"}
      </button>
    </div>
  );
}

export default Buy;
