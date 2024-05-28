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
} from '../common';
import { DummyData } from './noteData';
import { useState } from 'react';

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
                <DialogTrigger
                  onClick={() => handleSelectedNote(item.title, item.note)}
                >
                  <Card key={index} className="h-[230px] max-w-[330px]">
                    <CardHeader>
                      <CardTitle className="text-left">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-left">
                      <h1 className="text-ellipsis overflow-hidden line-clamp-6">
                        {item.note}
                      </h1>
                    </CardContent>
                  </Card>
                </DialogTrigger>
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
