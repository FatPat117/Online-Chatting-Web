'use client'
import { checkAuthStatus } from "@/actions/auth.actions"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { redirect } from "next/navigation"

const AuthCallBackPage = () => {
    // fetch useQuery
    const {data,isLoading}= useQuery({
        queryKey:['authCheck'],
        queryFn:async() => await checkAuthStatus()
    })

    if(isLoading) return( <div className="mt-20 w-full flex justify-center">
        <div className="flex flex-col items-center gap-2">
            <Loader className="size-10 animate-spin text-muted-foreground"/>
            <h3 className="text-xl font-bold">Redirecting...</h3>

        </div>
    </div>)
    
    if(data?.success){
        redirect('/');
    } else {
        redirect('/auth');
    }
}

export default AuthCallBackPage
