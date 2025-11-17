import { useState } from 'react';

export interface MenuItem {
  label?: string;
  action?: () => void;
  submenu?: MenuItem[];
  separator?: boolean;
}

export interface MenuBarProps {
  menus: { title: string; items: MenuItem[] }[];
}

export default function MenuBar({ menus }: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const handleMenuClick = (index: number) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    }
    setActiveMenu(null);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50" style={{ height: '20px' }}>
      <div className="title-bar" style={{ margin: 0, borderRadius: 0 }}>
        <div className="title-bar-text" style={{ display: 'flex', gap: '12px', padding: '2px 8px' }}>
          {menus.map((menu, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <button
                className="menu-button"
                style={{
                  background: activeMenu === index ? '#000' : 'transparent',
                  color: activeMenu === index ? '#fff' : '#000',
                  border: 'none',
                  padding: '0 8px',
                  cursor: 'pointer',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  textShadow: activeMenu === index 
                    ? 'none'
                    : '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, -2px 0 0 #fff, 2px 0 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff, -1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff, -1.5px 1.5px 0 #fff, 1.5px 1.5px 0 #fff',
                }}
                onClick={() => handleMenuClick(index)}
                data-testid={`menu-${menu.title.toLowerCase()}`}
              >
                {menu.title}
              </button>
              
              {activeMenu === index && (
                <div
                  className="window"
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: 0,
                    minWidth: '180px',
                    padding: '2px',
                    zIndex: 1000,
                  }}
                  data-testid={`dropdown-${menu.title.toLowerCase()}`}
                >
                  <div className="window-body" style={{ padding: 0 }}>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      {menu.items.map((item, itemIndex) => (
                        item.separator ? (
                          <li key={itemIndex} style={{ borderTop: '1px solid #000', margin: '2px 0' }} />
                        ) : (
                          <li key={itemIndex}>
                            {item.submenu ? (
                              <div style={{ position: 'relative' }}>
                                <button
                                  className="menu-item"
                                  style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '2px 20px 2px 8px',
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    position: 'relative',
                                  }}
                                  data-testid={`menuitem-${item.label?.toLowerCase().replace(/\s+/g, '-') || ''}`}
                                >
                                  {item.label}
                                  <span style={{ position: 'absolute', right: '8px' }}>▶</span>
                                </button>
                              </div>
                            ) : (
                              <button
                                className="menu-item"
                                style={{
                                  width: '100%',
                                  textAlign: 'left',
                                  padding: '2px 8px',
                                  border: 'none',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                }}
                                onClick={() => handleItemClick(item)}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#000';
                                  e.currentTarget.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.color = '#000';
                                }}
                                data-testid={`menuitem-${item.label?.toLowerCase().replace(/\s+/g, '-') || ''}`}
                              >
                                {item.label}
                              </button>
                            )}
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {activeMenu !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
}
