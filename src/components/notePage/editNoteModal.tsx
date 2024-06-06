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
import { FilePen } from 'lucide-react';
import { RootState } from '@/lib/redux-toolkit/store';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { editNote } from '@/lib/redux-toolkit/note/noteSlice';

interface EditNoteModalProps {
  onClose: () => void;
}

export function EditNoteModal({ onClose }: EditNoteModalProps) {
  const [emptyWarning, setEmptyWarning] = useState({
    emptyTitle: false,
    emptyContent: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const selectedNoteGlobalState = useSelector(
    (state: RootState) => state.selectedNoteGlobalState,
  );
  const [newValue, setNewValue] = useState({
    title: selectedNoteGlobalState.title,
    content: selectedNoteGlobalState.content,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (
        newValue.title === '' ||
        newValue.content === ' ' ||
        newValue.content === '' ||
        newValue.content === ' '
      ) {
        setEmptyWarning({
          emptyTitle: newValue.title === '' || newValue.content === ' ',
          emptyContent: newValue.content === '' || newValue.content === ' ',
        });
        return;
      }

      try {
        const updateData = {
          title: `${newValue.title}`,
          content: `${newValue.content}`,
        };
        const { data: response } = await axios.put(
          `/api/note/${selectedNoteGlobalState.id}`,
          updateData,
        );
        dispatch(editNote(response.data));
        setOpenModal(false);
        onClose();
        return response;
      } catch (error) {
        return error;
      }
    },
  });

  const handleCloseModal = (isOpen: boolean) => {
    setOpenModal(isOpen);
    if (!isOpen) {
      onClose();
      setEmptyWarning({ emptyTitle: false, emptyContent: false });
      setNewValue({
        title: selectedNoteGlobalState.title,
        content: selectedNoteGlobalState.content,
      });
    }
  };

  return (
    <Dialog
      open={openModal || mutation.isPending}
      onOpenChange={handleCloseModal}
    >
      <DialogTrigger>
        <div className="flex bg-neutral-700 text-white rounded-md justify-center items-center h-[35px] w-[35px] p-0">
          <FilePen size={18} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-[10px]">Edit Note?</DialogTitle>
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
                value={newValue.title}
                onChange={(e) =>
                  setNewValue({ ...newValue, title: e.target.value })
                }
              />

              <Textarea
                placeholder="note description"
                value={newValue.content}
                onChange={(e) =>
                  setNewValue({ ...newValue, content: e.target.value })
                }
                error={emptyWarning.emptyContent}
                errorMessage="Content Note cannot Empty"
              />
              <div className="flex justify-end">
                <Button disabled={mutation.isPending} type="submit">
                  {mutation.isPending ? 'Updating . . .' : 'Update'}
                </Button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
