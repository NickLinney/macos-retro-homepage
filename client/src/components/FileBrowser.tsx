import { useState } from 'react';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  children?: FileItem[];
  size?: string;
}

const fileSystem: FileItem[] = [
  {
    name: 'System Folder',
    type: 'folder',
    children: [
      { name: 'System', type: 'file', size: '2.1 MB' },
      { name: 'Finder', type: 'file', size: '512 KB' },
      { name: 'Extensions', type: 'folder', children: [] },
    ],
  },
  {
    name: 'Applications',
    type: 'folder',
    children: [
      { name: 'SimpleText', type: 'file', size: '128 KB' },
      { name: 'Calculator', type: 'file', size: '64 KB' },
      { name: 'TeachText', type: 'file', size: '96 KB' },
    ],
  },
  {
    name: 'Documents',
    type: 'folder',
    children: [
      { name: 'Resume.txt', type: 'file', size: '4 KB' },
      { name: 'Portfolio.html', type: 'file', size: '12 KB' },
      {
        name: 'Projects',
        type: 'folder',
        children: [
          { name: 'WebFramework', type: 'folder', children: [] },
          { name: 'GameEngine', type: 'folder', children: [] },
          { name: 'CLITool', type: 'folder', children: [] },
        ],
      },
    ],
  },
  {
    name: 'Games',
    type: 'folder',
    children: [
      { name: 'Marathon', type: 'folder', children: [] },
      { name: 'Escape Velocity', type: 'folder', children: [] },
    ],
  },
  {
    name: 'Utilities',
    type: 'folder',
    children: [
      { name: 'Disk First Aid', type: 'file', size: '256 KB' },
      { name: 'AppleCD Audio Player', type: 'file', size: '192 KB' },
    ],
  },
  { name: 'Read Me', type: 'file', size: '8 KB' },
];

export default function FileBrowser() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderItem = (item: FileItem, path: string = '', level: number = 0) => {
    const fullPath = path ? `${path}/${item.name}` : item.name;
    const isExpanded = expandedFolders.has(fullPath);
    
    return (
      <div key={fullPath}>
        <div
          style={{
            cursor: item.type === 'folder' ? 'pointer' : 'default',
            padding: '2px 4px',
            paddingLeft: `${level * 16 + 4}px`,
          }}
          onClick={() => item.type === 'folder' && toggleFolder(fullPath)}
          data-testid={`file-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {item.type === 'folder' ? (
            <span>
              {isExpanded ? '▼' : '▶'} 📁 {item.name}
            </span>
          ) : (
            <span>
              &nbsp;&nbsp;&nbsp;📄 {item.name} {item.size && `(${item.size})`}
            </span>
          )}
        </div>
        {item.type === 'folder' && isExpanded && item.children && (
          <div>
            {item.children.map((child) => renderItem(child, fullPath, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const totalItems = fileSystem.length;
  const totalFolders = fileSystem.filter(i => i.type === 'folder').length;

  return (
    <div>
      <h3>OS Drive</h3>
      <div
        style={{
          marginTop: '12px',
          border: '2px inset',
          padding: '8px',
          background: '#fff',
          maxHeight: '300px',
          overflowY: 'auto',
          fontFamily: 'Geneva, sans-serif',
          fontSize: '11px',
        }}
      >
        {fileSystem.map((item) => renderItem(item))}
      </div>
      <div className="status-bar" style={{ marginTop: '12px' }}>
        <p className="status-bar-field">{totalItems} items</p>
        <p className="status-bar-field">{totalFolders} folders</p>
        <p className="status-bar-field">42.3 MB available</p>
      </div>
    </div>
  );
}
