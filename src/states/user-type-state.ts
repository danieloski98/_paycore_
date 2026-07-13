import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export type USER_TYPE = 'ADMIN' | 'EMPLOYEE' | 'USER'; // user type based on login

const userTypeStorage = createJSONStorage<USER_TYPE>(
  () => (typeof window !== 'undefined' ? window.localStorage : {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  })
);

export const userTypeAtom = atomWithStorage<USER_TYPE>(
  'paycore:user-type',
  'USER',
  userTypeStorage,
);
