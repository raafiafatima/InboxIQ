import React, { useState } from 'react'

function SmartReplySection({email, onSelectReply}) {
    const [loding, setLoading] = useState(true); // for when the modal is invoked and response is being generated
    const [response, setResponse] = useState(null); // the smart responses we get from LLM 

  // function to generate reply
  async function generateReply() {
    setLoading(true)
    const data = await ReplyChain.invoke({
      // subject, body, sentiment
      subject: email.subject,
      sentiment: email.sentiment,
      body: email.body,
    });
    setResponse(data);
    setLoading(false)
  }
  return (
    <div>
      
    </div>
  )
}

export default SmartReplySection
