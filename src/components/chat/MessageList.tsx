import { getMessages } from "@/actions/message.action";
import type { Message } from "@/db/dummy";
import { cn } from "@/lib/utils";
import { useSelectedUser } from "@/store/useSelectedUser";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { Avatar, AvatarImage } from "../ui/avatar";

const MessageList = () => {
  const { selectedUser } = useSelectedUser();
  const { user: currentUser, isLoading: isUserLoading } = useKindeBrowserClient();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    data: messages = [],isLoading:isMessagesLoding
  } = useQuery<Message[]>({
    queryKey: ["messages", selectedUser?.id],
    queryFn: async () => {
      if (selectedUser && currentUser) {
        return await getMessages(selectedUser.id, currentUser.id);
      }
      return [];
    },
    enabled: !!selectedUser && !!currentUser && !isUserLoading,
  });

  useEffect(() => {
    // Auto-scroll to the last message whenever the list changes
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, selectedUser?.id]);

 

  return (
    <div className="flex-1 w-full flex flex-col overflow-x-hidden pb-2">
        {/* This component ensure that an animation is applied when items are added to or removed from the list  */}
      <AnimatePresence>
        {!isMessagesLoding && messages.map((message,index) => (
            <motion.div key={index} layout
            initial={{opacity:0, scale:1, y:50,x:0}}
            animate={{opacity:1,scale:1,y:0,x:0}}
            exit={{opacity:0,scale:1,y:1,x:0}}
            transition={{
                opacity:{duration:0.1},
                layout:{
                    type:"spring",
                    bounce:0.3,
                    duration:messages.indexOf(message) * 0.05 + 0.2
                }
            }}
            style={{
                originX:0.5,
                originY:0.5,
            }}
            className={cn("flex flex-col gap-2 p-4 whitespace-pre-wrap" , message.senderId === currentUser?.id ? "items-end" : "items-start")
                
            }
            >
                <div className="flex gap-3 items-center">
                    {message.senderId === selectedUser?.id && (
                        <Avatar className="flex justify-center items-center">
                            <AvatarImage 
                            src={selectedUser?.image || '/user-placeholder.png'}
                            alt="User Profile Image"
                             className="border-2 border-white rounded-full"
                            />
                        </Avatar>
                    )}
                    {message.messageType === 'text'? (
                        <span className="bg-accent p-3 rounded-md max-w-xs">{message.content}</span>
                    ):(<img src={message.content} alt="Message Image"
                    className="border -p2 rounded h-40 md:h-52 object-cover"/>)}

                    {message.senderId === currentUser?.id && (
                        <Avatar className="flex justify-center items-center">
                            <AvatarImage 
                            src={currentUser?.picture || '/user-placeholder.png'}
                            alt="User Profile Image"
                             className="border-2 border-white rounded-full"
                            />
                        </Avatar>
                    )}
                </div>

            </motion.div>
        ))}
        {isMessagesLoding && <MessageSkeleton/>}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList
