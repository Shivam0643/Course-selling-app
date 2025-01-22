import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/utils';

function CourseCreate() {

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const changePhotoHandler = (e) =>{
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImagePreview(reader.result)
      setImage(file)
    }
  }

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("image", image)

    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin.token;
    if(!token){
      navigate("/admin/login")
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/course/create`,formData,{
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      })
      console.log(response.data)
      toast.success(response.data.message || "Course created successfully");
      navigate("/admin/courses")
      setTitle("")
      setDescription("")
      setPrice("")
      setImage("")
      setImagePreview("")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data?.errors || "Error creating course");
    }
  }

  return ( 
    <div className=''>
    <div className="min-h-screen py-10 bg-black">
      <div className="md:max-w-4xl max-w-2xl mx-auto p-6 border rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-8 text-green-300">Create Course</h3>

        <form onSubmit={handleCreateCourse} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg text-white">Title</label>
            <input
              type="text"
              placeholder="Enter your course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 bg-slate-300 rounded-md outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg text-white">Description</label>
            <input
              type="text"
              placeholder="Enter your course description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 bg-slate-300  rounded-md outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg text-white">Price</label>
            <input
              type="number"
              placeholder="Enter your course price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 bg-slate-300   rounded-md outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg text-white">Course Image</label>
            <div className="flex items-center justify-center">
              <img
                src={imagePreview ? `${imagePreview}` : "/imgPL.webp"}
                alt="Image"
                className="w-full max-w-sm h-auto text-white rounded-md object-cover"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-3 py-2 border border-gray-400 bg-slate-300  rounded-md outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-400 hover:bg-green-600 text-lg text-white rounded-md transition-colors duration-200"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default CourseCreate
