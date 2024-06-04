import { NextResponse, NextRequest } from 'next/server';
import { database } from '@/service/firebase';
import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import moment from 'moment';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const noteId = params.id;
    const body = await req.json();
    const { title, content } = body;

    const noteRef = doc(database, 'notes', noteId);
    const updatedAt = new Date();
    const updatedTodo = await updateDoc(noteRef, {
      title,
      content,
      updatedAt,
    });

    const updatedNoteSnapshot = await getDoc(noteRef);
    const updatedNote = updatedNoteSnapshot.data();

    if (!updatedNote) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    updatedNote.id = noteId;
    updatedNote.updatedAt = moment(updatedAt).format('MM/DD/YYYY');

    return NextResponse.json({
      status: 'success',
      message: 'success updated note',
      data: updatedNote,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
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
