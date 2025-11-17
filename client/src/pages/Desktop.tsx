import { useState } from 'react';
import MenuBar, { MenuItem } from '@/components/MenuBar';
import Window from '@/components/Window';
import DesktopIcon from '@/components/DesktopIcon';
import ProgrammingProjects from '@/components/ProgrammingProjects';
import TabletopGaming from '@/components/TabletopGaming';
import VideoGames from '@/components/VideoGames';
import Calculator from '@/components/Calculator';
import TextEditor from '@/components/TextEditor';
import FileBrowser from '@/components/FileBrowser';
import Dock from '@/components/Dock';

interface OpenWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  width?: number;
  height?: number;
  initialX?: number;
  initialY?: number;
  minimized?: boolean;
}

export default function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(100);
  const [windowZIndices, setWindowZIndices] = useState<Record<string, number>>({});

  const openWindow = (window: OpenWindow) => {
    const exists = windows.find(w => w.id === window.id);
    if (!exists) {
      setWindows([...windows, window]);
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      setWindowZIndices({ ...windowZIndices, [window.id]: newZIndex });
    } else {
      bringToFront(window.id);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ));
  };

  const restoreWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, minimized: false } : w
    ));
    bringToFront(id);
  };

  const bringToFront = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindowZIndices({ ...windowZIndices, [id]: newZIndex });
  };

  const menus = [
    {
      title: 'System',
      items: [
        {
          label: 'About This Mac',
          action: () => openWindow({
            id: 'about',
            title: 'About This Mac',
            content: (
              <div>
                <h2>Mac OS System 7.5.3</h2>
                <p>Personal Homepage v1.0</p>
                <hr />
                <p><strong>Built By:</strong> A Late-90s/Early-2000s Programmer</p>
                <p><strong>Interests:</strong> Programming, Tabletop Gaming, Video Games</p>
                <hr />
                <p style={{ fontSize: '10px', marginTop: '20px' }}>
                  © 1997 Apple Computer, Inc.<br />
                  (Just kidding, this is a nostalgic homage!)
                </p>
              </div>
            ),
            width: 400,
            height: 350,
            initialX: 150,
            initialY: 100,
          }),
        },
        { separator: true },
        { label: 'Control Panels', action: () => console.log('Control Panels') },
        { separator: true },
        { label: 'Restart', action: () => window.location.reload() },
        { label: 'Shut Down', action: () => console.log('Goodbye!') },
      ] as MenuItem[],
    },
    {
      title: 'Projects',
      items: [
        {
          label: 'Programming',
          action: () => openWindow({
            id: 'programming',
            title: 'Programming Projects',
            content: <ProgrammingProjects />,
            width: 600,
            height: 500,
            initialX: 100,
            initialY: 80,
          }),
        },
        {
          label: 'Tabletop',
          action: () => openWindow({
            id: 'tabletop',
            title: 'Tabletop Gaming',
            content: <TabletopGaming />,
            width: 550,
            height: 500,
            initialX: 120,
            initialY: 100,
          }),
        },
        {
          label: 'Video Games',
          action: () => openWindow({
            id: 'videogames',
            title: 'Video Games',
            content: <VideoGames />,
            width: 650,
            height: 500,
            initialX: 140,
            initialY: 120,
          }),
        },
      ] as MenuItem[],
    },
    {
      title: 'Applications',
      items: [
        {
          label: 'SimpleText',
          action: () => openWindow({
            id: 'simpletext',
            title: 'SimpleText - Untitled',
            content: <TextEditor />,
            width: 550,
            height: 500,
            initialX: 180,
            initialY: 140,
          }),
        },
        {
          label: 'Calculator',
          action: () => openWindow({
            id: 'calculator',
            title: 'Calculator',
            content: <Calculator />,
            width: 280,
            height: 400,
            initialX: 200,
            initialY: 160,
          }),
        },
      ] as MenuItem[],
    },
    {
      title: 'Links',
      items: [
        { label: 'GitHub', action: () => window.open('https://github.com', '_blank') },
        { label: 'LinkedIn', action: () => window.open('https://linkedin.com', '_blank') },
        { separator: true },
        { label: 'Email Me', action: () => window.location.href = 'mailto:example@example.com' },
      ] as MenuItem[],
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#ffffff',
        overflow: 'hidden',
      }}
      data-testid="desktop"
    >
      <MenuBar menus={menus} />
      
      <DesktopIcon
        label="OS Drive"
        icon="💾"
        x={20}
        y={40}
        onDoubleClick={() => openWindow({
          id: 'osdrive',
          title: 'OS Drive',
          content: <FileBrowser />,
          width: 450,
          height: 450,
          initialX: 160,
          initialY: 120,
        })}
      />
      
      <DesktopIcon
        label="Trash"
        icon="🗑️"
        x={20}
        y={140}
        onDoubleClick={() => openWindow({
          id: 'trash',
          title: 'Trash',
          content: (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🗑️</div>
              <p>The Trash is empty.</p>
              <p style={{ fontSize: '10px', marginTop: '20px', color: '#666' }}>
                (Nothing to see here!)
              </p>
            </div>
          ),
          width: 350,
          height: 280,
          initialX: 180,
          initialY: 140,
        })}
      />

      {windows.filter(w => !w.minimized).map((window) => (
        <Window
          key={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          initialX={window.initialX}
          initialY={window.initialY}
          width={window.width}
          height={window.height}
          zIndex={windowZIndices[window.id] || 100}
          onFocus={() => bringToFront(window.id)}
        >
          {window.content}
        </Window>
      ))}

      <Dock
        items={windows.filter(w => w.minimized).map(w => ({
          id: w.id,
          title: w.title,
          onClick: () => restoreWindow(w.id),
        }))}
      />
    </div>
  );
}
