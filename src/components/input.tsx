import { InputHTMLAttributes } from "react";

interface InputProps {
  children?: React.ReactNode;
  name: string;
  errors?: string[];
}

const Input = ({
  children,
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) => {
  const className =
    errors.length > 0
      ? "border-red-300 focus-within:ring-red-200"
      : "border-netural-300 focus-within:ring-neutral-200";

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex flex-row border-2 rounded-full px-4 py-2 gap-2 ring ring-transparent group focus-within:ring-neutral-200 focus-within:ring-offset-2 focus-within:ring-offset-neutral-100 ${className}`}
      >
        {children}
        <input
          name={name}
          className="bg-transparent border-none w-full focus:outline-none transition group"
          {...rest}
        />
      </div>
      {errors.map((error, index) => (
        <span key={index} className="text-red-400 font-medium px-2">
          {error}
        </span>
      ))}
    </div>
  );
};

export default Input;
