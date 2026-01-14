import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function LandingLayout({
  children,
  isLoading = false,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) {
  return (
    <>
      {/* <body className="bg-white text-zinc-900"> */}
        <Header />

        <div className="mx-auto flex bg-white relative">
          {/* Main content */}
          <main className="w-full">{children}</main>
          {isLoading && (
            <div className="absolute inset-0 z-40 flex pt-[50vh] justify-center bg-black/30">
              {<div className="absolute inset-0 backdrop-blur-sm" />}

              <div className="relative z-50 h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
            </div>
          )}
        </div>

        <Footer />
      {/* </body> */}
    </>
  );
}
