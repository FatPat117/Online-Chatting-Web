'use client'

import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { SmileIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
interface EmojiPickerProps {
  onChange: (emoji: string) => void
}

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { theme } = useTheme()

  return (
    <Popover>
      <PopoverTrigger>
        <SmileIcon className="cursor-pointer size-5 text-muted-foreground hover:text-foreground transition" />
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <Picker
          data={data}
          emojiSize={18}
          theme={theme === "dark" ? "dark" : "light"}
          onEmojiSelect={(emoji: any) =>
            onChange(emoji?.native || emoji?.colons || '')
          }
        />
      </PopoverContent>
    </Popover>

  )
}

export default EmojiPicker
