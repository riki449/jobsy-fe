import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="da">
      <body className="bg-white text-zinc-900">
        <Header />

        <div className="mx-auto flex bg-white">
          {/* Main content */}
          <main className="w-full">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
