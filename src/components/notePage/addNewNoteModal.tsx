import {
  Dialog,
  DialogContent,
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
  const [emptyWarning, setEmptyWarning] = useState({
    emptyTitle: false,
    emptyContent: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async () => {
      if (
        noteTitle === '' ||
        noteTitle === ' ' ||
        noteDescription === '' ||
        noteDescription === ' '
      ) {
        setEmptyWarning({
          emptyTitle: noteTitle === '' || noteTitle === ' ',
          emptyContent: noteDescription === '' || noteDescription === ' ',
        });
        return;
      }

      try {
        const postData = {
          title: `${noteTitle}`,
          note: `${noteDescription}`,
        };
        const { data: response } = await axios.post('/api/note', postData);
        dispatch(addNote(response.data));
        setOpenModal(false);
        setNoteTitle('');
        setNoteDescription('');
        setEmptyWarning({ emptyTitle: false, emptyContent: false });
        return response;
      } catch (error) {
        return error;
      }
    },
  });

  const handleCloseModal = (isOpen: boolean) => {
    setOpenModal(isOpen);
    if (!isOpen) {
      setEmptyWarning({ emptyTitle: false, emptyContent: false });
      setNoteTitle('');
      setNoteDescription('');
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogTrigger className="bg-neutral-700 text-white z-20 fixed right-[100px] bottom-[30px] flex justify-center items-center h-[50px] w-[50px] p-0 rounded-full transition-[0.3s] active:scale-[0.96]">
        <Plus size={30} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-[10px]">Add New Note</DialogTitle>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate();
              }}
              className="flex flex-col gap-5"
            >
              <Input
                error={emptyWarning.emptyTitle}
                errorMessage="Note Title cannot empty"
                type="text"
                placeholder="note"
                value={noteTitle === ' ' ? '' : noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />

              <Textarea
                value={noteDescription === ' ' ? '' : noteDescription}
                onChange={(e) => setNoteDescription(e.target.value)}
                placeholder="Write your note here"
                error={emptyWarning.emptyContent}
                errorMessage="Content Note cannot Empty"
              />
              <div className="flex justify-end">
                <Button type="submit" className="max-w-[100px]">
                  Add Note
                </Button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
