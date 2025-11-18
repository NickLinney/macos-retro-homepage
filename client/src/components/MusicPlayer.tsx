import { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';

const defaultAudioPath = '/attached_assets/ff4boss_1763391077864.mid';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const midiPartRef = useRef<Tone.Part | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(defaultAudioPath);
  const [trackName, setTrackName] = useState('Final Fantasy IV - Boss Battle');
  const [isMidiFile, setIsMidiFile] = useState(true);
  const [volume, setVolume] = useState(70);
  const timerRef = useRef<number | null>(null);

  // Load MIDI file when component mounts or track changes
  useEffect(() => {
    const loadMidi = async () => {
      if (!currentTrack.endsWith('.mid')) {
        setIsMidiFile(false);
        return;
      }

      setIsMidiFile(true);
      
      // Stop and reset transport
      Tone.getTransport().stop();
      Tone.getTransport().cancel(0);
      setCurrentTime(0);
      setIsPlaying(false);
      
      try {
        const response = await fetch(currentTrack);
        const arrayBuffer = await response.arrayBuffer();
        const midi = new Midi(arrayBuffer);
        
        setDuration(midi.duration);

        // Clean up previous synths and parts
        if (midiPartRef.current) {
          midiPartRef.current.dispose();
          midiPartRef.current = null;
        }

        // Create a synth for each track and schedule with Transport
        midi.tracks.forEach((track) => {
          const synth = new Tone.PolySynth(Tone.Synth, {
            envelope: {
              attack: 0.02,
              decay: 0.1,
              sustain: 0.3,
              release: 1,
            },
          }).toDestination();

          // Create events array for Tone.Part
          const events = track.notes.map((note) => ({
            time: note.time,
            note: note.name,
            duration: note.duration,
            velocity: note.velocity,
          }));

          // Schedule using Tone.Part which respects Transport position
          new Tone.Part((time, event) => {
            synth.triggerAttackRelease(event.note, event.duration, time, event.velocity);
          }, events).start(0);
        });

        // Set transport to loop
        Tone.getTransport().loop = false;
        Tone.getTransport().loopEnd = midi.duration;

      } catch (error) {
        console.error('Error loading MIDI file:', error);
      }
    };

    loadMidi();

    return () => {
      Tone.getTransport().stop();
      Tone.getTransport().cancel(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentTrack]);

  // Initialize Tone.js volume on mount
  useEffect(() => {
    // Set initial volume for Tone.js (convert 0-100 to decibels)
    // 100 = 0dB (max), 0 = -60dB (essentially silent)
    const db = volume === 0 ? -Infinity : (volume - 100) * 0.6;
    Tone.Destination.volume.value = db;
  }, []);

  // Sync audio element volume whenever volume changes or audio becomes available
  useEffect(() => {
    if (audioRef.current && !isMidiFile) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, isMidiFile, currentTrack]);

  // Setup audio element listeners for non-MIDI files
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || isMidiFile) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isMidiFile]);

  const handlePlayPause = async () => {
    if (isMidiFile) {
      // MIDI playback with Tone.js
      if (isPlaying) {
        Tone.getTransport().pause();
        setIsPlaying(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      } else {
        await Tone.start();
        Tone.getTransport().start();
        setIsPlaying(true);
        
        // Update currentTime for MIDI
        timerRef.current = window.setInterval(() => {
          setCurrentTime(Tone.getTransport().seconds);
        }, 100);
      }
    } else {
      // Regular audio playback
      const audio = audioRef.current;
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  const handleBack = () => {
    if (isMidiFile) {
      // Read current position from Transport, not stale state
      const currentPos = Tone.getTransport().seconds;
      const newTime = Math.max(0, currentPos - 10);
      Tone.getTransport().seconds = newTime;
      setCurrentTime(newTime);
    } else {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
  };

  const handleForward = () => {
    if (isMidiFile) {
      // Read current position from Transport, not stale state
      const currentPos = Tone.getTransport().seconds;
      const newTime = Math.min(duration, currentPos + 10);
      Tone.getTransport().seconds = newTime;
      setCurrentTime(newTime);
    } else {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    }
  };

  const handleEject = () => {
    // Trigger the file input dialog
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file extension
    const fileName = file.name.toLowerCase();
    const validExtensions = ['.mid', '.midi', '.wav', '.mp3'];
    const isValidFile = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValidFile) {
      alert('Invalid file type. Please select a .mid, .midi, .wav, or .mp3 file.');
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Stop current playback
    if (isPlaying) {
      if (isMidiFile) {
        Tone.getTransport().stop();
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      } else {
        audioRef.current?.pause();
      }
      setIsPlaying(false);
    }

    // Create a blob URL for the file
    const fileURL = URL.createObjectURL(file);
    
    setCurrentTime(0);
    setCurrentTrack(fileURL);
    setTrackName(file.name);

    // Reset the file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    
    if (isMidiFile) {
      Tone.getTransport().seconds = newTime;
      setCurrentTime(newTime);
    } else {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = newTime;
    }
  };

  return (
    <div style={{ padding: '16px', minWidth: '320px' }}>
      {!isMidiFile && <audio ref={audioRef} src={currentTrack} />}
      
      {/* Hidden file input for local file selection */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".mid,.midi,.wav,.mp3,audio/midi,audio/wav,audio/mpeg"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        data-testid="music-file-input"
      />
      
      {/* Track Display */}
      <div className="field-row-stacked" style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 'bold', marginBottom: '4px' }}>Now Playing:</label>
        <div 
          style={{ 
            background: '#000',
            color: '#0f0',
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
          {trackName}
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
          value={volume}
          onChange={(e) => {
            const newVolume = parseInt(e.target.value);
            setVolume(newVolume);
            
            // Set volume for HTML5 audio (0-1 range)
            if (audioRef.current) {
              audioRef.current.volume = newVolume / 100;
            }
            
            // Set volume for Tone.js (decibel range)
            // 100 = 0dB (max), 0 = -60dB (essentially silent)
            const db = newVolume === 0 ? -Infinity : (newVolume - 100) * 0.6;
            Tone.Destination.volume.value = db;
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
