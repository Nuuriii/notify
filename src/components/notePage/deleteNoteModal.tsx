import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

export function DeleteNoteModal() {
  const selectedNoteGlobalState = useSelector(
    (state: RootState) => state.selectedNoteGlobalState,
  );

  const deleteNote = async () => {
    try {
      const { data: deleteNote } = await axios.delete(
        `/api/note/${selectedNoteGlobalState.id}`,
      );
      console.log(deleteNote);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex bg-red-500 justify-center items-center h-[35px] w-[35px] p-0">
          <Trash2 size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[330px] h-max flex flex-col items-start">
        <DialogHeader className="w-full">
          <DialogTitle className="text-center">
            Are you sure you want to delete this note?
          </DialogTitle>
          <DialogDescription className="">
            <div className="mt-[30px] flex justify-center gap-2">
              <Button
                className="bg-red-500 hover:bg-red-400"
                onClick={deleteNote}
              >
                Delete
              </Button>

              <DialogClose>
                <Button className="bg-neutral-800 hover:bg-neutral-700">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
