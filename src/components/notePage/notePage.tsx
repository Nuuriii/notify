'use client';
import {
  PaddingContainer,
  Button,
  Navbar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../common';
import { DummyData } from './noteData';

export default function NotePage() {
  return (
    <>
      <Navbar />
      <PaddingContainer>
        <div className="mt-[30px]">
          <div className="flex flex-wrap justify-between">
            {DummyData.map((item: any, index: number) => (
              <Card key={index} className="max-w-[330px]">
                <CardHeader>
                  <CardTitle className="">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="">
                  <h1 className="text-ellipsis overflow-hidden line-clamp-6">
                    {item.note}
                  </h1>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PaddingContainer>
    </>
  );
}
