export interface DesktopIconProps {
  label: string;
  icon: string;
  onDoubleClick: () => void;
  x?: number;
  y?: number;
}

export default function DesktopIcon({
  label,
  icon,
  onDoubleClick,
  x = 20,
  y = 40,
}: DesktopIconProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: '80px',
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onDoubleClick={onDoubleClick}
      data-testid={`icon-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div
        style={{
          fontSize: '48px',
          marginBottom: '4px',
          filter: 'grayscale(100%) contrast(200%)',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: 'Chicago, sans-serif',
          fontSize: '11px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '2px 4px',
          border: '1px solid #000',
          display: 'inline-block',
        }}
      >
        {label}
      </div>
    </div>
  );
}
