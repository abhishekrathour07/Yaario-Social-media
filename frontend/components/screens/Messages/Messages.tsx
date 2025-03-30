'use client'

import React from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import MessageList from './components/MessageList'
import ChatWindow from './components/ChatWindow'
import UserInfo from './components/UserInfo'

const Messages = () => {
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null)
  const [showUserInfo, setShowUserInfo] = React.useState(false)

  return (
    <div className="flex  h-screen bg-slate-900 text-white overflow-hidden">
      {/* Message List Section */}
        <div className='w-1/3'>
        <MessageList
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />
        </div>

      {/* Chat Window Section */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <ChatWindow
            chatId={selectedChat}
            onShowUserInfo={() => setShowUserInfo(true)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>

      {/* User Info Sheet */}
      <Sheet open={showUserInfo} onOpenChange={setShowUserInfo}>
        <SheetContent side="right" className="bg-slate-800 border-l border-slate-700 text-white">
          <UserInfo chatId={selectedChat} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Messages