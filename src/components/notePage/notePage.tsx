'use client';
import { PaddingContainer, Button, Navbar } from '../common';
import { auth } from '@/service/firebase';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { resetUserInformation } from '@/lib/redux-toolkit/user-information/userInformation';
import { deleteCookie } from '@/app/action';

export default function NotePage() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await signOut(auth);
      console.log(result);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const clearInformation = async () => {
    try {
      const clearCookie = await deleteCookie();
      const logout = await handleLogout();
      dispatch(resetUserInformation());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <PaddingContainer>
        <h1>Haloo</h1>
        <Button onClick={clearInformation}>Logout</Button>
      </PaddingContainer>
    </>
  );
}
