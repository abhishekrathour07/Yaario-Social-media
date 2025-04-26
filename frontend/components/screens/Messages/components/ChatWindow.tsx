'use client'

import React from 'react'
import { Send, Paperclip, MoreVertical, Image as ImageIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Message = {
  id: string
  content: string
  sender: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
}

type ChatWindowProps = {
  chatId: string
  onShowUserInfo: () => void
}

const ChatWindow: React.FC<ChatWindowProps> = ({  onShowUserInfo }) => {
  const [newMessage, setNewMessage] = React.useState('')
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  // Mock data for the current chat
  const currentChat = {
    name: 'John Doe',
    online: true,
    avatar: null,
    messages: [
      {
        id: '1',
        content: 'Hey there!',
        sender: 'John Doe',
        timestamp: '10:00 AM',
        status: 'read'
      },
      {
        id: '2',
        content: 'Hi! How are you?',
        sender: 'me',
        timestamp: '10:01 AM',
        status: 'delivered'
      },
      {
        id: '3',
        content: 'I\'m doing great, thanks for asking!',
        sender: 'John Doe',
        timestamp: '10:02 AM',
        status: 'read'
      }
    ] as Message[]
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [currentChat.messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Here you would typically send the message to your backend
    console.log('Sending message:', newMessage)
    setNewMessage('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onShowUserInfo}>
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={currentChat.avatar || `https://ui-avatars.com/api/?name=${currentChat.name}`}
              alt={currentChat.name}
            />
            <AvatarFallback>{currentChat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{currentChat.name}</h3>
            <p className="text-sm text-gray-400">
              {currentChat.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <button
          className="p-2 hover:bg-slate-700 rounded-full transition-colors"
          onClick={onShowUserInfo}
        >
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentChat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] ${message.sender === 'me'
                ? 'bg-purple-500'
                : 'bg-slate-700'
                } rounded-lg p-3`}
            >
              <p>{message.content}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs text-gray-300">{message.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
          >
            <Paperclip size={20} />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
          >
            <ImageIcon size={20} />
          </button>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatWindow