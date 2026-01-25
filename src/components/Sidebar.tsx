import { USERS } from "@/db/dummy";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Tooltip } from "@radix-ui/react-tooltip";
import { LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface SidebarProps {
    isCollapsed: boolean;
}

const Sidebar = ({isCollapsed}: SidebarProps) => {
    const selectedUser = USERS[0];

  return (
    <div className="relative flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 max-h-full overflow-auto bg-background group">
      {!isCollapsed && 
      (<div className="flex justify-between p-2 items-center">
        <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            </div>
        </div>)}

        {/* Scroll area */}
        <ScrollArea className='gap-2 px-2 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:px-2'>
            {USERS.map((user,idx) => (
               isCollapsed ? (
                <TooltipProvider key={idx}>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <div>
                                    <Avatar className="my-1 flex justify-center items-center size-8" >
                                        <AvatarImage src={user.image || "/user-placeholder.png"} alt="User Profile Image"
                                        referrerPolicy="no-referrer"/>
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    
                                    <span className="sr-only">{user.name}</span>

                              </div>
                            </TooltipTrigger>

                            <TooltipContent side="right" className="flex items-center gap-4">{user.name}</TooltipContent>
                        </Tooltip>
                </TooltipProvider>
               ) : (
                   <Button key={idx}
                   size={'xl'}
                   variant={'grey'}
                   className={cn("w-full justify-start gap-4 my-1",selectedUser.email === user.email && "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink" )}
             >
                <Avatar className="flex items-center justify-center">
                    <AvatarImage src={user.image || "/user-placeholder.png"}
                    alt={user.image || "User profile image"}
                    referrerPolicy="no-referrer"
                    className="size-10"/>
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col max-w-28">
                    <span>{user.name}</span>
                </div>
             </Button>
               )
            ))}
        </ScrollArea>

        {/* Logout section */}
        <div className="mt-auto overflow-hidden">
            <div className="flex justify-between items-center gap-2 md:px-6 py-2">
                {!isCollapsed &&
                 (<div className="flex justify-between items-center gap-2 md:px-6 py-2">
                    <Avatar className="flex justify-center items-center">
                        <AvatarImage
                            src={"/user-placeholder.png"}
                            alt="Avatar"
                            referrerPolicy="no-referrer"
                            className="size-8 border-2 border-white rounded-full"
                        />
                    </Avatar>
                    <p className="font-bold">Test User</p>
                 </div>)}
                 <div className="flex ">
                    <LogOut size={22} cursor={"pointer"}/>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
