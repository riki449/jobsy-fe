import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { usePathname } from "next/navigation";
import HeaderNav, { NAV_ITEMS } from "./HeaderNav";

const menu = [
  { label: "Opgaver i udbud", active: true },
  { label: "Afsendte bud" },
  { label: "Dine bookinger" },
  { label: "Din profil" },
  { label: "Din konto" },
];

export default function Sidebar() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  return (
    <aside className="w-64">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-zinc-500">Menu</p>

        {/* Navigation tabs (mobile only) */}
        <div className="md:hidden">
          <HeaderNav />
        </div>

        {isAuthenticated ? (
          <ul className="space-y-1">
            {menu.map((item) => (
              <li key={item.label}>
                <button
                  className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-medium transition
                  ${
                    item.active
                      ? "bg-green-100 text-green-700"
                      : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <button
                    className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Boost */}
      <div className="mt-6 rounded-xl bg-green-600 p-4 text-white shadow-sm">
        <p className="text-sm font-semibold">Boost din profil</p>
        <p className="mt-1 text-sm opacity-90">
          Opgrader til Premium for at se opgaver før andre.
        </p>

        <button className="mt-4 w-full rounded-lg bg-white py-2 text-sm font-semibold text-green-700">
          Læs mere
        </button>
      </div>
    </aside>
  );
}
