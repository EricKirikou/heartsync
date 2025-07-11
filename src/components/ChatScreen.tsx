import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Heart, MoreVertical, Camera, Mic, Video, Phone } from 'lucide-react';
import { Match, Message, Conversation } from '../types/user';
import { useVoiceRecording } from '../hooks/useVoiceRecording';
import VideoCallModal from './VideoCallModal';
import VoiceCallModal from './VoiceCallModal';

interface ChatScreenProps {
  match: Match;
  onBack: () => void;
  conversation?: Conversation;
  onSendMessage: (matchId: string, content: string) => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({
  match,
  onBack,
  conversation,
  onSendMessage
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    isRecording, 
    audioBlob, 
    startRecording, 
    stopRecording, 
    clearRecording 
  } = useVoiceRecording();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(match.id, message.trim());
      setMessage('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const sendVoiceMessage = () => {
    if (audioBlob) {
      onSendMessage(match.id, '🎵 Voice message');
      clearRecording();
    }
  };

  const quickReplies = [
    "That sounds amazing! 😊",
    "Haha yes! 😄",
    "I'd love to!",
    "Tell me more!",
    "When are you free?",
    "Same here! 💕"
  ];

  const suggestedMessages = [
    `Hey ${match.user.name}! How's your day going? 😊`,
    "I love your photos! That hiking one is incredible ✨",
    `I saw you're into ${match.user.interests[0]}! What got you started?`,
    "Want to grab coffee this weekend? ☕",
    "Your bio made me smile! 😄"
  ];

  return (
    <>
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 flex items-center space-x-3 shadow-lg">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <img
            src={match.user.photos[0]}
            alt={match.user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-white">{match.user.name}</h2>
            <p className="text-sm text-white/80">
              {isTyping ? 'Typing...' : match.user.lastActive}
            </p>
          </div>
          
          {/* Call buttons */}
          <button 
            onClick={() => setShowVoiceCall(true)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <Phone size={20} className="text-white" />
          </button>
          <button 
            onClick={() => setShowVideoCall(true)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <Video size={20} className="text-white" />
          </button>
          
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <MoreVertical size={20} className="text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {/* Match notification */}
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-3 animate-pulse">
              <Heart className="text-white fill-current" size={24} />
            </div>
            <p className="text-gray-600 text-sm mb-2">
              🎉 You matched with {match.user.name}!
            </p>
            <p className="text-gray-500 text-xs">
              {match.matchedAt} • Start the conversation!
            </p>
          </div>

          {/* Messages */}
          {conversation?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === 'current-user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                  msg.senderId === 'current-user'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-100'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    msg.senderId === 'current-user'
                      ? 'text-white/70'
                      : 'text-gray-500'
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Voice message preview */}
          {audioBlob && (
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 rounded-2xl shadow-sm text-white max-w-xs">
                <div className="flex items-center space-x-2 mb-2">
                  <Mic size={16} />
                  <span className="text-sm">Voice message recorded</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={sendVoiceMessage}
                    className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs transition-colors"
                  >
                    Send
                  </button>
                  <button 
                    onClick={clearRecording}
                    className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick replies */}
          {conversation && conversation.messages.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center py-2">
              {quickReplies.slice(0, 3).map((reply, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(reply)}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Suggested messages */}
          {(!conversation || conversation.messages.length === 0) && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 text-center font-medium">Break the ice with:</p>
              {suggestedMessages.map((suggested, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggested)}
                  className="block w-full p-4 bg-white hover:bg-gray-50 rounded-xl text-left text-sm transition-colors duration-200 shadow-sm border border-gray-100"
                >
                  {suggested}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Camera size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${match.user.name}...`}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50"
            />
            <button 
              onClick={handleVoiceRecording}
              className={`p-2 transition-colors rounded-full ${
                isRecording 
                  ? 'text-red-500 bg-red-50 animate-pulse' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Mic size={20} />
            </button>
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <VideoCallModal 
        isOpen={showVideoCall} 
        match={match} 
        onClose={() => setShowVideoCall(false)} 
      />
      <VoiceCallModal 
        isOpen={showVoiceCall} 
        match={match} 
        onClose={() => setShowVoiceCall(false)} 
      />
    </>
  );
};

export default ChatScreen;
