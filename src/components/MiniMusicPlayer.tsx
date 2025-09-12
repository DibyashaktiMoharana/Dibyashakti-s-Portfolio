import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, List } from 'lucide-react';
import Image from 'next/image';
import { SONGS } from '../data/songs';

// Global state for music player with time preservation
interface MusicPlayerState {
    isExpanded: boolean;
    showPlaylist: boolean;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    currentSongIndex: number;
    listeners: Set<() => void>;
    audioElement: HTMLAudioElement | null;
}

const musicPlayerState: MusicPlayerState = {
    isExpanded: false,
    showPlaylist: false,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 70,
    currentSongIndex: 0,
    listeners: new Set(),
    audioElement: null
};

// Create a global audio element
if (typeof window !== 'undefined' && !musicPlayerState.audioElement) {
    musicPlayerState.audioElement = new Audio();
    musicPlayerState.audioElement.volume = musicPlayerState.volume / 100;
    musicPlayerState.audioElement.crossOrigin = 'anonymous';

    // Set initial song
    if (SONGS.length > 0) {
        musicPlayerState.audioElement.src = SONGS[0].audioUrl;
    }

    // Global event listeners
    musicPlayerState.audioElement.addEventListener('timeupdate', () => {
        musicPlayerState.currentTime = musicPlayerState.audioElement?.currentTime || 0;
        musicPlayerState.listeners.forEach(listener => listener());
    });

    musicPlayerState.audioElement.addEventListener('loadedmetadata', () => {
        musicPlayerState.duration = musicPlayerState.audioElement?.duration || 0;
        musicPlayerState.listeners.forEach(listener => listener());
    });

    musicPlayerState.audioElement.addEventListener('ended', () => {
        musicPlayerState.isPlaying = false;
        musicPlayerState.listeners.forEach(listener => listener());
    });
}

