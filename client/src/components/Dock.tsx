interface DockItem {
  id: string;
  title: string;
  onClick: () => void;
}

interface DockProps {
  items: DockItem[];
}

export default function Dock({ items }: DockProps) {
  if (items.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'repeating-linear-gradient(45deg, #000, #000 2px, #fff 2px, #fff 4px)',
        borderTop: '2px solid #000',
        padding: '4px 8px',
        display: 'flex',
        gap: '4px',
        zIndex: 50,
      }}
      data-testid="dock"
    >
      {items.map((item) => (
        <button
          key={item.id}
          className="btn"
          onClick={item.onClick}
          style={{
            fontSize: '11px',
            fontFamily: 'Chicago, sans-serif',
            padding: '4px 12px',
            maxWidth: '150px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          data-testid={`dock-item-${item.id}`}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}
