import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-lightGray! text-zinc-900">
      <Header />

      <div className="mx-auto bg-lightGray flex max-w-7xl px-4 py-6">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="w-full lg:ml-6">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
