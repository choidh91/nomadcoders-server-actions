"use client";

import Link from "next/link";

interface TweetItemProps {
  id: number;
  tweet: string;
  username: string;
}

export default function TweetItem({ id, tweet, username }: TweetItemProps) {
  return (
    <Link href={`/tweets/${id}`}>
      <div className="flex flex-col">
        <p>{username}</p>
        <p>{tweet}</p>
      </div>
    </Link>
  );
}
