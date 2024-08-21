import TweetItem from "@/components/tweet-item";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Prisma } from "@prisma/client";

async function getUserProfileAndTweets(username: string) {
  const userWithTweets = await db.user.findUnique({
    where: { username },
    include: { tweets: true },
  });

  if (!userWithTweets) {
    notFound();
  }

  return userWithTweets;
}

type IUserProfileAndTweets = Prisma.PromiseReturnType<
  typeof getUserProfileAndTweets
>;

function UserProfileAndTweets({
  userWithTweets,
}: {
  userWithTweets: IUserProfileAndTweets;
}) {
  return (
    <>
      <h1> {userWithTweets.username}</h1>
      {userWithTweets.bio && (
        <p className="border-2 p-2">{userWithTweets.bio}</p>
      )}
      {userWithTweets.tweets.map((item) => (
        <TweetItem
          key={item.id}
          id={item.id}
          username={userWithTweets.username}
          tweet={item.tweet}
        />
      ))}
    </>
  );
}

export default async function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  const userWithTweets = await getUserProfileAndTweets(username);

  return (
    <div>
      <Suspense fallback={"Welcome!"}>
        <UserProfileAndTweets userWithTweets={userWithTweets} />
      </Suspense>
    </div>
  );
}
