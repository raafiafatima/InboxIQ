import { useState } from "react";
import { Sidebar } from "../ui/Sidebar";
import EmailList from "../Email/EmailList";

function Dashboard() {
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  return (
    <>
    <div className="flex flex-col h-screen bg-gray-50">
     <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <EmailList
          selectedEmail={selectedEmail}
          setSelectedEmail={setSelectedEmail}
          selectedCategory={selectedCategory}
        />
        {/* {selectedEmail ? (
          <EmailDetail email={selectedEmail} />
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 bg-white">
            <p className="text-lg">Select an email to view details</p>
          </div>
        )} */}
      </div>
    </div>
    </>
  );
}

export default Dashboard;
