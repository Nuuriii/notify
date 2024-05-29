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
} from '../common';
import { Plus } from 'lucide-react';

export function AddNewNoteModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="fixed right-[100px] bottom-[30px] flex justify-center items-center h-[50px] w-[50px] p-0 rounded-full transition-[0.3s] active:scale-[0.96]">
          <Plus size={30} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note?</DialogTitle>
          <DialogDescription>
            <Input type="text" placeholder="note" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
