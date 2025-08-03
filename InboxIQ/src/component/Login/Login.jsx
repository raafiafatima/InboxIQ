import React, { useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import supabase  from "../../config/supabaseCredentials";

const Login = () => {
  const [email, setEmail] = useState(""); // set email
  const [password, setPassword] = useState(""); // set password
  const [error, setError] = useState(""); // set and show error
  const [loading, setLoading] = useState(false); // show that it is verifying
  const navigate = useNavigate(); // to navigate to Inbox Page one authenticated

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     // Simple validation
//     if (!email || !password) {
//       setError("Please enter both email and password");
//       return;
//     }
//     try {
//       const { data, error: authError } = await supabase.auth.signInWithPassword(
//         {
//           email: email.trim(),
//           password: password.trim(),
//         }
//       );

//       if(authError) throw authError

//       navigate("/inbox");
//     } catch (error) {
//       setError(error.message || "Invalid Credentials");
//     } finally {
//       setLoading(false);
//     }
//   };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-600"> Admin Login</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome!{" "}
          </p>
        </div>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" >
            {/* onSubmit={handleSubmit} */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockKeyhole size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
          <div>
            
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                {loading ? 'Verifying...' : 'Sign in'}
              </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;