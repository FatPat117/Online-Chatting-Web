'use client'
import { useEffect, useState } from "react";
import type { Layout } from "react-resizable-panels";
import Sidebar from "../Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import MessageContainer from "./MessageContainer";

interface ChatLayoutProps  {
    defaultLayout: number[] | undefined;
}
const ChatLayout = ({defaultLayout=[320,480]}: ChatLayoutProps ) => {
    const [isMobile,setIsMobile] = useState(false);
    const [isCollapsed,setIsCollapsed] = useState(false);
    useEffect(() => {
        const checkScreenWidth = () =>{
            setIsMobile(window.innerWidth <= 768);
        }

        // Initial check
        checkScreenWidth()

        // Event Listener for screen width changes
        window.addEventListener('resize',checkScreenWidth);

        // Clean up the event listener on component moune
        return () =>{
            window.removeEventListener('resize',checkScreenWidth)
        }
    },[])
  return (
    <ResizablePanelGroup 
      orientation="horizontal" 
      className="h-full items-stretch bg-background rounded" 
      onLayoutChange={(layout: Layout) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(layout)}`;
      }}
    >
        <ResizablePanel 
          defaultSize={defaultLayout[0]} 
          collapsedSize={"8%"} 
          collapsible={true}
          minSize={isMobile ? "0%" : "8%"} 
          maxSize={isMobile ? "8%" : "30%"} 
          onResize={(panelSize) => {
            const collapsed = panelSize.asPercentage <= 17;
            // console.log(collapsed);
            setIsCollapsed(collapsed);
            document.cookie = `react-resizable-panels:collapsed=${collapsed}`;
          }}
          className={`${isCollapsed ? "max-w-[80px]" : "transition-all duration-300 ease-in-out"}`}        >
            <Sidebar isCollapsed={isCollapsed}/>
        </ResizablePanel>

    <ResizableHandle withHandle={true}/>


        <ResizablePanel
            defaultSize={defaultLayout[1]}
            minSize={"30%"}

        >
            {/* <div className="flex justify-center items-center h-full w-full px-10">
                <div className="flex flex-col justify-center items-center gap-4">
                    <img src="/logo.png" alt="logo" className="w-full md:w-2/3 lg:w-1/2" />
                    <p className="text-muted-foreground text-center">Click on a chat to view the messages</p>
                </div>
            </div> */}

            <MessageContainer/>
        </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ChatLayout
