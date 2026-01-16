interface ChatMessageDateSeparatorProps {
  date: string
}

export const ChatMessageDateSeparator = ({ date }: ChatMessageDateSeparatorProps) => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-center py-2">
      {/* <div className="h-px w-full bg-white/10" /> */}
      <div className="flex w-max items-center whitespace-nowrap rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
        {date}
      </div>
      {/* <div className="h-px w-full bg-white/10" /> */}
    </div>
  )
}
