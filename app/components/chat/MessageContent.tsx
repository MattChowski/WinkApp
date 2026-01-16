import Document from '@tiptap/extension-document'
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import type { JSONContent } from '@tiptap/react'
import { EditorContent, useEditor } from '@tiptap/react'

interface MessageContentProps {
  json: JSONContent
}

export const MessageContent = ({ json }: MessageContentProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph.configure({ HTMLAttributes: { class: 'leading-6' } }),
      Text,
      Emoji.configure({
        emojis: gitHubEmojis,
        forceFallbackImages: true,
      }),
    ],
    content: json,
    editable: false,
    immediatelyRender: false,
  })

  return <EditorContent editor={editor} className="text-sm text-white/75 [&_.tiptap]:outline-none [&_p]:m-0" />
}
