import { Popover, PopoverContent, PopoverTrigger } from '../common';
import { Ellipsis } from 'lucide-react';
import { EditNoteModal } from './editNoteModal';
import { DeleteNoteModal } from './deleteNoteModal';

export function EditAndDeletePopOver() {
  return (
    <Popover>
      <PopoverTrigger className="absolute z-[50] right-[20px] flex justify-center items-center rounded-full top-[20px] hover:bg-neutral-300 h-[30px] w-[30px]">
        <Ellipsis size={20} />
      </PopoverTrigger>

      <PopoverContent className="p-2 w-auto flex flex-col gap-2">
        <EditNoteModal />
        <DeleteNoteModal />
      </PopoverContent>
    </Popover>
  );
}
