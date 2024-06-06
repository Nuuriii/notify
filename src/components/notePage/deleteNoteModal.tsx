import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  DialogClose,
} from '../common';
import { Trash2 } from 'lucide-react';
import { RootState } from '@/lib/redux-toolkit/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteNote } from '@/lib/redux-toolkit/note/noteSlice';

interface DeleteNoteModalProps {
  onClose: () => void;
}

export function DeleteNoteModal({ onClose }: DeleteNoteModalProps) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const selectedNoteGlobalState = useSelector(
    (state: RootState) => state.selectedNoteGlobalState,
  );

  const deleteNoteFunction = useMutation({
    mutationFn: async () => {
      try {
        const { data: response } = await axios.delete(
          `/api/note/${selectedNoteGlobalState.id}`,
        );
        setOpenModal(false);
        dispatch(deleteNote(selectedNoteGlobalState.id));
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Dialog
      open={openModal || deleteNoteFunction.isPending}
      onOpenChange={(isOpen) => {
        setOpenModal(isOpen);
        if (!isOpen) onClose();
      }}
    >
      <DialogTrigger>
        <div className="flex bg-red-500 text-white rounded-md justify-center items-center h-[35px] w-[35px] p-0">
          <Trash2 size={18} />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[330px] h-max flex flex-col items-start">
        <DialogHeader className="w-full">
          <DialogTitle className="text-center mb-[30px]">
            Are you sure you want to delete this note?
          </DialogTitle>

          <div className="flex justify-center gap-3">
            <Button
              disabled={deleteNoteFunction.isPending}
              className="bg-red-500 hover:bg-red-400"
              onClick={() => {
                deleteNoteFunction.mutate();
              }}
            >
              {deleteNoteFunction.isPending ? 'Deleting . . .' : 'Delete'}
            </Button>

            <DialogClose className="text-white rounded-md py-[5px] px-[15px] text-sm bg-neutral-800 hover:bg-neutral-700">
              Cancel
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
