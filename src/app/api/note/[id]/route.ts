import { NextResponse, NextRequest } from 'next/server';
import { database } from '@/service/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const noteId = params.id;
    const body = await req.json();
    const { title, content } = body;

    const noteRef = doc(database, 'notes', noteId);
    const updatedTodo = await updateDoc(noteRef, {
      title,
      content,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      status: 'success',
      message: 'success updated note',
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
