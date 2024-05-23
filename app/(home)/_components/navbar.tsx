"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton, useAuth } from "@clerk/nextjs";
import { CircleUser, Plus, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./logo";
import SearchInput from "./search-input";

const Navbar = () => {
  const { userId } = useAuth();
  const [scrollingDown, setScrollingDown] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    setScrollingDown(currentScrollY > lastScrollY);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 bg-gradient-to-r from-stone-700 to-stone-800 px-2 sm:px-6 py-2 shadow-md transition-all duration-300",
        scrollingDown ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="flex mx-auto max-w-7xl h-full items-center justify-between flex-col sm:flex-row gap-3 sm:justify-between w-full">
        <Link href="/">
          <Logo />
        </Link>

        <div className={cn("flex items-center space-x-4")}>
          <div className={cn("sm:flex hidden", isFocused && "flex")}>
            <SearchInput />
          </div>

          <Button
            onClick={() => setIsFocused((prev) => !prev)}
            className="flex sm:hidden rounded-full h-10 w-10 p-2 bg-gray-500 hover:bg-gray-400"
          >
            {!isFocused ? (
              <SearchIcon className="h-5 w-5" />
            ) : (
              <XIcon className="h-5 w-5" />
            )}
          </Button>

          {!userId && (
            <Button
              variant="orange"
              size="sm"
              className={cn(
                "gap-2 font-semibold flex",
                isFocused && "sm:flex hidden"
              )}
              onClick={() => router.push("/sign-up")}
            >
              <CircleUser />
              Sign in
            </Button>
          )}

          <Button
            className={cn(
              "rounded-full h-9 w-9 flex",
              isFocused && "sm:flex hidden"
            )}
            variant="orange"
            size="icon"
            onClick={() => router.push("/create")}
          >
            <Plus />
          </Button>

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
    </nav>
  );
};

export default Navbar;
