'use client'
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";
const AuthButtons = () => {
    const [isLoading,setIsLoading] = useState(false);
    const handleClick = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    }   
  return (
    <div className="flex gap-3  md:flex-row flex-col relative z-50">
        <RegisterLink className="flex-1" onClick={handleClick}>
      <Button className="w-50" variant={'outline'} disabled={isLoading}>
        Sign up
      </Button>
        </RegisterLink>

    <LoginLink className="flex-1" onClick={handleClick}>
    <Button className="w-50" disabled={isLoading}>
        Login
      </Button>
    </LoginLink>
      
    </div>
  )
}



export default AuthButtons
