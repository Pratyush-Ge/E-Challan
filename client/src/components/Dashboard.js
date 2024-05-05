import { useNavigate } from 'react-router-dom';

const Dashboard = ({personnelId }) => {
  const navigate = useNavigate();

  const nameOfPersonnel = localStorage.getItem("email");

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem("email");
  };

  const handleNavigateToViolatorDetails = () => {
    navigate('/violator'); 
  };

  return (
<div className="max-w-md mx-2 my-8 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-4">Welcome !</h2>
      <h2 className="text-center font-bold mb-4">(Personnel email : {nameOfPersonnel})</h2>
      <div className="flex justify-between">
        <button onClick={handleLogout} className="bg-amber-500 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded">
          Logout
        </button>
        <button onClick={handleNavigateToViolatorDetails} className="bg-amber-500 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded">
          Add Details
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
