"use server";

import { tweetSchema } from "@/app/tweets/add/schema";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function addTweet(prevState: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };

  const result = tweetSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
      });

      redirect("/");
    }
  }
}
