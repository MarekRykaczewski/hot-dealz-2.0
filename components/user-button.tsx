"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const UserButton = () => {
  const { isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const router = useRouter();

  if (!isLoaded) return null;
  if (!user?.id) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-row items-center rounded-xl border border-stone-600 bg-stone-700 px-4 py-3 text-white drop-shadow-md">
          <Image
            alt={user?.primaryEmailAddress?.emailAddress!}
            src={user?.imageUrl}
            width={30}
            height={30}
            className="mr-2 rounded-full ring-2 ring-stone-500 drop-shadow-sm"
          />
          {user?.username
            ? user.username
            : user?.primaryEmailAddress?.emailAddress!}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="mt-4 w-52 rounded-xl border border-stone-500 bg-stone-600 px-6 py-4 text-black drop-shadow-2xl">
          <DropdownMenuLabel />
          <DropdownMenuGroup className="flex gap-2 flex-col py-3">
            <DropdownMenuItem asChild>
              <Button
                variant="orange"
                onClick={() => openUserProfile()}
                className="py-3"
              >
                Clerk Profile
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button variant="orange" className="py-3">
                <Link
                  href={`/profile/${user.username}`}
                  passHref
                  className="py-3"
                >
                  Hot Dealz Profile
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button variant="orange">
                <Link href="/saved" passHref className="py-3">
                  Saved
                </Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="my-1 h-px bg-gray-500" />
          <DropdownMenuItem asChild>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => signOut(() => router.push("/"))}
            >
              Sign Out{" "}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
