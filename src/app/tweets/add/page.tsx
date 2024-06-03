"use client";

import Link from "next/link";
import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { addTweet } from "@/app/tweets/add/actions";

export default function AddTweet() {
  const [state, dispatch] = useFormState(addTweet, null);

  return (
    <form action={dispatch}>
      <Input
        name="tweet"
        required
        type="text"
        placeholder="트윗"
        errors={state?.fieldErrors.tweet}
      />
      <Button text="작성"></Button>
    </form>
  );
}
