"use client";

import { login } from "@/app/action";
import Button from "@/components/button";
import Input from "@/components/input";
import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";

const initialState = {
  status: "",
  errors: [],
};

export default function Home() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <main className="h-screen bg-neutral-100 items-center flex justify-center">
      <div className="flex flex-col w-96">
        <div className="flex justify-center mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              stroke="#f87171"
              fill="#f87171"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
              fill="white"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
          </svg>
        </div>
        <form action={formAction} className="flex flex-col gap-3">
          <Input name="email" placeholder="Email" required type="email">
            <EnvelopeIcon className="size-6" />
          </Input>
          <Input name="name" placeholder="Username" required type="text">
            <UserIcon className="size-6" />
          </Input>
          <Input
            name="password"
            placeholder="Password"
            required
            type="password"
            errors={state.errors}
          >
            <KeyIcon className="size-6" />
          </Input>
          <Button text="Log in" />
          {state.status === "success" && (
            <div className="bg-green-500 flex flex-row rounded-xl p-3">
              <CheckCircleIcon className="size-6 mr-3" /> Welcome back!
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
