import { Button, Popover, PopoverContent, PopoverTrigger } from '../common';
import { Ellipsis, Trash2 } from 'lucide-react';
import { EditNoteModal } from './editNoteModal';

export function EditAndDeletePopOver() {
  return (
    <Popover>
      <PopoverTrigger className="absolute z-[50] right-[20px] flex justify-center items-center rounded-full top-[20px] hover:bg-neutral-300 h-[30px] w-[30px]">
        <Ellipsis size={20} />
      </PopoverTrigger>
      <PopoverContent className="p-2 w-auto flex flex-col gap-2">
        <EditNoteModal />
        <Button className="flex bg-red-500 justify-center items-center h-[35px] w-[35px] p-0">
          <Trash2 size={18} />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
