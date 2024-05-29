"use client";

import { login } from "@/app/log-in/actions";
import Button from "@/components/button";
import Input from "@/components/input";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useFormState } from "react-dom";

export default function LogIn() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <form action={dispatch} className="flex flex-col gap-3">
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
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
      </form>
    </div>
  );
}
