"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "../components/AppLayout";

interface LinkItem {
  name: string;
  url: string;
  description: string;
}

interface CrisisItem {
  name: string;
  contact: string;
  description: string;
}

export default function ResourcesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleVideoSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push("/resources/videos?q=" + encodeURIComponent(searchQuery));
    }
  };

  const crisisResources: CrisisItem[] = [
    { name: "988 Suicide & Crisis Lifeline", contact: "Call or text 988", description: "24/7 support for mental health crises" },
    { name: "Crisis Text Line", contact: "Text HOME to 741741", description: "Free 24/7 text-based support" },
    { name: "SAMHSA National Helpline", contact: "1-800-662-4357", description: "Treatment referrals and support" }
  ];

  const helpfulLinks: LinkItem[] = [
    { name: "Psychology Today", url: "https://www.psychologytoday.com/us/therapists", description: "Search therapists by location and specialty" },
    { name: "BetterHelp", url: "https://www.betterhelp.com", description: "Online therapy and counseling" },
    { name: "7 Cups", url: "https://www.7cups.com", description: "Free emotional support and online chat" },
    { name: "Mental Health America", url: "https://www.mhanational.org", description: "Resources and screening tools" }
  ];

  const suggestedSearches: string[] = ["meditation for anxiety", "breathing exercises", "coping with depression", "mindfulness", "sleep relaxation"];

  return (
    <AppLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Resources</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Find Helpful Videos</h2>
          <form onSubmit={handleVideoSearch} className="flex gap-2">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for mental health videos..." className="flex-1 p-3 border rounded-lg" />
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg">Search</button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedSearches.map(function(term) {
              return <button key={term} onClick={function() { router.push("/resources/videos?q=" + encodeURIComponent(term)); }} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200">{term}</button>;
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Find a Therapist</h2>
          <p className="text-gray-600 mb-4">Connecting with a mental health professional can make a real difference.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpfulLinks.map(function(item: LinkItem) {
              return <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="block p-4 border rounded-lg hover:border-blue-500"><h3 className="font-semibold text-blue-600">{item.name}</h3><p className="text-gray-600 text-sm mt-1">{item.description}</p></a>;
            })}
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-red-800">Crisis Resources</h2>
          <p className="text-red-700 mb-4">If you are in crisis or need immediate support, please reach out.</p>
          <div className="space-y-4">
            {crisisResources.map(function(resource: CrisisItem) {
              return <div key={resource.name} className="bg-white p-4 rounded-lg"><h3 className="font-semibold">{resource.name}</h3><p className="text-blue-600 font-medium">{resource.contact}</p><p className="text-gray-600 text-sm">{resource.description}</p></div>;
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}