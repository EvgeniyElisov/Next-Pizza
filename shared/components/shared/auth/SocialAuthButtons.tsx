import { SocialAuthButton } from ".";

type Props = {
  type: "login" | "register";
  onSwitchType: () => void;
};

export const SocialAuthButtons = ({ type, onSwitchType }: Props) => {
  return (
    <div className="flex gap-2">
      <SocialAuthButton
        provider="github"
        iconSrc="https://github.githubassets.com/favicons/favicon.svg"
        label="GitHub"
      />
      <SocialAuthButton
        provider="google"
        iconSrc="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        label="Google"
      />
    </div>
  );
};
