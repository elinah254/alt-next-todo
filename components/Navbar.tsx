"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    // { href: "/todos", label: "Todos" },
    { href: "/chat", label: "AI Assistant" },
  ];

  return (
    <nav className="w-full sticky top-0 bg-gradient-to-r from-[#fef6e4] via-[#fdebd0] to-[#f9dcc4] shadow-md py-4 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-semibold text-[#7b4b2a] tracking-wide">
          LynTasks Organizer
        </h1>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[#7a4e25] hover:text-[#9b6133] transition font-medium ${
                pathname === link.href
                  ? "border-b-2 border-[#c78a49] pb-1"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
