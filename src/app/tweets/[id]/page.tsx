import TweetComment from "@/components/tweet-comment";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { getComments } from "./actions";
import getSession from "@/lib/session";
import { unstable_cache as nextCache } from "next/cache";
import LikeButton from "@/components/like-button";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
}

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

function getCachedLikeStatus(postId: number, userId?: number) {
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, userId!);
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const session = await getSession();

  const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id);

  const tweet = await getTweet(id);

  const comments = await getComments(id);

  if (!tweet) {
    return notFound();
  }

  return (
    <div>
      {tweet.user.username}
      {tweet.tweet}
      <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      <TweetComment id={id} comments={comments.map((item) => item.comment)} />
    </div>
  );
}
