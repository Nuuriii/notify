import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Input,
} from '../common';
import { database } from '@/service/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

export function AddNewNoteModal() {
  const [note, setNote] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim() === '') return;

    try {
      const postData = {
        title: 'halo',
        note: 'hahahah bisa cuy',
      };
      const { data: postNewData } = await axios.post('/api/note', postData);

      setNote('');
    } catch (error) {
      console.error('Error adding note: ', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="z-20 fixed right-[100px] bottom-[30px] flex justify-center items-center h-[50px] w-[50px] p-0 rounded-full transition-[0.3s] active:scale-[0.96]">
          <Plus size={30} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Note</DialogTitle>
          <DialogDescription>
            <Input type="text" placeholder="note" />
            <form onSubmit={handleSubmit}>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your note here"
              />
              <button type="submit">Add Note</button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
