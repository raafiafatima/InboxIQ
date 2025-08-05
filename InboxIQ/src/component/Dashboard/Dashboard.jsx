import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { signOutUser } = useAuth();
  const [error, setError] = useState();
  const navigate = useNavigate()

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const errorMsg = await signOutUser();
      navigate('/login')
      setError(errorMsg);
    } catch (error) {
      console.log("There is a problem signing out");
    }
  };
  return (
    <>
      <h1 className="text-2xl text-center text-white bg-[#156874]">
        InboxIQ: AI powered Email Responding Application
      </h1>

      <button onClick={handleSignOut}>Sign Out</button>

      {error ? (
        <>
          <div>
            <p className="p-3 text-sm text-red-600 bg-red-50 rounded-md hover: cursor-pointer ">
              Error Signing Out
            </p>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Dashboard;
