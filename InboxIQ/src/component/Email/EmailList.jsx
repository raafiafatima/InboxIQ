import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CategoryBadge } from "./CategoryBadge";
import {  getEmails } from "../../supabaseClient";

function EmailList({ selectedEmail, setSelectedEmail, selectedCategory }) {
  const [email, setEmail] = useState([]);

  useEffect(() => {
    async function fetchEmails() {
      const data = await getEmails();
      setEmail(data);
    }
    fetchEmails();
  }, []);

  const filteredEmails =
    selectedCategory == "all"
      ? email
      : email.filter((em) => em.category === selectedCategory);
  console.log(filteredEmails);
  return (
    <div className="w-full md:w-96 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium">Inbox</h2>
        <div className="text-sm text-gray-500">
          {filteredEmails.length} messages
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              selectedEmail && selectedEmail.id === email.id ? "bg-blue-50" : ""
            }`}
            onClick={() => setSelectedEmail(email)}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="font-medium text-sm">
                Email : <span className="text-xs text-gray-800 font-medium">{(email.sender).toUpperCase()}</span>
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <Clock size={12} className="mr-1" />
                {email.time}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmailList;
