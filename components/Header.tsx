"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-primary font-heading text-2xl font-semibold">
            УМР
          </span>
          <span className="text-white text-xs hidden sm:block leading-tight">
            УралМеталл
            <br />
            Ресурс
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-white transition-colors text-sm font-body uppercase tracking-wide"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Phone */}
        <a
          href="tel:88002015277"
          className="hidden md:flex items-center gap-2 text-white font-body font-bold text-lg"
        >
          <Phone size={18} className="text-primary" />
          8-800-201-52-77
        </a>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Меню"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="md:hidden bg-dark border-t border-gray-800 px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-gray-300 hover:text-white transition-colors font-body border-b border-gray-800 last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:88002015277"
            className="flex items-center gap-2 text-white font-body font-bold pt-3"
          >
            <Phone size={18} className="text-primary" />
            8-800-201-52-77
          </a>
        </nav>
      )}
    </header>
  );
}
