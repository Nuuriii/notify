'use client';
import {
  auth,
  provider,
  githubAuthProvider,
  database,
} from '@/service/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithPopup, signOut, User } from 'firebase/auth';
import GoogleIcon from '@/assets/google.svg';
import GithubIcon from '@/assets/github.svg';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import {
  updateDisplayName,
  updatePhotoUrl,
} from '@/lib/redux-toolkit/user-information/userInformation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from '@/components/common/index';

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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

  const getNote = async (userId: any) => {
    const docSnap = await getDoc(doc(database, 'notes', userId));
    if (docSnap.exists()) {
      return docSnap.data().note;
    } else {
      console.log('No such document!');
      return null;
    }
  };

  const saveUserToFirestore = async (user: any) => {
    try {
      const postData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      const { data: SendDataToRouteHandler } = await axios.post(
        '/api/auth/login',
        postData,
      );

      console.log(SendDataToRouteHandler);

      dispatch(updateDisplayName(user.displayName));
      dispatch(updatePhotoUrl(user.photoURL));
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
    }
  };

  return (
    <div className="py-[20px] min-h-screen flex justify-center items-center">
      <div className="">
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
                Or
              </p>
            </div>
            <Button
              onClick={handleGithubLogin}
              className="bg-neutral-800 w-full py-[25px] px-[40px] flex gap-2"
            >
              <Image className="h-[25px] w-auto" src={GithubIcon} alt="" />
              <span className=" text-[16px]">Login with Github</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

// const handleLogout = async () => {
//   try {
//     const result = await signOut(auth);
//     console.log(result);
//   } catch (error) {
//     console.error('Error signing out: ', error);
//   }
// };

/* {user && (
          <>
            <p>{note}</p>
            <textarea
              value={note || ""}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button onClick={handleSaveNote}>Save Note</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )} */

/* {user ? (
          <div>
            <p>Welcome, {user.displayName}!</p>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          
        )} */
