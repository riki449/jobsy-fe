import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <h1 className="text-xl font-bold text-blue-600">Jobsy User</h1>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl p-4">{children}</main>
    </div>
  );
}
