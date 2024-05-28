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

export function Navbar() {
  return (
    <header>
      <Menubar className="h-auto">
        <PaddingContainer>
          <div className="flex justify-between items-center py-[10px]">
            <h1 className="text-2xl font-semibold">Notify</h1>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
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
