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
import { useDispatch } from 'react-redux';
import { addNote } from '@/lib/redux-toolkit/note/noteSlice';
import { useMutation } from '@tanstack/react-query';

export function AddNewNoteModal() {
  const [openModal, setOpenModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async () => {
      // if (newTodo.title === '') {
      //   setError(true);
      //   return;
      // }

      try {
        const postData = {
          title: `${noteTitle}`,
          note: `${noteDescription}`,
        };
        const { data: response } = await axios.post('/api/note', postData);
        dispatch(addNote(response.data));
        setOpenModal(false);
        return response;
      } catch (error) {
        return error;
      }
    },
  });

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger>
        <div className="bg-neutral-700 text-white z-20 fixed right-[100px] bottom-[30px] flex justify-center items-center h-[50px] w-[50px] p-0 rounded-full transition-[0.3s] active:scale-[0.96]">
          <Plus size={30} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-[10px]">Add New Note</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={() => {
                mutation.mutate();
              }}
              className="flex flex-col gap-5"
            >
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
