import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_API from '../api';


const ChallanReceipt = () => {
    const { aadharNumber } = useParams();
    const [violations, setViolations] = useState('');
    const [selectedViolation, setSelectedViolation] = useState('');
    const navigate = useNavigate();
    const violationOptions = [
        { type: 'Speeding', penalty: 1000 },
        { type: 'Red Light Violation', penalty: 1500 },
        { type: 'Illegal Parking', penalty: 750 },
        { type: 'Driving Without Seatbelt', penalty: 1200 },
        { type: 'Using Phone While Driving', penalty: 1000 },
        { type: 'Driving Without License', penalty: 2000 },
    ];

    const handleViolationChange = (e) => {
        const { value } = e.target;
        setSelectedViolation(value);
    };

    const addViolation = () => {
        if (selectedViolation) {
            setViolations(violations ? `${violations}, ${selectedViolation}` : selectedViolation);
            setSelectedViolation('');
        }
    };

    const removeViolation = (violation) => {
        setViolations(violations.split(', ').filter(v => v !== violation).join(', '));
    };

    const calculateTotalPenalty = () => {
        return violations.split(', ').reduce((total, violation) => {
            const selectedViolationOption = violationOptions.find(v => v.type === violation);
            return total + (selectedViolationOption ? selectedViolationOption.penalty : 0);
        }, 0);
    };    

    const generateReceipt = () => {
        const totalPenalty = calculateTotalPenalty();
    
        axios.post(`${BASE_API}/generateChallanReceipt`, {
            aadharNumber: aadharNumber,
            violationType: violations,
            penaltyAmount: totalPenalty 
        })
            .then(response => {
                navigate(`/violatorDetails/${aadharNumber}`);
                toast.success("Submitted successfully")
            })
            .catch(error => {
                console.error('Error generating receipt:', error);
                alert('Error generating receipt');
            });
    };
    
    
    return (
<div className="lg:w-2/3 sm:w-4/5 max-w-md mx-2 my-8 p-5 bg-white rounded-lg shadow-md">
            <h2 className="lg:text-2xl font-bold mb-4 text-center">Challan Receipt</h2>
            <form>
                <label className="block mb-2 text-center">Select Violation</label>
                <div className="flex items-center mb-2">
                    <select value={selectedViolation} onChange={handleViolationChange} className="flex-1 px-3 py-2 mr-2 border rounded-md">
                        <option value="">Select violation</option>
                        {violationOptions.map((violation, index) => (
                            <option key={index} value={violation.type}>{violation.type}</option>
                        ))}
                    </select>
                    <button type="button" onClick={addViolation} className="px-3 py-2 text-white bg-amber-500 hover:bg-gray-300 hover:text-black rounded-md">Add</button>
                </div>
                {violations.split(', ').map((violation, index) => (
                    <div key={violation} className="flex items-center mb-2">
                        <input type="text" value={violation} disabled className="flex-1 px-3 py-2 mr-2 border rounded-md" />
                        <button type="button" onClick={() => removeViolation(violation)} className="px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md">Remove</button>
                    </div>
                ))}
                <label className="block mb-2 mt-4 text-center">Total Penalty Amount</label>
                <input type="text" value={calculateTotalPenalty()} disabled className="w-full px-3 py-2 mb-4 border rounded-md" />
                <button type="button" onClick={generateReceipt} className="w-full px-3 py-2 mt-4 text-white bg-amber-500 hover:bg-gray-300 hover:text-black rounded-md">Generate Receipt</button>
            </form>
        </div>
    );
};

export default ChallanReceipt;
