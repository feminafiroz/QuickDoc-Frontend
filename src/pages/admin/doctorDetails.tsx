import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosJWT from '../../utils/axiosService';
import { ADMIN_API } from '../../constants';
import AdminSidebar from '../../components/admin/HeadernSidebar/Sidebar';
import AdminHeader from '../../components/admin/HeadernSidebar/Header';
import toast from 'react-hot-toast';

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState<any>(null);
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedAction, setSelectedAction] = useState<string>(() => {
    return localStorage.getItem('selectedAction') || 'pending';
  });
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosJWT.get(`${ADMIN_API}/doctors/${id}`);
        setDoctorDetails(response.data.doctor);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    const fetchDepartments = async () => {
      try {   
        const response = await axiosJWT.get(`${ADMIN_API}/department`);
        setDepartments(response.data.departments);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }  
    };

    fetchDoctorDetails();
    fetchDepartments();
  }, [id]);


 

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const action = e.target.value;
    setSelectedAction(action);
    localStorage.setItem('selectedAction', action);
  };

  const handleUpdate = async () => {
    if (selectedAction === 'rejected') {
      setShowModal(true);
    } else {
      try {
        const response = await axiosJWT.patch(`${ADMIN_API}/update_doctor/${id}`, { action: selectedAction });
        if (response.data.success) {
          toast.success(response.data.message);
          navigate('/admin/doctors');
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error updating doctor:', error);
        toast.error('An error occurred while updating doctor.');
      }
    }
  };

  const handleRejectConfirm = async () => {
    try {
      const response = await axiosJWT.patch(`${ADMIN_API}/verify_doctor_rejection/${id}`, { status: 'rejected', reason: rejectionReason });
      if (response.data.success) {
        toast.success(response.data.message);
        setShowModal(false);
        navigate('/admin/doctors');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error rejecting doctor:', error);
      toast.error('An error occurred while rejecting doctor.');
    }
  };
  console.log(doctorDetails)


  if (!doctorDetails) {
    return <div>Loading...</div>;
  }


  return (

    
      
   
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <AdminHeader />
      <div className="flex flex-col w-full p-6">
        <h1 className = "text-2xl font-bold">Details of {doctorDetails.doctorName} </h1>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 mt-10 mr-4">
            <div className="mb-4 flex">
              <label className="block text-gray-700 font-bold mb-2">ID : </label>
              <p className="inline pl-4">{doctorDetails._id}</p>
            </div>
            <div className="mb-4 flex">
              <label className="block text-gray-700  font-bold mb-2">Name:</label>
              <p className="inline pl-4">{doctorDetails.doctorName}</p>
            </div>
            <div className="mb-4 flex">
              <label className="block text-gray-700  font-bold mb-2">Email:</label>
              <p className="inline pl-4">{doctorDetails.email}</p>
            </div>
            <div className="mb-4 flex">
                <label className="block text-gray-700 font-bold mb-2">Department:</label>
                <p className="inline pl-4">{doctorDetails.department.departmentName}</p>
              </div>
            <div className="mb-4 flex">
              <label className="block text-gray-700  font-bold mb-2">Description:</label>
              <p className="inline pl-4">{doctorDetails.description}</p>
            </div>
            <div className="mb-4 flex">
              <label className="block text-gray-700  font-bold mb-2">Education:</label>
              <p className="inline pl-4">{doctorDetails.education}</p>
            </div>
            <div className="mb-4 flex">
              <label className="block text-gray-700  font-bold mb-2">Verify Request:</label>
              <select
                value={selectedAction}
                onChange={handleActionChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="rejected" style={{ color: 'red' }}>Reject</option>
                <option value="pending" style={{ color: 'orange' }}>Pending</option>
                <option value="approved" style={{ color: 'green' }}>Approve</option>
              </select>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleUpdate}
                className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Update
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 mt-10 ml-4">
            <div className="mb-4 ">
              <label className="block text-gray-700  font-bold mb-2">Profile Image:</label>
              <img src={doctorDetails.profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
            </div>
            <div className="mb-4 ">
              <label className="block text-gray-700  font-bold mb-2">License Certificate:</label>
              <img src={doctorDetails.lisenceCertificate} alt="License Certificate" className="w-full max-h-64 object-contain" />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">Reason for Rejection</h3>
                    <div className="mt-2">
                      <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="block w-full p-2 sm:text-sm border-gray-300 rounded-md"
                        rows={4}
                        placeholder="Enter reason for rejection"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleRejectConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default DoctorDetails;
