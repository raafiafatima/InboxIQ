import React, { useState } from "react";
import {
  Mail,
  AlertCircle,
  Trash2,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      let er = await signOut();
      if (!er) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Signout Error :: ", error);
    }
  };

  const categories = [
    {
      id: "all",
      label: "All Inbox",
      icon: <Mail size={18} className="text-[#156874]" strokeWidth={2.5} />,
    },
    {
      id: "complaint",
      label: "Complaint",
      icon: (
        <AlertCircle size={18} className="text-[#156874]" strokeWidth={2.5} />
      ),
    },
    {
      id: "spam",
      label: "Spam",
      icon: <Trash2 size={18} className="text-[#156874]" strokeWidth={2.5} />,
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: (
        <MessageSquare size={18} className="text-[#156874]" strokeWidth={2.5} />
      ),
    },
    {
      id: "question",
      label: "Question",
      icon: (
        <HelpCircle size={18} className="text-[#156874]" strokeWidth={2.5} />
      ),
    },
  ];
  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 flex-shrink-0 hidden md:block transition-all duration-300 ease-in-out ${
        isHovered ? "w-44" : "w-16"
      } overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`p-4 ${isHovered ? "" : "flex justify-center"}`}>
        {isHovered ? (
          <>
            <h1 className="text-xl font-bold text-[#156874]"> INBOXIQ</h1>
          </>
        ) : (
          <h1 className="text-xl font-bold text-[#156874]">IQ</h1>
        )}
      </div>
      <div className="mt-6">
        <div
          className={`px-4 mb-2 ${!isHovered && "flex justify-center"}`}
        ></div>
        <div className="mt-6">
          {isHovered && (
            <h2 className="px-4 text-xs font-semibold text-[#156874] uppercase tracking-wider mb-2">
              Categories
            </h2>
          )}
          <nav className="flex flex-col space-y-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center ${
                  isHovered ? "px-4 justify-start" : "justify-center"
                } py-2 w-full text-left ${
                  selectedCategory === category.id
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className={isHovered ? "mr-2" : ""}>{category.icon}</span>
                {isHovered && (
                  <>
                    <span>{category.label}</span>
                  </>
                )}
              </button>
            ))}
             <button
            className={`flex items-center ${
              isHovered ? "px-4 justify-start" : "justify-center"
            } py-2 text-gray-700 hover:bg-gray-100 w-full text-left rounded-md`}
            onClick={handleSignOut}
          >
            <LogOut
              size={18}
              className={isHovered ? "mr-2 text-[#156874]" : "text-[#156874]"}
              strokeWidth={2.5}
            />
            {isHovered && <span>Logout</span>}
          </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
