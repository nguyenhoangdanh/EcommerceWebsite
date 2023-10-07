import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AdminCreateCategory } from "../../redux/actions/category";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
const CreateCategory = () => {
  const { users } = useSelector((state) => state.user);
  const { isLoading, success, error } = useSelector((state) => state.category);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Categories created successfully!");
      navigate("/admin/dashboard");
      // window.location.reload(true);
      //   setTimeout(function () {
      //     window.location.reload(true);
      //   }, 100);
    }
  }, [dispatch, error, success]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImages(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("images", images);
    newForm.append("name", name);
    newForm.append("description", description);
    dispatch(AdminCreateCategory(newForm));
  };

  return (
    <div className="w-[90%] 800px:w-[40%] bg-white mt-10 shadow h-[70vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Category</h5>
      {/* create categories form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="10"
            required
            rows="5"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />

        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleFileInputChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images && (
              <img
                src={URL.createObjectURL(images)}
                alt="images"
                className="h-[80px] w-[80px] object-cover m-2"
              />
            )}
          </div>

          {/* <div className="w-full flex items-center flex-wrap">
              <label htmlFor="images">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              <span className="inline-block h-10 w-10 rounded-full overflow-hidden">
                {images &&
                  images.map((i) => (
                    <img
                      src={URL.createObjectURL(images)}
                      alt="images"
                      key={i}
                      className="h-[120px] w-[120px] object-cover m-2"
                    />
                  ))}
              </span>
              <label
                htmlFor="file-input"
                className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ">
                 <span>Upload a file </span> 
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="sr-only" 
                />
               </label> 
            </div> */}

          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
