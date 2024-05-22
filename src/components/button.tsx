import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button className="rounded-full bg-neutral-200 p-2 hover:bg-neutral-300 transition-transform" disabled={pending}>
      {pending ? "Loading..." : text}
    </button>
  );
};

export default Button;
