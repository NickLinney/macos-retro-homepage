import DesktopIcon from '../DesktopIcon';

export default function DesktopIconExample() {
  return (
    <div style={{ position: 'relative', height: '300px', background: '#c0c0c0', padding: '20px' }}>
      <DesktopIcon
        label="OS Drive"
        icon="💾"
        onDoubleClick={() => console.log('OS Drive double-clicked')}
        x={20}
        y={20}
      />
      <DesktopIcon
        label="Trash"
        icon="🗑️"
        onDoubleClick={() => console.log('Trash double-clicked')}
        x={120}
        y={20}
      />
    </div>
  );
}
