"use server";

import { commentSchema } from "@/app/tweets/[id]/schema";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

export async function likePost(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

export async function dislikePost(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

export async function getComments(tweetId: number) {
  const session = await getSession();

  const comments = await db.response.findMany({
    where: {
      tweetId,
      userId: session.id,
    },
  });
  return comments;
}

export async function addComment(formData: FormData) {
  const data = {
    tweetId: formData.get("tweetId"),
    comment: formData.get("comment"),
  };

  const result = commentSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const comment = await db.response.create({
        data: {
          comment: result.data.comment,
          user: {
            connect: {
              id: session.id,
            },
          },
          tweet: {
            connect: {
              id: result.data.tweetId,
            },
          },
        },
      });
      if (comment) revalidatePath(`/tweets/${result.data.tweetId}`);
    }
  }
}
