import Navbar from "./_components/navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <div className="h-[80px] fixed w-full">
        <Navbar />
      </div>
      <main className="h-[100vh] pt-[80px]">{children}</main>
    </div>
  );
}
