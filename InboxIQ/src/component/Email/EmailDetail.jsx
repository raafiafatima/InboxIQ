import React, { useState } from 'react'
import ReplyChain from '../../SmartReply'


// create and export the chain, invoke once the specified email is clicked 
function EmailDetail({email}) {
  const [reply, setReply] = useState() // the smart replies we get from the chain 
  const [loding, setLoading] = useState() // for when the modal is invoked and response is being generated
  const[subject, setSubject] = useState()
  const[] = useState()
  const[] = useState()
  
  async function generateReply() {
    const resp = await ReplyChain.invoke({
      // subject, body, sentiment
    })
  }
  

  return (
    <div>
      
    </div>
  )
}

export default EmailDetail
