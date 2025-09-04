import React, { useEffect, useState } from "react";
import ReplyChain from "../../SmartReply";
import { Clock, Download, Paperclip } from "lucide-react";
import { titleCase } from "title-case";

// create and export the chain, invoke once the specified email is clicked
function EmailDetail({ email }) {
  const [loding, setLoading] = useState(); // for when the modal is invoked and response is being generated
  const [reply, setReply] = useState(null) // the smart reply we get from llm 

  async function generateReply() {
    const resp = await ReplyChain.invoke({
      // subject, body, sentiment
      subject : email.subject, 
      sentiment : email.sentiment, 
      body : email.body
    });
    setReply(resp)
  }
 const senderInitial = email.sender ? email.sender.charAt(0).toUpperCase() : '?'
 const senderName = email.sender ? titleCase(email.sender.split('.')[0])  : "Unknown"
 const date = email.created_at ? new Date(email.created_at) : 'No date'
 const formattedDate = date.toLocaleString('en-US', {
  month: 'short', 
  day : "numeric", 
  hour : '2-digit', 
  minute : '2-digit'
 })
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
                <h3 className="font-medium">
                  {senderName || 'Unknown'}
                </h3>
                <div className="text-xs text-gray-500">
                  {email.sender || 'No email provided'}
                </div>
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <Clock size={12} className="mr-1" />
                {formattedDate || 'No date'}
              </div>
            </div>
            <div className="mt-4 text-gray-800 whitespace-pre-line">
              {email.body}
            </div>
            {email.attachments && email.attachments.length > 0 && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Paperclip size={14} className="mr-1" />
                  Attachments ({email.attachments.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {email.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-md p-2 flex items-center text-sm hover:bg-gray-50"
                    >
                      <div className="mr-2 text-gray-400">
                        {attachment.type === 'pdf' && (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 2V8H20"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 18V12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 15H15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        {attachment.type === 'image' && (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 15L16 10L5 21"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{attachment.name}</div>
                        <div className="text-xs text-gray-500">
                          {attachment.size}
                        </div>
                      </div>
                      <button className="ml-3 text-blue-600 hover:text-blue-800">
                        <Download size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
       
        {/* {!selectedReply ? (
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
        )} */}
      </div>
    </div>
  )
}

export default EmailDetail;
