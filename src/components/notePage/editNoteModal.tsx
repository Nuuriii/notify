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
import { FilePen } from 'lucide-react';

export function EditNoteModal() {
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
            <Input type="text" placeholder="note" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
