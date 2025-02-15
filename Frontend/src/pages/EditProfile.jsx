import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { format } from 'date-fns';
import { useUser } from '../context/UserContext';
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
const EditProfile = () => {
  const { user,setUser,updateUser } = useUser();
  // console.log(useUser())
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // const [image,setImage]=useState(null)
  const [userName,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [image,setImage]=useState(null)
  const [password,setPassword]=useState('')
  const [confirmpass,setConfirmPass]=useState('')
  const [isloading,setIsLoading]=useState(false)
  // Setup image dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(file)
      setPreviewImage(URL.createObjectURL(file));
    },
  });

//   useEffect(()=>{
//   window.location.reload()
// },[onSubmit])

  useEffect(() => {
    setUserName(user?.username);
    setEmail(user?.email);
    setImage(user?.image ? user.image : image);
    if(user?.image){
      setPreviewImage(user?.image)
    }
  }, [user]);

  // Handle form submission with axios
  const onSubmit = async (data) => {
    // try {
    //   const formData = new FormData();
    //   formData.append('username', data.username);
    //   formData.append('email', data.email);
    //   if (data.newPassword) {
    //     formData.append('password', data.newPassword);
    //   }
    //   // If an image file was selected, you can also append it:
    //   if(image){
    //   formData.append('image', file); // (Make sure you capture the file if needed)
    //   }
    //   const response = await axios.put('/api/users', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   });

    //   setSuccessMessage('Profile updated successfully!');
    //   setTimeout(() => setSuccessMessage(''), 3000);
    // } catch (err) {
    //   console.error(err);
    //   setServerError(err.response?.data?.message || err.message);
    // }
    const formdata = new FormData();

    if (userName != user.username) {
      formdata.append("username", userName);
    }
    if (email != user.email) {
      formdata.append("email", email);
    }
    if (image) {
      formdata.append("image", image);
    }
    if (password !== confirmpass) {
    return  toast.error("please confirm password");
    }
    if (password && confirmpass==="" ) {
     return toast.error("please confirm password");
    }
    if (password === ""  && confirmpass) {
     return toast.error("please enter password");
    }

    if (password === user?.Password) {
     return toast.error("this password already been used");
    }
    formdata.append("password",password)

    const obj = Object.fromEntries(formdata.entries());
    console.log(obj);
    if (Object.keys(obj).length > 0) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "/api/users/" + user._id,
          formdata,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setIsLoading(false);
        // updateprofile(data);
        toast.success("user updated sucessfully");
        updateUser(data);
        console.log(user)
        // navigate('/')
        console.log(data);
      } catch (error) {
        setIsLoading(false)
        // console.log("errror in update profile" + error);
        console.log(error)
      }
    } else {
      toast.error("please input value to updata");
    }
    setIsLoading(false)
  };
  useEffect(()=>{
    if(user===null){
      navigate('/')
    }
  },[user])
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>

        {/* Image Upload */}
        <div className="mb-8">
          <div {...getRootProps()} className="cursor-pointer group">
            <input {...getInputProps()} />
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <span className="text-gray-400">Upload Photo</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Change
                </span>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* username input */}
          <div className="input">
              <label htmlFor="">Username</label>
              <input
                type="text"
                value={userName}
                placeholder="username"
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border  border-gray-300
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
              />
            </div>
            {/* input email */}
            <div className="input">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="email"
                  // required: 'Email is required'
                    // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    // message: 'Invalid email address'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border  border-gray-300
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
              />
            </div>
        
            </div>
           

          {/* Password Update */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Change Password</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="new password"
                    value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? '🗨️' : '👁️'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="confirm password"
                value={confirmpass}
                 onChange={(e)=>setConfirmPass(e.target.value)}
                // className="w-full px-4 py-2 rounded-lg border'border-gray-300
                // focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"

              />
        
            </div>
          </div>

 {/* buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
             {isloading ?"loading..." :'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
