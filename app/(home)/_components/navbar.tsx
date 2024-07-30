"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { CircleUser, Plus, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./logo";
import SearchInput from "./search-input";

const Navbar = () => {
  const { userId } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleScroll = () => {
    if (navbarRef.current) {
      const navbarHeight = navbarRef.current.offsetHeight;
      const currentScrollY = window.scrollY;

      setIsVisible(currentScrollY <= navbarHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={cn(
        "sticky top-0 z-50 bg-gradient-to-r from-stone-700 to-stone-800 px-2 sm:px-6 py-2 shadow-md transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
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

          {userId && <UserButton />}

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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
