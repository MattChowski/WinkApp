import { Extension, type JSONContent } from '@tiptap/react';

interface SendMessageParams {
  channelId: string;
  json: JSONContent;
  text: string;
}

interface KeyboardHandlerOptions {
  onSubmit?: (params: SendMessageParams) => void;
  channelId: string;
}

const KeyboardHandler = Extension.create<KeyboardHandlerOptions>({
  name: 'keyboardHandler',
  addOptions() {
    return {
      onSubmit: undefined,
      channelId: '',
    };
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const text = this.editor.getText().trim();
        const json = this.editor.getJSON();
        const channelId = this.options.channelId;

        this.options.onSubmit?.({ channelId, text, json });

        return this.editor.commands.clearContent();
      },
      'Shift-Enter': () => {
        return this.editor.commands.first(({ commands }) => [
          () => commands.newlineInCode(),
          () => commands.createParagraphNear(),
          () => commands.liftEmptyBlock(),
          () => commands.splitBlock(),
        ]);
      },
    };
  },
});
export { KeyboardHandler };
