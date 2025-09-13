import { AlertCircle, Check, Edit3, Send, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { titleCase } from 'title-case'
import { supabase, updateReply } from '../../supabaseClient'

// fix the cancel issue and store data in the DB 
function ResponseEditor({selectedReply, onCancel, email}) {
    const [editedreply, setEditedreply] = useState(selectedReply) // the reply we finally get, initially it is the selected reply 
    const [editing, setEditing] = useState(false)
    const [sending, setSending] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [showAIWarning, setShowAIWarning] = useState(false)


    const textareaRef = useRef(null)
    // function for keeping the cursor focused on the text area while the user is typing 
    useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length,
      )
    }
  }, [editing])

  // once the data gets send, the reply should be stored in the database. 
  const handleSend = async () => {
    setSending(true)
    const { data, error }= await updateReply(editedreply, email.id)
    if (error) {
    console.log('Error updating reply:', error)
    setIsSent(false)
  } else if (data && data.length > 0) {
    console.log('Reply saved:', data)
    setIsSent(true)
  } else {
    console.log('No rows updated (check email.id)')
    setIsSent(false)
  }

  setSending(false)
  }
  const handleEdit = () => {
    setEditing(true)
  }
  const handleSaveEdit = () => {
    setEditing(false)
    if (editedreply !== selectedReply) {
      setShowAIWarning(true)
    }
  }
//   for when the response is sent and stored in the database 
  if (isSent) {
    return (
      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <Check size={20} className="text-green-500 mr-2" />
            <h3 className="text-green-800 font-medium">
              Response sent successfully
            </h3>
          </div>
          <p className="text-green-700 mt-1 text-sm">
            Your response to {titleCase(email.sender.split(".")[0])} has been sent.
          </p>
        </div>
      </div>
    )
  }
 return (
    <div className="border-t border-gray-200 mt-4 pt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700">
          {editing ? 'Edit Response' : 'Selected Response'}
        </h3>
        <div className="flex space-x-2">
          {!editing ? (
            <button
              onClick={handleEdit}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Edit3 size={14} className="mr-1" />
              Edit
            </button>
          ) : (
            <button
              onClick={handleSaveEdit}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Check size={14} className="mr-1" />
              Save
            </button>
          )}
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
          >
            <   X size={14} className="mr-1" />
            Cancel
          </button>
        </div>
      </div>
      {showAIWarning && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 mb-3 flex items-start">
          <AlertCircle
            size={16}
            className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0"
          />
          <div className="text-sm text-yellow-700">
            <p className="font-medium">AI response modified</p>
            <p>
              You've edited the AI-suggested response. Please review for
              accuracy before sending.
            </p>
          </div>
        </div>
      )}
      {editing ? (
        <textarea
          ref={textareaRef}
          value={editedreply}
          onChange={(e) => setEditedreply(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
        />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-gray-800">
          {editedreply}
        </div>
      )}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Replying to: <span className="font-medium">{email?.subject}</span>
        </div>
        <button
          onClick={handleSend}
          disabled={sending}
          className={`px-4 py-2 rounded-md flex items-center ${sending ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {sending ? (
            <>
              <div className="h-4 w-4 border-2 border-gray-400 border-t-gray-100 rounded-full animate-spin mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <Send size={16} className="mr-2" />
              Send Response
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ResponseEditor
