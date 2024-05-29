import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '../common';
import { Trash2 } from 'lucide-react';

export function DeleteNoteModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex bg-red-500 justify-center items-center h-[35px] w-[35px] p-0">
          <Trash2 size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[450px] h-max flex flex-col items-start">
        <DialogHeader>
          <DialogTitle className="mb-[15px]">
            Are you sure you want to delete this note?
          </DialogTitle>
          <DialogDescription className="">
            This action cannot be undone. This will permanently delete your
            Note.
            <div className="mt-[30px] flex justify-end gap-2">
              <Button>Delete</Button>
              <Button>Cancel</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
