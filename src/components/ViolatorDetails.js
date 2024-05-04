import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import BASE_API from '../api';


const ViolatorDetails = () => {
  const { aadharNumber } = useParams();
  const componentRef = useRef();
  const [violatorDetails, setViolatorDetails] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [challanDetails, setChallanDetails] = useState(null);

  useEffect(() => {
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

    fetchViolatorDetails();
    fetchVehicleDetails();
    fetchChallanDetails();
  }, [aadharNumber]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!violatorDetails || !vehicleDetails || !challanDetails) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div className="p-4 border border-gray-200 rounded shadow-md bg-gray-100 relative mt-9 w-1/3">
      <button
        onClick={handlePrint}
        className="text-white bg-amber-500 hover:bg-gray-300 hover:text-black px-2 py-1 rounded absolute top-2 right-2 text-sm"
      >
        Print
      </button>
      <h2 className="text-xl font-bold text-center mb-4">Violator Details</h2>
      <div ref={componentRef}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 underline">Personal Details:</h3>
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
                <p>Challan ID: {challan.aadharNumber}</p>
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
