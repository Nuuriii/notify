'use server';
import { cookies } from 'next/headers';

export const deleteCookie = async () => {
  const Cookie = cookies();
  Cookie.delete('notify-uid');
  Cookie.delete('notify-email');
  return;
};
