import React, { useState } from "react";
import {Search} from 'lucide-react'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      {/* Header with search bar and profile */}

    <div className="flex items-center justify-between">

      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600">InboxIQ</h1>
      </div>

      <div className=" relative p-6">
        <div className="absolute inset-y-2 left-6 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
        <input
          type="text"
          placeholder="Search"
          className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
      </div>
          </div>
    </>
  );
};

export default Header;
