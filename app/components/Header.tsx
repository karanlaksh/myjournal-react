"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

function getUserName() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  if (!user) return null;
  try {
    return JSON.parse(user).name;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return function() {
    window.removeEventListener("storage", callback);
  };
}

export default function Header() {
  const router = useRouter();
  const userName = useSyncExternalStore(subscribe, getUserName, function() { return null; });

  const handleLogout = function() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="px-8 py-4 flex justify-between items-center">
        <h1 onClick={function() { router.push("/journals"); }} className="text-xl font-bold text-blue-600 cursor-pointer">
          MindJournal
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{userName ? "Hi, " + userName : ""}</span>
          <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}