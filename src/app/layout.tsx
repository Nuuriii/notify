import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import ReduxProvider from './reduxProvider';
import ReactQueryProvider from './reactQueryProvider';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
export const metadata: Metadata = {
  title: 'Notify',
  description: 'Simple Note App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ReduxProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
