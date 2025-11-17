import { useState } from 'react';
import Window from '../Window';

export default function WindowExample() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div style={{ padding: '20px' }}>
        <button className="btn" onClick={() => setIsOpen(true)}>
          Show Window
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', height: '600px', background: '#ffffff' }}>
      <Window
        title="Example Window"
        onClose={() => setIsOpen(false)}
        initialX={50}
        initialY={50}
        width={400}
        height={300}
      >
        <p>This is a draggable MacOS 7-style window!</p>
        <p>You can drag it by the title bar and close it with the button.</p>
        <button className="btn" onClick={() => console.log('Button clicked!')}>
          Click Me
        </button>
      </Window>
    </div>
  );
}
