
import React, { useState, useEffect } from 'react';
import { Phone, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Match } from '../types/user';

interface VoiceCallModalProps {
  isOpen: boolean;
  match: Match;
  onClose: () => void;
}

const VoiceCallModal: React.FC<VoiceCallModalProps> = ({ isOpen, match, onClose }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const endCall = () => {
    setCallDuration(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 to-pink-900 z-50 flex flex-col items-center justify-center text-white">
      {/* Profile Section */}
      <div className="text-center mb-12">
        <div className="relative mb-6">
          <img
            src={match.user.photos[0]}
            alt={match.user.name}
            className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white/20"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <h2 className="text-2xl font-bold mb-2">{match.user.name}</h2>
        <p className="text-lg text-white/80">{formatTime(callDuration)}</p>
        <p className="text-sm text-white/60 mt-2">Voice call in progress...</p>
      </div>

      {/* Audio Visualizer Effect */}
      <div className="flex items-center justify-center space-x-2 mb-12">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-white/60 rounded-full animate-pulse"
            style={{
              height: `${Math.random() * 40 + 20}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-8">
        <button
          onClick={() => setIsSpeakerOn(!isSpeakerOn)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
            isSpeakerOn 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-white/20 hover:bg-white/30'
          }`}
        >
          {isSpeakerOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>

        <button
          onClick={endCall}
          className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
        >
          <Phone size={28} />
        </button>

        <button
          onClick={() => setIsAudioEnabled(!isAudioEnabled)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
            isAudioEnabled 
              ? 'bg-white/20 hover:bg-white/30' 
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
        </button>
      </div>
    </div>
  );
};

export default VoiceCallModal;
