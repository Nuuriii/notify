'use client';
import {
  PaddingContainer,
  Button,
  Navbar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../common';
import { DummyData } from './noteData';
import { useState } from 'react';
import { Ellipsis, FilePen, Trash2 } from 'lucide-react';

export default function NotePage() {
  const [selectedNote, setSelectedNote] = useState({ title: '', note: '' });

  const handleSelectedNote = (title: string, note: string) => {
    setSelectedNote({ title: title, note: note });
  };

  return (
    <>
      <Navbar />
      <PaddingContainer>
        <div className="mt-[30px]">
          <div className="flex flex-wrap justify-between">
            {DummyData.map((item: any, index: number) => (
              <Dialog key={index}>
                <Card className="p-0 h-[230px] max-w-[330px] relative">
                  <Popover>
                    <PopoverTrigger className="absolute z-[50] right-[20px] flex justify-center items-center rounded-full top-[20px] hover:bg-neutral-300 h-[30px] w-[30px]">
                      <Ellipsis size={20} />
                    </PopoverTrigger>
                    <PopoverContent className="p-2 w-auto flex flex-col gap-2">
                      <Button className="flex justify-center items-center h-[35px] w-[35px] p-0">
                        <FilePen size={18} />
                      </Button>
                      <Button className="flex bg-red-500 justify-center items-center h-[35px] w-[35px] p-0">
                        <Trash2 size={18} />
                      </Button>
                    </PopoverContent>
                  </Popover>
                  <DialogTrigger
                    className="h-full break-all flex flex-col justify-start p-[20px]"
                    onClick={() => handleSelectedNote(item.title, item.note)}
                  >
                    <CardHeader className="p-0">
                      <CardTitle className="text-left relative">
                        <h1 className="max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">
                          {item.title}
                        </h1>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left p-0 mt-[20px]">
                      <h1 className="text-ellipsis overflow-hidden line-clamp-6">
                        {item.note}
                      </h1>
                    </CardContent>
                  </DialogTrigger>
                </Card>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      <h1>{selectedNote.title}</h1>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 break-all">
                    <div className="">
                      <p>{selectedNote.note}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </PaddingContainer>
    </>
  );
}
