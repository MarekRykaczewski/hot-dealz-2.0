import Navbar from "./_components/navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full">
      <div className="h-[80px] fixed w-full">
        <Navbar />
      </div>
      <main className="flex flex-col items-center h-[100vh] pt-[80px] w-full">
        {children}
      </main>
    </div>
  );
}
