"use client";

import { createAccount } from "@/app/create-account/actions";
import { useFormState } from "react-dom";
import Button from "@/components/button";
import Input from "@/components/input";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          minLength={4}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          minLength={4}
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="Create account" />
      </form>
    </div>
  );
}
