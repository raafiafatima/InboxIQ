import React, { useEffect, useState } from "react";
import ReplyChain from "../../SmartReply";
import { Send } from "lucide-react";

function SmartReplySection({ email, onSelectReply }) {
  const [loding, setLoading] = useState(true); // for when the modal is invoked and response is being generated
  const [response, setResponse] = useState([]); // the smart responses we get from LLM

  useEffect(() => {
    if (!email) return; 
    async function generateReply() {
      setLoading(true);
      try {
        const data = await ReplyChain.invoke({
          subject: email.subject,
          sentiment: email.sentiment,
          body: email.body,
        });
        const replies = Object.values(data)
        setResponse(replies)
        console.log(replies)
      } catch (err) {
        console.error("Error generating reply:", err);
        setResponse([]);
      } finally {
        setLoading(false);
      }
    }
    generateReply();
  }, [email]);
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Smart Reply Suggestions
      </h3>
      <div className="space-y-2">
        {loding ? (
          <div className="text-sm text-gray-500">Generating replies...</div>
        ) : response && response.length > 0 ? (
          response.map((reply, index) => (
            <button
              key={index}
              onClick={() => onSelectReply(reply)}
              className="w-full text-left p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm flex justify-between items-center group"
            >
              <span className="line-clamp-1">{reply}</span>
              <Send
                size={16}
                className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
          ))
        ) : (
          <div className="text-sm text-gray-500">No suggestions available</div>
        )}
      </div>
    </div>
  );
}

export default SmartReplySection;
