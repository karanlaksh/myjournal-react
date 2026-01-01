"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppLayout from "../../components/AppLayout";
import { searchYouTubeVideos } from "@/lib/api";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

function VideosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(function() {
    if (!query) {
      router.push("/resources");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    searchYouTubeVideos(query, token).then(function(data) {
      if (data.videos) {
        setVideos(data.videos);
      } else if (data.message) {
        setError(data.message);
      }
      setLoading(false);
    });
  }, [query, router]);

  function goBack() {
    router.push("/resources");
  }

  function renderVideo(video: Video) {
    const videoUrl = "https://www.youtube.com/watch?v=" + video.id;
    return (
      <a key={video.id} href={videoUrl} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
        <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
          <p className="text-gray-500 text-xs mt-2">{video.channelTitle}</p>
        </div>
      </a>
    );
  }

  if (loading) {
    return <p className="text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-5xl">
      <button onClick={goBack} className="text-blue-500 hover:underline mb-6 inline-block">
        ← Back to Resources
      </button>

      <h1 className="text-3xl font-bold mb-2">Video Results</h1>
      <p className="text-gray-600 mb-6">Showing results for: {query}</p>

      {error && <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

      {videos.length === 0 && !error && (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">No videos found. Try a different search.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(renderVideo)}
      </div>
    </div>
  );
}

export default function VideosPage() {
  return (
    <AppLayout>
      <Suspense fallback={<p className="text-gray-600">Loading...</p>}>
        <VideosContent />
      </Suspense>
    </AppLayout>
  );
}