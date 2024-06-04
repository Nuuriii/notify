import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { database } from '@/service/firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import { Description } from '@radix-ui/react-dialog';
import moment from 'moment';

export async function GET() {
  try {
    const notesCollection = collection(database, 'notes');
    const notesQuery = query(notesCollection);
    const notesSnapshot = await getDocs(notesQuery);

    const notesData: {
      id: string;
      user_id: string;
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
    }[] = [];
    notesSnapshot.forEach((doc) => {
      const timestamp = doc.data().createdAt;
      const formattedCreatedAt = moment(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
      ).format('L');
      notesData.push({
        id: doc.id,
        user_id: doc.data().user_id,
        title: doc.data().title,
        content: doc.data().content,
        createdAt: formattedCreatedAt,
        updatedAt: doc.data().updatedAt,
      });
    });

    return NextResponse.json({
      message: 'success get list note',
      data: notesData,
    });
  } catch (error) {}
}

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
      updatedAt: null,
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
