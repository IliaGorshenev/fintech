import { atom } from 'jotai';

export const registrationEmailAtom = atom<string>('');
export const registrationUserDataAtom = atom<{
  fullName: string;
  email: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}>({
  fullName: '',
  email: '',
  acceptTerms: false,
  acceptMarketing: false,
});
