import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

async function UserInfo() {
  const user = await getUser();
  return (
    <>
      <h1>{user.username}</h1>
      {user.bio && <p className="border-2 p-2">{user.bio}</p>}
    </>
  );
}

export default async function Profile() {
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };

  return (
    <div>
      <Suspense fallback={"Welcome!"}>
        <UserInfo />
      </Suspense>
      <form action={logOut}>
        <button className="btn">Log out</button>
      </form>
    </div>
  );
}
