import { User } from '../types/user';

export const extendedMockUsers: User[] = [
  {
    id: '1',
    name: 'Emma',
    age: 26,
    bio: 'Adventure seeker 🌍 Coffee enthusiast ☕ Dog mom 🐕',
    photos: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'New York, NY',
    interests: ['Travel', 'Coffee', 'Hiking', 'Photography'],
    verified: true,
    distance: 2,
    lastActive: '2 hours ago',
    job: 'Marketing Manager',
    education: 'NYU',
    height: '5\'6"',
    pronouns: 'She/Her'
  },
  {
    id: '2',
    name: 'Sophia',
    age: 24,
    bio: 'Yoga instructor 🧘‍♀️ Plant parent 🌱 Beach lover 🏖️',
    photos: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Manhattan, NY',
    interests: ['Yoga', 'Meditation', 'Nature', 'Wellness'],
    verified: true,
    distance: 3,
    lastActive: 'Online now',
    job: 'Yoga Instructor',
    education: 'FIT',
    height: '5\'4"',
    pronouns: 'She/Her'
  },
  {
    id: '3',
    name: 'Olivia',
    age: 28,
    bio: 'Bookworm 📚 Tea lover 🍵 Museum enthusiast 🖼️',
    photos: [
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Brooklyn, NY',
    interests: ['Reading', 'Art', 'History', 'Tea'],
    verified: false,
    distance: 4,
    lastActive: '1 hour ago',
    job: 'Librarian',
    education: 'Columbia',
    height: '5\'7"',
    pronouns: 'She/Her'
  },
  {
    id: '4',
    name: 'Ava',
    age: 25,
    bio: 'Fitness trainer 💪 Smoothie bowl addict 🍓 Dog lover 🐶',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Williamsburg, NY',
    interests: ['Fitness', 'Nutrition', 'Dogs', 'Outdoors'],
    verified: true,
    distance: 5,
    lastActive: '30 minutes ago',
    job: 'Personal Trainer',
    education: 'NASM Certified',
    height: '5\'8"',
    pronouns: 'She/Her'
  },
  {
    id: '5',
    name: 'Isabella',
    age: 27,
    bio: 'Artist 🎨 Coffee shop lover ☕ Night owl 🌙',
    photos: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe4?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Queens, NY',
    interests: ['Art', 'Coffee', 'Photography', 'Music'],
    verified: false,
    distance: 7,
    lastActive: '3 hours ago',
    job: 'Graphic Designer',
    education: 'RISD',
    height: '5\'5"',
    pronouns: 'She/Her'
  },
  {
    id: '6',
    name: 'Mia',
    age: 23,
    bio: 'Medical student 👩‍⚕️ Runner 🏃‍♀️ Foodie 🍣',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Upper East Side, NY',
    interests: ['Medicine', 'Running', 'Food', 'Travel'],
    verified: true,
    distance: 2,
    lastActive: 'Online now',
    job: 'Medical Student',
    education: 'NYU School of Medicine',
    height: '5\'4"',
    pronouns: 'She/Her'
  },
  {
    id: '7',
    name: 'Charlotte',
    age: 29,
    bio: 'Lawyer ⚖️ Wine connoisseur 🍷 Jazz lover 🎷',
    photos: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Financial District, NY',
    interests: ['Law', 'Wine', 'Jazz', 'Politics'],
    verified: true,
    distance: 1,
    lastActive: '1 hour ago',
    job: 'Corporate Lawyer',
    education: 'Harvard Law',
    height: '5\'9"',
    pronouns: 'She/Her'
  },
  {
    id: '8',
    name: 'Amelia',
    age: 26,
    bio: 'Flight attendant ✈️ World traveler 🌎 Language learner 🗣️',
    photos: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Astoria, NY',
    interests: ['Travel', 'Languages', 'Photography', 'Aviation'],
    verified: false,
    distance: 8,
    lastActive: '2 days ago',
    job: 'Flight Attendant',
    education: 'University of Miami',
    height: '5\'7"',
    pronouns: 'She/Her'
  },
  {
    id: '9',
    name: 'Harper',
    age: 24,
    bio: 'Tech nerd 💻 Coffee addict ☕ Dog mom 🐕',
    photos: [
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'DUMBO, NY',
    interests: ['Technology', 'Startups', 'Coffee', 'Dogs'],
    verified: true,
    distance: 3,
    lastActive: 'Online now',
    job: 'Software Engineer',
    education: 'Stanford',
    height: '5\'6"',
    pronouns: 'She/Her'
  },
  {
    id: '10',
    name: 'Evelyn',
    age: 30,
    bio: 'Chef 👩‍🍳 Food blogger 📷 Wine lover 🍷',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'West Village, NY',
    interests: ['Cooking', 'Food', 'Wine', 'Photography'],
    verified: true,
    distance: 2,
    lastActive: '4 hours ago',
    job: 'Executive Chef',
    education: 'Culinary Institute of America',
    height: '5\'5"',
    pronouns: 'She/Her'
  },
  {
    id: '11',
    name: 'Abigail',
    age: 25,
    bio: 'Marine biologist 🐠 Scuba diver 🤿 Environmentalist 🌱',
    photos: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe4?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Rockaway Beach, NY',
    interests: ['Marine Life', 'Conservation', 'Diving', 'Outdoors'],
    verified: false,
    distance: 12,
    lastActive: '1 day ago',
    job: 'Marine Biologist',
    education: 'University of Hawaii',
    height: '5\'7"',
    pronouns: 'She/Her'
  },
  {
    id: '12',
    name: 'Emily',
    age: 27,
    bio: 'Fashion designer 👗 Art lover 🎨 Coffee addict ☕',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'SoHo, NY',
    interests: ['Fashion', 'Art', 'Coffee', 'Travel'],
    verified: true,
    distance: 1,
    lastActive: 'Online now',
    job: 'Fashion Designer',
    education: 'FIT',
    height: '5\'8"',
    pronouns: 'She/Her'
  },
  {
    id: '13',
    name: 'Elizabeth',
    age: 31,
    bio: 'Professor 📚 Tea enthusiast 🍵 Book collector 📖',
    photos: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Morningside Heights, NY',
    interests: ['Literature', 'Tea', 'History', 'Museums'],
    verified: false,
    distance: 3,
    lastActive: '5 hours ago',
    job: 'English Professor',
    education: 'Yale',
    height: '5\'6"',
    pronouns: 'She/Her'
  },
  {
    id: '14',
    name: 'Sofia',
    age: 24,
    bio: 'Dancer 💃 Yoga lover 🧘‍♀️ Smoothie bowl addict 🍓',
    photos: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Bushwick, NY',
    interests: ['Dance', 'Yoga', 'Health', 'Wellness'],
    verified: true,
    distance: 6,
    lastActive: '2 hours ago',
    job: 'Professional Dancer',
    education: 'Juilliard',
    height: '5\'5"',
    pronouns: 'She/Her'
  },
  {
    id: '15',
    name: 'Avery',
    age: 28,
    bio: 'Architect 🏛️ Art collector 🖼️ Coffee lover ☕',
    photos: [
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Tribeca, NY',
    interests: ['Architecture', 'Art', 'Design', 'Coffee'],
    verified: true,
    distance: 2,
    lastActive: 'Online now',
    job: 'Architect',
    education: 'Columbia GSAPP',
    height: '5\'9"',
    pronouns: 'She/Her'
  },
  {
    id: '16',
    name: 'Scarlett',
    age: 26,
    bio: 'Actress 🎭 Theater lover 🎭 Dog mom 🐕',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Hell\'s Kitchen, NY',
    interests: ['Acting', 'Theater', 'Dogs', 'Reading'],
    verified: false,
    distance: 4,
    lastActive: '1 hour ago',
    job: 'Actress',
    education: 'NYU Tisch',
    height: '5\'7"',
    pronouns: 'She/Her'
  },
  {
    id: '17',
    name: 'Victoria',
    age: 29,
    bio: 'Investment banker 💰 Wine enthusiast 🍷 Travel lover 🌍',
    photos: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe4?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Upper West Side, NY',
    interests: ['Finance', 'Wine', 'Travel', 'Fitness'],
    verified: true,
    distance: 3,
    lastActive: 'Online now',
    job: 'Investment Banker',
    education: 'Wharton',
    height: '5\'8"',
    pronouns: 'She/Her'
  },
  {
    id: '18',
    name: 'Madison',
    age: 25,
    bio: 'Photographer 📷 Coffee addict ☕ Adventure seeker 🌄',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Greenpoint, NY',
    interests: ['Photography', 'Coffee', 'Travel', 'Outdoors'],
    verified: false,
    distance: 5,
    lastActive: '2 hours ago',
    job: 'Photographer',
    education: 'School of Visual Arts',
    height: '5\'6"',
    pronouns: 'She/Her'
  },
  {
    id: '19',
    name: 'Luna',
    age: 24,
    bio: 'Musician 🎵 Cat mom 🐱 Tea lover 🍵',
    photos: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'East Village, NY',
    interests: ['Music', 'Cats', 'Tea', 'Reading'],
    verified: true,
    distance: 2,
    lastActive: 'Online now',
    job: 'Musician',
    education: 'Berklee',
    height: '5\'4"',
    pronouns: 'She/Her'
  },
  {
    id: '20',
    name: 'Grace',
    age: 27,
    bio: 'Writer ✍️ Book lover 📖 Coffee enthusiast ☕',
    photos: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=400&h=600&auto=format&fit=crop'
    ],
    location: 'Park Slope, NY',
    interests: ['Writing', 'Books', 'Coffee', 'Journalism'],
    verified: true,
    distance: 4,
    lastActive: '3 hours ago',
    job: 'Journalist',
    education: 'Northwestern',
    height: '5\'7"',
    pronouns: 'She/Her'
  }
];

export const currentUserProfile: User = {
  id: 'current-user',
  name: 'David',
  age: 28,
  bio: 'Software developer who loves hiking and photography',
  photos: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=400&h=600&auto=format&fit=crop'
  ],
  location: 'Brooklyn, NY',
  interests: ['Technology', 'Hiking', 'Photography', 'Coffee'],
  verified: true,
  job: 'Senior Software Engineer',
  education: 'MIT',
  height: '6\'0"',
  pronouns: 'He/Him'
};