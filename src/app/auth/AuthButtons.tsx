import { Button } from "@/components/ui/button"

const AuthButtons = () => {
  return (
    <div className="flex gap-3  md:flex-row flex-col relative z-50">
      <Button className="w-50" variant={'outline'}>
        Sign up
      </Button>
      <Button className="w-50" >
        Login
      </Button>
    </div>
  )
}

export default AuthButtons
