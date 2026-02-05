import Image from 'next/image'
import AuthButtons from './AuthButtons'
const AuthPage = () => {
  return (
    <div className="flex h-screen w-full">
        {/* Left part */}
        <div className="flex-1 flex overflow-hidden relative justify-center items-center dark:bg-[#651c2b55] bg-[#651c2b]">
            <img src="/redis-logo.svg" alt="Redis Logo" className="absolute -left-1/4 opacity-25 -bottom-52 lg:scale-125 xl:scale-100 scale-[2] z-0" />

            <div className="flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold">
                <Image src="/logo.png" alt="RedisStash Logo" width={763} height={173} className='mt-20 w-[420px] z-0 pointer-events-none select-none' />

                <p className="text-2xl md:text-3xl text-balance z-10">The <span className='bg-red-500 px-2 font-bold text-white'>ULTIMATE</span> chat app</p>

                <p className='text-2xl md:text-3xl mb-32 text-balance z-10'>
                    You <span className='bg-green-500/90 font-bold px-2 text-white'>NEED TO</span> build
                </p>

                {/* Auth button */}
                <AuthButtons/>
            </div>
        </div>
      
        {/* Right part */}
        <div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex bg-noise">
            <Image src={'/hero-right.png'} alt='Hero Image' fill className='object-cover dark:opacity-60 opacity-90 pointer-events-none select-none h-full'/>
        </div>
    </div>
  )
}

export default AuthPage
