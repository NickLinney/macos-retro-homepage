import { useState } from 'react';

export default function TextEditor() {
  const [content, setContent] = useState(
`Welcome to SimpleText!

This is a retro text editor inspired by classic Mac OS.

You can type anything here - notes, code snippets, or just random thoughts.

Some features:
- Basic text editing
- Word count
- Character count
- Line count

Built with love for the classic computing aesthetic.

---
System 7.5.3 • SimpleText v1.0
`
  );

  const lines = content.split('\n').length;
  const words = content.trim().split(/\s+/).filter(w => w.length > 0).length;
  const chars = content.length;

  return (
    <div>
      <div style={{ marginBottom: '8px', display: 'flex', gap: '4px' }}>
        <button className="btn" onClick={() => setContent('')} data-testid="button-new">
          New
        </button>
        <button className="btn" onClick={() => console.log('Save clicked')} data-testid="button-save">
          Save
        </button>
        <button className="btn" onClick={() => console.log('Open clicked')} data-testid="button-open">
          Open
        </button>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: '100%',
          height: '300px',
          fontFamily: 'Geneva, sans-serif',
          fontSize: '12px',
          padding: '8px',
          border: '2px inset',
          resize: 'none',
        }}
        data-testid="textarea-content"
      />
      
      <div className="status-bar" style={{ marginTop: '8px' }}>
        <p className="status-bar-field">{lines} lines</p>
        <p className="status-bar-field">{words} words</p>
        <p className="status-bar-field">{chars} characters</p>
      </div>
    </div>
  );
}
