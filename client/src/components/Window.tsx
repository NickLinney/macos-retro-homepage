import { useState } from 'react';
import Draggable from 'react-draggable';

export interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  zIndex?: number;
  onFocus?: () => void;
}

export default function Window({
  title,
  children,
  onClose,
  onMinimize,
  initialX = 100,
  initialY = 100,
  width = 500,
  height = 400,
  zIndex = 1,
  onFocus,
}: WindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });

  return (
    <Draggable
      handle=".title-bar"
      position={position}
      onStop={(_, data) => setPosition({ x: data.x, y: data.y })}
      bounds="parent"
    >
      <div
        className="window"
        style={{
          position: 'absolute',
          width: `${width}px`,
          maxHeight: `${height}px`,
          zIndex,
        }}
        onClick={onFocus}
        data-testid={`window-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="title-bar" style={{ cursor: 'move', userSelect: 'none' }}>
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            {onMinimize && (
              <button
                aria-label="Minimize"
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                style={{ marginRight: '4px' }}
                data-testid={`button-minimize-${title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                −
              </button>
            )}
            <button
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              data-testid={`button-close-${title.toLowerCase().replace(/\s+/g, '-')}`}
            />
          </div>
        </div>
        <div
          className="window-body"
          style={{
            maxHeight: `${height - 40}px`,
            overflowY: 'auto',
            padding: '12px',
          }}
        >
          {children}
        </div>
      </div>
    </Draggable>
  );
}
