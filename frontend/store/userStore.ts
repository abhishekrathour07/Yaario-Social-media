import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// Define the user type
export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

// Define the Zustand state and methods
interface UserState {
  userId: string | null;
  name: string | null;
  email: string | null;
  profileUrl: string | null;
  fetchUserDetails: () => Promise<User | null>;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      name: null,
      email: null,
      profileUrl: null,

      // Fetch user details from the API
      fetchUserDetails: async () => {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const response = await axios.get(`${API_URL}/user-detail`, {
            withCredentials: true
          });

          if (response?.data?.data) {
            const userData: User = response.data.data;

            set({
              userId: userData._id,
              name: userData.name,
              email: userData.email,
              profileUrl: userData.avatar
            });

            return userData;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Failed to fetch user details:', error);
          set({
            userId: null,
            name: null,
            email: null,
            profileUrl: null
          });
          return null;
        }
      },

      // Set user manually
      setUser: (user) =>
        set({
          userId: user._id,
          name: user.name,
          email: user.email,
          profileUrl: user.avatar
        }),

      // Clear user data
      clearUser: () =>
        set({
          userId: null,
          name: null,
          email: null,
          profileUrl: null
        })
    }),
    {
      name: 'user-storage' // Local storage key
    }
  )
);

