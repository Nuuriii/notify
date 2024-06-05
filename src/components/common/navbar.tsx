import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from './menubar';
import { PaddingContainer } from './paddingContainer';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux-toolkit/store';
import { deleteCookie } from '@/app/action';
import { resetUserInformation } from '@/lib/redux-toolkit/user-information/userInformation';
import { Button } from './button';
import { signOut } from 'firebase/auth';
import { auth } from '@/service/firebase';

export function Navbar() {
  const dispatch = useDispatch();
  const userInformation = useSelector(
    (state: RootState) => state.userInformation,
  );

  const handleLogout = async () => {
    try {
      const result = await signOut(auth);
      console.log(result);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const clearInformation = async () => {
    try {
      const clearCookie = await deleteCookie();
      const logout = await handleLogout();
      dispatch(resetUserInformation());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Menubar className="h-auto">
        <PaddingContainer>
          <div className="flex justify-between items-center py-[3px]">
            <h1 className="text-2xl font-semibold">Notify</h1>
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer p-0">
                <Image
                  className="h-[40px] w-[40px] rounded-full"
                  src={
                    userInformation.photoUrl !== '' ||
                    userInformation.photoUrl !== null
                      ? userInformation.photoUrl
                      : `https://www.robohash.org/${userInformation.displayName}?set=set3`
                  }
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </MenubarTrigger>
              <MenubarContent className="relative top-[20px] flex flex-col items-center right-[100px]">
                <MenubarItem className="">
                  <Button onClick={clearInformation}>Logout</Button>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </div>
        </PaddingContainer>
      </Menubar>
    </header>
  );
}
