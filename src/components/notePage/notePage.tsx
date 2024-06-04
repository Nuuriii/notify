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
import { Ellipsis, FilePen, Heading1, Trash2 } from 'lucide-react';
import { EditAndDeletePopOver } from './editAndDeletePopOver';
import { useEffect } from 'react';
import { AddNewNoteModal } from './addNewNoteModal';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/lib/redux-toolkit/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedNote } from '@/lib/redux-toolkit/note/selectedNoteSlice';
import { updateListNote } from '@/lib/redux-toolkit/note/noteSlice';

export default function NotePage() {
  const dispatch = useDispatch();
  const noteListGlobalState = useSelector(
    (state: RootState) => state.noteListGlobalState,
  );
  const selectedNoteGlobalState = useSelector(
    (state: RootState) => state.selectedNoteGlobalState,
  );

  const { isFetching } = useQuery({
    queryKey: [],
    queryFn: async () => {
      try {
        const { data: getList } = await axios.get(`/api/note`);
        dispatch(updateListNote(getList.data));
        return getList;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Navbar />
      <PaddingContainer>
        <div className="mt-[30px] relative">
          <AddNewNoteModal />
          <div className="flex flex-wrap gap-10">
            {isFetching ? (
              <h1>Loading... </h1>
            ) : noteListGlobalState.noteList.length === 0 ? (
              <h1>Empty Note</h1>
            ) : (
              <>
                {noteListGlobalState.noteList.map(
                  (item: any, index: number) => (
                    <Dialog key={index}>
                      <Card
                        className="p-0 h-[230px] w-[330px] relative"
                        onClick={() =>
                          dispatch(
                            updateSelectedNote({
                              id: item.id,
                              title: item.title,
                              content: item.content,
                              createdAt: item.createdAt,
                              updatedAt: item.updatedAt,
                            }),
                          )
                        }
                      >
                        <EditAndDeletePopOver />
                        <DialogTrigger className="h-full w-full break-all flex flex-col justify-start p-[20px]">
                          <CardHeader className="p-0">
                            <CardTitle className="text-left relative">
                              <p className="max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">
                                {item.title}
                              </p>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-left p-0 mt-[20px]">
                            <h1 className="text-ellipsis overflow-hidden line-clamp-6">
                              {item.content}
                            </h1>
                          </CardContent>
                        </DialogTrigger>
                      </Card>

                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            {selectedNoteGlobalState.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 break-all">
                          <div className="">
                            <p>{selectedNoteGlobalState.content}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ),
                )}
              </>
            )}
          </div>
        </div>
      </PaddingContainer>
    </>
  );
}
