import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { database } from '@/service/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  const Cookie = cookies();
  const notifyUid = Cookie.get('notify-uid')?.value;
  const body = await req.json();
  const { title, note } = body;

  try {
    const addNewNote = await addDoc(collection(database, 'notes'), {
      user_id: notifyUid,
      title: title,
      content: note,
      createdAt: new Date(),
    });

    return NextResponse.json({
      status: 'success',
      message: 'success create new note',
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 'error',
      message: 'failed create note',
    });
  }
}
