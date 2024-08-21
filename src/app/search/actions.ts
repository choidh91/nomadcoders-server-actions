"use server";

import db from "@/lib/db";

export async function search(keyword: string) {
  try {
    const tweets = await db.tweet.findMany({
      where: {
        tweet: {
          contains: keyword,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return tweets;
  } catch (e) {}
}
