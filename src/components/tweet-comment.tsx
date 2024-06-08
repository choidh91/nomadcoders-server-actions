"use client";

import { addComment } from "@/app/tweets/[id]/actions";
import { useOptimistic, useState } from "react";

interface TweetCommentProps {
  id: number;
  comments: string[];
}

interface State {
  comments: string[];
}
export default function TweetComment({ id, comments }: TweetCommentProps) {
  const [comment, setComment] = useState<string>();

  const [state, reducerFn] = useOptimistic<State, string>(
    { comments },
    (prev, payload) => ({
      comments: [...prev.comments, payload],
    })
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!comment) {
      return;
    }

    reducerFn(comment);

    const formData = new FormData();
    formData.append("tweetId", id + "");
    formData.append("comment", comment);

    setComment("");

    await addComment(formData);
  };

  return (
    <div>
      <p>댓글</p>
      <form onSubmit={handleSubmit}>
        <input
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button>작성</button>
      </form>

      {state.comments.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}
