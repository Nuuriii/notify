'use client';
import { useEffect, useState } from 'react';
import { auth, provider, githubAuthProvider, app } from '@/service/firebase';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { signInWithPopup, signOut, User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import GoogleIcon from '@/assets/google.svg';
import GithubIcon from '@/assets/github.svg';
import Image from 'next/image';

const db = getFirestore(app);

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userNote = await getNote(user.uid);
        setNote(userNote);
      } else {
        setUser(null);
        setNote(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      await saveUserToFirestore(result.user);
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubAuthProvider);
      console.log(result);
      await saveUserToFirestore(result.user);
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      const result = await signOut(auth);
      console.log(result);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const getNote = async (userId: any) => {
    const docSnap = await getDoc(doc(db, 'notes', userId));
    if (docSnap.exists()) {
      return docSnap.data().note;
    } else {
      console.log('No such document!');
      return null;
    }
  };

  const saveNote = async (userId: any, note: any) => {
    try {
      const docRef = doc(db, 'notes', userId);
      await setDoc(docRef, { note });
      console.log('Note saved!');
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  const handleSaveNote = async () => {
    if (user) {
      console.log(user, note);
      await saveNote(user.uid, note);
      alert('Note saved!');
    }
  };

  const saveUserToFirestore = async (user: any) => {
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        { merge: true },
      ); // Gunakan merge: true untuk menggabungkan data jika dokumen sudah ada
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
    }
  };

  return (
    <div className="py-[20px] min-h-screen flex justify-center items-center">
      <div className="">
        {!user && (
          <Card className="max-w-[330px]">
            <CardHeader>
              <CardTitle className="text-center mb-2">
                Welcome to Notify
              </CardTitle>
              <CardDescription className="mb-11 text-center text-[16px]">
                Login with your preferred account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-[10px]">
              <Button
                onClick={handleLogin}
                className="bg-neutral-800 w-full py-[25px] px-[40px] flex gap-2"
              >
                <Image className="h-[25px] w-auto" src={GoogleIcon} alt="" />
                <span className="text-[16px]">Login with Google</span>
              </Button>
              <div className="relative my-[5px] h-[30px] flex items-center">
                <div className="w-full h-[1px] bg-neutral-200"></div>
                <p className="absolute top-1 z-10 w-[50px] text-center bg-white left-[40%]">
                  O
                </p>
              </div>
              <Button
                onClick={handleGithubLogin}
                className="bg-neutral-800 w-full py-[25px] px-[40px] flex gap-2"
              >
                {/* <Image className="h-[30px] w-auto" src={GithubIcon} alt="" /> */}
                <Image className="h-[25px] w-auto" src={GithubIcon} alt="" />
                <span className=" text-[16px]">Login with Github</span>
              </Button>
            </CardContent>
          </Card>
        )}
        {/* {user && (
          <>
            <p>{note}</p>
            <textarea
              value={note || ""}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button onClick={handleSaveNote}>Save Note</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )} */}

        {/* {user ? (
          <div>
            <p>Welcome, {user.displayName}!</p>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          
        )} */}
      </div>
    </div>
  );
};

export default Login;
