import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import DiscoverTab from '../components/DiscoverTab';
import MatchesTab from '../components/MatchesTab';
import MessagesTab from '../components/MessagesTab';
import ProfileTab from '../components/ProfileTab';
import ChatScreen from '../components/ChatScreen';
import LoginScreen from '../components/LoginScreen';
import BoostModal from '../components/BoostModal';
import SuperLikeModal from '../components/SuperLikeModal';
import ProfileViewModal from '../components/ProfileViewModal';
import { User, Match, Conversation, Message, EditableProfile } from '../types/user';
import { currentUserProfile, conversationStarters, autoResponses } from '../data/mockProfiles';
import { LogOut, Zap, Heart } from 'lucide-react';

const Index: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [matches, setMatches] = useState<Match[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [currentUser, setCurrentUser] = useState<User>(currentUserProfile);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [showSuperLikeModal, setShowSuperLikeModal] = useState(false);
  const [superLikesCount, setSuperLikesCount] = useState(5);
  const [boostsCount, setBoostsCount] = useState(3);
  const [viewingProfile, setViewingProfile] = useState<User | null>(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('discover');
    setMatches([]);
    setConversations([]);
    setSelectedMatch(null);
  };

  const handleMatch = (user: User) => {
    const newMatch: Match = {
      id: `match-${Date.now()}`,
      user,
      matchedAt: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };
    setMatches(prev => [newMatch, ...prev]);
    
    // Create conversation with personalized welcome message
    const personalizedStarters = [
      `Hey ${currentUser.name}! I love that we both enjoy ${user.interests[0]}! 😊`,
      `Hi there! Your photos are amazing! Especially the one where you're ${user.interests[1] ? 'doing ' + user.interests[1] : 'having fun'}! ✨`,
      `Hey ${currentUser.name}! I saw you're into ${user.interests[0]} too - what got you started with that?`,
      `Hi! I noticed we're both in ${user.location} - do you know any good ${user.interests.includes('Coffee') ? 'coffee spots' : 'restaurants'} around here?`,
      `Hey there! Your bio caught my attention - I'd love to hear more about your ${user.interests[Math.floor(Math.random() * user.interests.length)]} adventures! 🌟`
    ];

    const welcomeMessage: Message = {
      id: `message-${Date.now()}`,
      senderId: user.id,
      content: personalizedStarters[Math.floor(Math.random() * personalizedStarters.length)],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    const newConversation: Conversation = {
      id: `conversation-${Date.now()}`,
      matchId: newMatch.id,
      messages: [welcomeMessage]
    };
    
    setConversations(prev => [newConversation, ...prev]);
    
    // Update match with the welcome message
    setMatches(prev => 
      prev.map(match => 
        match.id === newMatch.id 
          ? { ...match, lastMessage: welcomeMessage }
          : match
      )
    );
  };

  const handleSendMessage = (matchId: string, content: string) => {
    const newMessage: Message = {
      id: `message-${Date.now()}`,
      senderId: 'current-user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.matchId === matchId
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      )
    );

    setMatches(prev =>
      prev.map(match =>
        match.id === matchId
          ? { ...match, lastMessage: newMessage }
          : match
      )
    );

    // Generate more contextual responses
    const contextualResponses = [
      "That's so cool! I've always wanted to try that 😊",
      "No way! I love that too! We have so much in common ✨",
      "Haha you're so funny! 😄 Tell me more!",
      "That sounds amazing! I'm definitely adding that to my bucket list 🌟",
      "I totally get that! Same here honestly 💕",
      "You seem like such an interesting person! 😍",
      "I love how passionate you are about that! 🔥",
      "That's exactly the kind of thing I'd love to do together! 💫",
      "Your stories are the best! Keep them coming 😊",
      "I'm so impressed! How did you get into that? 🤔"
    ];

    // Simulate response after 1-3 seconds for more realistic feel
    setTimeout(() => {
      const responseMessage: Message = {
        id: `message-${Date.now()}`,
        senderId: selectedMatch?.user.id || '',
        content: contextualResponses[Math.floor(Math.random() * contextualResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.matchId === matchId
            ? { ...conv, messages: [...conv.messages, responseMessage] }
            : conv
        )
      );

      setMatches(prev =>
        prev.map(match =>
          match.id === matchId
            ? { ...match, lastMessage: responseMessage }
            : match
        )
      );
    }, Math.random() * 2000 + 1000);
  };

  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match);
    
    // Mark messages as read
    setConversations(prev =>
      prev.map(conv =>
        conv.matchId === match.id
          ? {
              ...conv,
              messages: conv.messages.map(msg => ({ ...msg, read: true }))
            }
          : conv
      )
    );
  };

  const handleBackFromChat = () => {
    setSelectedMatch(null);
  };

  const handleUpdateProfile = (profile: EditableProfile) => {
    setCurrentUser(prev => ({
      ...prev,
      ...profile
    }));
  };

  const getCurrentConversation = (matchId: string) => {
    return conversations.find(conv => conv.matchId === matchId);
  };

  const handleBoost = () => {
    if (boostsCount > 0) {
      setBoostsCount(prev => prev - 1);
      setShowBoostModal(false);
      // Show success toast or notification
    }
  };

  const handleSuperLike = () => {
    if (superLikesCount > 0) {
      setSuperLikesCount(prev => prev - 1);
      setShowSuperLikeModal(false);
      // Show success toast or notification
    }
  };

  const handleViewProfile = (user: User) => {
    setViewingProfile(user);
  };

  const handleCloseProfileView = () => {
    setViewingProfile(null);
  };

  const handleLikeFromProfile = () => {
    if (viewingProfile) {
      // Simulate right swipe
      const isMatch = Math.random() < 0.3;
      if (isMatch) {
        handleMatch(viewingProfile);
      }
      setViewingProfile(null);
    }
  };

  const handlePassFromProfile = () => {
    setViewingProfile(null);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (selectedMatch) {
    return (
      <ChatScreen
        match={selectedMatch}
        onBack={handleBackFromChat}
        conversation={getCurrentConversation(selectedMatch.id)}
        onSendMessage={handleSendMessage}
      />
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'discover':
        return (
          <DiscoverTab 
            onMatch={handleMatch}
            onBoost={() => setShowBoostModal(true)}
            onSuperLike={() => setShowSuperLikeModal(true)}
            superLikesCount={superLikesCount}
            boostsCount={boostsCount}
            onViewProfile={handleViewProfile}
            currentUserIndex={currentUserIndex}
            setCurrentUserIndex={setCurrentUserIndex}
          />
        );
      case 'matches':
        return <MatchesTab matches={matches} onSelectMatch={handleSelectMatch} />;
      case 'messages':
        return <MessagesTab matches={matches} onSelectMatch={handleSelectMatch} />;
      case 'profile':
        return <ProfileTab user={currentUser} onUpdateProfile={handleUpdateProfile} />;
      default:
        return (
          <DiscoverTab 
            onMatch={handleMatch} 
            onBoost={() => setShowBoostModal(true)} 
            onSuperLike={() => setShowSuperLikeModal(true)} 
            superLikesCount={superLikesCount} 
            boostsCount={boostsCount}
            onViewProfile={handleViewProfile}
            currentUserIndex={currentUserIndex}
            setCurrentUserIndex={setCurrentUserIndex}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      {/* Header with logo and logout */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 flex items-center justify-between shadow-lg">
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold text-white">HeartSync</h1>
          <p className="text-white/90 text-sm">Find your perfect match</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/90 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Premium Features Bar */}
      <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2 text-sm">
          <Heart size={16} className="text-blue-600" />
          <span className="text-gray-700">Super Likes: {superLikesCount}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Zap size={16} className="text-yellow-600" />
          <span className="text-gray-700">Boosts: {boostsCount}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {renderActiveTab()}
      </div>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals */}
      {showBoostModal && (
        <BoostModal
          onClose={() => setShowBoostModal(false)}
          onBoost={handleBoost}
          boostsCount={boostsCount}
        />
      )}

      {showSuperLikeModal && (
        <SuperLikeModal
          onClose={() => setShowSuperLikeModal(false)}
          onSuperLike={handleSuperLike}
          superLikesCount={superLikesCount}
        />
      )}

      {viewingProfile && (
        <ProfileViewModal
          user={viewingProfile}
          isOpen={!!viewingProfile}
          onClose={handleCloseProfileView}
          onLike={handleLikeFromProfile}
          onPass={handlePassFromProfile}
        />
      )}
    </div>
  );
};

export default Index;
