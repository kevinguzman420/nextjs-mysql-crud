import Navbar from "./Navbar";

export function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 dark:bg-slate-900 dark:text-white h-screen p-10">
        <div className="container mx-auto h-full">{children}</div>
      </div>
    </>
  );
}
