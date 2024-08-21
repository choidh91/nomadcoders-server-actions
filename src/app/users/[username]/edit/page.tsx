"use client";

import { getUser, updateUser } from "@/app/users/[username]/edit/actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function UserEdit({ params }: { params: { username: string } }) {
  const username = params.username;
  const [user, setUser] = useState<any>();

  const [state, dispatch] = useFormState(updateUser, null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser(username);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    fetchUser();
  }, []);

  if (user) {
    return (
      <form action={dispatch} className="space-y-4">
        <h1 className="text-2xl font-bold">Edit Profile</h1>

        <div>
          <input hidden name="id" defaultValue={user.id} />
          <label htmlFor="username" className="block">
            Username
          </label>
          <input
            type="text"
            name="username"
            defaultValue={user.username}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block">
            Bio
          </label>
          <textarea
            name="bio"
            defaultValue={user.bio}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            New Password (leave blank to keep current)
          </label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    );
  }

  return null;
}
