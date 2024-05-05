/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import BASE_API from '../api';


const ViolatorDetails = () => {
  const navigate = useNavigate();
  const { aadharNumber } = useParams();
  const componentRef = useRef();
  const [violatorDetails, setViolatorDetails] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [challanDetails, setChallanDetails] = useState(null);
  const [personnelDetails, setPersonnelDetails] = useState(null);

  const handleSMS = async () => {
    try {
      if (!violatorDetails || !violatorDetails.phone) {
        throw new Error('No valid phone number found');
      }
  
      const phoneNumber = `+91${violatorDetails.phone}`;
  
      const body = `\n\nFine Report\n\nYou have committed a traffic violation on ${formatDate(challanDetails[0].violationDate)} in the ${personnelDetails.areaOfOperation} area. You have been charged by traffic officer ${personnelDetails.name} with a penalty amount of ${challanDetails.reduce((total, challan) => total + challan.penaltyAmount, 0)}. This message hereby confirms that you have paid the fine on the spot. Click here for details: https://e-challan-tpms.vercel.app/violatorDetails/${violatorDetails.aadharNumber}\n\nThis message is from E-challan.`;
  
      await axios.post(`${BASE_API}/send-sms`, {
        to: phoneNumber,
        body: body,
      });
      toast.success('SMS sent successfully');
    } catch (error) {
      console.error('Error sending SMS:', error.message);
      toast.error('Failed to send SMS');
    }
  };
  


  useEffect(() => {
    const fetchPersonnelDetails = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await axios.get(`${BASE_API}/fetchPersonnelDetails/${email}`);
        setPersonnelDetails(response.data);
      } catch (error) {
        console.error('Error fetching personnel details:', error);
      }
    };

    const fetchViolatorDetails = async () => {
      try {
        const response = await axios.get(`${BASE_API}/getViolatorDetails/${aadharNumber}`);
        setViolatorDetails(response.data);
      } catch (error) {
        console.error('Error fetching violator details:', error);
      }
    };

    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.get(`${BASE_API}/fetchVehicleDetails/${aadharNumber}`);
        setVehicleDetails(response.data);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    };

    const fetchChallanDetails = async () => {
      try {
        const response = await axios.get(`${BASE_API}/fetchChallan/${aadharNumber}`);
        setChallanDetails(response.data);
      } catch (error) {
        console.error('Error fetching challan details:', error);
      }
    };

    fetchPersonnelDetails();
    fetchViolatorDetails();
    fetchVehicleDetails();
    fetchChallanDetails();

    const handlePopstate = (e) => {
      const confirmationMessage = 'Are you sure you want to go back? Your changes may not be saved.';
      if (window.confirm(confirmationMessage)) {
        navigate('/login');
      }
    };

    window.addEventListener('popstate', handlePopstate);

  }, [aadharNumber]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!violatorDetails || !vehicleDetails || !challanDetails ||!personnelDetails) {
    return <div className='text-2xl text-white'>Generating Receipt...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div className="p-5 border border-gray-200 rounded shadow-md bg-gray-100 relative mt-11 lg:w-2/5 sm:w-full">
      <button
        onClick={handleSMS}
        className="text-white bg-blue-500 hover:bg-gray-300 hover:text-black px-2 py-1 rounded absolute top-2 left-2 text-sm"
      >
        Send SMS
      </button>
      <button
        onClick={handlePrint}
        className="text-white bg-amber-500 hover:bg-gray-300 hover:text-black px-2 py-1 rounded absolute top-2 right-2 text-sm"
      >
        Print
      </button>
      <h2 className="text-xl font-bold text-center mb-4 mt-5">Violator Details</h2>
      <div ref={componentRef}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 underline">Officer Details:</h3>
          <p>Name: {personnelDetails.name}</p>
          <p>Area of operation: {personnelDetails.areaOfOperation}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 underline">Violator Details:</h3>
          <p>Aadhar Number: {violatorDetails.aadharNumber}</p>
          <p>Name: {violatorDetails.name}</p>
          <p>Address: {violatorDetails.address}</p>
          <p>Phone: {violatorDetails.phone}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 underline">Vehicle Details:</h3>
          <ul>
            {vehicleDetails.map(vehicle => (
              <li key={vehicle.vehicleNumber}>
                <p>Vehicle Number: {vehicle.vehicleNumber}</p>
                <p>Vehicle Type: {vehicle.vehicleType}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 underline">Challan Details:</h3>
          <ul>
            {challanDetails.map(challan => (
              <li key={challan.aadharNumber}>
                <p>Violation Date: {formatDate(challan.violationDate)}</p>
                <p>Violation Type: {challan.violationType}</p>
                <p className="font-bold bg-yellow-200 px-2 pb-1 my-1 rounded-md">
                  Penalty Amount:{" "}
                  <span className="font-bold">
                    {challan.penaltyAmount}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViolatorDetails;
