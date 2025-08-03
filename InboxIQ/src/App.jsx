import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function App() {
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
      <h1 className="text-2xl text-center bg-green-200">
        InboxIQ: AI powered Email Responding Application
      </h1>

      <button onClick={handleSignOut}>Sign Out</button>

      {error ? (
        <>
          <div>
            <p className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
              Error Signing Out
            </p>
          </div>
        </>
      ) : null}
    </>
  );
}

export default App;
