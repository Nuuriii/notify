import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/service/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const Cookies = cookies();
  const searchParams = req.nextUrl.searchParams;
  const displayName = searchParams.get('display-name');
  const photoUrl = searchParams.get('photo-url');
  const notifyUid = Cookies.get('notify-uid')?.value;
  const notifyEmail = Cookies.get('notify-email')?.value;

  try {
    const getUserInformation = await getDoc(
      doc(database, 'users', notifyUid || ''),
    );

    if (
      getUserInformation.data()?.displayName === displayName &&
      getUserInformation.data()?.email === notifyEmail &&
      getUserInformation.data()?.photoURL === photoUrl &&
      getUserInformation.data()?.uid === notifyUid
    ) {
      return NextResponse.json(
        {
          status: 'success',
          message: 'User is Verified',
        },
        { status: 200 },
      );
    }
    console.log('llll');
    return NextResponse.json(
      {
        status: 'unauthorized',
        message: 'User is not Verified',
      },
      { status: 401 },
    );
  } catch (error: any) {
    console.error('Error get user to Firestore:', error);
    return NextResponse.json(
      { status: 'error', message: 'internal server error' },
      { status: 500 },
    );
  }
}
