import { gitHubEmojis } from '@tiptap/extension-emoji'
import type { ReactNode } from 'react'

// Build a map of emoji name -> emoji data for quick lookup
const emojiMap = new Map(gitHubEmojis.map((emoji) => [emoji.name, emoji]))

// Emoticon to shortcode mapping
const emoticons: Record<string, string> = {
  ':)': 'smile',
  ':-)': 'smile',
  ':(': 'frowning',
  ':-(': 'frowning',
  ':D': 'grinning',
  ':-D': 'grinning',
  ';)': 'wink',
  ';-)': 'wink',
  ':P': 'stuck_out_tongue',
  ':-P': 'stuck_out_tongue',
  ':p': 'stuck_out_tongue',
  ':-p': 'stuck_out_tongue',
  ":'(": 'cry',
  ':O': 'open_mouth',
  ':-O': 'open_mouth',
  ':o': 'open_mouth',
  ':-o': 'open_mouth',
  '<3': 'heart',
  '</3': 'broken_heart',
  ':*': 'kissing_heart',
  ':-*': 'kissing_heart',
  XD: 'laughing',
  xD: 'laughing',
  ':|': 'neutral_face',
  ':-|': 'neutral_face',
  ':S': 'confused',
  ':-S': 'confused',
  ':s': 'confused',
  ':-s': 'confused',
  '>:(': 'angry',
  '>:-(': 'angry',
  'O:)': 'innocent',
  'O:-)': 'innocent',
  'B)': 'sunglasses',
  'B-)': 'sunglasses',
}

// Build emoticon regex - escape special chars and sort by length (longest first)
const emoticonPattern = Object.keys(emoticons)
  .sort((a, b) => b.length - a.length)
  .map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .join('|')

// Combined regex: :shortcode: first, THEN emoticons (order matters!)
const combinedRegex = new RegExp(`:([a-zA-Z0-9_+-]+):|(${emoticonPattern})`, 'g')

// GitHub emoji CDN base URL
const EMOJI_CDN = 'https://github.githubassets.com/images/icons/emoji/unicode'

/**
 * Get the emoji image URL for a given emoji name
 */
const getEmojiImageUrl = (emojiName: string): string | null => {
  const emoji = emojiMap.get(emojiName)
  if (!emoji) return null

  // Custom emoji with fallbackImage
  if ('fallbackImage' in emoji && emoji.fallbackImage) {
    return emoji.fallbackImage
  }

  // Unicode emoji - construct GitHub CDN URL from codepoint
  if ('emoji' in emoji && emoji.emoji) {
    const codepoints = [...emoji.emoji]
      .map((char) => char.codePointAt(0)?.toString(16))
      .filter(Boolean)
      .join('-')
    return `${EMOJI_CDN}/${codepoints}.png?v8`
  }

  return null
}

/**
 * Parse text content and replace :emoji: shortcodes and emoticons with rendered emoji images
 */
export const parseEmojis = (text: string): ReactNode[] => {
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  // biome-ignore lint/suspicious/noAssignInExpressions: regex exec loop pattern
  while ((match = combinedRegex.exec(text)) !== null) {
    // Add text before the emoji
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    // match[1] = shortcode name, match[2] = emoticon
    const emojiName = match[1] ? match[1] : emoticons[match[2]]
    const imageUrl = getEmojiImageUrl(emojiName)

    if (imageUrl) {
      parts.push(
        <img
          key={`${match.index}-${emojiName}`}
          src={imageUrl}
          alt={`:${emojiName}:`}
          title={`:${emojiName}:`}
          className="inline-block h-5 w-5 align-text-bottom"
        />,
      )
    } else {
      // Unknown emoji, keep the original text as-is
      parts.push(match[0])
    }

    lastIndex = match.index + match[0].length
  }

  // Add remaining text after the last emoji
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}
