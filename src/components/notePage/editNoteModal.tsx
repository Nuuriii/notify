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
  Textarea,
} from '../common';
import { FilePen } from 'lucide-react';
import { RootState } from '@/lib/redux-toolkit/store';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { editNote } from '@/lib/redux-toolkit/note/noteSlice';

export function EditNoteModal() {
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
      // if (newTodo.title === '') {
      //   setError(true);
      //   return;
      // }

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
        return response;
      } catch (error) {
        return error;
      }
    },
  });

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger>
        <div className="flex bg-neutral-700 text-white rounded-md justify-center items-center h-[35px] w-[35px] p-0">
          <FilePen size={18} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note?</DialogTitle>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate();
              }}
            >
              <Input
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
              />
              <div>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
