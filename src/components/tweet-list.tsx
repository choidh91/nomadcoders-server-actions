"use client";

import { getMoreTweets } from "@/app/actions";
import { ITweets } from "@/app/page";
import TweetItem from "@/components/tweet-item";
import { useEffect, useState } from "react";

interface TweetListProps {
  tweets: ITweets;
}

const pageSize = 1;

export default function TweetList({ tweets: initTweets }: TweetListProps) {
  const [tweets, setTweets] = useState<ITweets>(initTweets);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;

  const currentTweets = tweets.slice(startIndex, endIndex);

  useEffect(() => {
    if (initTweets.length < pageSize) {
      setIsLastPage(true);
    }
  }, [initTweets]);

  const prev = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const next = async () => {
    const nextPage = page + 1;
    const startIdx = nextPage * pageSize;
    const endIdx = startIdx + pageSize;

    if (tweets.length < endIdx) {
      const newTweets = await getMoreTweets(nextPage);
      if (newTweets.length > 0) {
        setTweets((prev) => [...prev, ...newTweets]);
      } else {
        setIsLastPage(true);
      }
    }

    setPage(nextPage);
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      {currentTweets.map((item) => (
        <TweetItem
          key={item.id}
          id={item.id}
          username={item.user.username}
          tweet={item.tweet}
        />
      ))}
      <div className="flex flex-row">
        <button className="btn" onClick={prev} disabled={page === 0}>
          이전
        </button>
        <button
          className="btn"
          onClick={next}
          disabled={isLastPage && page >= tweets.length - 1}
        >
          다음
        </button>
      </div>
    </div>
  );
}
