"use client";

import { useState } from "react";
import { search } from "@/app/search/actions";
import TweetItem from "@/components/tweet-item";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const tweets = await search(searchQuery);
    if (tweets) setSearchResults(tweets);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Tweets</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter keyword"
        className="p-2 border rounded w-full mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Search
      </button>
      {searchResults.map((item) => (
        <TweetItem
          key={item.id}
          id={item.id}
          username={item.user.username}
          tweet={item.tweet}
        />
      ))}
    </div>
  );
}
