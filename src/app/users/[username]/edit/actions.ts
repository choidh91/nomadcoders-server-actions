"use server";

import { userSchema } from "@/app/users/[username]/edit/schema";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export async function getUser(username: string) {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
        username,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export async function updateUser(prevState: any, formData: FormData) {
  const data = {
    id: Number(formData.get("id")),
    username: formData.get("username"),
    email: formData.get("email"),
    bio: formData.get("bio"),
    password: formData.get("password"),
  };

  const result = userSchema.safeParse(data);

  if (result.success) {
    await db.user.update({
      where: {
        id: result.data.id,
      },
      data: result.data,
    });
  }
}
