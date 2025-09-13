import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CategoryBadge } from "./CategoryBadge";
import { getEmails } from "../../supabaseClient";

function EmailList({ emailList, loading, selectedEmail, setSelectedEmail, selectedCategory }) {
  
  const filteredEmails =
    selectedCategory == "all"
      ? emailList
      : emailList.filter((em) => em.category === selectedCategory);
  return (
    <div className="w-full md:w-96 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium">Inbox</h2>
        <div className="text-sm text-gray-500">
          {filteredEmails.length} messages
        </div>
      </div>
      {/* loading state */}
      {loading ? (
        <div className="flex items-center justify-center py-10 text-gray-600">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-[#156874]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Loading emails...
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {filteredEmails.map((email) => {
            const date = email.created_at
              ? new Date(email.created_at)
              : "No date";
            const formattedDate = date.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
            });
            return <div
              key={email.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedEmail && selectedEmail.id === email.id
                  ? "bg-blue-50"
                  : ""
              }`}
              onClick={() => setSelectedEmail(email)}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-sm">
                  Email :{" "}
                  <span className="text-xs text-gray-800 font-medium">
                    {email.sender.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock size={12} className="mr-1" />
                  {formattedDate}
                </div>
              </div>
              <div className="flex justify-between">
                <h3 className={`text-sm ${!email.read ? "font-semibold" : ""}`}>
                  {email.subject}
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {email.body}
              </p>
              <div className="mt-2 flex justify-between items-center">
                <CategoryBadge category={email.category} />
                {!email.read && (
                  <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                )}
              </div>
            </div>;
          })}
        </div>
      )}
    </div>
  );
}

export default EmailList;
