'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SearchBox from '@/components/customs/SearchBox/SearchBox'

type MessageListProps = {
  selectedChat: string | null
  onSelectChat: (chatId: string) => void
}

const MessageList: React.FC<MessageListProps> = ({ selectedChat, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = React.useState('')

  // Mock data for conversations
  const conversations = [
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      avatar: null
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastMessage: 'The project is coming along nicely!',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      avatar: null
    },
    {
      id: '3',
      name: 'Mike Johnson',
      lastMessage: 'Can we schedule a meeting?',
      timestamp: '2 hours ago',
      unread: 1,
      online: true,
      avatar: null
    }
  ]

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col">
     <div className='p-4'>
     <SearchBox/>
     </div >

      <div className="flex-1 overflow-y-auto" onClick={()=>setSearchQuery("qjhjjhe")}>
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            className={`p-4 cursor-pointer hover:bg-slate-700 ${selectedChat === conv.id ? 'bg-slate-700' : ''}`}
            onClick={() => onSelectChat(conv.id)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={conv.avatar || `https://ui-avatars.com/api/?name=${conv.name}`}
                    alt={conv.name}
                  />
                  <AvatarFallback>{conv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {conv.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-slate-800" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{conv.name}</h3>
                  <span className="text-xs text-gray-400">{conv.timestamp}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessageList