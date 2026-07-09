import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export type USER_TYPE = 'ADMIN' | 'EMPLOYEE' | 'USER'; // user type based on login

const userTypeStorage = createJSONStorage<USER_TYPE>(() => localStorage);

export const userTypeAtom = atomWithStorage<USER_TYPE>(
  'paycore:user-type',
  'USER',
  userTypeStorage,
);
