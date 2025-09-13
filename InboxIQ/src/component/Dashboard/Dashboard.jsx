import { useEffect, useState } from "react";
import { Sidebar } from "../ui/Sidebar";
import EmailList from "../Email/EmailList";
import  EmailDetail  from "../Email/EmailDetail";
import { getEmails } from "../../supabaseClient";

function Dashboard() {
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [email, setEmail] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    async function fetchEmails() {
      setLoading(true);
      const data = await getEmails();
      setEmail(data);
      setLoading(false);
    }
    fetchEmails();
  }, []);

  function handleReplySent(emailId) {
    setEmail((prev) => prev.filter((em) => em.id !== emailId));
  }
  
  return (
    <>
    <div className="flex flex-col h-screen bg-gray-50">
     <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <EmailList
        emailList = {email}
        loading = {loading}
          selectedEmail={selectedEmail}
          setSelectedEmail={setSelectedEmail}
          selectedCategory={selectedCategory}
        />
        {selectedEmail ? (
          <EmailDetail email={selectedEmail} onReplySent={handleReplySent} />
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 bg-white">
            <p className="text-md">Select an email to view details</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Dashboard;
