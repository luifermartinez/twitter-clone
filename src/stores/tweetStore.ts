import { writable } from 'svelte/store';

export const tweets = writable([
  {
    id: 1,
    content: 'Hello, Twitter clone!',
    likes: 0,
    isFavorite: false,
    avatar: 'https://i.pravatar.cc/150?img=1',
    username: 'John Doe',
    comments: [
      { id: 101, content: 'Great first tweet!', username: 'Jane Smith' },
      { id: 102, content: 'Welcome to the Twitter clone!', username: 'Bob Johnson' }
    ],
  },
  {
    id: 2,
    content: 'This is a mobile-first design.',
    likes: 0,
    isFavorite: false,
    avatar: 'https://i.pravatar.cc/150?img=2',
    username: 'Jane Smith',
    comments: [
      { id: 201, content: 'Love the mobile-first approach!', username: 'John Doe' }
    ],
  },
]);