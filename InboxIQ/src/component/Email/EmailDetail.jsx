import React, { useEffect, useState } from "react";
import ReplyChain from "../../SmartReply";
import { getEmails, supabase } from "../../supabaseClient";

// create and export the chain, invoke once the specified email is clicked
function EmailDetail({ email }) {
  const [loding, setLoading] = useState(); // for when the modal is invoked and response is being generated
  const [emailDetails, setEmailDetails] = useState(null) // the email details we get back from supabase 
  const [reply, setReply] = useState(null) // the smart reply we get from llm 

  useEffect(() => {
    async function fetchEmails() {
      const data = await getEmails()
      setEmailDetails(data)
    }
    fetchEmails()
  }, [email])

  async function generateReply() {
    const resp = await ReplyChain.invoke({
      // subject, body, sentiment
      subject : emailDetails.subject, 
      sentiment : emailDetails.sentiment, 
      body : emailDetails.body
    });
    setReply(resp)
  }

  return <div></div>;
}

export default EmailDetail;
