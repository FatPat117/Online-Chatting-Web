'use client'
import { usePreferences } from "@/store/usePreferences"
import { MoonIcon, SunIcon, Volume2, VolumeX } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import useSound from "use-sound"
import { Button } from "./ui/button"

const PreferencesTab = () => {
  const { theme, setTheme } = useTheme()
  const { soundEnabled, setSoundEnabled } = usePreferences()
  const [playMouseClick] = useSound('/sounds/mouse-click.mp3')
  const [playSoundOn] = useSound('/sounds/sound-on.mp3', { volume: 0.4 })
  const [playSoundOff] = useSound('/sounds/sound-off.mp3', { volume: 0.4 })

  // Avoid SSR/client mismatches by only reading theme & preferences after mount
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 0)
  }, [])

  if (!mounted) {
    // Render a stable placeholder on server and during initial hydrate
    return (
      <div className='flex flex-wrap gap-2 px-1 md:px-2'>
        <Button variant='outline' size='icon'>
          <SunIcon className='size-[1.2rem] text-muted-foreground' />
        </Button>
        <Button variant='outline' size='icon'>
          <MoonIcon className='size-[1.2rem] text-muted-foreground' />
        </Button>
        <Button variant='outline' size='icon'>
          <VolumeX className='size-[1.2rem] text-muted-foreground' />
        </Button>
      </div>
    )
  }

  return (
    <div className='flex flex-wrap gap-2 px-1 md:px-2'>
      <Button 
        variant={theme === 'light' ? 'default' : 'outline'} 
        size='icon' 
        onClick={() => {
          setTheme('light')
          if (soundEnabled) playMouseClick()
        }}
      >
        <SunIcon className={`size-[1.2rem] ${theme === 'light' ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
      </Button>
    
      <Button 
        variant={theme === 'dark' ? 'default' : 'outline'} 
        size='icon' 
        onClick={() => {
          setTheme('dark')
          if (soundEnabled) playMouseClick()
        }}
      >
        <MoonIcon className={`size-[1.2rem] ${theme === 'dark' ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
      </Button>

      <Button 
        variant={soundEnabled ? 'default' : 'outline'} 
        size='icon' 
        onClick={() => {
          setSoundEnabled(!soundEnabled)
          if (soundEnabled) {
            playSoundOff()
          } else {
            playSoundOn()
          }
        }}
      >
        {soundEnabled ? (
          <Volume2 className='size-[1.2rem] text-primary-foreground' />
        ) : (
          <VolumeX className='size-[1.2rem] text-muted-foreground' />
        )}
      </Button>
    </div>
  )
}

export default PreferencesTab
