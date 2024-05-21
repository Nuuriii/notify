import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/service/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const Cookies = cookies();
  try {
    const body = await req.json();
    const { uid, email, displayName, photoURL } = body;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    Cookies.set('notify-uid', uid, {
      expires: expirationDate,
    });

    Cookies.set('notify-email', email, {
      expires: expirationDate,
    });

    const SaveUserToDatabase = await setDoc(
      doc(database, 'users', uid),
      {
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
      },
      { merge: true },
    );

    return NextResponse.json(
      { status: 'success', message: 'Success Login' },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error saving user to Firestore:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed Login' },
      { status: 500 },
    );
  }
}
