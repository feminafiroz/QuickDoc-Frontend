import React from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import { Link } from 'react-router-dom';
import { BsWallet } from 'react-icons/bs'; 
import useProfile from "../../hooks/userProfile";
import { MdOutlineModeEdit } from "react-icons/md";

const Profile: React.FC = () => {
  const {
    profile,
    formData,
    imagePreview,
    handleInputChange,
    handleSubmit,
  } = useProfile();

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-10">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-6">Profile</h2>
          <div className="bg-white rounded-lg shadow-md p-8 w-full md:w-3/4 lg:w-1/3 mx-auto">
            <div className="relative mb-4">
              <img 
                src={imagePreview || profile?.profilePicture || "https://picsum.photos/200/"} 
                alt="Profile" 
                className="w-48 h-32 rounded-full mx-auto"
              />
              <label htmlFor="profile-image" className="absolute bottom-0 right-0 transform translate-x-1/2 bg-green-700 text-white rounded-full p-2 cursor-pointer">
                <input type="file" id="profile-image" name="imageFile" className="hidden" onChange={handleInputChange} />
                <MdOutlineModeEdit className="h-5 w-5" />
              </label>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold">Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={profile?.email || ""} 
                  onChange={handleInputChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-gray-700 font-semibold">Age:</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  value={formData.age || ""} 
                  onChange={handleInputChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold">Phone Number:</label>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  value={formData.phoneNumber || ""} 
                  onChange={handleInputChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-gray-700 font-semibold">Gender:</label>
                <select 
                  id="gender" 
                  name="gender" 
                  value={formData.gender || ""} 
                  onChange={handleInputChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <button 
                className="w-full bg-green-900 text-white py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={handleSubmit}
              >
                Update Profile
              </button>
            </div>
          </div>
          <Link to="/user/wallet" className="fixed bottom-8 right-8 bg-green-900 text-white rounded-full p-4 shadow-lg hover:bg-green-800">
            <BsWallet className="h-7 w-7" />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
