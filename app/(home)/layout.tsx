import Navbar from "./_components/navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main className="flex flex-col items-center h-full w-full">
        {children}
      </main>
    </div>
  );
}
