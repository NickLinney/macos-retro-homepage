import { useState } from 'react';

interface Game {
  id: string;
  title: string;
  platform: string;
  progress: number;
  status: 'playing' | 'completed' | 'backlog';
  genre: string;
}

const games: Game[] = [
  { id: '1', title: 'Final Fantasy VII', platform: 'PlayStation', progress: 65, status: 'playing', genre: 'RPG' },
  { id: '2', title: "Baldur's Gate II", platform: 'PC', progress: 30, status: 'playing', genre: 'RPG' },
  { id: '3', title: 'StarCraft', platform: 'PC', progress: 100, status: 'completed', genre: 'RTS' },
  { id: '4', title: 'Half-Life', platform: 'PC', progress: 85, status: 'playing', genre: 'FPS' },
  { id: '5', title: 'Ocarina of Time', platform: 'N64', progress: 100, status: 'completed', genre: 'Adventure' },
  { id: '6', title: 'Super Mario 64', platform: 'N64', progress: 100, status: 'completed', genre: 'Platformer' },
  { id: '7', title: 'GoldenEye 007', platform: 'N64', progress: 100, status: 'completed', genre: 'FPS' },
  { id: '8', title: 'Diablo II', platform: 'PC', progress: 90, status: 'playing', genre: 'ARPG' },
  { id: '9', title: 'Counter-Strike', platform: 'PC', progress: 50, status: 'playing', genre: 'FPS' },
  { id: '10', title: 'Metal Gear Solid', platform: 'PlayStation', progress: 20, status: 'backlog', genre: 'Stealth' },
  { id: '11', title: 'Resident Evil 2', platform: 'PlayStation', progress: 15, status: 'backlog', genre: 'Horror' },
  { id: '12', title: 'Chrono Trigger', platform: 'SNES', progress: 100, status: 'completed', genre: 'RPG' },
];

export default function VideoGames() {
  const [filter, setFilter] = useState<'all' | 'playing' | 'completed' | 'backlog'>('all');
  
  const filteredGames = filter === 'all' ? games : games.filter(g => g.status === filter);

  return (
    <div>
      <h3>Gaming Library</h3>
      
      <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          className="btn"
          onClick={() => setFilter('all')}
          style={{ background: filter === 'all' ? '#000' : '#fff', color: filter === 'all' ? '#fff' : '#000' }}
          data-testid="filter-all"
        >
          All Games
        </button>
        <button
          className="btn"
          onClick={() => setFilter('playing')}
          style={{ background: filter === 'playing' ? '#000' : '#fff', color: filter === 'playing' ? '#fff' : '#000' }}
          data-testid="filter-playing"
        >
          Playing
        </button>
        <button
          className="btn"
          onClick={() => setFilter('completed')}
          style={{ background: filter === 'completed' ? '#000' : '#fff', color: filter === 'completed' ? '#fff' : '#000' }}
          data-testid="filter-completed"
        >
          Completed
        </button>
        <button
          className="btn"
          onClick={() => setFilter('backlog')}
          style={{ background: filter === 'backlog' ? '#000' : '#fff', color: filter === 'backlog' ? '#fff' : '#000' }}
          data-testid="filter-backlog"
        >
          Backlog
        </button>
      </div>

      <div style={{ marginTop: '12px' }}>
        <table className="interactive" style={{ width: '100%', fontSize: '11px' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Platform</th>
              <th>Genre</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.map((game) => (
              <tr key={game.id} data-testid={`game-row-${game.id}`}>
                <td>
                  🎮 {game.title}
                  {game.status === 'completed' && <span style={{ marginLeft: '4px' }}>✓</span>}
                </td>
                <td>{game.platform}</td>
                <td>{game.genre}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <progress value={game.progress} max="100" style={{ width: '100px' }}>
                      {game.progress}%
                    </progress>
                    <span>{game.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="status-bar" style={{ marginTop: '16px' }}>
        <p className="status-bar-field">Showing {filteredGames.length} of {games.length} games</p>
        <p className="status-bar-field">
          {games.filter(g => g.status === 'completed').length} Completed
        </p>
      </div>
    </div>
  );
}
