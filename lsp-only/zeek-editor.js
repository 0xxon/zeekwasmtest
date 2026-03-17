// Zeek Editor — Monaco integration with WASM LSP
//
// This file sets up a Monaco editor with Zeek syntax highlighting,
// LSP-powered completions, and hover documentation.
//
// Usage:
//   1. Include Monaco's loader in your HTML:
//      <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs/loader.js"></script>
//   2. Import this file as a module:
//      <script type="module" src="./zeek-editor.js"></script>
//   3. Provide a <div id="editor-container"> and a <span id="status">.

// --- Worker RPC ---

let pendingId = 0;
const pending = new Map();

const worker = new Worker('./zeek-lsp-worker.js', { type: 'module' });

worker.onmessage = ({ data }) => {
  if (data.type === 'ready') {
    const el = document.getElementById('status');
    if (el) el.textContent = 'LSP ready';
    return;
  }
  if (data.type === 'error') {
    const el = document.getElementById('status');
    if (el) el.textContent = 'LSP error: ' + data.message;
    return;
  }
  const p = pending.get(data.id);
  if (p) {
    pending.delete(data.id);
    p.resolve(data.result);
  }
};

worker.onerror = err => {
  const el = document.getElementById('status');
  if (el) el.textContent = 'Worker error: ' + err.message;
};

function callWorker(msg) {
  return new Promise((resolve, reject) => {
    const id = ++pendingId;
    pending.set(id, { resolve, reject });
    worker.postMessage({ ...msg, id });
  });
}

// --- Monaco setup ---

require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs' } });

require(['vs/editor/editor.main'], async () => {
  monaco.languages.register({ id: 'zeek', extensions: ['.zeek', '.bro'] });

  // Syntax highlighting
  monaco.languages.setMonarchTokensProvider('zeek', zeekMonarchTokenizer());

  const docUri = 'file:///workspace/main.zeek';

  // --- Completion provider ---
  monaco.languages.registerCompletionItemProvider('zeek', {
    triggerCharacters: [':', '$', '@'],
    provideCompletionItems: async (model, position) => {
      const content = model.getValue();
      const line = position.lineNumber - 1;
      const col = position.column - 1;
      try {
        const result = await callWorker({ type: 'complete', uri: docUri, content, line, col });
        if (!result) return { suggestions: [] };
        const items = Array.isArray(result) ? result : (Array.isArray(result.items) ? result.items : []);
        return {
          suggestions: items.map(item => ({
            label: item.label,
            kind: monacoCompletionKind(item.kind),
            detail: item.detail || '',
            documentation: item.documentation
              ? (typeof item.documentation === 'string'
                  ? item.documentation
                  : item.documentation.value || '')
              : '',
            insertText: item.insertText || item.label,
            insertTextRules: item.insertTextFormat === 2
              ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              : undefined,
          })),
        };
      } catch (e) {
        console.warn('completion error', e);
        return { suggestions: [] };
      }
    },
  });

  // --- Hover provider ---
  monaco.languages.registerHoverProvider('zeek', {
    provideHover: async (model, position) => {
      const content = model.getValue();
      const line = position.lineNumber - 1;
      const col = position.column - 1;
      try {
        const result = await callWorker({ type: 'hover', uri: docUri, content, line, col });
        if (!result) return null;
        const arr = Array.isArray(result.contents) ? result.contents : [];
        const markdownLines = arr.map(item =>
          typeof item === 'string' ? item : (item.value || '')
        );
        return {
          contents: markdownLines.map(v => ({ value: v })),
          range: result.range ? {
            startLineNumber: result.range.start.line + 1,
            startColumn: result.range.start.character + 1,
            endLineNumber: result.range.end.line + 1,
            endColumn: result.range.end.character + 1,
          } : undefined,
        };
      } catch (e) {
        console.warn('hover error', e);
        return null;
      }
    },
  });

  // --- Create the editor ---
  const container = document.getElementById('editor-container');
  const editor = monaco.editor.create(container, {
    value: defaultContent(),
    language: 'zeek',
    theme: 'vs-dark',
    fontSize: 14,
    minimap: { enabled: false },
    automaticLayout: true,
    tabSize: 4,
  });

  // Shift+Tab as alternative completion trigger
  editor.addAction({
    id: 'trigger-completion-shift-tab',
    label: 'Trigger Completion (Shift+Tab)',
    keybindings: [monaco.KeyMod.Shift | monaco.KeyCode.Tab],
    run: (ed) => ed.trigger('keyboard', 'editor.action.triggerSuggest', {}),
  });

  // Keep the LSP in sync with editor content
  editor.onDidChangeModelContent(() => {
    const content = editor.getValue();
    callWorker({ type: 'noop', uri: docUri, content }).catch(() => {});
  });
});

// --- Helpers ---

function monacoCompletionKind(lspKind) {
  const map = {
    1: 17, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8,
    10: 9, 12: 11, 13: 12, 14: 17, 16: 14, 17: 20, 18: 21,
  };
  return map[lspKind] || 0;
}

function zeekMonarchTokenizer() {
  return {
    keywords: [
      'module', 'export', 'global', 'local', 'const', 'option', 'type',
      'redef', 'function', 'hook', 'event', 'return', 'if', 'else', 'for',
      'while', 'break', 'next', 'print', 'in', 'of', 'table', 'set', 'vector',
      'record', 'enum', 'add', 'delete', 'when', 'timeout', 'schedule',
      'true', 'false', 'T', 'F',
    ],
    tokenizer: {
      root: [
        [/##!.*$/, 'comment.zeekygen'],
        [/##<.*$/, 'comment.zeekygen'],
        [/##.*$/, 'comment.zeekygen'],
        [/#.*$/, 'comment'],
        [/"([^"\\]|\\.)*"/, 'string'],
        [/\b(0x[\da-fA-F]+|\d+(\.\d+)?([eE][+-]?\d+)?)\b/, 'number'],
        [/\b[A-Z][A-Z_0-9]*\b/, 'type.identifier'],
        [/@(load|load-sigs|load-plugin|unload|prefixes|if|ifdef|ifndef|else|endif|priority|deprecated)\b/, 'keyword.directive'],
        [/\b(module|export|global|local|const|option|type|redef|function|hook|event|return|if|else|for|while|break|next|print|in|of|table|set|vector|record|enum|add|delete|when|timeout|schedule)\b/, 'keyword'],
        [/\b(T|F|true|false)\b/, 'keyword.constant'],
        [/[{}()[\],;]/, 'delimiter'],
        [/[a-zA-Z_]\w*/, 'identifier'],
      ],
    },
  };
}

function defaultContent() {
  return `# Zeek script example
@load base/frameworks/notice

module MyModule;

export {
    redef enum Notice::Type += {
        MyAlert
    };
}

event connection_established(c: connection)
{
    local sport = c$id$orig_p;
    local dport = c$id$resp_p;

    if ( dport == 80/tcp || dport == 443/tcp )
    {
        NOTICE([$note=MyAlert,
                $conn=c,
                $msg=fmt("HTTP/S connection from %s", c$id$orig_h)]);
    }
}
`;
}
