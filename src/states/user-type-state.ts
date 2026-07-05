import { atom } from 'jotai';

type USER_TYPE = 'admin' | 'employee' | 'user'; // user type based on login
export const userTypeAtom = atom<USER_TYPE>('user');