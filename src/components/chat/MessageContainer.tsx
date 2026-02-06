'use client'
import { useSelectedUser } from "@/store/useSelectedUser"
import { useEffect } from "react"
import ChatBottomBar from "./ChatBottomBar"
import ChatTopBar from "./ChatTopBar"
import MessageList from "./MessageList"

const MessageContainer = () => {
    const {setSelectedUser} = useSelectedUser()
    // Press esc key to close the chat
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedUser(null)
            }
        }
        window.addEventListener('keydown', handleEscKey);
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        }
    }, [])

  return (
    <div className='flex flex-col justify-between w-full h-full'>
        <ChatTopBar/>

        <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
            <MessageList/>

            <ChatBottomBar/>
        </div>
      
    </div>
  )
}

export default MessageContainer
