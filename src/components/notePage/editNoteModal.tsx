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

export function EditNoteModal() {
  const selectedNoteGlobalState = useSelector(
    (state: RootState) => state.selectedNoteGlobalState,
  );
  const [newValue, setNewValue] = useState({
    title: selectedNoteGlobalState.title,
    content: selectedNoteGlobalState.content,
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData = {
        title: newValue.title,
        content: newValue.content,
      };
      const { data: updatedNote } = await axios.put(
        `/api/note/${selectedNoteGlobalState.id}`,
        updatedData,
      );
    } catch (error) {}
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex justify-center items-center h-[35px] w-[35px] p-0">
          <FilePen size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note?</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleUpdate}>
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
