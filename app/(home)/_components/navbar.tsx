import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { CircleUser, Plus } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import SearchInput from "./search-input";

const Navbar = () => {
  const { userId } = auth();
  return (
    <div className="py-4 px-[20vw] border-b h-full flex items-center justify-between bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>

      <div className="flex items-center space-x-4">
        <SearchInput />

        {!userId && (
          <Link href="/sign-up">
            <Button variant="orange" size="sm" className="gap-2 font-semibold">
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
  );
};

export default Navbar;
