import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { database } from '@/service/firebase';
import { collection, addDoc, getDocs, query, getDoc } from 'firebase/firestore';
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
      createdAt: null | string;
      updatedAt: null | string;
    }[] = [];
    notesSnapshot.forEach((doc) => {
      const timestampCreate = doc.data().createdAt;
      const timestampUpdate = doc.data().updatedAt;
      const formattedCreatedAt = moment(
        timestampCreate.seconds * 1000 + timestampCreate.nanoseconds / 1000000,
      ).format('L');
      const formattedUpdatedAt =
        timestampUpdate !== null
          ? moment(
              timestampCreate.seconds * 1000 +
                timestampCreate.nanoseconds / 1000000,
            ).format('L')
          : null;
      notesData.push({
        id: doc.id,
        user_id: doc.data().user_id,
        title: doc.data().title,
        content: doc.data().content,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
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

    const newNoteDoc = await getDoc(addNewNote);
    const newNoteData = newNoteDoc.data();

    const timestampCreate = newNoteData?.createdAt;

    const formattedCreatedAt = moment(
      timestampCreate.seconds * 1000 + timestampCreate.nanoseconds / 1000000,
    ).format('L');

    const formattedResponse = {
      id: newNoteDoc.id,
      user_id: newNoteData?.user_id,
      title: newNoteData?.title,
      content: newNoteData?.content,
      createdAt: formattedCreatedAt,
      updatedAt: null,
    };

    return NextResponse.json({
      status: 'success',
      message: 'success create new note',
      data: formattedResponse,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 'error',
      message: 'failed create note',
    });
  }
}
