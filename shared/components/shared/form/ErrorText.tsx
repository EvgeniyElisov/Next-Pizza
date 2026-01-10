import { cn } from "shared/lib/utils";

type Props = {
  text: string;
  className?: string;
};

export const ErrorText = ({ text, className }: Props) => {
  return <p className={cn("text-red-500 text-sm mt-2", className)}>{text}</p>;
};