export default function MiniMusicPlayer() {
    const [isExpanded, setIsExpanded] = useState(musicPlayerState.isExpanded);
    const [showPlaylist, setShowPlaylist] = useState(musicPlayerState.showPlaylist);
    const [isPlaying, setIsPlaying] = useState(musicPlayerState.isPlaying);
    const [currentTime, setCurrentTime] = useState(musicPlayerState.currentTime);
    const [duration, setDuration] = useState(musicPlayerState.duration);
    const [volume, setVolume] = useState(musicPlayerState.volume);
    const [currentSongIndex, setCurrentSongIndex] = useState(musicPlayerState.currentSongIndex);

    const currentSong = SONGS[currentSongIndex];

    // Define callback functions first
    const togglePlayPause = useCallback(() => {
        const newPlayState = !musicPlayerState.isPlaying;
        setIsPlaying(newPlayState);
        musicPlayerState.isPlaying = newPlayState;
    }, []);

    const nextSong = useCallback(() => {
        const wasPlaying = musicPlayerState.isPlaying;
        const newIndex = (musicPlayerState.currentSongIndex + 1) % SONGS.length;
        setCurrentSongIndex(newIndex);
        musicPlayerState.currentSongIndex = newIndex;

        if (wasPlaying) {
            setTimeout(() => {
                setIsPlaying(true);
                musicPlayerState.isPlaying = true;
            }, 100);
        }
    }, []);

    const prevSong = useCallback(() => {
        const wasPlaying = musicPlayerState.isPlaying;
        const newIndex = (musicPlayerState.currentSongIndex - 1 + SONGS.length) % SONGS.length;
        setCurrentSongIndex(newIndex);
        musicPlayerState.currentSongIndex = newIndex;

        if (wasPlaying) {
            setTimeout(() => {
                setIsPlaying(true);
                musicPlayerState.isPlaying = true;
            }, 100);
        }
    }, []);

    const increaseVolume = useCallback(() => {
        const newVolume = Math.min(100, musicPlayerState.volume + 10);
        setVolume(newVolume);
        musicPlayerState.volume = newVolume;
    }, []);

    const decreaseVolume = useCallback(() => {
        const newVolume = Math.max(0, musicPlayerState.volume - 10);
        setVolume(newVolume);
        musicPlayerState.volume = newVolume;
    }, []);

    // Subscribe to global state changes
    useEffect(() => {
        const updateState = () => {
            setIsExpanded(musicPlayerState.isExpanded);
            setShowPlaylist(musicPlayerState.showPlaylist);
            setIsPlaying(musicPlayerState.isPlaying);
            setCurrentTime(musicPlayerState.currentTime);
            setDuration(musicPlayerState.duration);
            setVolume(musicPlayerState.volume);
            setCurrentSongIndex(musicPlayerState.currentSongIndex);
        };

        musicPlayerState.listeners.add(updateState);

        return () => {
            musicPlayerState.listeners.delete(updateState);
        };
    }, []);

    // Keyboard event listeners
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Prevent default spacebar behavior when music player is active
            if (event.code === 'Space') {
                event.preventDefault();
                togglePlayPause();
            }
            // Arrow keys for navigation
            else if (event.code === 'ArrowRight') {
                event.preventDefault();
                nextSong();
            }
            else if (event.code === 'ArrowLeft') {
                event.preventDefault();
                prevSong();
            }
            // Volume controls
            else if (event.code === 'ArrowUp') {
                event.preventDefault();
                increaseVolume();
            }
            else if (event.code === 'ArrowDown') {
                event.preventDefault();
                decreaseVolume();
            }
            // Escape to close expanded player or playlist
            else if (event.code === 'Escape') {
                if (musicPlayerState.showPlaylist) {
                    setShowPlaylist(false);
                    musicPlayerState.showPlaylist = false;
                } else if (musicPlayerState.isExpanded) {
                    setIsExpanded(false);
                    musicPlayerState.isExpanded = false;
                }
            }
        };

        // Add event listener
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [togglePlayPause, nextSong, prevSong, increaseVolume, decreaseVolume]);

    // Update global state when local state changes
    useEffect(() => {
        musicPlayerState.isExpanded = isExpanded;
        musicPlayerState.showPlaylist = showPlaylist;
        musicPlayerState.isPlaying = isPlaying;
        musicPlayerState.volume = volume;
        musicPlayerState.currentSongIndex = currentSongIndex;

        // Update audio element
        if (musicPlayerState.audioElement) {
            musicPlayerState.audioElement.volume = volume / 100;

            // Handle play/pause
            if (isPlaying) {
                musicPlayerState.audioElement.play().catch(e => console.error('Play error:', e));
            } else {
                musicPlayerState.audioElement.pause();
            }
        }

        // Notify other instances (but don't create loops)
        if (musicPlayerState.isPlaying !== isPlaying ||
            musicPlayerState.volume !== volume ||
            musicPlayerState.currentSongIndex !== currentSongIndex ||
            musicPlayerState.isExpanded !== isExpanded ||
            musicPlayerState.showPlaylist !== showPlaylist) {
            musicPlayerState.listeners.forEach(listener => listener());
        }
    }, [isExpanded, showPlaylist, isPlaying, volume, currentSongIndex]);

    // Handle song changes with time preservation
    useEffect(() => {
        if (musicPlayerState.audioElement && currentSong) {
            const currentSrc = musicPlayerState.audioElement.src;
            const newSrc = currentSong.audioUrl;

            // Only change source if it's different
            if (!currentSrc.includes(newSrc.split('/').pop() || '')) {
                const wasPlaying = musicPlayerState.audioElement.paused === false;
                musicPlayerState.audioElement.src = newSrc;
                musicPlayerState.audioElement.load();

                if (wasPlaying) {
                    musicPlayerState.audioElement.play().catch(e => console.error('Play error:', e));
                }
            }
        }
    }, [currentSongIndex, currentSong]);

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = parseFloat(e.target.value);
        const safeDuration = isFinite(duration) && duration > 0 ? duration : 0;
        const newTime = Math.max(0, Math.min(raw, safeDuration));
        if (musicPlayerState.audioElement) {
            musicPlayerState.audioElement.currentTime = newTime;
        }
        // update immediately for responsive UI; timeupdate will also sync
        musicPlayerState.currentTime = newTime;
        musicPlayerState.listeners.forEach(l => l());
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const selectSong = (index: number) => {
        const wasPlaying = isPlaying;
        setCurrentSongIndex(index);
        setShowPlaylist(false);
        musicPlayerState.currentSongIndex = index;
        musicPlayerState.showPlaylist = false;

        if (wasPlaying) {
            setTimeout(() => {
                setIsPlaying(true);
                musicPlayerState.isPlaying = true;
            }, 100);
        }
    };

    const toggleExpanded = () => {
        const newExpandedState = !isExpanded;
        setIsExpanded(newExpandedState);
        musicPlayerState.isExpanded = newExpandedState;
    };

    const togglePlaylist = () => {
        const newPlaylistState = !showPlaylist;
        setShowPlaylist(newPlaylistState);
        musicPlayerState.showPlaylist = newPlaylistState;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        musicPlayerState.volume = newVolume;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-2 z-10 cursor-auto"
            data-cursor-disabled="true"
        >
            <AnimatePresence mode="wait">
                {isExpanded ? (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[#1c1c1d]/90 backdrop-blur-md rounded-2xl border-[2px] border-[#303030] p-6 w-[380px] shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Music className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-med text-gray-400">Now Playing</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={togglePlaylist}
                                    className="text-gray-400 hover:text-white transition-colors p-1"
                                >
                                    <List className="w-7 h-7" />
                                </button>
                                <button
                                    onClick={toggleExpanded}
                                    className="text-gray-400 hover:text-white transition-colors p-1"
                                >
                                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Album Art and Info */}
                        <div className="flex gap-4 mb-4">
                            <div className="relative group">
                                <Image
                                    src={currentSong.albumArt}
                                    alt={currentSong.title}
                                    width={64}
                                    height={64}
                                    className="rounded-lg object-cover"
                                />
                                <div className={`absolute inset-0 rounded-lg bg-black/40 flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                                    <div className="w-6 h-6 rounded-full bg-white/20 animate-pulse" />
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-sb text-base truncate">{currentSong.title}</h3>
                                <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <input
                                type="range"
                                min={0}
                                max={Math.max(0, Math.floor(duration))}
                                value={Math.max(0, Math.floor(currentTime))}
                                onChange={handleSeek}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                style={{
                                    background: `linear-gradient(to right, #a855f7 0%, #ec4899 ${(progress)}%, #374151 ${(progress)}%, #374151 100%)`
                                }}
                            />
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={prevSong}
                                    className="p-2 rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white"
                                >
                                    <SkipBack className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={togglePlayPause}
                                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
                                >
                                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-0.5" />}
                                </button>
                                <button
                                    onClick={nextSong}
                                    className="p-2 rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white"
                                >
                                    <SkipForward className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Volume2 className="w-5 h-5 text-gray-400" />
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${volume}%, #374151 ${volume}%, #374151 100%)`
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="collapsed"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onClick={toggleExpanded}
                        className="bg-[#1c1c1d]/90 backdrop-blur-md rounded-full border-[2px] border-[#303030] p-4 pr-6 flex items-center gap-3 hover:bg-[#232324]/90 hover:border-[#404040] transition-all cursor-pointer shadow-xl"
                        data-cursor-disabled="true"
                    >
                        <div className="relative">
                            <Image
                                src={currentSong.albumArt}
                                alt={currentSong.title}
                                width={40}
                                height={40}
                                className={`rounded-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
                            />
                            <div className={`absolute inset-0 rounded-full bg-black/40 flex items-center justify-center pointer-events-none transition-opacity ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                                <div className="w-3 h-3 rounded-full bg-white/40" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div>
                                <p className="text-white font-med text-sm">Now Playing</p>
                                <p className="text-gray-400 text-xs truncate max-w-[120px]">
                                    {currentSong.title} • {currentSong.artist}
                                </p>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlayPause();
                                }}
                                className="p-2 rounded-full hover:bg-white/10 transition-all text-white"
                            >
                                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Playlist Popup */}
            <AnimatePresence>
                {showPlaylist && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full right-0 mb-3 w-80 bg-[#1c1c1d]/95 backdrop-blur-md rounded-2xl border-[2px] border-[#303030] p-4 shadow-2xl z-20"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-white font-med text-sm">Playlist</h4>
                            <button
                                onClick={() => {
                                    setShowPlaylist(false);
                                    musicPlayerState.showPlaylist = false;
                                }}
                                className="text-gray-400 hover:text-white transition-colors p-1"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                            {SONGS.map((song, index) => (
                                <div
                                    key={song.id}
                                    onClick={() => selectSong(index)}
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${index === currentSongIndex
                                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                                        : 'hover:bg-white/10'
                                        }`}
                                >
                                    <div className="relative">
                                        <Image
                                            src={song.albumArt}
                                            alt={song.title}
                                            width={40}
                                            height={40}
                                            className="rounded-lg object-cover"
                                        />
                                        {index === currentSongIndex && isPlaying && (
                                            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                                                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-med truncate">{song.title}</p>
                                        <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                                    </div>
                                    {index === currentSongIndex && (
                                        <div className="text-purple-400">
                                            <Music className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
