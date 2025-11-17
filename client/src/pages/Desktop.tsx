import { useState } from 'react';
import MenuBar, { MenuItem } from '@/components/MenuBar';
import Window from '@/components/Window';
import DesktopIcon from '@/components/DesktopIcon';

interface OpenWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  width?: number;
  height?: number;
  initialX?: number;
  initialY?: number;
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
            content: (
              <div>
                <h3>Programming Projects</h3>
                <div className="field-row" style={{ marginTop: '12px' }}>
                  <table className="interactive" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>📁 Web Framework</td>
                        <td>JavaScript</td>
                        <td>Active</td>
                      </tr>
                      <tr>
                        <td>📁 Game Engine</td>
                        <td>C++</td>
                        <td>In Progress</td>
                      </tr>
                      <tr>
                        <td>📁 CLI Tool</td>
                        <td>Python</td>
                        <td>Complete</td>
                      </tr>
                      <tr>
                        <td>📁 3D Renderer</td>
                        <td>OpenGL</td>
                        <td>Experimental</td>
                      </tr>
                      <tr>
                        <td>📁 Parser Library</td>
                        <td>Rust</td>
                        <td>Planning</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ marginTop: '12px', fontSize: '10px' }}>
                  Double-click to open project details (coming soon!)
                </p>
              </div>
            ),
            width: 500,
            height: 400,
            initialX: 100,
            initialY: 80,
          }),
        },
        {
          label: 'Tabletop',
          action: () => openWindow({
            id: 'tabletop',
            title: 'Tabletop Gaming',
            content: (
              <div>
                <h3>Tabletop Games & Campaigns</h3>
                <div style={{ marginTop: '12px' }}>
                  <fieldset>
                    <legend>Active Campaigns</legend>
                    <div className="field-row">
                      <p><strong>🎲 D&D: The Crystal Keep</strong></p>
                      <p style={{ fontSize: '11px', marginLeft: '20px' }}>
                        Session 12 • Level 7 Party • Weekly on Fridays
                      </p>
                    </div>
                    <div className="field-row" style={{ marginTop: '8px' }}>
                      <p><strong>🎲 Warhammer 40K</strong></p>
                      <p style={{ fontSize: '11px', marginLeft: '20px' }}>
                        2000pt Space Marines Army • Tournament Ready
                      </p>
                    </div>
                  </fieldset>
                  
                  <fieldset style={{ marginTop: '12px' }}>
                    <legend>Game Collection</legend>
                    <ul style={{ fontSize: '11px', listStyleType: 'none', padding: 0 }}>
                      <li>□ Settlers of Catan</li>
                      <li>□ Magic: The Gathering</li>
                      <li>□ Twilight Imperium</li>
                      <li>□ Gloomhaven</li>
                      <li>□ Ticket to Ride</li>
                    </ul>
                  </fieldset>
                </div>
              </div>
            ),
            width: 480,
            height: 450,
            initialX: 120,
            initialY: 100,
          }),
        },
        {
          label: 'Video Games',
          action: () => openWindow({
            id: 'videogames',
            title: 'Video Games',
            content: (
              <div>
                <h3>Gaming Library</h3>
                <div className="tabs" style={{ marginTop: '12px' }}>
                  <div className="tab-body">
                    <h4>Currently Playing</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
                      <div className="field-row-stacked">
                        <label>🎮 Final Fantasy VII</label>
                        <progress value="65" max="100" style={{ width: '100%' }}>65%</progress>
                        <label style={{ fontSize: '10px' }}>65% Complete</label>
                      </div>
                      <div className="field-row-stacked">
                        <label>🎮 Baldur's Gate II</label>
                        <progress value="30" max="100" style={{ width: '100%' }}>30%</progress>
                        <label style={{ fontSize: '10px' }}>30% Complete</label>
                      </div>
                      <div className="field-row-stacked">
                        <label>🎮 StarCraft</label>
                        <progress value="100" max="100" style={{ width: '100%' }}>100%</progress>
                        <label style={{ fontSize: '10px' }}>Completed</label>
                      </div>
                      <div className="field-row-stacked">
                        <label>🎮 Half-Life</label>
                        <progress value="85" max="100" style={{ width: '100%' }}>85%</progress>
                        <label style={{ fontSize: '10px' }}>85% Complete</label>
                      </div>
                    </div>
                    
                    <h4 style={{ marginTop: '16px' }}>Favorites</h4>
                    <ul style={{ fontSize: '11px', marginTop: '8px' }}>
                      <li>The Legend of Zelda: Ocarina of Time</li>
                      <li>Super Mario 64</li>
                      <li>GoldenEye 007</li>
                      <li>Diablo II</li>
                      <li>Counter-Strike</li>
                    </ul>
                  </div>
                </div>
              </div>
            ),
            width: 550,
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
            title: 'SimpleText - Read Me',
            content: (
              <div>
                <h3>Welcome to My Homepage!</h3>
                <p>
                  This is a nostalgic recreation of the classic Mac OS 7 desktop environment,
                  serving as my personal homepage.
                </p>
                <p>
                  Navigate using the menu bar at the top to explore my programming projects,
                  tabletop gaming adventures, and video game collection.
                </p>
                <hr />
                <p><strong>Quick Tips:</strong></p>
                <ul>
                  <li>Click menu items to open different windows</li>
                  <li>Drag windows by their title bars</li>
                  <li>Double-click the OS Drive icon on the desktop</li>
                  <li>Each window can be closed individually</li>
                </ul>
                <p style={{ marginTop: '12px', fontSize: '10px' }}>
                  Built with love for the retro computing aesthetic.
                </p>
              </div>
            ),
            width: 500,
            height: 400,
            initialX: 180,
            initialY: 140,
          }),
        },
        {
          label: 'Calculator',
          action: () => openWindow({
            id: 'calculator',
            title: 'Calculator',
            content: (
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  background: '#9BC59D', 
                  padding: '8px', 
                  marginBottom: '12px',
                  fontFamily: 'monospace',
                  fontSize: '24px',
                  textAlign: 'right',
                  border: '2px inset',
                }}>
                  0
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                  {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map(btn => (
                    <button 
                      key={btn} 
                      className="btn"
                      onClick={() => console.log(`Pressed: ${btn}`)}
                      style={{ padding: '12px', fontSize: '14px' }}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: '12px' }}>
                  <button className="btn" style={{ width: '100%' }}>Clear</button>
                </div>
              </div>
            ),
            width: 280,
            height: 350,
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
        background: '#008080',
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
          content: (
            <div>
              <h3>OS Drive Contents</h3>
              <div className="tree-view" style={{ marginTop: '12px' }}>
                <ul>
                  <li>📁 System Folder</li>
                  <li>📁 Applications</li>
                  <li>
                    📁 Documents
                    <ul>
                      <li>📄 Resume.txt</li>
                      <li>📄 Portfolio.html</li>
                      <li>📁 Projects</li>
                    </ul>
                  </li>
                  <li>📁 Games</li>
                  <li>📁 Utilities</li>
                  <li>📄 Read Me</li>
                </ul>
              </div>
              <div className="status-bar" style={{ marginTop: '16px' }}>
                <p className="status-bar-field">6 items</p>
                <p className="status-bar-field">42.3 MB available</p>
              </div>
            </div>
          ),
          width: 400,
          height: 350,
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

      {windows.map((window) => (
        <Window
          key={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
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
    </div>
  );
}
