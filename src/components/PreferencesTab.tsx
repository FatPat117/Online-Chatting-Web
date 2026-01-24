'use client'
import { usePreferences } from "@/store/usePreferences"
import { MoonIcon, SunIcon, Volume2, VolumeX } from "lucide-react"
import { useTheme } from "next-themes"
import useSound from "use-sound"
import { Button } from "./ui/button"
const PreferencesTab = () => {
const {theme, setTheme} = useTheme()
const {soundEnabled,setSoundEnabled} = usePreferences();
const [playMouseClick] = useSound('/sounds/mouse-click.mp3');
const [playSoundOn] = useSound('/sounds/sound-on.mp3',{volume:0.4});
const [playSoundOff] = useSound('/sounds/sound-off.mp3',{volume:0.4});


  return (
    <div className='flex flex-wrap gap-2 px-1 md:px-2'>
        <Button 
          variant={theme === 'light' ? 'default' : 'outline'} 
          size={'icon'} 
          onClick={() => {
            setTheme('light');
            if (soundEnabled) playMouseClick();
          }}
        >
            <SunIcon className={`size-[1.2rem] ${theme === 'light' ? 'text-primary-foreground' : 'text-muted-foreground'}`}/>
        </Button>
      
         <Button 
          variant={theme === 'dark' ? 'default' : 'outline'} 
          size={'icon'} 
          onClick={() => {
            setTheme('dark');
            if (soundEnabled) playMouseClick();
          }}
        >
            <MoonIcon className={`size-[1.2rem] ${theme === 'dark' ? 'text-primary-foreground' : 'text-muted-foreground'}`}/>
        </Button>

        <Button 
          variant={soundEnabled ? 'default' : 'outline'} 
          size={'icon'} 
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (soundEnabled) {
              playSoundOff();
            } else {
              playSoundOn();
            }
          }}
        >
          {soundEnabled ? (
            <Volume2 className={`size-[1.2rem] text-primary-foreground`}/>
          ) : (
            <VolumeX className={`size-[1.2rem] text-muted-foreground`}/>
          )}
        </Button>
    </div>
  )
}

export default PreferencesTab
