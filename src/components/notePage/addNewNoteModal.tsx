import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTrigger,
  Button,
  Input,
  Textarea,
} from '../common';
import { Plus, X } from 'lucide-react';
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
    <Dialog
      open={openModal || mutation.isPending}
      onOpenChange={handleCloseModal}
    >
      <DialogTrigger className="bg-neutral-700 text-white z-20 fixed right-[18px] md:right-[100px] bottom-[30px] flex justify-center items-center h-[40px] w-[40px] md:h-[45px] md:w-[45px] p-0 rounded-full transition-[0.3s] active:scale-[0.96]">
        <Plus className="h-[20px] md:h-[30px] md:w-[30px]" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="mb-[10px] flex justify-between ">
            <h1 className="font-semibold text-md">Add New Note</h1>
            <DialogClose>
              <X size={18} />
            </DialogClose>
          </div>
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
                <Button
                  disabled={mutation.isPending}
                  type="submit"
                  className="max-w-[100px]"
                >
                  {mutation.isPending ? 'Adding. . .' : 'Add'}
                </Button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
