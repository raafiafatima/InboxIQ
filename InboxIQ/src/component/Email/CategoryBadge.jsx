import React from 'react'
import { AlertCircle, Trash2, MessageSquare, HelpCircle } from 'lucide-react'
export const CategoryBadge = ({ category }) => {
  const categoryConfig = {
    complaint: {
      label: 'Complaint',
      icon: <AlertCircle size={12} />,
      classes: 'bg-red-100 text-red-800',
    },
    spam: {
      label: 'Spam',
      icon: <Trash2 size={12} />,
      classes: 'bg-gray-100 text-gray-800',
    },
    feedback: {
      label: 'Feedback',
      icon: <MessageSquare size={12} />,
      classes: 'bg-purple-100 text-purple-800',
    },
    question: {
      label: 'Question',
      icon: <HelpCircle size={12} />,
      classes: 'bg-blue-100 text-blue-800',
    },
  }
  const config = categoryConfig[category] || categoryConfig.inquiry
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.classes}`}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </span>
  )
}