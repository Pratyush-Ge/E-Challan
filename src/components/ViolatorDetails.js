import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const ViolatorDetails = () => {
  const [violatorDetails, setViolatorDetails] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchViolatorDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getViolatorDetails');
        setViolatorDetails(response.data);
      } catch (error) {
        console.error('Error fetching violator details:', error);
      }
    };
    fetchViolatorDetails();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!violatorDetails) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
<div className="p-4 border border-gray-200 rounded shadow-md bg-gray-100 relative mt-9">
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
          <p>Aadhar Number: {violatorDetails.personalDetails.aadhar_number}</p>
          <p>Name: {violatorDetails.personalDetails.name}</p>
          <p>Address: {violatorDetails.personalDetails.address}</p>
          <p>Phone: {violatorDetails.personalDetails.phone}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 underline">Vehicle Details:</h3>
          <ul>
            {violatorDetails.vehicleDetails.map(vehicle => (
              <li key={vehicle.vehicle_number}>
                <p>Vehicle Number: {vehicle.vehicle_number}</p>
                <p>Vehicle Type: {vehicle.vehicle_type}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 underline">Challan Details:</h3>
          <ul>
            {violatorDetails.challanDetails.map(challan => (
              <li key={challan.challan_id}>
                <p>Challan ID: {challan.challan_id}</p>
                <p>Violation Date: {formatDate(challan.violation_date)}</p>
                <p>Violation Type: {challan.violation_type}</p>
                <p className="font-bold bg-yellow-200 px-2 pb-1 my-1 rounded-md">
                  Penalty Amount:{" "}
                  <span className="font-bold">
                    {challan.penalty_amount}
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
