import { useNavigate } from 'react-router-dom';

const Dashboard = ({personnelId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavigateToViolatorDetails = () => {
    navigate('/violator'); 
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
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
