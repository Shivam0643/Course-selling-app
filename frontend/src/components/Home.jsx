import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Home() {
  const [courses, setCourses] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success((await response).data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/course/courses`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetch courses", error);
      }
    };
    fetchCourses();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950">
      <div className="min-h-screen text-white w-full max-w-screen-xl  container mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="" className="w-10 h-10 rounded-full" />
            <h1 className="txext-3xl font-semibold text-electricBlue">
            LearnSphere
            </h1>
          </div>
          <div className="space-x-4">
            <Link
              to={"/admin/dashboard"}
              className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
            >
              Admin
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* main section */}
        <section className="text-center py-20">
          <h1 className="text-4xl font-semibold text-electricBlue">
          LearnSphere
          </h1>
          <br />
          <p className="text-gray-500">
            Sharpen your skills with courses crafted by experts.
          </p>
          <div className="mt-8 space-x-4">
            <Link
              to={"/courses"}
              className="bg-green-500 text-white rounded-md font-semibold hover:bg-white duration-300 hover:text-black  px-6 py-3"
            >
              Explore Courses
            </Link>
            <Link
              to={"https://www.youtube.com/learncodingofficial"}
              className="bg-white text-black rounded-md font-semibold hover:bg-green-500 duration-300 hover:text-white  px-6 py-3"
            >
              Courses Videos
            </Link>
          </div>
        </section>

        <section>
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      className="h-32 w-full object-contain"
                      src={course?.image?.url}
                      alt=""
                    />
                    <div className="p-6 text-center">
                      <h2 className="text-xl font-semibold text-white">
                        {course.title}
                      </h2>
                      <button className="mt-4 bg-orange-500 text-white py-3 px-4 rounded-full hover:bg-blue-500 duration-300">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <hr />
        {/* footer section */}
        <footer className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className=" flex items-center space-x-2 ml-2 md:ml-8">
                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                <h1 className="txext-2xl font-semibold text-electricBlue">
                  LearnSphere
                </h1>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4 ">
                  <a href="">
                    <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                  </a>
                  <a href="">
                    <FaInstagram className="text-2xl hover:text-pink-600 duration-300" />
                  </a>
                  <a href="">
                    <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="items-center flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Connections</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white duration-300 cursor-pointer">
                  youtube-learn-coding
                </li>
                <li className="hover:text-white duration-300 cursor-pointer">
                  telegram-learn-coding
                </li>
                <li className="hover:text-white duration-300 cursor-pointer font-semibold">
                  GitHub-learn-coding
                </li>
              </ul>
            </div>

            <div className="items-center flex flex-col">
              <h3 className="text-lg font-semibold mb-4">
                Copyrights &#169; 2025
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white duration-300 cursor-pointer">
                  Terms & Conditions
                </li>
                <li className="hover:text-white duration-300 cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-white duration-300 cursor-pointer font-semibold">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
