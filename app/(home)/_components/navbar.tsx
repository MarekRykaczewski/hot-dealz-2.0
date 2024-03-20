import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { CircleUser, Plus } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import SearchInput from "./search-input";

const Navbar = () => {
  const { userId } = auth();
  return (
    <div className="sticky h-14 z-10 top-0 bg-stone-800 shadow-sm px-4">
      <div className="flex mx-auto max-w-7xl h-full items-center justify-between">
        <div className="p-6">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <SearchInput />

          {!userId && (
            <Link href="/sign-up">
              <Button
                variant="orange"
                size="sm"
                className="gap-2 font-semibold"
              >
                <CircleUser />
                Sign in
              </Button>
            </Link>
          )}

          <Link href="/create">
            <Button
              className="rounded-full h-9 w-9"
              variant="orange"
              size="icon"
            >
              <Plus />
            </Button>
          </Link>

          {userId && (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
              userProfileMode="modal"
              afterSignOutUrl="/"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
