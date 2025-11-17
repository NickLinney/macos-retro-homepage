import { useState } from 'react';

interface Campaign {
  id: string;
  name: string;
  game: string;
  session: number;
  level?: number;
  schedule: string;
  notes: string;
}

interface Character {
  name: string;
  class: string;
  level: number;
  hp: string;
}

const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'The Crystal Keep',
    game: 'D&D 5E',
    session: 12,
    level: 7,
    schedule: 'Weekly on Fridays',
    notes: 'Party investigating mysterious crystal formations. Last session: discovered ancient library beneath the keep.',
  },
  {
    id: '2',
    name: 'Tournament Army',
    game: 'Warhammer 40K',
    session: 0,
    schedule: 'Tournament Ready',
    notes: '2000pt Space Marines army. Ultramarines chapter tactics. Recent additions: Redemptor Dreadnought, Primaris Intercessors x20.',
  },
];

const characters: Character[] = [
  { name: 'Thorin Ironforge', class: 'Fighter', level: 7, hp: '68/68' },
  { name: 'Lyra Moonwhisper', class: 'Wizard', level: 7, hp: '42/42' },
  { name: 'Zara the Swift', class: 'Rogue', level: 7, hp: '51/51' },
];

const gameCollection = [
  'Settlers of Catan',
  'Magic: The Gathering',
  'Twilight Imperium',
  'Gloomhaven',
  'Ticket to Ride',
  'Pandemic',
  'Arkham Horror',
  'Terraforming Mars',
];

export default function TabletopGaming() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'characters' | 'collection'>('campaigns');

  return (
    <div>
      <h3>Tabletop Gaming</h3>
      
      <div style={{ marginTop: '12px', borderBottom: '2px solid #000', display: 'flex', gap: '4px' }}>
        <button
          className="btn"
          style={{
            borderBottom: activeTab === 'campaigns' ? '2px solid #000' : 'none',
            borderRadius: '0',
          }}
          onClick={() => setActiveTab('campaigns')}
          data-testid="tab-campaigns"
        >
          Campaigns
        </button>
        <button
          className="btn"
          style={{
            borderBottom: activeTab === 'characters' ? '2px solid #000' : 'none',
            borderRadius: '0',
          }}
          onClick={() => setActiveTab('characters')}
          data-testid="tab-characters"
        >
          Characters
        </button>
        <button
          className="btn"
          style={{
            borderBottom: activeTab === 'collection' ? '2px solid #000' : 'none',
            borderRadius: '0',
          }}
          onClick={() => setActiveTab('collection')}
          data-testid="tab-collection"
        >
          Collection
        </button>
      </div>

      <div style={{ marginTop: '12px' }}>
        {activeTab === 'campaigns' && (
          <div>
            {campaigns.map((campaign) => (
              <fieldset key={campaign.id} style={{ marginBottom: '12px' }}>
                <legend>🎲 {campaign.name}</legend>
                <div className="field-row-stacked">
                  <label><strong>Game:</strong> {campaign.game}</label>
                  <label><strong>Session:</strong> {campaign.session}</label>
                  {campaign.level && <label><strong>Party Level:</strong> {campaign.level}</label>}
                  <label><strong>Schedule:</strong> {campaign.schedule}</label>
                </div>
                <p style={{ marginTop: '8px', fontSize: '11px' }}>{campaign.notes}</p>
              </fieldset>
            ))}
          </div>
        )}

        {activeTab === 'characters' && (
          <div>
            <fieldset>
              <legend>Active Party</legend>
              <table className="interactive" style={{ width: '100%', fontSize: '11px' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Level</th>
                    <th>HP</th>
                  </tr>
                </thead>
                <tbody>
                  {characters.map((char, idx) => (
                    <tr key={idx}>
                      <td>{char.name}</td>
                      <td>{char.class}</td>
                      <td>{char.level}</td>
                      <td>{char.hp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </fieldset>
          </div>
        )}

        {activeTab === 'collection' && (
          <fieldset>
            <legend>Game Collection</legend>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              {gameCollection.map((game, idx) => (
                <div key={idx} className="field-row">
                  <input type="checkbox" id={`game-${idx}`} defaultChecked={idx < 5} />
                  <label htmlFor={`game-${idx}`} style={{ fontSize: '11px' }}>{game}</label>
                </div>
              ))}
            </div>
          </fieldset>
        )}
      </div>
    </div>
  );
}
