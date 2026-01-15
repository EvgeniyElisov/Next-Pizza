import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Title } from "./Title";
import { Button } from "../ui";

type Props = {
  title: string;
  text: string;
  imageSrc: string;
};

export const MessageBlock = ({ title, text, imageSrc }: Props) => {
  return (
    <div className={"flex items-center justify-between w-[840px] gap-12"}>
      <div className="flex flex-col">
        <div className="w-[445px]">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-lg">{text}</p>
        </div>

        <div className="flex gap-5 mt-11">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft />
              На главную
            </Button>
          </Link>
        </div>
      </div>
      <Image src={imageSrc} alt={title} width={300} height={300} />
    </div>
  );
};
