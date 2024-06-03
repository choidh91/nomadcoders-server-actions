import db from "@/lib/db";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import TweetList from "@/components/tweet-list";

async function getTweets() {
  const tweets = await db.tweet.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    take: 1,
  });
  return tweets;
}

export type ITweets = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  const tweets = await getTweets();
  return (
    <main className="h-screen bg-neutral-100 items-center flex justify-center">
      <div className="flex flex-col">
        <Link href="/tweets/add" className="btn">
          Add Tweet
        </Link>
        <TweetList tweets={tweets} />
      </div>
    </main>
  );
}
