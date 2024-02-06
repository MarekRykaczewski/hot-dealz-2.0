import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { CircleUser, Plus } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import SearchInput from "./search-input";

const Navbar = () => {
  const { userId } = auth();
  return (
    <div className="border-b h-full bg-stone-800 shadow-sm px-4">
      <div className="flex mx-auto max-w-5xl h-full items-center justify-between">
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
            <Button className="rounded-full" variant="orange" size="icon">
              <Plus />
            </Button>
          </Link>

          {userId && (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
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
