import Document from '@tiptap/extension-document'
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import { Send } from 'lucide-react'
import { useSocket } from '~/context/SocketContext'
import { useEditorHandler } from '~/hooks/useEditorHandler'
import { KeyboardHandler } from '~/lib/extension-keyboard-handler'
import { PrimaryButton } from '../base/Buttons'

interface ChatFooterProps {
  channelName?: string
  channelId?: string
}

export const ChatFooter = ({ channelName, channelId }: ChatFooterProps) => {
  const { socket, isConnected } = useSocket()
  const { sendMessage } = useEditorHandler()
  const editor = useEditor(
    {
      extensions: [
        Document,
        Paragraph,
        Text,
        KeyboardHandler.configure({
          channelId: channelId ?? '',
          onSubmit: sendMessage,
        }),
        Placeholder.configure({
          placeholder: channelName ? `Message #${channelName ?? 'channel'}` : 'Message #...',
        }),
        Emoji.configure({
          emojis: gitHubEmojis,
          enableEmoticons: true,
          forceFallbackImages: true,
        }),
      ],
    },
    [channelName, isConnected, socket],
  )

  const handleSendButtonClick = () => {
    if (!editor) return
    sendMessage({ channelId, json: editor.getJSON(), text: editor.getText() })
  }

  const handleMessageAreaClick = () => {
    editor?.commands.focus('end')
  }

  return (
    <div className="mt-auto p-4">
      {/** biome-ignore lint/a11y/noStaticElementInteractions: We only need an onclick, tabbing already focuses the input*/}
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: As above ^ */}
      <div
        className="flex cursor-text flex-col gap-4 rounded-lg bg-white/5 p-2 text-sm text-white transition-shadow has-[.tiptap:focus]:ring-2 has-[.tiptap:focus]:ring-white/20"
        onClick={handleMessageAreaClick}
      >
        <EditorContent editor={editor} className="[&_.tiptap]:outline-none" />
        <div className="flex">
          <PrimaryButton icon={Send} className="ml-auto p-1" onClick={handleSendButtonClick} />
        </div>
      </div>
    </div>
  )
}
