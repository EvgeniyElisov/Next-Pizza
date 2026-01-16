import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "shared/components/ui";

type Props = {
  provider: "github";
  iconSrc: string;
  label: string;
};

export const SocialAuthButton = ({ provider, iconSrc, label }: Props) => {
  const handleClick = () => {
    signIn(provider, { callbackUrl: "/", redirect: true });
  };

  return (
    <Button variant="secondary" onClick={handleClick} type="button" className="gap-2 h-12 p-2 flex-1">
      <Image width={32} height={32} src={iconSrc} alt={label} />
      <span>{label}</span>
    </Button>
  );
};
