import Link from "next/link";
import { Button } from "./ui/button";

const NotFound = () => {
  return (
    <div className="flex gap-10 flex-col items-center p-10 h-[calc(100vh-56px)]">
      <h1 className="text-5xl font-bold">404 - Page not found</h1>
      <Button className="font-bold" size="lg" variant="orange">
        <Link href={"/"}>Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
