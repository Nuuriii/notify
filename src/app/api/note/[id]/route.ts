import { NextResponse } from 'next/server';
import { database } from '@/service/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const noteRef = doc(database, 'notes', id);
    const deleteNote = await deleteDoc(noteRef);

    return NextResponse.json(
      { status: 'success', message: 'success delete note' },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
