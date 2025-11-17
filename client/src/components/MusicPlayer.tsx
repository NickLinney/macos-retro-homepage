import { useState, useRef, useEffect } from 'react';

const defaultAudioPath = '/attached_assets/ff4boss_1763391077864.mid';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(defaultAudioPath);
  const [trackName, setTrackName] = useState('Final Fantasy IV - Boss Battle');
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setLoadError(true);
      setIsPlaying(false);
    };
    const handleCanPlay = () => {
      setLoadError(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (loadError) {
      alert('Cannot play this audio format. Please use the Eject button to load a .mp3 or .wav file.');
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {
        setLoadError(true);
        alert('Cannot play this audio format. Please use the Eject button to load a .mp3 or .wav file.');
      });
      setIsPlaying(true);
    }
  };

  const handleBack = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const handleForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  };

  const handleEject = () => {
    const input = prompt('Enter URL for a music file (.mp3 or .wav recommended):\n\nExample: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    if (input && input.trim()) {
      const wasPlaying = isPlaying;
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
      setLoadError(false);
      setCurrentTrack(input.trim());
      setTrackName(input.trim().split('/').pop() || 'Unknown Track');
      
      if (audioRef.current) {
        audioRef.current.load();
        if (wasPlaying) {
          setTimeout(() => {
            audioRef.current?.play().catch(() => setLoadError(true));
            setIsPlaying(true);
          }, 100);
        }
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div style={{ padding: '16px', minWidth: '320px' }}>
      <audio ref={audioRef} src={currentTrack} />
      
      {/* Track Display */}
      <div className="field-row-stacked" style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 'bold', marginBottom: '4px' }}>Now Playing:</label>
        <div 
          style={{ 
            background: '#000',
            color: loadError ? '#f00' : '#0f0',
            padding: '8px',
            fontFamily: 'monospace',
            fontSize: '12px',
            border: '2px inset',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          data-testid="music-track-name"
        >
          {loadError ? '⚠ Format Not Supported - Use Eject to load MP3/WAV' : trackName}
        </div>
      </div>

      {/* Time Display */}
      <div 
        style={{ 
          background: '#9BC59D',
          padding: '8px',
          marginBottom: '12px',
          fontFamily: 'monospace',
          fontSize: '14px',
          textAlign: 'center',
          border: '2px inset',
        }}
        data-testid="music-time-display"
      >
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          style={{ width: '100%' }}
          data-testid="music-progress-bar"
        />
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
        <button 
          className="btn"
          onClick={handleBack}
          title="Back 10 seconds"
          data-testid="button-music-back"
        >
          ⏮
        </button>
        <button 
          className="btn"
          onClick={handlePlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
          style={{ fontWeight: 'bold' }}
          data-testid="button-music-play-pause"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button 
          className="btn"
          onClick={handlePlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
          data-testid="button-music-pause"
        >
          ⏸
        </button>
        <button 
          className="btn"
          onClick={handleForward}
          title="Forward 10 seconds"
          data-testid="button-music-forward"
        >
          ⏭
        </button>
        <button 
          className="btn"
          onClick={handleEject}
          title="Load new track"
          data-testid="button-music-eject"
        >
          ⏏
        </button>
      </div>

      {/* Volume Control */}
      <div className="field-row" style={{ marginTop: '16px', alignItems: 'center' }}>
        <label style={{ marginRight: '8px', fontSize: '11px' }}>Volume:</label>
        <input
          type="range"
          min="0"
          max="100"
          defaultValue="70"
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.volume = parseInt(e.target.value) / 100;
            }
          }}
          style={{ flex: 1 }}
          data-testid="music-volume-slider"
        />
      </div>

      {/* Status Bar */}
      <div className="status-bar" style={{ marginTop: '12px' }}>
        <p className="status-bar-field" data-testid="music-status">
          {isPlaying ? '▶ Playing' : '⏸ Stopped'}
        </p>
        <p className="status-bar-field">
          {currentTrack.endsWith('.mid') ? 'MIDI' : 
           currentTrack.endsWith('.wav') ? 'WAV' : 
           currentTrack.endsWith('.mp3') ? 'MP3' : 'Audio'}
        </p>
      </div>
    </div>
  );
}
