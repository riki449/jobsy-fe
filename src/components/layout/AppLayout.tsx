import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import Footer from "./Footer";
import LoadingOverlay from "../common/LoadingOverlay";

export default function AppLayout({
  children,
  isLoading = false,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) {
  return (
    <div className="bg-lightGray! text-zinc-900">
      <Header />

      <div className="mx-auto bg-lightGray flex max-w-7xl px-4 py-6">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="w-full lg:ml-6">
          <LoadingOverlay loading={isLoading}>{children}</LoadingOverlay>
        </main>
      </div>

      <Footer />
    </div>
  );
}
