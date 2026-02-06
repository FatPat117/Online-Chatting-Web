import { User } from '@/db/dummy';
import { create } from 'zustand';

type SelectedUser = {
    selectedUser:User | null;
    setSelectedUser: (selectedUser:User|null) => void;
}

export const useSelectedUser = create<SelectedUser>((set) => ({
    selectedUser:null,
    setSelectedUser: (selectedUser:User|null) => set({selectedUser}),
}));