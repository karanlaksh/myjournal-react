"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [quote, setQuote] = useState<{ q: string; a: string } | null>(null);

  useEffect(() => {
    fetch("https://zenquotes.io/api/today")
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          setQuote({ q: data[0].q, a: data[0].a });
        }
      })
      .catch(() => {
        setQuote({ q: "Every day is a fresh start.", a: "Unknown" });
      });
  }, []);

  const navItems = [
  { name: "Journals", path: "/journals", icon: "📓✍🏼" },
  { name: "Resources", path: "/resources", icon: "📚🌎" },
];

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4 flex flex-col">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
              pathname.startsWith(item.path)
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t">
        <p className="text-xs text-gray-400 mb-2">Quote of the Day</p>
        {quote ? (
          <div className="text-sm">
            <p className="text-gray-600 italic">&quot;{quote.q}&quot;</p>
            <p className="text-gray-500 mt-1">— {quote.a}</p>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Loading...</p>
        )}
        <p className="text-xs text-gray-400 mt-2">
          <a href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            ZenQuotes.io
          </a>
        </p>
      </div>
    </aside>
  );
}