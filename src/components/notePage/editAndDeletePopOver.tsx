import { Popover, PopoverContent, PopoverTrigger, Input } from '../common';
import { Ellipsis } from 'lucide-react';
import { EditNoteModal } from './editNoteModal';
import { DeleteNoteModal } from './deleteNoteModal';
import { useState } from 'react';

interface EditAndDeletePopOver {}

export function EditAndDeletePopOver() {
  const [openPopOver, setOpenPopOver] = useState(false);

  return (
    <Popover open={openPopOver} onOpenChange={setOpenPopOver}>
      <PopoverTrigger className="absolute z-[50] right-[20px] flex justify-center items-center rounded-full top-[20px] hover:bg-neutral-300 h-[30px] w-[30px]">
        <Ellipsis size={20} />
      </PopoverTrigger>

      <PopoverContent className="p-2 w-auto flex flex-col gap-2">
        <EditNoteModal onClose={() => setOpenPopOver(false)} />
        <DeleteNoteModal onClose={() => setOpenPopOver(false)} />
      </PopoverContent>
    </Popover>
  );
}
