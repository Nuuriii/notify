import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Input,
  Textarea,
} from '../common';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

export function AddNewNoteModal() {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (noteTitle.trim() === '' || noteDescription.trim() === '') return;

    try {
      const postData = {
        title: `${noteTitle}`,
        note: `${noteDescription}`,
      };
      const { data: postNewData } = await axios.post('/api/note', postData);

      setNoteTitle('');
      setNoteDescription('');
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
          <DialogTitle className="mb-[10px]">Add New Note</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                type="text"
                placeholder="note"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />

              <Textarea
                value={noteDescription}
                onChange={(e) => setNoteDescription(e.target.value)}
                placeholder="Write your note here"
                className="max-h-[200px]"
              />
              <div className="flex justify-end">
                <Button type="submit" className="max-w-[100px]">
                  Add Note
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
