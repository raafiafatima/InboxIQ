import React, { useEffect, useState } from "react";
import ReplyChain from "../../SmartReply";
import { Clock, Download, Paperclip } from "lucide-react";
import { titleCase } from "title-case";

// create and export the chain, invoke once the specified email is clicked
function EmailDetail({ email }) {
  const [loding, setLoading] = useState(true); // for when the modal is invoked and response is being generated
  const [reply, setReply] = useState(null); // the smart reply we get from llm
  const[selectedReply, setSelectedReply] = useState(null) // the reply that was selected 

  // function to enerate reply
  async function generateReply() {
    setLoading(true)
    const resp = await ReplyChain.invoke({
      // subject, body, sentiment
      subject: email.subject,
      sentiment: email.sentiment,
      body: email.body,
    });
    setReply(resp);
    setLoading(false)
  }

  // function to handle reply select
  function handleSelectReply(reply) {
    setSelectedReply(reply)
  }

  // function to handle reply cancel
  function handleCancelReply(params) {
    setSelectedReply(null)
  } 

  const senderInitial = email.sender
    ? email.sender.charAt(0).toUpperCase()
    : "?";
  const senderName = email.sender
    ? titleCase(email.sender.split(".")[0])
    : "Unknown";
  const date = email.created_at ? new Date(email.created_at) : "No date";
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-lg font-medium ml-2">{email.subject}</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start mb-6">
          <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium flex-shrink-0">
            {senderInitial}
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{senderName || "Unknown"}</h3>
                <div className="text-xs text-gray-500">
                  {email.sender || "No email provided"}
                </div>
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <Clock size={12} className="mr-1" />
                {formattedDate || "No date"}
              </div>
            </div>
            <div className="mt-4 text-gray-800 whitespace-pre-line">
              {email.body}
            </div>
          </div>
        </div>

        {!selectedReply ? (
          <SmartReplySection
            sentiment={email.sentiment || 'neutral'}
            onSelectReply={handleSelectReply}
          />
        ) : (
          <ResponseEditor
            selectedReply={selectedReply}
            onCancel={handleCancelReply}
            email={email}
          />
        )}
      </div>
    </div>
  );
}

export default EmailDetail;
