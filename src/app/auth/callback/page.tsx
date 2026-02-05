import { Loader } from "lucide-react"

const AuthCallBackPage = () => {
  return (
    <div className="mt-20 w-full flex justify-center">
     <div className="flex flex-col items-center gap-2">
        <Loader className="size-10 animate-spin text-muted-foreground"/>
        <h3 className="text-xl font-bold">Redirecting...</h3>

     </div>
    </div>
  )
}

export default AuthCallBackPage
