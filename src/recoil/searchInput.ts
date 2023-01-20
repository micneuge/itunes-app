import { atom } from 'recoil';

export const inputState = atom<string>({
  key: 'SearchInput',
  default: '',
});
