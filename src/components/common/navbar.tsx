import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from './menubar';
import { PaddingContainer } from './paddingContainer';
import Image from 'next/image';

export function Navbar() {
  return (
    <header>
      <Menubar className="h-auto">
        <PaddingContainer>
          <div className="flex justify-between items-center py-[3px]">
            <h1 className="text-2xl font-semibold">Notify</h1>
            <MenubarMenu>
              <MenubarTrigger>
                <Image
                  src={'https://www.robohash.org/ll?set=set3'}
                  alt=""
                  width={40}
                  height={40}
                  sizes="100vw"
                />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Logout</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </div>
        </PaddingContainer>
      </Menubar>
    </header>
  );
}
